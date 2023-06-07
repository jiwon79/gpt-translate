"use client"
import styles from './page.module.scss';
import useRecorder from "@/lib/hooks/useRecorder";
import { useState } from "react";
import { audioArrayToUrl, blobUrlToBase64 } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import '@/lib/utils/prototype';
import Header from "@/components/Header/Header";

const TranslatePage = () => {
  const {audioURL, isRecording, startRecording, stopRecording,} = useRecorder();
  const [word, setWord] = useState<string>('');
  const [audioContent, setAudioContent] = useState<string>('');

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }

  const fetchSTT = async () => {
    const base64 = await blobUrlToBase64(audioURL);

    return await speechTextAPI.stt(base64);
  }

  const fetchTTS = async (text: string) => {
    const response = await speechTextAPI.tts(text);

    return response.audioContent;
  }

  const handleAudioUrl = async () => {
    const result = await fetchSTT();
    setWord(result.translate);
    console.log(result.translate);
    if (result.translate.isBlank()) {
      return;
    }
    const audio = await fetchTTS(result.translate);
    const audioUrl = audioArrayToUrl(audio.data);
    setAudioContent(audioUrl);
  }

  return (
    <main className={styles.main}>
      <Header label={"대화"} prevLabel={"상황 변경"} prevHref={"/"} />
      <h1>녹음 버튼 및 재생</h1>
      <audio controls src={audioURL}>녹음된 소리를 재생할 audio 엘리먼트</audio>
      <audio controls src={audioContent}>TTS</audio>
      <p>{isRecording ? "녹음중" : "녹음 아님"}</p>
      <p>STT 결과 : {word}</p>
      <button onClick={handleRecording}>녹음</button>
      <button onClick={async () => {
        await handleAudioUrl();
      }}>음성인식</button>
    </main>
  );
}

export default TranslatePage;
