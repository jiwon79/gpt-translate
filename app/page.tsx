"use client"
import styles from './page.module.css'
import { useEffect, useRef, useState } from "react";
import useRecorder from "@/app/hooks/useRecorder";

export default function Home() {
  const {audioURL, isRecording, startRecording, stopRecording,} = useRecorder();

  useEffect(() => {
    console.log(audioURL);
  }, [audioURL]);

  const onClick = async () => {
    if (isRecording) {
      stopRecording();
      return;
    }
    startRecording();
  }

  return (
    <main className={styles.main}>
      <h1>녹음 버튼 및 재생</h1>
      <audio controls src={audioURL}>녹음된 소리를 재생할 audio 엘리먼트</audio>
      <p>{isRecording ? "녹음중" : "녹음 아님"}</p>
      <button onClick={onClick}>녹음</button>
    </main>
  )
}
