import { ChangeEvent, useState } from "react";

import useDialog from "@/lib/hooks/useDialog";
import { behaviorAtom, BehaviorEnum } from "@/lib/recoil/behavior";
import { useSetRecoilState } from "recoil";

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
    <div>
      <input type="text" onChange={handleText} value={text ?? getLastText()} />
      <button onClick={() => completeEdit()}>완료</button>
    </div>
  )
}

export default EditChat
