import { useRecoilValue } from "recoil";
import { dialogListAtom } from "@/lib/recoil";
import Message from "@/lib/model/Message";
import chatAPI from "@/lib/api/chatAPI";
import { useState } from "react";
import { Language } from "@/lib/utils/constant";

const useGptTranslate = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const acceptFeedbackPrompt = (language: Language) => {
    const translateMessages = language === Language.KO
      ? [
        new Message("system", "한국어인 RAW TEXT 를 영어로 번역해줘."),
        new Message("system", "번역하여서 영어로 문장을 말하면 돼."),
      ]
      : [
        new Message("system", "영어인 RAW TEXT 를 한국어로 번역해줘."),
        new Message("system", "번역하여서 한국어로 문장을 말하면 돼."),
      ];

    return [
      new Message("system", "너는 번역 전문가야."),
      ...translateMessages,
      new Message("system", "RAW TEXT, TRANSLATE, FEEDBACK 을 입력하면 피드백을 반영하여 번역해줘."),
      new Message("user", "RAW TEXT : '메뉴얼을 받을 수 있을까요?'"),
      new Message("user", "TRANSLATE: 'Can I have a manual?'"),
      new Message("user", "FEEDBACK: '공손하게 번역해줘.'"),
      new Message("assistant", "Could you please give me a manual?"),
    ];
  }

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

  const acceptFeedback = async (text: string, translateText: string, feedback: string, language: Language) => {
    const messages = [
      ...acceptFeedbackPrompt(language),
      new Message("user", `RAW TEXT : '${text}'`),
      new Message("user", `TRANSLATE : '${translateText}'`),
      new Message("user", `FEEDBACK : ;${feedback};`),
    ];

    console.log(messages);
    const response = await chatAPI.chat(messages);
    return response.message.content;
  }

  return {
    translateUsingGpt: translateUsingGpt,
    getAlternativeTranslate: getAlternativeTranslate,
    acceptFeedback: acceptFeedback,
  }
}

export default useGptTranslate;
