import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchAccountBasic,
} from "../../redux/slices/users/accountSlice";
import { fetchUserCurrency } from "../../redux/slices/users/currencySlice";
import CurrencyDropdown from "./CurrencyDropdown";
import CardInfo from "./CardInfo";

const ProfileCard = () => {
  const dispatch = useDispatch();

  const { data, appErr, serverErr } = useSelector((state) => state?.accounts);

  const { userAuth, userAppErr, userServerErr } = useSelector(
    (state) => state?.users
  );

  useEffect(() => {
    dispatch(
      userAuth.user.role === "User" ? fetchAccountBasic() : fetchAccount()
    );
  }, [dispatch, userAuth]);

  useEffect(() => {
    dispatch(fetchUserCurrency());
  }, [data, dispatch]);

  return (
    <div className="container d-flex justify-content-center">
      <CardInfo data={data} userAuth={userAuth} />
      <CurrencyDropdown dispatch={dispatch} />
      {serverErr || appErr ? (
        <div className="alert alert-danger" role="alert">
          {serverErr} {appErr}
        </div>
      ) : null}
      {userServerErr || userAppErr ? (
        <div className="alert alert-danger" role="alert">
          {userServerErr} {userAppErr}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileCard;
