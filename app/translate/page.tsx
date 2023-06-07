"use client"
import styles from './page.module.scss';
import '@/lib/utils/prototype';
import Header from "@/components/Header/Header";
import RecordButtonWrap from "@/components/RecordButtonWrap/RecordButtonWrap";

const TranslatePage = () => {
  return (
    <>
      <Header label={"대화"} prevLabel={"상황 변경"} prevHref={"/"} />
      <main className={styles.main}>
        <RecordButtonWrap />
      </main>
    </>
  );
}

export default TranslatePage;
