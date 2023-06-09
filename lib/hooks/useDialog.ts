import { Dialog, dialogListAtom } from "@/lib/recoil/dialogList";
import { useRecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";
import { audioArrayToUrl } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import Message from "@/app/model/Message";
import chatAPI from "@/lib/api/chatAPI";

const useDialog = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const setLastDialog = (dialog: Dialog) => {
    const beforeLastDialogList = dialogList.slice(0, dialogList.length - 1);
    const newDialogList = [...beforeLastDialogList, dialog];
    setDialogList(newDialogList);
  }

  const createDialog = (dialog: Dialog) => {
    const newDialogList = [...dialogList, dialog];
    setDialogList(newDialogList);
  }

  const fetchChat = async (text: string) => {
    const messages = [
      new Message("system", "너는 번역 전문가야."),
      new Message("system", "한글을 입력하면 영어로, 영어를 입력하면 한글로 번역해줘."),
      new Message("user", text),
    ];

    return await chatAPI.chat(messages);
  }

  const translateText = async (text: string, language: Language) => {
    if (text.isBlank()) {
      return;
    }

    createDialog({
      language: language,
      text: text,
      translateText: '',
      reTranslateText: '',
      ttsAudioUrl: '',
    });

    const chatResult = await fetchChat(text);
    const translateText = chatResult.message.content;

    setLastDialog({
      ...dialogList.at(-1)!,
      translateText: translateText,
    });

    const ttsResponse = await speechTextAPI.tts(translateText);
    const ttsAudioUrl = audioArrayToUrl(ttsResponse.audioContent.data);

    setLastDialog({
      ...dialogList.at(-1)!,
      ttsAudioUrl: ttsAudioUrl,
    });

    const reTranslateResponse = await speechTextAPI.translate(translateText, language);
    setLastDialog({
      ...dialogList.at(-1)!,
      reTranslateText: reTranslateResponse.result,
    });
  }

  return {
    translateText: translateText,
  }
}

export default useDialog;
