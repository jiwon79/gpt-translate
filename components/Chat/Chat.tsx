import { ChangeEvent, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import SpeechIcon from "@/components/Svg/SpeechIcon";
import Bubble from "@/components/Svg/Bubble";
import useDialog from "@/lib/hooks/useDialog";
import { Dialog } from "@/lib/recoil/dialogList";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { Language } from "@/lib/utils/constant";

import styleGuide from "@/styles/styleGuide.module.scss";
import styles from './Chat.module.scss';
import TextWrap from "@/components/Chat/TextWrap/TextWrap";

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

  const sideStyle = dialog.language === Language.EN ? styles.left : styles.right;

  return (
    <div className={`${sideStyle} ${styles.wrap}`}>
      <div className={styles.wrap__top}>
        <TextWrap
          text={dialog.text}
          translateText={dialog.translateText}
          reTranslateText={dialog.reTranslateText}
          isLastChat={isLastChat}
        />
        <button className={styles.button__audio} onClick={() => playAudio()}>
          <SpeechIcon color={styleGuide.grey600} />
        </button>
      </div>
      <div className={styles.wrap__bottom}>
        {dialog.language === Language.EN && <Bubble color={styleGuide.grey250} classname={styles.bubble__left} />}
        <audio className={styles.none} src={dialog.ttsAudioUrl} ref={audioRef} controls/>
        {isLastChat
          && <div>
              <button onClick={() => onTapEditButton()}>수정</button>
              <button onClick={() => onTapFeedbackButton()}>피드백</button>
              <button onClick={() => deleteLastDialog()}>삭제</button>
            </div>}
        {dialog.language === Language.KO && <Bubble color={styleGuide.grey250} classname={styles.bubble__right} />}
      </div>
    </div>
  );
}

export default Chat;
