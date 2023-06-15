import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import useDialog from "@/lib/hooks/useDialog";
import { Dialog } from "@/lib/recoil/dialogList";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import styles from './Chat.module.scss';
import Bubble from "@/components/Svg/Bubble";
import SpeechIcon from "@/components/Svg/SpeechIcon";
import { Language } from "@/lib/utils/constant";

interface MessageProps {
  dialog: Dialog;
  isLastChat: boolean;
}

const Chat = ({dialog, isLastChat}: MessageProps) => {
  const router = useRouter();
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

  const onTapFeedbackButton = () => {
    router.push("/translate/feedback");
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
    <div className={dialog.language === Language.EN ? styles.left : styles.right}>
      <div className={styles.bubble__wrap__top}>
        <div className={styles.text__wrap}>
          <p className={styles.text}>
            {dialog.text == '' ? 'loading...' : dialog.text}
          </p>
          <p className={styles.text__translate}>
            {dialog.translateText === '' ? 'loading...' : dialog.translateText}
          </p>
          <p className={styles.text__reTranslate}>
            {dialog.reTranslateText === '' ? 'loading...' : dialog.reTranslateText}
          </p>
        </div>
        <button onClick={() => playAudio()}>
          <SpeechIcon color={"#2e2e2e"} />
        </button>
      </div>
      <div className={styles.bubble__wrap__bottom}>
        {dialog.language === Language.EN && <Bubble color={"#2e2e2e"} classname={styles.bubble__left} />}
        <audio className={styles.none} src={dialog.ttsAudioUrl} ref={audioRef} controls/>
        {isLastChat
          ? <div>
              <button onClick={() => onTapEditButton()}>수정</button>
              <button onClick={() => onTapFeedbackButton()}>피드백</button>
              <button onClick={() => deleteLastDialog()}>삭제</button>
            </div>
          : <></>}
        {dialog.language === Language.KO && <Bubble color={"#2e2e2e"} classname={styles.bubble__right} />}
      </div>
    </div>
  );
}

export default Chat;
