import { Dialog, dialogListAtom } from "@/lib/recoil/dialogList";
import { useRecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";
import { audioArrayToUrl, reverseLanguage } from "@/lib/utils/function";
import speechTextAPI from "@/lib/api/speechTextAPI";
import Message from "@/app/model/Message";
import chatAPI from "@/lib/api/chatAPI";
import { useRef } from "react";

const useDialog = () => {
  const [dialogList, setDialogList] = useRecoilState(dialogListAtom)
  const lastDialogRef = useRef<Dialog | null>(null);

  const _updateLastDialog = () => {
    if (lastDialogRef.current === null) return;

    setDialogList((dialogList) => [
      ...dialogList.slice(0, dialogList.length - 1),
      lastDialogRef.current!,
    ]);
  }

  const _createDialog = (dialog: Dialog) => {
    const newDialogList = [...dialogList, dialog];
    setDialogList(newDialogList);
  }

  const createEmptyDialog = (language : Language) => {
    const newDialog = {
      language: language,
      text: '',
      translateText: '',
      reTranslateText: '',
      ttsAudioUrl: '',
    }
    lastDialogRef.current = newDialog;

    _createDialog(newDialog);
  }

  const editLastDialog = (text: string) => {
    if (dialogList.length === 0) return;
    lastDialogRef.current = dialogList[dialogList.length - 1];
    lastDialogRef.current = {
      ...lastDialogRef.current,
      text: text,
      translateText: '',
      reTranslateText: '',
      ttsAudioUrl: '',
    }
    _updateLastDialog();
    translateText(text);
  }

  const deleteLastDialog = () => {
    if (dialogList.length === 0) return;
    const newDialogList = dialogList.slice(0, dialogList.length - 1);
    setDialogList(newDialogList);
    lastDialogRef.current = null;
  }

  const fetchChat = async (text: string) => {
    const messages = [
      new Message("system", "너는 번역 전문가야."),
      new Message("system", "한글을 입력하면 영어로, 영어를 입력하면 한글로 번역해줘."),
      new Message("user", text),
    ];

    return await chatAPI.chat(messages);
  }

  const translateText = async (text: string) => {
    if (text.isBlank()) {
      return;
    }
    if (lastDialogRef.current == null) return;
    const language = lastDialogRef.current.language;
    const reversedLanguage = reverseLanguage(language);
    lastDialogRef.current = {
      ...lastDialogRef.current,
      text: text,
    }
    _updateLastDialog();

    const chatResult = await fetchChat(text);
    const translateText = chatResult.message.content;
    lastDialogRef.current = {
      ...lastDialogRef.current,
      translateText: translateText,
    }
    _updateLastDialog();

    const ttsResponse = await speechTextAPI.tts(translateText, reversedLanguage);
    lastDialogRef.current = {
      ...lastDialogRef.current,
      ttsAudioUrl: audioArrayToUrl(ttsResponse.audioContent.data),
    }
    _updateLastDialog();

    const reTranslateResponse = await speechTextAPI.translate(translateText, language);
    lastDialogRef.current = {
      ...lastDialogRef.current,
      reTranslateText: reTranslateResponse.result,
    }
    _updateLastDialog();
  }

  return {
    dialogList: dialogList,
    createEmptyDialog: createEmptyDialog,
    translateText: translateText,
    editLastDialog: editLastDialog,
    deleteLastDialog: deleteLastDialog,
  }
}

export default useDialog;
