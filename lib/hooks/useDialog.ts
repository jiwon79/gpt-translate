import { Dialog, dialogListAtom } from "@/lib/recoil/dialogList";
import { useRecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";
import { audioArrayToUrl } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import Message from "@/app/model/Message";
import chatAPI from "@/lib/api/chatAPI";
import { useRef } from "react";

const useDialog = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const lastDialogRef = useRef<Dialog | null>(null);

  const updateLastDialog = () => {
    if (lastDialogRef.current === null) return;

    setDialogList((dialogList) => [
      ...dialogList.slice(0, dialogList.length - 1),
      lastDialogRef.current!,
    ]);
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

    const newDialog = {
      language: language,
      text: text,
      translateText: '',
      reTranslateText: '',
      ttsAudioUrl: '',
    };
    lastDialogRef.current = newDialog;
    createDialog(newDialog);

    const chatResult = await fetchChat(text);
    const translateText = chatResult.message.content;
    lastDialogRef.current = {
      ...lastDialogRef.current,
      translateText: translateText,
    }
    updateLastDialog();

    const ttsResponse = await speechTextAPI.tts(translateText);
    lastDialogRef.current = {
      ...lastDialogRef.current,
      ttsAudioUrl: audioArrayToUrl(ttsResponse.audioContent.data),
    }
    updateLastDialog();

    const reTranslateResponse = await speechTextAPI.translate(translateText, language);
    lastDialogRef.current = {
      ...lastDialogRef.current,
      reTranslateText: reTranslateResponse.result,
    }
    updateLastDialog();
  }

  return {
    translateText: translateText,
  }
}

export default useDialog;
