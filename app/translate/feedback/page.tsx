"use client"
import Header from "@/components/Header/Header";
import { useRecoilState } from "recoil";
import { dialogListAtom } from "@/lib/recoil";
import { useEffect, useState } from "react";
import useGptTranslate from "@/lib/hooks/useGptTranslate";
import speechTextAPI from "@/lib/api/speechTextAPI";

interface AlternativeTranslate {
  translateText: string;
  reTranslateText: string;
}

const FeedbackPage = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getAlternativeTranslate } = useGptTranslate();
  const [alternativeTranslates, setAlternativeTranslates] = useState<AlternativeTranslate[]>([
    {translateText: "", reTranslateText: ""},
    {translateText: "", reTranslateText: ""},
  ]);
  const lastDialog = dialogList[dialogList.length - 1];
  const { text, language } = lastDialog;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const alternativeTranslate = await getAlternativeTranslate(text, language);
      const alternativeTranslateTexts = alternativeTranslate.split("/");
      const reTranslateTexts = await Promise.all(alternativeTranslateTexts.map(async (text) => {
        const response =  await speechTextAPI.translate(text, language);
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
    })();
  }, [getAlternativeTranslate, language, text])

  return (
    <>
      <Header label={""} prevLabel={"피드백"} prevHref={"/translate"} />
      <p>{text}</p>
      <p>{language}</p>
      {alternativeTranslates.map((alternativeTranslate, index) => {
        return (
          <div key={index}>
            <p>{alternativeTranslate.translateText}</p>
            <p>{alternativeTranslate.reTranslateText}</p>
          </div>
        )
      })}
      <p>이런 번역은 어떠세요?</p>
      <p>번역 요청 사항 입력하기</p>
      <input type="text"/>
      <button>녹음</button>
    </>
  )
}

export default FeedbackPage;
