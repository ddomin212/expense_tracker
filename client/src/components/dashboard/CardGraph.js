import React from "react";
import DataGraph from "./TotalGraph";
import MonthlyGraph from "../MonthlyGraph";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchAccountBasic,
} from "../../redux/slices/users/accountSlice";
import currencyFormat from "../../utils/currencyFormat";
import { fetchUserCurrency } from "../../redux/slices/users/currencySlice";
const NetWorthCard = ({ type }) => {
  const dispatch = useDispatch();
  const {
    data,
    appErr: dataAppErr,
    serverErr: dataServerErr,
  } = useSelector((state) => state?.accounts);
  const {
    currency,
    appErr: currencyAppErr,
    serverErr: currencyServerErr,
  } = useSelector((state) => state.currency);
  const { userAuth, userAppErr, userServerErr } = useSelector(
    (state) => state.users
  );
  useEffect(() => {
    dispatch(
      userAuth?.user?.role === "User" ? fetchAccountBasic() : fetchAccount()
    );
    dispatch(fetchUserCurrency());
  }, [dispatch]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            id="cardEntrada-2"
            className="p-4 text-center shadow-lg m-5 rounded-5"
            style={{
              background: "var(--bs-purple)",
              maxWidth: "600px",
            }}
          >
            <h3 className="text-white text-center pt-2">
              {type === "dash"
                ? "Net Worth"
                : type === "income"
                ? "Total Income"
                : "Total Expense"}
            </h3>
            <p className="fs-1 fw-bold pt-1 text-white p-0 m-0">
              {type === "dash"
                ? currencyFormat(
                    data?.incomes[0]?.total - data?.expenses[0]?.total,
                    currency?.currency || "CZK",
                    currency?.currencyData?.rates?.EUR,
                    currency?.currencyData?.rates?.USD
                  )
                : type === "income"
                ? currencyFormat(
                    data?.incomes[0]?.total,
                    currency?.currency || "CZK",
                    currency?.currencyData?.rates?.EUR,
                    currency?.currencyData?.rates?.USD
                  )
                : currencyFormat(
                    data?.expenses[0]?.total,
                    currency?.currency || "CZK",
                    currency?.currencyData?.rates?.EUR,
                    currency?.currencyData?.rates?.USD
                  )}
            </p>
          </div>
        </div>
        <div
          className={`col-md-6 ${
            userAuth?.user?.role === "Pro" || userAuth?.user?.role === "Admin"
              ? "d-flex"
              : "d-none"
          } justify-content-center align-items-center`}
        >
          {type === "dash" ? (
            <DataGraph
              income={
                currency?.currency === "CZK"
                  ? data?.incomes[0]?.total
                  : currency?.currency === "EUR"
                  ? data?.incomes[0]?.total / 23.7
                  : data?.incomes[0]?.total / 22.1
              }
              expenses={
                currency?.currency === "CZK"
                  ? data?.expenses[0]?.total
                  : currency?.currency === "EUR"
                  ? data?.expenses[0]?.total / 23.7
                  : data?.expenses[0]?.total / 22.1
              }
            />
          ) : (
            <MonthlyGraph type={type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default NetWorthCard;
