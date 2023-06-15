"use client"
import Header from "@/components/Header/Header";
import { useRecoilState } from "recoil";
import { dialogListAtom } from "@/lib/recoil";
import { useEffect, useState } from "react";
import useGptTranslate from "@/lib/hooks/useGptTranslate";
import speechTextAPI from "@/lib/api/speechTextAPI";
import useRecorder from "@/lib/hooks/useRecorder";
import RecordInterface from "@/components/RecordInterface/RecordInterface";
import { blobUrlToBase64 } from "@/lib/utils/function";

interface AlternativeTranslate {
  translateText: string;
  reTranslateText: string;
}

const FeedbackPage = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const {isRecording, startRecording, stopRecording, stream, audioURL} = useRecorder();
  const [feedBackText, setFeedBackText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getAlternativeTranslate} = useGptTranslate();
  const [alternativeTranslates, setAlternativeTranslates] = useState<AlternativeTranslate[]>([
    {translateText: "", reTranslateText: ""},
    {translateText: "", reTranslateText: ""},
  ]);
  const lastDialog = dialogList[dialogList.length - 1];
  const {text, translateText, language} = lastDialog;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const alternativeTranslate = await getAlternativeTranslate(text, translateText);
      const alternativeTranslateTexts = alternativeTranslate.split("/");
      const reTranslateTexts = await Promise.all(alternativeTranslateTexts.map(async (text) => {
        const response = await speechTextAPI.translate(text, language);
        return response.result
      }));
      if (alternativeTranslateTexts.length !== reTranslateTexts.length) return;
      const alternativeTranslatesResult = alternativeTranslateTexts.map((translateText, index) => {
        return {
          translateText,
          reTranslateText: reTranslateTexts[index],
        }
      });
      setAlternativeTranslates(alternativeTranslatesResult);
    })();
  }, [])

  const onTapRecordButton = () => {
    if (isRecording) return;
    startRecording();
  }

  const fetchSTT = async (audioURL: string): Promise<string> => {
    const base64 = await blobUrlToBase64(audioURL);
    const response = await speechTextAPI.stt(base64, language);

    return response.translate;
  }

  useEffect(() => {
    (async () => {
      if (!audioURL) return;
      const sttText = await fetchSTT(audioURL);
      setFeedBackText(sttText);
    })();
  }, [audioURL]);

  return (
    <>
      <Header label={""} prevLabel={"피드백"} prevHref={"/translate"}/>
      <p>{text}</p>
      <p>{language}</p>
      {alternativeTranslates.map((alternativeTranslate, index) => {
        return (
          <div key={index}>
            <p>{alternativeTranslate.translateText}</p>
            <p>{alternativeTranslate.reTranslateText}</p>
          </div>
        )
      })}
      <p>이런 번역은 어떠세요?</p>
      <p>번역 요청 사항 입력하기</p>
      <input type="text" value={feedBackText}/>
      <button onClick={() => onTapRecordButton()}>녹음</button>
      {isRecording
        ? <RecordInterface stream={stream} stopRecording={stopRecording} language={language}/>
        : <></>}

    </>
  )
}

export default FeedbackPage;
