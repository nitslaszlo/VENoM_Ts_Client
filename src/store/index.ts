import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { user } from "@/store/user";
import { transaction } from "@/store/transaction";
import { RootState } from "@/store/types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0.0", // a simple property
    userId: ""
  },
  modules: {
    user,
    transaction
  }
};

export default new Vuex.Store<RootState>(store);
