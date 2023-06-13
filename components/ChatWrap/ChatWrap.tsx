import Chat from "@/components/Chat/Chat";
import { dialogListAtom } from "@/lib/recoil/dialogList";
import styles from './ChatWrap.module.scss';
import { useRecoilValue } from "recoil";

const ChatWrap = () => {
  const dialogList = useRecoilValue(dialogListAtom);

  return (
    <div>
      {dialogList.map((dialog, index) => (
        <Chat key={index} dialog={dialog} />
      ))}
    </div>
  );
}

export default ChatWrap;
