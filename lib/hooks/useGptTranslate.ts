import { useRecoilValue } from "recoil";
import { dialogListAtom, infoAtom } from "@/lib/recoil";
import Message from "@/lib/model/Message";
import chatAPI from "@/lib/api/chatAPI";
import { Language } from "@/lib/utils/constant";

const useGptTranslate = () => {
  const dialogList = useRecoilValue(dialogListAtom);
  const info = useRecoilValue(infoAtom);

  const dialogPrompt = dialogList
    .map((dialog) => `${dialog.language === Language.KO ? "KO" : "EN"} :  ${dialog.text}\n`)
    .join("");
  const dialogPromptMessages = [
    new Message("system", "Below is the conversation so far, please use it as a guide and translate it into context."),
    new Message("system", "Conversation script so far\n" + dialogPrompt),
  ];

  const infoPrompt = new Message("system", `You are translating in the following situations.\nPlace : ${info.place}, Situation : ${info.situation}, Politeness : ${info.isPolite ? "Polite" : "Casual"}`);

  const translatePrompt = [
    new Message("system", "You're a translation expert."),
    infoPrompt,
    ...dialogPromptMessages,
    new Message("system", "Translate Korean to English and English to Korean. Don't say anything else, just tell me the result of the translation."),
    new Message("user", "안녕"),
    new Message("assistant", "Hello"),
    new Message("user", "내 이름은 레오야."),
    new Message("assistant", "My Name is Leo."),
    new Message("user", "How are you?"),
    new Message("assistant", "오늘 어때?"),
  ];

  const alternativeTranslateInput = (text: string, translateText: string, target: Language) => {
    switch (target) {
      case Language.KO:
        return `Give me two translations of the sentence "${text}" in English, separated by /, except for the translation (${translateText})`;
      case Language.EN:
        return `Give me two translations of the sentence "${text}" in Korean, separated by '/', except for the translation (${translateText})`;
    }
  }

  const alternativeTranslatePrompt = (target: Language) => {
    const defaultPromptMessages = [
      new Message("system", "You're a translation expert."),
      infoPrompt,
      ...dialogPromptMessages,
      new Message("system", "Enter the 'RAW TEXT' and 'TRANSLATION', and provide 'TWO' different translations of the same meaning of RAW TEXT, separated by /."),
      new Message("system", "Do not provide the same translation as the original."),
    ];

    switch (target) {
      case Language.KO:
        return [
          ...defaultPromptMessages,
          new Message("user", alternativeTranslateInput("How are you?", "오늘 어때?", Language.KO)),
          new Message("assistant", "오늘 기분 어때? / 오늘 어떠니?"),
          new Message("user", alternativeTranslateInput("My name is Jiwon", "내 이름은 지원이야.", Language.KO)),
          new Message("assistant", "나는 지원이야. / 나는 지원이라고 불려."),
        ];
      case Language.EN:
        return [
          ...defaultPromptMessages,
          new Message("user", alternativeTranslateInput("안녕", "Hello", Language.EN)),
          new Message("assistant", "Hi / What's up"),
          new Message("user", alternativeTranslateInput("내 이름은 레오야.", "My Name is Leo.", Language.EN)),
          new Message("assistant", "I'm called Leo. / I'm Leo."),
        ];
    }
  };

  const acceptFeedbackPrompt = (language: Language) => {
    const translateMessages = language === Language.KO
      ? [
        new Message("system", "Translate 'RAW TEXT' from Korean to English."),
        new Message("system", "Speak the English translation without additional sentences and answers."),
      ]
      : [
        new Message("system", "Translate 'RAW TEXT' from English to Korean.."),
        new Message("system", "Speak the Korean translation without additional sentences and answers."),
      ];

    return [
      new Message("system", "You're a translation expert."),
      infoPrompt,
      ...dialogPromptMessages,
      ...translateMessages,
      new Message("system", "If user input RAW TEXT, TRANSLATE, FEEDBACK, assistant will translate with FEEDBACK."),
      new Message("user", "RAW TEXT : '메뉴얼을 받을 수 있을까요?'"),
      new Message("user", "TRANSLATE: 'Can I have a manual?'"),
      new Message("user", "FEEDBACK: '공손하게 번역해줘.'"),
      new Message("assistant", "Could you please give me a manual?"),
      new Message("user", "RAW TEXT: 'My name is Leo.'"),
      new Message("user", "TRANSLATE: '내 이름은 레오 입니다.'"),
      new Message("user", "FEEDBACK: '조금 더 친근하게 번역해줘.'"),
      new Message("assistant", "내 이름은 레오야."),
    ];
  }

  const getAlternativeTranslate = async (text: string, translateText: string, target: Language) => {
    const messages = [
      ...alternativeTranslatePrompt(target),
      new Message("user", alternativeTranslateInput(text, translateText, target)),
    ];
    console.log(messages)

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
