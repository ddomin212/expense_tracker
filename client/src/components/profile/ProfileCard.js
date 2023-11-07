import React, { useState } from "react";
import currencyFormat from "../../utils/currencyFormat";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchAccountBasic,
} from "../../redux/slices/users/accountSlice";
import assignRank from "../../utils/assignRank";
import {
  fetchUserCurrency,
  upUserCurrency,
} from "../../redux/slices/users/currencySlice";
const ProfileCard = () => {
  const dispatch = useDispatch();
  const { data, loading, appErr, serverErr } = useSelector(
    (state) => state?.accounts
  );
  const { userAuth, userAppErr, userServerErr } = useSelector(
    (state) => state?.users
  );
  const {
    currency: userCurrency,
    loading: currencyLoading,
    appErr: currencyAppErr,
    serverErr: currencyServerErr,
  } = useSelector((state) => state?.currency);
  useEffect(() => {
    dispatch(
      userAuth.user.role === "User" ? fetchAccountBasic() : fetchAccount()
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUserCurrency());
  }, [data]);
  return (
    <div className="container d-flex justify-content-center">
      <div
        id="cardEntrada-2"
        className="p-4 text-center shadow-lg m-5 rounded-5"
        style={{
          background: "var(--bs-purple)",
          width: "280px",
        }}
      >
        <img className="pt-2 w-50" src="assets/img/swiftui.png" />
        <h3 className="text-white text-center pt-2">
          {userAuth?.user?.realname || userAuth?.user?.username}
        </h3>
        <p className="fw-bold pt-1 text-white p-0 m-0">
          {assignRank(data?.incomes[0]?.total - data?.expenses[0]?.total)}
        </p>
        <hr className="text-white" />
        <div className="col-12">
          <a
            href="/edit-profile"
            className="btn btn-primary"
            type="button"
            style={{
              background: "rgb(244, 66, 55)",
            }}
          >
            Edit Profile
          </a>
        </div>
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
      </div>
    </div>
  );
};

export default ProfileCard;
