import { ActionTree } from "vuex";
import axios from "axios";
import { UserState, User } from "./types";
import { RootState } from "../types";
import bcrypt from "bcryptjs";

export const actions: ActionTree<UserState, RootState> = {
  async logInUser({ commit, state, rootState }, payload) {
    console.log("logInUser - before get");
    let axiosConfig = {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    await axios
      .get("http://localhost:3000/user/email/" + payload.email, axiosConfig)
      .then(resp => {
        console.log("logInUser - after get");
        let data = resp.data;

        if (data && data.length > 0) {
          // Test password entered (payload) against user object
          // const pwdHash = data[0].password;
          // if (bcrypt.compareSync(payload.password, pwdHash)) {
          if (payload.password == data[0].password) {
            const user = data[0];
            payload.userId = user._id;
            payload.first = user.first;
            payload.last = user.last;
            payload.email = user.email;
            // rootState.userId = user._id; // lehet nem kell
            console.log(payload.password);
            console.log(data[0].password);
            console.log("before logInUser mutation");
            commit("logInUser", payload);
          } else {
            console.log("before logInError mutation");
            commit("loginError");
          }
        }
      })
      .catch(() => {
        console.log("before catch logInError mutation");
        // commit("loginError");
      });
  },

  async loadUserProfile({ commit }) {
    // get the user object for the currently logged in user...
    await axios.get("http://localhost:3000/user/" + this.userId).then(resp => {
      let data = resp.data;
      console.log("loadUserProfile data:", data);
    });
  },

  updateUserProfile({ commit }, payload) {
    // TODO: encrypt the user's password
    bcrypt.hash(payload.password, 8, (err, hash) => {
      if (!err) {
        payload.password = hash;
        console.log("password hash: ", payload.password);
        axios
          .put("http://localhost:3000/user/" + this.userId, payload)
          .then(resp => {
            console.log(resp);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  }
};
