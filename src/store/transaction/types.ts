export interface Transaction {
  userId: any;
  transactionDate: any;
  transactionType: string;
  description: string;
  charge: number;
  deposit: number;
  balance: number;
  notes: string;
}

export interface Months {
  name: string;
  abrev: string;
  index: number;
}

export interface TransactionState {
  transaction?: Transaction;
  transactions?: Transaction[];
  error: boolean;
  errorMsg: string;
  currentMonth: number;
  currentYear: number;
  balanceCharges: number;
  balanceDeposits: number;
  months: Months[];
}
