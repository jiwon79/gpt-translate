"use client"
import styles from './page.module.css'
import { useState } from "react";
import useRecorder from "@/hooks/useRecorder";

export default function Home() {
  const {audioURL, isRecording, startRecording, stopRecording,} = useRecorder();
  const [word, setWord] = useState<string>('');
  const [audioContent, setAudioContent] = useState<string>('');

  async function fetchAndEncode(url: string): Promise<string> {
    // Fetch the file
    const response = await fetch(url);
    const data = await response.blob();

    // Create a new FileReader instance
    const reader = new FileReader();

    // Convert the blob to base64
    const promise: Promise<string> = new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });

    await reader.readAsDataURL(data);

    // The promise will resolve with the reader.result
    return promise;
  }

  const fetchSTT = async () => {
    const audioBase64 = await fetchAndEncode(audioURL);
    const audio = audioBase64.replace("data:audio/webm;base64,", "");

    const response= await fetch("/api/stt", {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: JSON.stringify({
        audio: audio,
      }),
    });
    return response.json();
  }

  const onClick = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }

  const fetchTTS = async (text: string) => {
    const response = await fetch("/api/tts", {
      method: "POST",
      body: JSON.stringify({
        text: text,
      }),
    });

    const jsonResponse = await response.json();

    return jsonResponse.audioContent;
  }

  const handleAudioUrl = async () => {
    const result = await fetchSTT();
    setWord(result.translate);
    console.log(result.translate);
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
      <button onClick={onClick}>녹음</button>
      <button onClick={async () => {
        await handleAudioUrl();
      }}>음성인식</button>
    </main>
  )
}
