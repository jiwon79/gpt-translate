"use client"
import styles from './page.module.css'
import { useEffect, useRef, useState } from "react";
import useRecorder from "@/app/hooks/useRecorder";

export default function Home() {
  const {audioURL, isRecording, startRecording, stopRecording,} = useRecorder();
  const [word, setWord] = useState<string>('');

  async function fetchAndEncode(url: string) {
    // Fetch the file
    const response = await fetch(url);
    const data = await response.blob();

    // Create a new FileReader instance
    const reader = new FileReader();

    // Convert the blob to base64
    const promise = new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });

    await reader.readAsDataURL(data);

    // The promise will resolve with the reader.result
    return promise;
  }

  const fetchSTT = async () => {
    const audioBase64 = await fetchAndEncode(audioURL);
    console.log(audioBase64);
    const response= await fetch("/api/stt", {
      method: "POST",
      headers: {
        "Content-Type": "application/pdf",
      },
      body: JSON.stringify({
        audio: audioBase64,
      }),
    });
    return response.json();
  }

  useEffect(() => {
    // const data = fetch(audioURL)
    //   .then((r) => r.blob())
    //   .then((blobFile) => {
    //     const url = URL.createObjectURL(blobFile);
    //     const aTag = document.createElement("a");
    //     aTag.href = url;
    //     aTag.download = "audio.wav";
    //     aTag.click();
    //   });

  }, [audioURL]);

  const onClick = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }

  const handleAudioUrl = async () => {
    const result = await fetchSTT();
    setWord(result.translate);
  }

  return (
    <main className={styles.main}>
      <h1>녹음 버튼 및 재생</h1>
      <audio controls src={audioURL}>녹음된 소리를 재생할 audio 엘리먼트</audio>
      <p>{isRecording ? "녹음중" : "녹음 아님"}</p>
      <p>STT 결과 : {word}</p>
      <button onClick={onClick}>녹음</button>
      <button onClick={async () => {
        await handleAudioUrl();
      }}>음성인식</button>
    </main>
  )
}
