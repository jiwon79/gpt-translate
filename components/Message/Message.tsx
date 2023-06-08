import { SpeechState } from "@/lib/recoil/speech";
import styles from './Message.module.scss';

interface MessageProps {
  speech: SpeechState;
}

const Message = ({ speech }: MessageProps) => {
  return (
    <div>
      <div className={styles.container}>
        <p>{speech.text == '' ? 'loading' : speech.text}</p>
        <p>{speech.translateText === '' ? 'loading' : speech.translateText}</p>
        <p>{speech.reTranslateText === '' ? 'loading' : speech.reTranslateText}</p>
      </div>
      <div>
        <button>수정</button>
        <button>피드백</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default Message;
