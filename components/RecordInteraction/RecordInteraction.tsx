import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useEffect, useState } from "react";

import RecordProcess from "./RecordProcess/RecordProcess";
import { blobUrlToBase64 } from "@/lib/utils/function";
import { useRecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import useDialog from "@/lib/hooks/useDialog";

const RecordInteraction = () => {
  const {
    audioURL,
    stream,
    startRecording,
    stopRecording,
  } = useRecorder();
  const [curLanguage, setCurLanguage] = useState<Language>(Language.KO);
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);
  const { translateText, createEmptyDialog } = useDialog();

  const handleRecording = (language: Language) => {
    setCurLanguage(language);
    startRecording();
    setBehavior(BehaviorEnum.RECORD);
  }

  const fetchSTT = async (audioURL: string): Promise<string> => {
    const base64 = await blobUrlToBase64(audioURL);
    const response = await speechTextAPI.stt(base64);

    return response.translate;
  }

  useEffect(() => {
    if (!audioURL) return;

    (async () => {
      createEmptyDialog(curLanguage);
      const text = await fetchSTT(audioURL);
      await translateText(text);
    })();
  }, [audioURL]);

  switch (behavior) {
    case BehaviorEnum.EDIT:
      return null;
    case BehaviorEnum.WAIT:
      return (
        <div className={styles.button__wrap}>
          <button onClick={() => handleRecording(Language.EN)}>영어</button>
          <p>말하려면 누르세요.</p>
          <button onClick={() => handleRecording(Language.KO)}>한국어</button>
        </div>
      );
    case BehaviorEnum.RECORD:
      return (
        <RecordProcess stream={stream} stopRecording={stopRecording} language={curLanguage}/>
      );
  }
}

export default RecordInteraction;
