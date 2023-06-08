import { Language } from "../RecordInteraction";
import styles from "./RecordProcess.module.scss";
import useAnalyser, { AnalyserType } from "@/lib/hooks/useAnalyser";
import AudioVisualizer from "./AudioVisualizer";

interface RecordProcessProps {
  stream: MediaStream | null;
  stopRecording: () => void;
  language: Language;
}

const RecordProcess = ({stream, stopRecording, language}: RecordProcessProps) => {
  const { audioData } = useAnalyser({ stream, analyserType: AnalyserType.TIME });
  const guideText = language === Language.EN ? "Speak" : "한국어로 말하세요.";
  const completeText = language === Language.EN ? "Complete" : "완료";

  return (
    <div className={styles.container}>
      <p>{guideText}</p>
      <AudioVisualizer audioData={audioData} />
      <button onClick={() => stopRecording()}>{completeText}</button>
    </div>
  )
}

export default RecordProcess;
