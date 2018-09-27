<template>
  <v-card style="width: 100%;">
    <v-card-title>
      <span class="pr-3">
        Transactions for {{ months[currentMonth].name }} - {{ currentYear }}
      </span>
      <v-btn flat icon class="pr-2" v-on:click="gotoMonthCall(-1)">
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <v-btn flat icon class="pr-2" v-on:click="gotoCurrentMonthCall()">
        <v-icon>today</v-icon>
      </v-btn>
      <v-btn flat icon v-on:click="gotoMonthCall(1)">
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-data-table
        v-bind:headers="headers"
        v-bind:items="items"
        v-bind:search="search"
        item-key="_id"
      >
      <template slot="items" slot-scope="props">
        <tr>
          <td>
            <v-edit-dialog
              lazy
            > {{ props.item.transactionDate }}
              <v-text-field
                slot="input"
                label="Edit"
                v-model="props.item.transactionDate"
                single-line
              ></v-text-field>
            </v-edit-dialog>
          </td>
          <td class="text-xs-left">{{ props.item.transactionType }}</td>
          <td class="text-xs-left" @click="props.expanded = !props.expanded">
            {{ props.item.description }}
          </td>
          <td class="text-xs-right">{{ props.item.charge }}</td>
          <td class="text-xs-right">{{ props.item.deposit }}</td>
          <td class="text-xs-right">{{ props.item.balance }}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <v-card flat class="pl-5">
          <v-card-text class="text-xs-left">
            <v-text-field label="Note" v-model="props.item.notes"></v-text-field>
          </v-card-text>
        </v-card>
      </template>

      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>

    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
import { TransactionState, Transaction } from "../store/transaction/types";
const namespace: string = "transaction";

@Component
export default class Transactions extends Vue {
  @State("state") state: TransactionState;
  @Action("getTransactionsByMonth", { namespace })
  getTransactionsByMonth: any;
  @Action("getPreviousMonthsBalances", { namespace })
  getPreviousMonthsBalances: any;
  @Action("gotoMonth", { namespace })
  gotoMonth: any;
  @Action("gotoCurrentMonth", { namespace })
  gotoCurrentMonth: any;

  @Getter("transactionsByMonth", { namespace })
  items: any;
  @Getter("balanceCharges", { namespace })
  balanceCharges: number;
  @Getter("balanceDeposits", { namespace })
  balanceDeposits: number;
  @Getter("months", { namespace })
  months: any;
  @Getter("currentYear", { namespace })
  currentYear: number;
  @Getter("currentMonth", { namespace })
  currentMonth: any;
  search: string = "";
  pagination: any = {};
  headers: any[] = [
    { text: "Date", align: "center", sortable: false, value: "date" },
    { text: "Type", align: "center", sortable: false, value: "type" },
    {
      text: "Description",
      align: "center",
      sortable: false,
      value: "description"
    },
    {
      text: "Charge (-)",
      align: "center",
      sortable: false,
      value: "paymentAmt"
    },
    {
      text: "Deposit (+)",
      align: "center",
      sortable: false,
      value: "depositAmt"
    },
    { text: "Balance", align: "center", sortable: false, value: "balance" }
  ];

  // get currentMonth(): number {
  //   return this.$store.state.transactions.currentMonth;
  // }

  // get currentYear(): number {
  //   return this.$store.state.transactions.currentYear;
  // }

  // get months(): any {
  //   return this.$store.state.transactions.months;
  // }

  // get items(): any {
  //   return this.$store.getters.transactionsByMonth;
  // }

  // get balanceCharges(): number {
  //   return this.$store.getters.balanceCharges;
  // }

  // get balanceDeposits(): number {
  //   return this.$store.getters.balanceDeposits;
  // }

  max25chars: any = (v: any) => v.length <= 25 || "Input too long!";

  // getTransactionsByMonth(): void {
  //   this.$store.dispatch("getTransactionsByMonth");
  // }

  // getPreviousMonthsBalances(): void {
  //   this.$store.dispatch("getPreviousMonthsBalances");
  // }

  gotoMonthCall(increment: any): void {
    this.gotoMonth(increment).then(() => {
      // Load selected month transaction data now...
      this.getPreviousMonthsBalances();
      this.getTransactionsByMonth();
    });
  }

  gotoCurrentMonthCall(): void {
    this.gotoCurrentMonth().then(() => {
      // Load selected month transaction data now...
      this.getPreviousMonthsBalances();
      this.getTransactionsByMonth();
    });
  }

  async mounted() {
    // const me = this
    await this.getPreviousMonthsBalances();
    await console.log(this.balanceCharges);
    await console.log(this.balanceDeposits);
    await this.getTransactionsByMonth();
  }
}
</script>

<style scoped>
.transactions {
  width: 100%;
}
</style>
