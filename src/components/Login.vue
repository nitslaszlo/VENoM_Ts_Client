<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Login to Globomantics</h2>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="E-mail"
          v-model="email"
          v-bind:rules="emailRules"
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="Password"
          v-model="password"
          v-bind:rules="passwordRules"
          type="password"
          required>
        </v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" v-on:click="login()">Login</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar
      :timeout="6000"
      :top="true"
      v-model="showAlert"
    >
      {{ loginError }}
      <v-btn flat color="pink" v-on:click="showAlert = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { UserState } from "../store/user/types";
const namespace: string = "user";

@Component
export default class Login extends Vue {
  @State("user") profile: UserState;
  @Action("logInUser", { namespace })
  logInUser: any;
  @Getter("isLoggedIn", { namespace })
  isLoggedIn: boolean;
  @Getter("loginError", { namespace })
  loginError: boolean;

  showAlert: boolean = false;
  message: string = "";
  email: string = "nitslaszlo@gmail.com";
  emailRules: any[] = [
    (v: any) => !!v || "E-mail is required",
    (v: any) =>
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
      "E-mail must be valid"
  ];

  password: string = "Abc123456";
  passwordRules: any[] = [(v: any) => !!v || "Password is required"];

  // get isLoggedIn(): boolean {
  //   return this.$store.getters.isLoggedIn;
  // }

  // get loginError(): string {
  //   return this.$store.getters.loginError;
  // }

  login(): void {
    console.log("Login called!");
    const payload = {
      email: this.email,
      password: this.password
    };
    this.logInUser(payload).then(() => {
      console.log(this.isLoggedIn);
      if (this.isLoggedIn) {
        this.$router.push({ path: "/" });
      } else {
        this.showAlert = true;
      }
    });
  }

  cancel(): void {
    console.log("The user does not want to login!");
  }
}
</script>

<style>
</style>
