import { useState, useEffect, useRef } from 'react';

export enum AnalyserType {
  FREQUENCY = 'frequency',
  TIME = 'time',
}

export interface UseAnalyserProps {
  stream: MediaStream | null;
  analyserType?: AnalyserType;
}

const useAnalyser = ({ stream, analyserType }: UseAnalyserProps) => {
  const [audioContext, setAudioContext] = useState<AudioContext>();
  const [source, setSource] = useState<MediaStreamAudioSourceNode>();
  const [audioData, setAudioData] = useState<Uint8Array>(new Uint8Array(0));
  const [time, setTime] = useState(0);

  const analyser = useRef<AnalyserNode>();
  const dataArray = useRef<Uint8Array>();
  const rafId = useRef<number>(0);

  const tick = () => {
    if (analyser.current && dataArray.current) {
      if (analyserType === AnalyserType.FREQUENCY) {
        analyser.current.getByteFrequencyData(dataArray.current);
      } else {
        analyser.current?.getByteTimeDomainData(dataArray.current);
      }
      setAudioData(dataArray.current);
      rafId.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    const interval: NodeJS.Timer = setInterval(() => {
      setTime((time) => time + 15);
    }, 15);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (stream) setAudioContext(new window.AudioContext());
  }, [stream]);

  useEffect(() => {
    if (audioContext && stream) {
      analyser.current = audioContext.createAnalyser();
      analyser.current.fftSize = 1024;
      dataArray.current = new Uint8Array(analyser.current?.frequencyBinCount);
      setSource(audioContext.createMediaStreamSource(stream));
    }
  }, [audioContext, stream]);

  useEffect(() => {
    if (analyser.current && source && stream) {
      source.connect(analyser.current);
      rafId.current = requestAnimationFrame(tick);
    }

    return () => {
      analyser.current?.disconnect();
      source?.disconnect();
      cancelAnimationFrame(rafId.current);
    };
  }, [analyser, stream, source, tick]);

  return { audioData, time };
};

useAnalyser.defaultProps = {
  analyserType: AnalyserType.TIME,
};

export default useAnalyser;
