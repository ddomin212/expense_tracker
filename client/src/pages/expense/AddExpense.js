import React from "react";
import moneySVG from "../../img/money.svg";
import { TransactionForm } from "../../components";

const AddExpense = () => {
  return (
    <>
      <section className="py-5 bg-gray vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            />
          </a>
          <TransactionForm type={"expense"} />
        </div>
      </section>
    </>
  );
};

export default AddExpense;
