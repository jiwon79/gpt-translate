import styles from './Chat.module.scss';
import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { Simulate } from "react-dom/test-utils";
import input = Simulate.input;
import { Dialog } from "@/lib/recoil/dialogList";
import useDialog from "@/lib/hooks/useDialog";

interface MessageProps {
  dialog: Dialog;
  isLastChat: boolean;
}

const Chat = ({dialog, isLastChat}: MessageProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [text, setText] = useState<string>('');
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);
  const {dialogList, editLastDialog, deleteLastDialog} = useDialog();

  const playAudio = async () => {
    if (!audioRef.current) return;

    await audioRef.current.play();
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const onTapEditButton = () => {
    setText(dialogList[dialogList.length - 1].text);
    setBehavior(BehaviorEnum.EDIT);
  }

  const completeEdit = () => {
    editLastDialog(text);
    setBehavior(BehaviorEnum.WAIT);
  }

  if (behavior === BehaviorEnum.EDIT && isLastChat) {
    return (
      <>
        <input type="text" onChange={handleText} value={text} />
        <button onClick={() => completeEdit()}>완료</button>
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
      <audio className={styles.none} src={dialog.ttsAudioUrl} ref={audioRef} controls/>
      {isLastChat
        ? <div>
            <button onClick={() => onTapEditButton()}>수정</button>
            <button>피드백</button>
            <button onClick={() => deleteLastDialog()}>삭제</button>
            <button onClick={playAudio}>재생</button>
          </div>
        : <></>}
    </div>
  );
}

export default Chat;
