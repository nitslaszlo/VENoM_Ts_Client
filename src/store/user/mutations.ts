import { MutationTree } from "vuex";
import { UserState, User } from "./types";
// import { stat } from "fs";

export const mutations: MutationTree<UserState> = {
  logInUser(state, payload) {
    console.log("in logInUser mutation");
    console.log(state.user);
    state.user!.email = payload.email;
    state.user!.first = payload.first;
    state.user!.last = payload.last;
    state.user!.userId = payload.userId;
    console.log(state.user);
    state.isLoggedIn = true;
    console.log(state.isLoggedIn);
    state.error = false;
    state.errorMsg = "";
  },
  loginError(state) {
    console.log("in loginError mutation");
    state.isLoggedIn = false;
    state.error = true;
    state.errorMsg = "Email and/or Password are invalid. Login failed.";
  }
};
