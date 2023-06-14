import { useRecoilValue } from "recoil";
import Chat from "@/components/Chat/Chat";
import styles from './ChatWrap.module.scss';
import { infoAtom, dialogListAtom } from "@/lib/recoil";

const ChatWrap = () => {
  const dialogList = useRecoilValue(dialogListAtom);
  const info = useRecoilValue(infoAtom);

  return (
    <div>
      <div className={styles.info__wrap}>
        <p>대화를 시작했어요.</p>
        {info.place === '' ? <></> : <p>장소 : {info.place}</p>}
        {info.situation === '' ? <></> : <p>상황 : {info.situation}</p>}
      </div>
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
