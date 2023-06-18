"use client"
import Header from "@/components/Header/Header";
import { useEffect, useState } from "react";
import useGptTranslate from "@/lib/hooks/useGptTranslate";
import speechTextAPI from "@/lib/api/speechTextAPI";
import useDialog from "@/lib/hooks/useDialog";
import { Language } from "@/lib/utils/constant";
import { Dialog } from "@/lib/recoil/dialogList";
import styles from './page.module.scss';
import AlternativeTranslate from "@/lib/model/AlternativeTranslate";
import AlternativeWrap from "@/components/AlternativeWrap/AlternativeWrap";
import RecordFeedback from "@/components/RecordFeedback/RecordFeedback";
import Image from "next/image";

const FeedbackPage = () => {
  const {dialogList, acceptTranslateFeedback} = useDialog();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {getAlternativeTranslate, acceptFeedback} = useGptTranslate();
  const [alternativeTranslates, setAlternativeTranslates] = useState<AlternativeTranslate[]>([
    {translateText: "", reTranslateText: ""},
    {translateText: "", reTranslateText: ""},
  ]);
  const lastDialog: Dialog = dialogList.length > 0 ? dialogList[dialogList.length - 1] : {
    text: "",
    translateText: "",
    language: Language.KO,
    reTranslateText: "",
    ttsAudioUrl: "",
  };
  const {text, translateText, language} = lastDialog;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const alternativeTranslate = await getAlternativeTranslate(text, translateText);
      const alternativeTranslateTexts = alternativeTranslate.split("/");
      const reTranslateTexts = await Promise.all(alternativeTranslateTexts.map(async (text) => {
        const response = await speechTextAPI.translate(text, language);
        return response.result
      }));
      if (alternativeTranslateTexts.length !== reTranslateTexts.length) return;
      const alternativeTranslatesResult = alternativeTranslateTexts.map((translateText, index) => {
        return {
          translateText,
          reTranslateText: reTranslateTexts[index],
        }
      });
      setAlternativeTranslates(alternativeTranslatesResult);
      setIsLoading(false);
    })();
  }, [])

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.model}>
        <Image
          className={styles.loading}
          src={"/loading-gif.gif"}
          width={40}
          height={40}
          alt={"loading"}
        />
      </div>}

      <Header/>
      <p className={styles.title}>이런 번역은 어떠세요?</p>
      <p className={styles.sub__title}>원하는 번역을 클릭해주세요.</p>
      <p className={styles.text__raw}>(원문 : {text})</p>
      <AlternativeWrap alternativeTranslates={alternativeTranslates} />

      <div className={styles.bottom}>
        <p className={styles.sub__title}>또는</p>
        <p className={styles.title}>번역 요청 사항 입력하기</p>
      </div>
      <RecordFeedback setIsLoading={setIsLoading} />
    </div>
  )
}

export default FeedbackPage;
