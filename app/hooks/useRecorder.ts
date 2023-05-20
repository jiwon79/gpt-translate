import { useCallback, useEffect, useState } from 'react';

export interface useRecorderType {
  audioURL: string;
  isRecording: boolean;
  stream: MediaStream | null;
  startRecording: () => void;
  stopRecording: () => void;
}

const useRecorder = (): useRecorderType => {
  const [audioURL, setAudioURL] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const requestRecorder = useCallback(async () => {
    return await navigator.mediaDevices.getUserMedia({ audio: true });
  }, []);

  const startRecording = useCallback(() => {
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const handleData = useCallback((e: BlobEvent) => {
    setAudioURL(URL.createObjectURL(e.data));
  }, []);

  useEffect(() => {
    if (mediaRecorder === null || stream === null) {
      requestRecorder()
        .then((stream) => {
          setStream(stream);
          setMediaRecorder(new MediaRecorder(stream));
        }, console.error);
    }
  }, []);

  useEffect(() => {
    if (mediaRecorder === null) return;

    mediaRecorder.addEventListener('dataavailable', handleData);
    return () => {
      mediaRecorder.removeEventListener('dataavailable', handleData);
    };
  }, [handleData, mediaRecorder]);

  useEffect(() => {
    if (mediaRecorder === null || stream === null) return;

    if (isRecording && mediaRecorder.state !== 'recording') {
      mediaRecorder.start();
    } else if (mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  }, [isRecording, mediaRecorder]);

  return {
    audioURL, isRecording, stream, startRecording, stopRecording,
  };
};

export default useRecorder;
