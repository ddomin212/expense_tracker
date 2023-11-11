import React from "react";
import { useSelector } from "react-redux";
import { upUserCurrency } from "../../redux/slices/users/currencySlice";

function CurrencyDropdown({ dispatch }) {
  const { currency: userCurrency } = useSelector((state) => state?.currency);

  return (
    <div class="dropdown d-flex d-xl-flex justify-content-center align-items-center flex-wrap justify-content-xl-center">
      <button
        class="btn btn-primary dropdown-toggle"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        type="button"
        style={{ marginTop: "12px", background: "rgb(66, 140, 55)" }}
      >
        {userCurrency?.currency || "CZK"}
      </button>
      <div class="dropdown-menu text-center" style={{ maxWidth: "25%" }}>
        <a
          class="dropdown-item"
          onClick={() => dispatch(upUserCurrency({ currency: "USD" }))}
        >
          USD
        </a>
        <a
          class="dropdown-item"
          onClick={() => dispatch(upUserCurrency({ currency: "EUR" }))}
        >
          EUR
        </a>
        <a
          class="dropdown-item"
          onClick={() => dispatch(upUserCurrency({ currency: "CZK" }))}
        >
          CZK
        </a>
      </div>
    </div>
  );
}

export default CurrencyDropdown;
