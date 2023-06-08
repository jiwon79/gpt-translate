import { atom, RecoilState } from "recoil";
import { Language } from "@/lib/utils/constant";

export interface SpeechState {
  audioUrl: string;
  text: string;
  ttsAudioUrl: string;
  language: Language;
}

const initialSpeechState = {
  audioUrl: '',
  text: '',
  ttsAudioUrl: '',
  language: Language.EN,
}

export const speechState: RecoilState<SpeechState> = atom({
  key: 'speechState',
  default: initialSpeechState,
});
