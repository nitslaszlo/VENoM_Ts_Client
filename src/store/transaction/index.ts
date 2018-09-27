import { Module } from "vuex";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { TransactionState } from "./types";
import { RootState } from "../types";

export const state: TransactionState = {
  transactions: [],
  errorMsg: "",
  error: false,
  currentMonth: 5,
  currentYear: 2018,
  balanceCharges: 0,
  balanceDeposits: 0,
  months: [
    { name: "Zero", abrev: "ZZZ", index: 0 },
    { name: "January", abrev: "Jan", index: 1 },
    { name: "February", abrev: "Feb", index: 2 },
    { name: "March", abrev: "Mar", index: 3 },
    { name: "April", abrev: "Apr", index: 4 },
    { name: "May", abrev: "May", index: 5 },
    { name: "June", abrev: "Jun", index: 6 },
    { name: "July", abrev: "Jul", index: 7 },
    { name: "August", abrev: "Aug", index: 8 },
    { name: "September", abrev: "Sep", index: 9 },
    { name: "October", abrev: "October", index: 10 },
    { name: "November", abrev: "Nov", index: 11 },
    { name: "December", abrev: "Dec", index: 12 }
  ]
};

const namespaced: boolean = true;

export const transaction: Module<TransactionState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
