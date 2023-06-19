"use client"
import { useRecoilValue } from "recoil";
import Chat from "@/components/Chat/Chat";
import styles from './ChatWrap.module.scss';
import { infoAtom, dialogListAtom } from "@/lib/recoil";
import { useEffect, useRef } from "react";

const ChatWrap = () => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const dialogList = useRecoilValue(dialogListAtom);
  const info = useRecoilValue(infoAtom);

  useEffect(() => {

    if (dialogRef.current) {
      dialogRef.current.scrollTo({
        top: dialogRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  });

  return (
    <div className={styles.container} ref={dialogRef}>
      <div className={styles.spacer}></div>
      <div className={styles.info__wrap}>
        <p className={styles.info__start}>대화를 시작했어요.</p>
        {info.place === ''
          ? <></>
          : <p className={styles.info__place}>장소 : {info.place}</p>}
        {info.situation === ''
          ? <></>
          : <p className={styles.info__situation}>상황 : {info.situation}</p>}
        {info.isPolite
          ? <p className={styles.info__polite}>높임말 : 사용</p>
          : <p className={styles.info__polite}>높임말 : 미사용</p>}
      </div>
      <div>
        {dialogList.map((dialog, index) => (
          <Chat
            key={index}
            dialog={dialog}
            isLastChat={index === dialogList.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatWrap;
