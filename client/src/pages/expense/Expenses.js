import React from "react";
import TransactionTable from "../../components/TransactionTable";
import CardGraph from "../../components/dashboard/CardGraph";
function Expenses() {
  return (
    <>
      <CardGraph type="expense" />
      <TransactionTable type="expense" />
    </>
  );
}

export default Expenses;
