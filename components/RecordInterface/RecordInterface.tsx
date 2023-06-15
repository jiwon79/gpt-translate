import styles from "./RecordInterface.module.scss";
import useAnalyser, { AnalyserType } from "@/lib/hooks/useAnalyser";
import AudioVisualizer from "./AudioVisualizer";
import { Language } from "@/lib/utils/constant";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { useSetRecoilState } from "recoil";

interface RecordProcessProps {
  stream: MediaStream | null;
  stopRecording: () => void;
  language: Language;
}

const RecordInterface = ({stream, stopRecording, language}: RecordProcessProps) => {
  const { audioData } = useAnalyser({ stream, analyserType: AnalyserType.TIME });
  const guideText = language === Language.EN ? "Speak" : "한국어로 말하세요.";
  const completeText = language === Language.EN ? "Complete" : "완료";
  const setBehavior = useSetRecoilState(behaviorAtom);

  const stop = () => {
    stopRecording();
    setBehavior(BehaviorEnum.WAIT);
  }

  return (
    <div className={styles.container}>
      <p>{guideText}</p>
      <AudioVisualizer audioData={audioData} />
      <button onClick={() => stop()}>{completeText}</button>
    </div>
  )
}

export default RecordInterface;
