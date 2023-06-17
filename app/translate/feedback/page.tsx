"use client"
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import useGptTranslate from "@/lib/hooks/useGptTranslate";
import speechTextAPI from "@/lib/api/speechTextAPI";
import useRecorder from "@/lib/hooks/useRecorder";
import RecordInterface from "@/components/RecordInterface/RecordInterface";
import { blobUrlToBase64 } from "@/lib/utils/function";
import useDialog from "@/lib/hooks/useDialog";
import { useRouter } from "next/navigation";
import { Language } from "@/lib/utils/constant";
import { Dialog } from "@/lib/recoil/dialogList";
import styles from './page.module.scss';
import Bubble from "@/components/Svg/Bubble";
import BubbleSmall from "@/components/Svg/BubbleSmall";
import AlternativeTranslate from "@/lib/model/AlternativeTranslate";
import AlternativeWrap from "@/components/AlternativeWrap/AlternativeWrap";

const FeedbackPage = () => {
  const router = useRouter();
  const {dialogList, acceptTranslateFeedback} = useDialog();
  const {isRecording, startRecording, stopRecording, stream, audioURL} = useRecorder();
  const [feedBackText, setFeedBackText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getAlternativeTranslate, acceptFeedback} = useGptTranslate();
  const [alternativeTranslates, setAlternativeTranslates] = useState<AlternativeTranslate[]>([
    {translateText: "", reTranslateText: ""},
    {translateText: "", reTranslateText: ""},
  ]);
  const lastDialog: Dialog = dialogList.length > 0 ? dialogList[dialogList.length - 1] : {
    text: "",
    translateText: "",
    language: Language.KO,
    reTranslateText: "",
    ttsAudioUrl: "",
  };
  const {text, translateText, language} = lastDialog;

  const [newTranslateText, setNewTranslateText] = useState<string>('');
  const [newReTranslateText, setNewReTranslateText] = useState<string>('');

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      console.log('start');
      const alternativeTranslate = await getAlternativeTranslate(text, translateText);
      console.log(alternativeTranslate);
      const alternativeTranslateTexts = alternativeTranslate.split("/");
      const reTranslateTexts = await Promise.all(alternativeTranslateTexts.map(async (text) => {
        const response = await speechTextAPI.translate(text, language);
        return response.result
      }));
      console.log(reTranslateTexts);
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

  const onTapAcceptButton = async () => {
    const translateFeedback = await acceptFeedback(text, translateText, feedBackText, language);
    setNewTranslateText(translateFeedback);
    const response = await speechTextAPI.translate(translateFeedback, language);
    const reTranslateFeedback = response.result;
    setNewReTranslateText(reTranslateFeedback);
  }

  const onTapFeedbackAcceptButton = async () => {
    await acceptTranslateFeedback(newTranslateText, newReTranslateText);
    router.back();
  }

  const handleFeedbackText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedBackText(e.target.value);
  }

  return (
    <div className={styles.container}>
      <Header/>
      <p className={styles.text__alternative}>이런 번역은 어떠세요?</p>
      <p>원문 : {text}</p>
      <AlternativeWrap alternativeTranslates={alternativeTranslates} />
      <p>번역 요청 사항 입력하기</p>
      <input type="text" value={feedBackText} onChange={handleFeedbackText} />
      <button onClick={() => onTapRecordButton()}>녹음</button>
      {isRecording
        ? <RecordInterface stream={stream} stopRecording={stopRecording} language={language}/>
        : <></>}
      <button onClick={() => onTapAcceptButton()}>피드백 받기</button>
      <p>{newTranslateText}</p>
      <p>{newReTranslateText}</p>
      <button onClick={() => onTapFeedbackAcceptButton()}>적용하기</button>
    </div>
  )
}

export default FeedbackPage;
