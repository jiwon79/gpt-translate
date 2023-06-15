"use client"
import Link from "next/link";

import TextInput from "@/components/TextInput/TextInput";
import ToggleInput from "@/components/ToggleInput/ToggleInput";
import { useRecoilState } from "recoil";
import { infoAtom } from "@/lib/recoil";
import { ChangeEvent } from "react";

import styles from './page.module.scss';

const Home = () => {
  const [info, setInfo] = useRecoilState(infoAtom);
  const handlePlace = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({...info, place: e.target.value});
  }

  const deletePlace = () => {
    setInfo({...info, place: ''});
  }

  const handleSituation = (e: ChangeEvent<HTMLInputElement>) => {
    setInfo({...info, situation: e.target.value});
  }

  const deleteSituation = () => {
    setInfo({...info, situation: ''});
  }

  const handlePolite = () => {
    setInfo({...info, isPolite: !info.isPolite});
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>어떤 상황이신가요?</p>
      <p className={styles.desc}>
        장소와 상황을 입력하면 더 정확한<br/>
        번역 결과를 얻을 수 있어요.
      </p>
      <TextInput
        label={"장소"}
        placeholder={'대화가 진행되는 장소를 입력해 주세요.'}
        value={info.place}
        onChange={handlePlace}
        deleteAction={deletePlace}
      />
      <TextInput
        label={"상황"}
        placeholder={'대화 상황을 간단히 설명해 주세요.'}
        value={info.situation}
        onChange={handleSituation}
        deleteAction={deleteSituation}
      />
      <ToggleInput label={"높임말"} checked={info.isPolite} onChange={handlePolite}/>
      <div className={styles.spacer}/>
      <Link href={"/translate"} className={styles.link__start}>
        <p>시작하기</p>
      </Link>
    </div>
  )
}

export default Home;
