import { atom, RecoilState } from "recoil";

export interface AudioState {
  audioUrl: string;
  language: string;
}

const initialAudioState = {
  audioUrl: '',
  language: '',
}

export const audioState: RecoilState<AudioState> = atom({
  key: 'audioState',
  default: initialAudioState,
});
