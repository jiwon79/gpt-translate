"use client"
import styles from './page.module.css'
import { useState } from "react";
import useRecorder from "@/lib/hooks/useRecorder";
import speechTextAPI from "@/lib/api/speechTextAPI";
import { blobUrlToBase64 } from "@/lib/utils/function";

export default function Home() {
  const {audioURL, isRecording, startRecording, stopRecording,} = useRecorder();
  const [word, setWord] = useState<string>('');
  const [audioContent, setAudioContent] = useState<string>('');

  const fetchSTT = async () => {
    const base64 = await blobUrlToBase64(audioURL);

    return await speechTextAPI.stt(base64);
  }

  const handleRecording = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }

  const fetchTTS = async (text: string) => {
    const response = await speechTextAPI.tts(text);
    console.log(response.audioContent);

    return response.audioContent;
  }

  const handleAudioUrl = async () => {
    const result = await fetchSTT();
    setWord(result.translate);
    console.log(result.translate);
    if (result.translate.replaceAll(" ", "") === "") {
      return;
    }
    const audio = await fetchTTS(result.translate);
    let bufferData = audio.data;
    let arrayBuffer = new Uint8Array(bufferData).buffer;

    let audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log(audioUrl);
    setAudioContent(audioUrl);
  }

  return (
    <main className={styles.main}>
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
  )
}
