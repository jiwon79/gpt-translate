"use client"
import Header from "@/components/Header/Header";
import { useRecoilState } from "recoil";
import { dialogListAtom } from "@/lib/recoil";
import { useEffect, useState } from "react";
import useGptTranslate from "@/lib/hooks/useGptTranslate";

const FeedbackPage = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getAlternativeTranslate } = useGptTranslate();
  console.log(dialogList);
  const lastDialog = dialogList[dialogList.length - 1];
  console.log(lastDialog);
  const { text, language } = lastDialog;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const alternativeTranslate = await getAlternativeTranslate(text, language);
      console.log(alternativeTranslate);
      console.log(alternativeTranslate.split("/"));

    })();
  }, [])

  return (
    <>
      <Header label={""} prevLabel={"피드백"} prevHref={"/translate"} />
      <p>{text}</p>
      <p>{language}</p>
      <p>이런 번역은 어떠세요?</p>
      <p>번역 요청 사항을 말하세요.</p>
    </>
  )
}

export default FeedbackPage;
