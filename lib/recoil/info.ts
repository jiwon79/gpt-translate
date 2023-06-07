import { atom, RecoilState } from "recoil";

export interface InfoState {
  place: string;
  situation: string;
  isPolite: boolean;
}

const initialInfoState = {
  place: '',
  situation: '',
  isPolite: false,
}

export const infoState: RecoilState<InfoState> = atom({
  key: 'infoState', // unique ID (with respect to other atoms/selectors)
  default: initialInfoState, // default value (aka initial value)
});
