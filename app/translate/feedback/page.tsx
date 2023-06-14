"use client"
import Header from "@/components/Header/Header";
import { useRecoilState } from "recoil";
import { dialogListAtom } from "@/lib/recoil";

const FeedbackPage = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const lastDialog = dialogList[dialogList.length - 1];
  const { text, language } = lastDialog;

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
