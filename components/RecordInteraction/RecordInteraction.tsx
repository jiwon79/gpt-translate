import styles from './RecordInteraction.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useEffect, useState } from "react";

import RecordProcess from "./RecordProcess/RecordProcess";
import { audioArrayToUrl, blobUrlToBase64, reverseLanguage } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { useRecoilState } from "recoil";
import { speechState } from "@/lib/recoil";
import { Language } from "@/lib/utils/constant";
import chatAPI from "@/lib/api/chatAPI";
import Message from "@/app/model/Message";

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

  const fetchChat = async (text: string) => {
    const messages = [
      new Message("system", "너는 번역 전문가야."),
      new Message("system", "한글을 입력하면 영어로, 영어를 입력하면 한글로 번역해줘."),
      new Message("user", text),
    ];

    return await chatAPI.chat(messages);
  }

  const handleAudioUrl = async () => {
    console.log('handleAudioUrl');
    setSpeech({
      language: curLanguage,
      ttsAudioUrl: "",
      text: "",
      translateText: "",
      reTranslateText: "",
    });
    const result = await fetchSTT();
    const text = result.translate;
    setSpeech((speech) => {
      return {
        ...speech,
        text: text,
      }
    });
    if (text.isBlank()) {
      return;
    }
    const chatResult = await fetchChat(text);
    const translateText = chatResult.message.content;
    setSpeech((speech) => {
      return {
        ...speech,
        translateText: translateText,
      }
    });
    const ttsAudio = await fetchTTS(translateText);
    const ttsAudioUrl = audioArrayToUrl(ttsAudio.data);
    setSpeech((speech) => {
      return {
        ...speech,
        ttsAudioUrl: ttsAudioUrl,
      }
    });
    const reTranslateResponse = await speechTextAPI.translate(translateText, curLanguage);
    setSpeech((speech) => {
      return {
        ...speech,
        reTranslateText: reTranslateResponse.result
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
