<template>
  <div class="d-flex align-center" style="margin-left: auto">
    <v-menu open-on-hover bottom offset-y>
      <v-btn icon slot="activator">
        <v-icon>person</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile v-on:click="showProfile">
          <v-list-tile-action>
            <v-icon>assignment</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Show Profile</v-list-tile-title>
        </v-list-tile>
        <v-list-tile v-on:click="logOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Log Out</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

    <v-btn icon>
      <v-icon>notifications</v-icon>
    </v-btn>

    <v-dialog v-model="profileDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field label="First name" v-model="user.first" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field label="Last name" v-model="user.last" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Email" v-model="user.email" hint="This is also your login username" persistent-hint required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password" v-model="user.password" type="password" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Verify Password" v-model="user.verfiyPassword" type="password"
                  hint="When changing your password, please enter twice" persistent-hint
                  :rules="[
                    () => user.password == user.verfiyPassword || 'Passwords entered do not match'
                  ]"
                  required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="profileDialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="saveProfile">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { UserState } from "../store/user/types";
const namespace: string = "user";

@Component
export default class HeaderActions extends Vue {
  @Action("updateUserProfile", { namespace })
  updateUserProfile: any;
  @Getter("userObj", { namespace })
  userObj: any;
  profileDialog: boolean = false;
  user: any = {
    first: "",
    last: "",
    email: "",
    password: "",
    verfiyPassword: "",
    isActive: true
  };

  showProfile(): void {
    this.profileDialog = true;
  }

  saveProfile(): void {
    let vm = this;
    this.updateUserProfile(this.user).then(() => {
      vm.user.password = "";
      vm.user.verfiyPassword = "";
    });
    this.profileDialog = false;
  }

  logOut(): void {
    // TODO
    console.log("User logout requested...");
  }

  mounted() {
    // const loggedInUser = this.$store.state.user;
    const loggedInUser = this.userObj;
    this.user.first = loggedInUser.first;
    this.user.last = loggedInUser.last;
    this.user.email = loggedInUser.email;
  }
}
</script>

<style>
</style>
