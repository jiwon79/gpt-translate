import { Language } from "../RecordInteraction";
import styles from "./RecordProcess.module.scss";

interface RecordProcessProps {
  stopRecording: () => void;
  language: Language;
}

const RecordProcess = ({stopRecording, language}: RecordProcessProps) => {
  const guideText = language === Language.EN ? "Speak" : "한국어로 말하세요.";
  const completeText = language === Language.EN ? "Complete" : "완료";

  return (
    <div className={styles.container}>
      <p>{guideText}</p>
      <button onClick={() => stopRecording()}>{completeText}</button>
    </div>
  )
}

export default RecordProcess;
