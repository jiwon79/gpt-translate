"use client"
import styles from './page.module.scss';
import '@/lib/utils/prototype';
import Header from "@/components/Header/Header";
import RecordInteraction from "@/components/RecordInteraction/RecordInteraction";

const TranslatePage = () => {
  return (
    <>
      <Header label={"대화"} prevLabel={"상황 변경"} prevHref={"/"} />
      <main className={styles.main}>
        <RecordInteraction />
      </main>
    </>
  );
}

export default TranslatePage;
