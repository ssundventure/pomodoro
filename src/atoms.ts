import { atom } from "recoil";

//4 round = 1 goal
export const roundAtom = atom({
  key: "round",
  default: 0,
});

export const goalAtom = atom({
    key: "goal",
    default: 0,
  });