import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export enum BehaviorEnum {
  WAIT = 'WAIT',
  RECORD = 'RECORD',
  EDIT = 'EDIT',
}

export const behaviorAtom = atom({
  key: 'behavior',
  default: BehaviorEnum.WAIT,
  effects_UNSTABLE: [persistAtom],
});
