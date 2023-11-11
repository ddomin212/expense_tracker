import React from "react";
import moneySVG from "../img/money.svg";
import { useLocation } from "react-router-dom";
import { TransactionForm } from "./components";

const EditContent = () => {
  const { state: data } = useLocation();

  return (
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
        <TransactionForm
          type={data?.type}
          editFlag={true}
          id={data?.item?._id}
        />
      </div>
    </section>
  );
};

export default EditContent;
