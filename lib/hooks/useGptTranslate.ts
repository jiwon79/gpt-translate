import { useRecoilValue } from "recoil";
import { dialogListAtom } from "@/lib/recoil";
import Message from "@/lib/model/Message";
import chatAPI from "@/lib/api/chatAPI";

const useGptTranslate = () => {
  const dialogList = useRecoilValue(dialogListAtom);
  const translatePrompt = [
    new Message("system", "너는 번역 전문가야."),
    new Message("system", "한글을 입력하면 영어로, 영어를 입력하면 한글로 번역해줘."),

  ];

  const alternativeTranslatePrompt = [
    new Message("system", "너는 번역 전문가야."),
    new Message("system", "원문과 번역문을 입력하며, 너는 같은 뜻의 다른 번역문을 /로 구분하여 '2 개' 제시해줘. 원문과 같은 번역은 제시하지 마."),
    new Message("user", "Raw text : '안녕', Translate: 'Hello'"),
    new Message("assistant", "Hi / What's up"),
  ];

  const getAlternativeTranslate = async (text: string, translateText: string) => {
    const messages = [
      ...alternativeTranslatePrompt,
      new Message("user", `Raw text : ${text}, Translate : ${translateText}`),
    ];

    const response = await chatAPI.chat(messages);
    return response.message.content;
  }

  const translateUsingGpt = async (text: string) => {
    const messages = [
      ...translatePrompt,
      new Message("user", text),
    ];

    const response = await chatAPI.chat(messages);
    return response.message.content;
  }

  return {
    translateUsingGpt: translateUsingGpt,
    getAlternativeTranslate: getAlternativeTranslate,
  }
}

export default useGptTranslate;
