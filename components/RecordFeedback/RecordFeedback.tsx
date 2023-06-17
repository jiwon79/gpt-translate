import styles from "./RecordFeedback.module.scss";
import { useRouter } from "next/navigation";
import useRecorder from "@/lib/hooks/useRecorder";
import RecordInterface from "@/components/RecordInterface/RecordInterface";
import { ChangeEvent, useEffect, useState } from "react";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { blobUrlToBase64 } from "@/lib/utils/function";
import useGptTranslate from "@/lib/hooks/useGptTranslate";
import useDialog from "@/lib/hooks/useDialog";
import { Dialog } from "@/lib/recoil/dialogList";
import { Language } from "@/lib/utils/constant";
import { toast } from "react-toastify";

const RecordFeedback = () => {
  const router = useRouter();
  const { isRecording, audioURL, stream, startRecording, stopRecording } = useRecorder();
  const [feedBackText, setFeedBackText] = useState<string>('');
  const {getAlternativeTranslate, acceptFeedback} = useGptTranslate();
  const {dialogList, acceptTranslateFeedback} = useDialog();
  const lastDialog: Dialog = dialogList.length > 0 ? dialogList[dialogList.length - 1] : {
    text: "",
    translateText: "",
    language: Language.KO,
    reTranslateText: "",
    ttsAudioUrl: "",
  };
  const {text, translateText, language} = lastDialog;

  const fetchSTT = async (audioURL: string): Promise<string> => {
    const base64 = await blobUrlToBase64(audioURL);
    const response = await speechTextAPI.stt(base64, language);

    return response.translate;
  }

  const handleFeedbackText = (e: ChangeEvent<HTMLInputElement>) => {
    setFeedBackText(e.target.value);
  }
  const onTapRecordButton = () => {
    if (isRecording) return;
    startRecording();
  }


  const onTapAcceptButton = async () => {
    const translateFeedback = await acceptFeedback(text, translateText, feedBackText, language);
    setNewTranslateText(translateFeedback);
    const response = await speechTextAPI.translate(translateFeedback, language);
    const reTranslateFeedback = response.result;
    setNewReTranslateText(reTranslateFeedback);
  }


  useEffect(() => {
    (async () => {
      if (!audioURL) return;
      const sttText = await fetchSTT(audioURL);
      if (sttText.trim() === '') {
        toast.error('음성을 인식하지 못했습니다. 다시 시도해주세요.');
      }
      setFeedBackText(sttText);
    })();
  }, [audioURL]);


  const [newTranslateText, setNewTranslateText] = useState<string>('');
  const [newReTranslateText, setNewReTranslateText] = useState<string>('');
  const onTapFeedbackAcceptButton = async () => {
    await acceptTranslateFeedback(newTranslateText, newReTranslateText);
    router.back();
  }

  return (
    <>
      <input type="text" value={feedBackText} onChange={handleFeedbackText} />
      <button onClick={() => onTapRecordButton()}>녹음</button>
      {isRecording
        ? <RecordInterface stream={stream} stopRecording={stopRecording} language={language}/>
        : <></>}
      <button onClick={() => onTapAcceptButton()}>피드백 받기</button>
      <p>{newTranslateText}</p>
      <p>{newReTranslateText}</p>
      <button onClick={() => onTapFeedbackAcceptButton()}>적용하기</button></>
  );
}

export default RecordFeedback;
