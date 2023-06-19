"use client"
import Header from "@/components/Header/Header";
import Interaction from "@/components/Interaction/Interaction";
import ChatWrap from "@/components/ChatWrap/ChatWrap";
import '@/lib/utils/prototype';

import styles from './page.module.scss';
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { headerAtom } from "@/lib/recoil";

const TranslatePage = () => {
  const setHeader = useSetRecoilState(headerAtom);
  useEffect(() => {
    setHeader({label: '대화', prevHref: '/'});
  }, [setHeader]);

  return (
    <div className={styles.container}>
      <ChatWrap/>
      <Interaction/>
      <Header/>
    </div>
  );
}

export default TranslatePage;
