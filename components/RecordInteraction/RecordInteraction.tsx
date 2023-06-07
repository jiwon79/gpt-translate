import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useState } from "react";

export enum Language {
  EN = "en",
  KO = "ko",
}

const RecordInteraction = () => {
  const {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
  } = useRecorder();
  const [curLanguage, setCurLanguage] = useState<Language>(Language.KO);

  const handleRecording = (language: Language) => {
    setCurLanguage(language);
    startRecording();
  }
  console.log(isRecording);

  if (isRecording) return (
    <div className={styles.button__wrap}>
      <button onClick={() => stopRecording()}>종료</button>
    </div>
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
