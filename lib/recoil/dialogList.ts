import { atom, RecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";

export interface Dialog {
  language: Language,
  text: string,
  translateText: string,
  reTranslateText: string,
  ttsAudioUrl: string,
}

const initialDialogList: Dialog[] = [];

export const dialogListAtom: RecoilState<Dialog[]> = atom({
  key: 'dialogList',
  default: initialDialogList,
});
