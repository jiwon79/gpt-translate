"use client"
import useRecorder from "@/lib/hooks/useRecorder";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import RecordInterface from "@/components/RecordInterface/RecordInterface";
import { blobUrlToBase64 } from "@/lib/utils/function";
import useDialog from "@/lib/hooks/useDialog";
import { Language } from "@/lib/utils/constant";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";

import RecordSelect from "./RecordSelect/RecordSelect";
import EditChat from "./EditChat/EditChat";

const Interaction = () => {
  const {
    audioURL,
    stream,
    startRecording,
    stopRecording,
  } = useRecorder();
  const [curLanguage, setCurLanguage] = useState<Language>(Language.KO);
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);
  const {translateText, createEmptyDialog, editLastDialog} = useDialog();

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
      return <EditChat />

    case BehaviorEnum.WAIT:
      return <RecordSelect handleRecording={handleRecording}/>;

    case BehaviorEnum.RECORD:
      return <RecordInterface
        stream={stream}
        stopRecording={stopRecording}
        language={curLanguage}
      />;

    default:
      return <></>;
  }
}

export default Interaction;
