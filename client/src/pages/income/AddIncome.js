import React from "react";
import moneySVG from "../../img/money.svg";
import { TransactionForm } from "../../components";

const AddIncome = () => {
  return (
    <>
      <section className="py-5 bg-gray vh-100">
        <div className="container text-center">
          <a className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGincome"
              width="200"
            />
          </a>
          <TransactionForm type={"income"} />
        </div>
      </section>
    </>
  );
};

export default AddIncome;
