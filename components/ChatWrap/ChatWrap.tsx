import Chat from "@/components/Chat/Chat";
import { dialogListAtom } from "@/lib/recoil/dialogList";
import styles from './ChatWrap.module.scss';
import { useRecoilValue } from "recoil";

const ChatWrap = () => {
  const dialogList = useRecoilValue(dialogListAtom);

  return (
    <div>
      {dialogList.map((dialog, index) => (
        <Chat
          key={index}
          dialog={dialog}
          isLastChat={index === dialogList.length - 1}
        />
      ))}
    </div>
  );
}

export default ChatWrap;
