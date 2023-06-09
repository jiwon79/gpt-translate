"use client"
import styles from './page.module.scss';
import '@/lib/utils/prototype';
import Header from "@/components/Header/Header";
import RecordInteraction from "@/components/RecordInteraction/RecordInteraction";
import { speechState } from "@/lib/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import Chat from "@/components/Chat/Chat";
import { dialogListAtom } from "@/lib/recoil/dialogList";

const TranslatePage = () => {
  const [speech, setSpeech] = useRecoilState(speechState);
  const dialogList = useRecoilValue(dialogListAtom);

  return (
    <>
      <Header label={"대화"} prevLabel={"상황 변경"} prevHref={"/"} />
      <main className={styles.main}>
        {dialogList.map((dialog, index) => (
          <Chat key={index} dialog={dialog} />
        ))}
        <RecordInteraction />
      </main>
    </>
  );
}

export default TranslatePage;
