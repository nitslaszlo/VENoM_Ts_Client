import { MutationTree } from "vuex";
import { TransactionState, Transaction } from "./types";

function moneyFormatter(amount: any): string {
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
    // the default value for minimumFractionDigits depends on the currency
    // and is usually already 2
  });
  return formatter.format(amount);
}

function calcRunningBalance(tx: Transaction, state: TransactionState): number {
  // any new charges?
  if (tx && tx.charge > 0) {
    state.balanceCharges += tx.charge;
  } else if (tx && tx.deposit > 0) {
    state.balanceDeposits += tx.deposit;
  }
  return state.balanceCharges - state.balanceDeposits;
}

function mapTransaction(tx: Transaction, state: TransactionState): Transaction {
  const transDate = new Date(tx.transactionDate);
  let transaction: Transaction = {
    transactionDate:
      state.months[transDate.getUTCMonth() + 1].abrev +
      "-" +
      transDate.getUTCDate(),
    transactionType: tx.transactionType,
    description: tx.description,
    // charge: moneyFormatter(tx.charge),
    // deposit: moneyFormatter(tx.deposit),
    // balance: moneyFormatter(calcRunningBalance(tx, state))
    charge: tx.charge,
    deposit: tx.deposit,
    balance: calcRunningBalance(tx, state)
  };
  return transaction;
}

export const mutations: MutationTree<TransactionState> = {
  mapTransaction(state, tx) {
    const transDate = new Date(tx.transactionDate);
    let transaction = {
      transactionDate:
        state.months[transDate.getUTCMonth() + 1].abrev +
        "-" +
        transDate.getUTCDate(),
      transactionType: tx.transactionType,
      description: tx.description,
      // charge: moneyFormatter(tx.charge),
      // deposit: moneyFormatter(tx.deposit),
      // balance: moneyFormatter(calcRunningBalance(tx, state))
      charge: tx.charge,
      deposit: tx.deposit,
      balance: calcRunningBalance(tx, state)
    };
    return transaction;
  },
  transactionsByMonth(state, data) {
    // Start by clearing the array...
    state.transactions = [];

    if (data && data.length > 0) {
      data.forEach((tx: any) => {
        state.transactions!.push(mapTransaction(tx, state));
      });
    }
    console.log("Transactions by month mutated: ", state.transactions);
  },
  balanceCharges(state, data) {
    state.balanceCharges = data;
  },
  balanceDeposits(state, data) {
    state.balanceDeposits = data;
  },
  gotoMonth(state, increment) {
    let newMonth = (state.currentMonth += increment);
    // Sanity checks now...
    if (newMonth > 12) {
      newMonth = 1;
      state.currentYear += 1;
    } else if (newMonth < 1) {
      newMonth = 12;
      state.currentYear -= 1;
    }

    state.currentMonth = newMonth;
  },
  gotoCurrentMonth(state) {
    let dt = new Date(Date.now());
    state.currentMonth = dt.getUTCMonth() + 1;
    state.currentYear = dt.getUTCFullYear();
  }
};
