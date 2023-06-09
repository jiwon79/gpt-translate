import { atom, RecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";

export interface SpeechState {
  text: string;
  translateText: string;
  reTranslateText: string;
  ttsAudioUrl: string;
  language: Language;
}

const initialSpeechState = {
  text: '',
  translateText: '',
  reTranslateText: '',
  ttsAudioUrl: '',
  language: Language.EN,
}

export const speechState: RecoilState<SpeechState> = atom({
  key: 'speechState',
  default: initialSpeechState,
});
