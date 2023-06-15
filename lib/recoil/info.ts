import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Info {
  place: string;
  situation: string;
  isPolite: boolean;
}

const initialInfo = {
  place: '',
  situation: '',
  isPolite: false,
}

export const infoAtom: RecoilState<Info> = atom({
  key: 'info',
  default: initialInfo,
  effects_UNSTABLE: [persistAtom],
});
