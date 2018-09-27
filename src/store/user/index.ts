import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { UserState } from "./types";
import { User } from "./types";
import { RootState } from "../types";

export const state: UserState = {
  user: { email: "", userId: "", first: "", last: "" },
  isLoggedIn: false,
  error: false,
  errorMsg: ""
};

const namespaced: boolean = true;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
