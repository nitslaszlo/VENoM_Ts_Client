import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";
// import { state } from "@/store/user";
// import { stat } from "fs";

export const getters: GetterTree<UserState, RootState> = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.user!.userId,
  loginError: state => state.errorMsg
};
