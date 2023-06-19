import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface Header {
  label: string;
  prevHref?: string;
}

const initialHeader = {
  label: '대화',
  prevHref: '/',
}

export const headerAtom: RecoilState<Header> = atom({
  key: 'header',
  default: initialHeader,
  effects_UNSTABLE: [persistAtom],
});
