import { atom, RecoilState } from "recoil";

export enum BehaviorEnum {
  WAIT = 'WAIT',
  RECORD = 'RECORD',
  EDIT = 'EDIT',
}

export const behaviorAtom = atom({
  key: 'behavior',
  default: BehaviorEnum.WAIT,
});
