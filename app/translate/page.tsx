"use client"
import Header from "@/components/Header/Header";
import RecordInteraction from "@/components/RecordInteraction/RecordInteraction";
import ChatWrap from "@/components/ChatWrap/ChatWrap";
import '@/lib/utils/prototype';

import styles from './page.module.scss';

const TranslatePage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <ChatWrap />
      <RecordInteraction />
    </div>
  );
}

export default TranslatePage;
