import { SpeechState } from "@/lib/recoil/speech";
import styles from './Message.module.scss';
import { useRef } from "react";

interface MessageProps {
  speech: SpeechState;
}

const Message = ({ speech }: MessageProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.play();
  }

  return (
    <div>
      <div className={styles.container}>
        <p>{speech.text == '' ? 'loading' : speech.text}</p>
        <p>{speech.translateText === '' ? 'loading' : speech.translateText}</p>
        <p>{speech.reTranslateText === '' ? 'loading' : speech.reTranslateText}</p>
      </div>
      <audio className={styles.none} src={speech.ttsAudioUrl} ref={audioRef} controls />
      <div>
        <button>수정</button>
        <button>피드백</button>
        <button>삭제</button>
        <button onClick={playAudio}>재생</button>
      </div>
    </div>
  );
}

export default Message;
