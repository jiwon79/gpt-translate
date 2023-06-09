import { speechState, SpeechState } from "@/lib/recoil/speech";
import styles from './Message.module.scss';
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;

interface MessageProps {
  speech: SpeechState;
}

const Message = ({ speech }: MessageProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const setSpeech = useSetRecoilState(speechState);
  const [text, setText] = useState<string>('');
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);

  const playAudio = () => {
    if (!audioRef.current) return;

    audioRef.current.play();
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const completeEdit = () => {
    setSpeech({
      ...speech,
      text: text,
      translateText: "",
      reTranslateText: "",
    });
    setBehavior(BehaviorEnum.WAIT);
  }

  if (behavior === BehaviorEnum.EDIT) {
    return (
      <>
        <input type="text" onChange={handleText}/>
        <button onClick={() => completeEdit()}>완료</button>
      </>
    )
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
        <button onClick={() => setBehavior(BehaviorEnum.EDIT)}>수정</button>
        <button>피드백</button>
        <button>삭제</button>
        <button onClick={playAudio}>재생</button>
      </div>
    </div>
  );
}

export default Message;
