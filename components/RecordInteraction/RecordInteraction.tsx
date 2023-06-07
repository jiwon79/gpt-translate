import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useState } from "react";

import RecordProcess from "./RecordProcess/RecordProcess";

export enum Language {
  EN = "en",
  KO = "ko",
}

const RecordInteraction = () => {
  const {
    audioURL,
    isRecording,
    stream,
    startRecording,
    stopRecording,
  } = useRecorder();
  const [curLanguage, setCurLanguage] = useState<Language>(Language.KO);

  const handleRecording = (language: Language) => {
    setCurLanguage(language);
    startRecording();
  }

  if (isRecording) return (
    <RecordProcess stream={stream} stopRecording={stopRecording} language={curLanguage} />
  );

  return (
    <div className={styles.button__wrap}>
      <button onClick={() => handleRecording(Language.EN)}>영어</button>
      <p>말하려면 누르세요.</p>
      <button onClick={() => handleRecording(Language.KO)}>한국어</button>
    </div>
  );
}

export default RecordInteraction;
