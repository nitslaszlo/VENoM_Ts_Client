import { ActionTree } from "vuex";
import axios from "axios";
import { TransactionState, Transaction } from "./types";
import { RootState } from "../types";

export const actions: ActionTree<TransactionState, RootState> = {
  getTransactionsByMonth({ commit, state, rootState }, payload) {
    // Make API call... Pass in selected Month and Year + UserId in hearder...
    // Once transaction data is retrieved... commit the mutation to update state...

    axios
      .get(
        "http://localhost:3000/transaction/" +
          state.currentYear +
          "/" +
          state.currentMonth,
        {
          headers: { userId: rootState.userId }
        }
      )
      .then(resp => {
        let data = resp.data;
        if (data && data.length > 0) {
          commit("transactionsByMonth", data);
        }
      })
      .catch(err => {
        console.log(
          "Darn! There was an error getting transactions by month: " + err
        );
      });
  },
  getPreviousMonthsBalances({ commit, state, rootState }, payload) {
    commit("transactionsByMonth", []);
    // Make API call... Pass in selected Month and Year + UserId in hearder...
    axios
      .get(
        "http://localhost:3000/transaction/balance/" +
          state.currentYear +
          "/" +
          state.currentMonth,
        { headers: { userId: rootState.userId } }
      )
      .then(resp => {
        console.log("GET transaction/balance", resp);
        let data = resp.data;
        if (data && data.length > 0) {
          commit("balanceCharges", data[0].charges);
          commit("balanceDeposits", data[0].deposits);
        } else {
          commit("balanceCharges", 0);
          commit("balanceDeposits", 0);
        }
      })
      .catch(err => {
        console.log("Darn! There was an error getting balances: " + err);
      });
  },
  async gotoMonth({ commit }, increment) {
    commit("gotoMonth", increment);
  },
  async gotoCurrentMonth({ commit }) {
    commit("gotoCurrentMonth");
  },
  saveTransaction({ commit, dispatch, state, rootState }, transaction) {
    // Add the logged in userId to the transaction payload...
    transaction.userId = rootState.userId;

    axios
      .post("http://localhost:3000/transaction", transaction)
      .then(resp => {
        dispatch("getTransactionsByMonth").then(() => {
          dispatch("getPreviousMonthsBalances");
        });
      })
      .catch(err => {
        console.log("Error saving transaction");
        console.log(err);
      });
  }
};
