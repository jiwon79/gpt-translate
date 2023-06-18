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
import SendIcon from "@/components/Svg/Send";
import MicEmpty from "@/components/Svg/MicEmpty";
import styleGuide from "@/styles/styleGuide.module.scss";
import BubbleSmall from "@/components/Svg/BubbleSmall";

interface RecordFeedbackProps {
  setIsLoading: (isLoading: boolean) => void;
}

const RecordFeedback = ({setIsLoading}: RecordFeedbackProps) => {
  const router = useRouter();
  const {isRecording, audioURL, stream, startRecording, stopRecording} = useRecorder();
  const [feedBackText, setFeedBackText] = useState<string>('');
  const {acceptFeedback} = useGptTranslate();
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
    setNewReTranslateText('loading...');
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
    if (newTranslateText.trim() === '') return;
    await acceptTranslateFeedback(newTranslateText, newReTranslateText);
    router.back();
  }

  const newTranslateTextView = newTranslateText.trim() === '' ? '피드백을 기다리는 중' : newTranslateText;
  const newReTranslateTextView = newReTranslateText === '' ? '(...)' : `(${newReTranslateText})`;

  return (
    <>
      <button className={styles.bubble} onClick={onTapFeedbackAcceptButton}>
        <div className={styles.text__wrap}>
          <p className={styles.text__translate}>{newTranslateTextView}</p>
          <p className={styles.text__reTranslate}>{newReTranslateTextView}</p>
        </div>
        <BubbleSmall color={styleGuide.grey300} classname={styles.bubble__tail} />
      </button>

      <div className={styles.spacer} />

      {!isRecording ?
        <div className={styles.input__wrap}>
          <input className={styles.input} type="text" value={feedBackText} onChange={handleFeedbackText}/>
          <button
            className={`${styles.button__record} ${styles.button}`}
            onClick={() => onTapRecordButton()}
          >
            <MicEmpty className={styles.icon} color={styleGuide.green}/>
          </button>
          <button
            className={`${styles.button__send} ${styles.button} ${feedBackText === '' ? styles.disabled : ''}`}
            onClick={() => onTapAcceptButton()}
          >
            <SendIcon className={styles.icon} />
          </button>
        </div> :
        <></>}

      {isRecording
        ? <RecordInterface stream={stream} stopRecording={stopRecording} language={language}/>
        : <></>}
    </>
  );
}

export default RecordFeedback;
