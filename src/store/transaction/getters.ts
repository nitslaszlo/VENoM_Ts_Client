import { GetterTree } from "vuex";
import { TransactionState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<TransactionState, RootState> = {
  transactionsByMonth: state => state.transactions,
  balanceCharges: state => state.balanceCharges,
  balanceDeposits: state => state.balanceCharges
};
