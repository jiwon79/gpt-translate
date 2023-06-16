import { useRecoilValue } from "recoil";
import Chat from "@/components/Chat/Chat";
import styles from './ChatWrap.module.scss';
import { infoAtom, dialogListAtom } from "@/lib/recoil";

const ChatWrap = () => {
  const dialogList = useRecoilValue(dialogListAtom);
  const info = useRecoilValue(infoAtom);

  return (
    <div className={styles.container}>
      <div className={styles.spacer}></div>
      <div className={styles.info__wrap}>
        <p className={styles.info__start}>대화를 시작했어요.</p>
        {info.place === ''
          ? <></>
          : <p className={styles.info__place}>장소 : {info.place}</p>}
        {info.situation === ''
          ? <></>
          : <p className={styles.info__situation}>상황 : {info.situation}</p>}
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
