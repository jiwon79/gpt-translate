"use client"
import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useEffect, useState } from "react";

import RecordInterface from "@/components/RecordInterface/RecordInterface";
import { blobUrlToBase64 } from "@/lib/utils/function";
import { useRecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import useDialog from "@/lib/hooks/useDialog";
import MicFill from "@/components/Svg/MicFill";
import MicEmpty from "@/components/Svg/MicEmpty";

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
    const response = await speechTextAPI.stt(base64, curLanguage);

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
      return <></>;
    case BehaviorEnum.WAIT:
      return (
        <div className={styles.button__wrap}>
          <MicFill color={"#2e2e2e"} />
          <button onClick={() => handleRecording(Language.EN)}>영어</button>
          <p>말하려면 누르세요.</p>
          <MicEmpty color={"#ff00ff"} />
          <button onClick={() => handleRecording(Language.KO)}>한국어</button>
        </div>
      );
    case BehaviorEnum.RECORD:
      return (
        <RecordInterface stream={stream} stopRecording={stopRecording} language={curLanguage}/>
      );
    default:
      return <></>;
  }
}

export default RecordInteraction;
