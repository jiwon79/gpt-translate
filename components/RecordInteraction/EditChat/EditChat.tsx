import { ChangeEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

import SendIcon from "@/components/Svg/Send";
import useDialog from "@/lib/hooks/useDialog";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import styles from "./EditChat.module.scss";

const EditChat = () => {
  const [text, setText] = useState<string | null>(null)
  const {dialogList, editLastDialog} = useDialog();
  const setBehavior = useSetRecoilState(behaviorAtom);

  const getLastText = () => {
    return dialogList[dialogList.length - 1].text;
  }

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const completeEdit = () => {
    editLastDialog(text ?? '');
    setBehavior(BehaviorEnum.WAIT);
  }

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        onChange={handleText}
        value={text ?? getLastText()}
      />
      <button
        onClick={completeEdit}
        className={`${styles.button} ${text !== '' ? styles.active : ''}`}
      >
        <SendIcon />
      </button>
    </div>
  )
}

export default EditChat
