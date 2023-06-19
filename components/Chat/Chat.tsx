import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";

import SpeechIcon from "@/components/Svg/SpeechIcon";
import Bubble from "@/components/Svg/Bubble";
import useDialog from "@/lib/hooks/useDialog";
import { Dialog } from "@/lib/recoil/dialogList";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { Language } from "@/lib/utils/constant";

import TextWrap from "./TextWrap/TextWrap";
import ButtonWrap from "./ButtonWrap/ButtonWrap";
import styleGuide from "@/styles/styleGuide.module.scss";
import styles from './Chat.module.scss';
import { headerAtom } from "@/lib/recoil";
import { language } from "googleapis/build/src/apis/language";

interface MessageProps {
  dialog: Dialog;
  isLastChat: boolean;
}

const Chat = ({dialog, isLastChat}: MessageProps) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [behavior, setBehavior] = useRecoilState(behaviorAtom);
  const setHeader = useSetRecoilState(headerAtom);
  const {deleteLastDialog} = useDialog();

  const playAudio = async () => {
    if (!audioRef.current) return;

    await audioRef.current.play();
  }

  const onTapEditButton = () => {
    setBehavior(BehaviorEnum.EDIT);
  }

  const onTapFeedbackButton = () => {
    if (dialog.language === Language.EN) {
      setHeader({label: "Feedback"});
    } else {
      setHeader({label: "피드백"});
    }
    router.push("/translate/feedback");
  }

  if (behavior === BehaviorEnum.EDIT && isLastChat) {
    return <></>;
  }

  const sideStyle = dialog.language === Language.EN ? styles.left : styles.right;

  return (
    <div className={`${sideStyle} ${styles.wrap}`}>
      <audio className={styles.none} src={dialog.ttsAudioUrl} ref={audioRef} controls/>

      <div className={styles.wrap__top}>
        <TextWrap
          text={dialog.text}
          translateText={dialog.translateText}
          reTranslateText={dialog.reTranslateText}
          isLastChat={isLastChat}
        />
        {isLastChat &&
          <button className={styles.button__audio} onClick={() => playAudio()}>
            <SpeechIcon color={styleGuide.grey600}/>
          </button>}
      </div>

      <div className={styles.wrap__bottom}>
        {dialog.language === Language.EN && <Bubble
          color={styleGuide.grey300}
          classname={`${styles.bubble__left} ${styles.bubble__tail}`}
        />}
        <ButtonWrap
          onTapEditButton={onTapEditButton}
          onTapFeedbackButton={onTapFeedbackButton}
          onTapDeleteButton={deleteLastDialog}
          isLastChat={isLastChat}
          language={dialog.language}
        />
        {dialog.language === Language.KO && <Bubble
          color={styleGuide.grey300}
          classname={`${styles.bubble__right} ${styles.bubble__tail}`}
        />}
      </div>
    </div>
  );
}

export default Chat;
