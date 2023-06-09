"use client"
import styles from './page.module.scss';
import '@/lib/utils/prototype';
import Header from "@/components/Header/Header";
import RecordInteraction from "@/components/RecordInteraction/RecordInteraction";
import { speechState } from "@/lib/recoil";
import { useRecoilState } from "recoil";
import Chat from "@/components/Chat/Chat";

const TranslatePage = () => {
  const [speech, setSpeech] = useRecoilState(speechState);

  return (
    <>
      <Header label={"대화"} prevLabel={"상황 변경"} prevHref={"/"} />
      <main className={styles.main}>
        <Chat speech={speech} />
        <RecordInteraction />
      </main>
    </>
  );
}

export default TranslatePage;
