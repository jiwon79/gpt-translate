"use client"
import Header from "@/components/Header/Header";
import Interaction from "@/components/Interaction/Interaction";
import ChatWrap from "@/components/ChatWrap/ChatWrap";
import '@/lib/utils/prototype';

import styles from './page.module.scss';

const TranslatePage = () => {
  return (
    <div className={styles.container}>
      <ChatWrap />
      <Interaction />
      <Header />
    </div>
  );
}

export default TranslatePage;
