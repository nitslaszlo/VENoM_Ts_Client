import { ActionTree } from "vuex";
import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { UserState, User } from "./types";
import { RootState } from "../types";
import bcrypt from "bcryptjs";
// import * as https from "https";
// import { Certificate } from "crypto";

export const actions: ActionTree<UserState, RootState> = {
  async logInUser({ commit, state, rootState }, payload) {
    console.log("logInUser - before get");

    // const agent = new https.Agent({
    //   rejectUnauthorized: false
    // });

    // let axiosConfig: AxiosRequestConfig = {
    //   httpsAgent: agent
    // };
    await axios
      .get("https://localhost:3000/user/email/" + payload.email)
      .then(resp => {
        console.log("logInUser - after get");
        let data = resp.data;
        console.log(data);

        if (data && data.length > 0) {
          // Test password entered (payload) against user object
          const pwdHash = data[0].password;
          if (bcrypt.compareSync(payload.password, pwdHash)) {
            // if (payload.password == data[0].password) {
            const user = data[0];
            payload.userId = user._id;
            payload.first = user.first;
            payload.last = user.last;
            payload.email = user.email;
            rootState.userId = user._id; // lehet nem kell
            console.log(payload.password);
            console.log(data[0].password);
            commit("logInUser", payload);
          } else {
            commit("loginError");
          }
        }
      })
      .catch(() => {
        commit("loginError");
      });
  },

  async loadUserProfile({ commit, state, rootState }) {
    // get the user object for the currently logged in user...
    await axios
      .get("https://localhost:3000/user/" + rootState.userId)
      .then(resp => {
        let data = resp.data;
        console.log("loadUserProfile data:", data);
      });
  },

  async updateUserProfile({ commit, rootState }, payload) {
    // TODO: encrypt the user's password
    let simplePassword: string = payload.password;
    await bcrypt.hash(payload.password, 8, (err, hash) => {
      if (!err) {
        payload.password = hash;
        console.log("password hash: ", payload.password);
        axios
          .put("https://localhost:3000/user/" + rootState.userId, payload)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
    payload.password = simplePassword;
  }
};
