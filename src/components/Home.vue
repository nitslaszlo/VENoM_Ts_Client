<template>
  <div>
    <v-navigation-drawer
      fixed
      clipped
      app
      v-model="drawer"
    >
      <v-list dense>
        <template v-for="(item, ndx) in menuItems">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="ndx"
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" v-bind:key="ndx" no-action>
            <v-list-tile slot="item" @click="menuAction">
              <v-list-tile-action>
                <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="menuAction"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else @click="menuAction" v-bind:key="ndx">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="blue darken-3"
      dark
      app
      clipped-left
      fixed
    >
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? '' : 'min-width: 72px'" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-xs-only">Globomantics Rewards</span>
      </v-toolbar-title>
      <!-- <v-text-field
        light
        solo
        prepend-icon="search"
        placeholder="Search"
        style="max-width: 500px; min-width: 128px"
      ></v-text-field> -->
      <header-actions></header-actions>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout>
            <transactions></transactions>
        </v-layout>
      </v-container>
    </v-content>
    <edit-transaction></edit-transaction>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Transactions from "./Transactions.vue";
import EditTransactions from "./EditTransactions.vue";
import HeaderActions from "./HeaderActions.vue";

@Component({
  components: {
    Transactions,
    EditTransactions,
    HeaderActions
  }
})
export default class Home extends Vue {
  get isLoggedIn(): boolean {
    return this.$store.getters.isLoggedIn;
  }

  dialog: boolean = false;
  drawer: any = null;
  menuItems: any[] = [
    { icon: "contacts", text: "Add Transaction" },
    { icon: "history", text: "Current Month" },
    { icon: "content_copy", text: "Notes" },
    { icon: "settings", text: "Settings" },
    { icon: "chat_bubble", text: "Send feedback" },
    { icon: "help", text: "Help" }
  ];

  menuAction() {
    // TODO
  }

  showProfile(): void {
    console.log("show profile clicked!");
  }

  mounted() {
    console.log("Is user logged in? ", this.isLoggedIn);
    if (!this.isLoggedIn) {
      this.$router.push({ path: "/login" });
    }
  }
}
</script>
