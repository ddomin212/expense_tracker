import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAccount,
  fetchAccountBasic,
} from "../../redux/slices/users/accountSlice";
import { fetchUserCurrency } from "../../redux/slices/users/currencySlice";
import currencyFormat from "../../utils/currencyFormat";
const Achievments = () => {
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

  return userAuth?.user?.role === "Pro" || userAuth?.user?.role === "Admin" ? (
    <div className="container py-4 py-xl-5">
      {dataServerErr || dataAppErr ? (
        <div className="alert alert-danger" role="alert">
          {dataServerErr} {dataAppErr}
        </div>
      ) : null}
      {currencyServerErr || currencyAppErr ? (
        <div className="alert alert-danger" role="alert">
          {currencyServerErr} {currencyAppErr}
        </div>
      ) : null}
      {userServerErr || userAppErr ? (
        <div className="alert alert-danger" role="alert">
          {userServerErr} {userAppErr}
        </div>
      ) : null}
      <div className="row mb-5">
        <div className="col-md-8 col-xl-6 text-center mx-auto">
          <h2>Achievments</h2>
          <p />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -32 576 576"
                width="1em"
                height="1em"
                fill="currentColor"
              >
                {}
                <path d="M171.7 191.1H404.3L322.7 35.07C316.6 23.31 321.2 8.821 332.9 2.706C344.7-3.409 359.2 1.167 365.3 12.93L458.4 191.1H544C561.7 191.1 576 206.3 576 223.1C576 241.7 561.7 255.1 544 255.1L492.1 463.5C484.1 492 459.4 512 430 512H145.1C116.6 512 91 492 83.88 463.5L32 255.1C14.33 255.1 0 241.7 0 223.1C0 206.3 14.33 191.1 32 191.1H117.6L210.7 12.93C216.8 1.167 231.3-3.409 243.1 2.706C254.8 8.821 259.4 23.31 253.3 35.07L171.7 191.1zM191.1 303.1C191.1 295.1 184.8 287.1 175.1 287.1C167.2 287.1 159.1 295.1 159.1 303.1V399.1C159.1 408.8 167.2 415.1 175.1 415.1C184.8 415.1 191.1 408.8 191.1 399.1V303.1zM271.1 303.1V399.1C271.1 408.8 279.2 415.1 287.1 415.1C296.8 415.1 304 408.8 304 399.1V303.1C304 295.1 296.8 287.1 287.1 287.1C279.2 287.1 271.1 295.1 271.1 303.1zM416 303.1C416 295.1 408.8 287.1 400 287.1C391.2 287.1 384 295.1 384 303.1V399.1C384 408.8 391.2 415.1 400 415.1C408.8 415.1 416 408.8 416 399.1V303.1z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Total expenses are{" "}
                {currencyFormat(
                  data?.expenses[0]?.total,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-battery"
              >
                <path d="M0 6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm2-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H2zm14 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Largest payment is{" "}
                {currencyFormat(
                  data?.expenses[0]?.max,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-battery-half"
              >
                <path d="M2 6h5v4H2V6z" />
                <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Average expenditure daily is{" "}
                {currencyFormat(
                  data?.expenses[0]?.avg,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-bank"
              >
                <path d="M8 .95 14.61 4h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.379l.5 2A.5.5 0 0 1 15.5 17H.5a.5.5 0 0 1-.485-.621l.5-2A.5.5 0 0 1 1 14V7H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 4h.89L8 .95zM3.776 4h8.447L8 2.05 3.776 4zM2 7v7h1V7H2zm2 0v7h2.5V7H4zm3.5 0v7h1V7h-1zm2 0v7H12V7H9.5zM13 7v7h1V7h-1zm2-1V5H1v1h14zm-.39 9H1.39l-.25 1h13.72l-.25-1z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Total income is{" "}
                {currencyFormat(
                  data?.incomes[0]?.total,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-battery-full"
              >
                <path d="M2 6h10v4H2V6z" />
                <path d="M2 4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2zm10 1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h10zm4 3a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Highest one-time recieved payment is{" "}
                {currencyFormat(
                  data?.incomes[0]?.max,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="d-flex p-3">
            <div className="bs-icon-sm bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="bi bi-battery-charging"
              >
                <path d="M9.585 2.568a.5.5 0 0 1 .226.58L8.677 6.832h1.99a.5.5 0 0 1 .364.843l-5.334 5.667a.5.5 0 0 1-.842-.49L5.99 9.167H4a.5.5 0 0 1-.364-.843l5.333-5.667a.5.5 0 0 1 .616-.09z" />
                <path d="M2 4h4.332l-.94 1H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2.38l-.308 1H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                <path d="M2 6h2.45L2.908 7.639A1.5 1.5 0 0 0 3.313 10H2V6zm8.595-2-.308 1H12a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H9.276l-.942 1H12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.405z" />
                <path d="M12 10h-1.783l1.542-1.639c.097-.103.178-.218.241-.34V10zm0-3.354V6h-.646a1.5 1.5 0 0 1 .646.646zM16 8a1.5 1.5 0 0 1-1.5 1.5v-3A1.5 1.5 0 0 1 16 8z" />
              </svg>
            </div>
            <div className="px-2">
              <h5 className="mb-0 mt-1">
                Average income daily is{" "}
                {currencyFormat(
                  data?.incomes[0]?.avg,
                  currency?.currency || "CZK",
                  currency?.currencyData?.rates?.EUR,
                  currency?.currencyData?.rates?.USD
                )}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Achievments;
