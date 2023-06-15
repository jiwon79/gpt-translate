import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Language } from "@/lib/utils/constant";

const { persistAtom } = recoilPersist();

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
  effects_UNSTABLE: [persistAtom],
});
