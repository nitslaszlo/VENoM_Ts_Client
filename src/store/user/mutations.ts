import { MutationTree } from "vuex";
import { UserState, User } from "./types";
// import { stat } from "fs";

export const mutations: MutationTree<UserState> = {
  logInUser(state, payload) {
    state.user!.email = payload.email;
    state.user!.first = payload.first;
    state.user!.last = payload.last;
    state.user!.userId = payload.userId;
    state.isLoggedIn = true;
    state.error = false;
    state.errorMsg = "";
  },
  loginError(state) {
    state.isLoggedIn = false;
    state.error = true;
    state.errorMsg = "Email and/or Password are invalid. Login failed.";
  }
};
