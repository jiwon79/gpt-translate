import styles from './Chat.module.scss';
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import { Dialog } from "@/lib/recoil/dialogList";

interface MessageProps {
  dialog: Dialog;
}

const Chat = ({ dialog }: MessageProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [text, setText] = useState<string>('');
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);

  const playAudio = async () => {
    if (!audioRef.current) return;

    await audioRef.current.play();
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  // const completeEdit = () => {
  //   setSpeech({
  //     ...speech,
  //     text: text,
  //     translateText: "",
  //     reTranslateText: "",
  //   });
  //   setBehavior(BehaviorEnum.WAIT);
  // }

  if (behavior === BehaviorEnum.EDIT) {
    return (
      <>
        <input type="text" onChange={handleText}/>
        {/*<button onClick={() => completeEdit()}>완료</button>*/}
      </>
    )
  }

  return (
    <div>
      <div className={styles.container}>
        <p>{dialog.text == '' ? 'loading' : dialog.text}</p>
        <p>{dialog.translateText === '' ? 'loading' : dialog.translateText}</p>
        <p>{dialog.reTranslateText === '' ? 'loading' : dialog.reTranslateText}</p>
      </div>
      <audio className={styles.none} src={dialog.ttsAudioUrl} ref={audioRef} controls />
      <div>
        <button onClick={() => setBehavior(BehaviorEnum.EDIT)}>수정</button>
        <button>피드백</button>
        <button>삭제</button>
        <button onClick={playAudio}>재생</button>
      </div>
    </div>
  );
}

export default Chat;
