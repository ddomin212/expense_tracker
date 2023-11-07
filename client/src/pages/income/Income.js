import React from "react";
import TransactionTable from "../../components/TransactionTable";
import CardGraph from "../../components/dashboard/CardGraph";
function Incomes() {
  return (
    <>
      <CardGraph type="income" />
      <TransactionTable type="income" />
    </>
  );
}

export default Incomes;
