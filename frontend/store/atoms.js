import { atom } from "jotai/vanilla";

export const tokenAtom = atom(localStorage.getItem("token", ""));
