import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useEffect, useState } from "react";

import RecordProcess from "./RecordProcess/RecordProcess";
import { audioArrayToUrl, blobUrlToBase64 } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { useRecoilState } from "recoil";
import { speechState } from "@/lib/recoil";
import { Language } from "@/lib/utils/constant";

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

  const [, setSpeech] = useRecoilState(speechState);

  const fetchSTT = async () => {
    const base64 = await blobUrlToBase64(audioURL);
    return await speechTextAPI.stt(base64);
  }

  const fetchTTS = async (text: string) => {
    const response = await speechTextAPI.tts(text);
    return response.audioContent;
  }

  const handleAudioUrl = async () => {
    setSpeech((speech) => {
      return {
        ...speech,
        audioUrl: audioURL,
        language: curLanguage,
      }
    });
    const result = await fetchSTT();
    setSpeech((speech) => {
      return {
        ...speech,
        text: result.translate,
      }
    });
    if (result.translate.isBlank()) {
      return;
    }
    const ttsAudio = await fetchTTS(result.translate);
    const ttsAudioUrl = audioArrayToUrl(ttsAudio.data);
    setSpeech((speech) => {
      return {
        ...speech,
        ttsAudioUrl: ttsAudioUrl,
      }
    });
  }

  useEffect(() => {
    if (!audioURL) return;
    handleAudioUrl();
  }, [audioURL]);

  if (isRecording) return (
    <RecordProcess stream={stream} stopRecording={stopRecording} language={curLanguage}/>
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
