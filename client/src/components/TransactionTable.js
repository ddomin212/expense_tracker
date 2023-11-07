import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExpenses,
  fetchFilteredExpenses,
} from "../redux/slices/expense/expensesSlice";
import {
  fetchIncome,
  fetchFilteredIncome,
} from "../redux/slices/income/incomeSlice";
import ContentDetails from "../components/ContentDetails";
import parsePayment from "../utils/parsePayment";
import { render } from "react-dom";
import AppPagination from "../components/AppPagination";
import { fetchFioAction } from "../redux/slices/connect/fioSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Filters from "./Filters";
import { fetchXtbAction } from "../redux/slices/connect/xtbSlice";
import { fetchDegiroAction } from "../redux/slices/connect/degiroSlice";
import { fetchUserCurrency } from "../redux/slices/users/currencySlice";
const formSchema = Yup.object({
  min: Yup.number(),
  max: Yup.number(),
  type: Yup.string(),
  startDate: Yup.date(),
  endDate: Yup.date(),
});
const TransactionTable = ({ type, format }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      min: 0,
      max: 1000,
      endDate: new Date(),
      startDate: new Date("1970-01-01"),
      type: "",
    },
    onSubmit: (values) => {
      const curMin =
        currency.currency === "USD"
          ? formik.values.min / currency.currencyData.rates.USD
          : currency.currency === "EUR"
          ? formik.values.min / currency.currencyData.rates.EUR
          : formik.values.min;
      const curMax =
        currency.currency === "USD"
          ? formik.values.max / currency.currencyData.rates.USD
          : currency.currency === "EUR"
          ? formik.values.max / currency.currencyData.rates.EUR
          : formik.values.max;
      type === "expense"
        ? dispatch(
            fetchFilteredExpenses({
              values: {
                min: curMin,
                max: curMax,
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
                type: formik.values.type,
              },
              page,
            })
          )
        : dispatch(
            fetchFilteredIncome({
              values: {
                min: curMin,
                max: curMax,
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
                type: formik.values.type,
              },
              page,
            })
          );
    },
    validationSchema: formSchema,
  });
  const { created, loading, serverErr, appErr } = useSelector((state) =>
    type === "expense" ? state?.expenses : state?.income
  );
  const {
    currency,
    appErr: currencyAppErr,
    serverErr: currencyServerErr,
  } = useSelector((state) => state?.currency);
  const { userAuth, userAppErr, userServerErr } = useSelector(
    (state) => state?.users
  );
  const {
    connected: fioConnected,
    loading: bankLoading,
    serverErr: bankServerErr,
    appErr: bankAppErr,
  } = useSelector((state) => state?.fio);
  const {
    connected: degiroConnected,
    loading: degiroLoading,
    serverErr: degiroServerErr,
    appErr: degiroAppErr,
  } = useSelector((state) => state?.degiro);
  const {
    connected: xtbConnected,
    loading: xtbLoading,
    serverErr: xtbServerErr,
    appErr: xtbAppErr,
  } = useSelector((state) => state?.xtb);
  useEffect(() => {
    if (fioConnected) dispatch(fetchFioAction());
    if (xtbConnected) dispatch(fetchXtbAction());
    if (degiroConnected) dispatch(fetchDegiroAction());
  }, []);
  useEffect(() => {
    dispatch(fetchUserCurrency());
  }, [dispatch]);
  useEffect(() => {
    if (show && formik.values && currency) {
      const curMin =
        currency.currency === "USD"
          ? formik.values.min / currency.currencyData.rates.USD
          : currency.currency === "EUR"
          ? formik.values.min / currency.currencyData.rates.EUR
          : formik.values.min;
      const curMax =
        currency.currency === "USD"
          ? formik.values.max / currency.currencyData.rates.USD
          : currency.currency === "EUR"
          ? formik.values.max / currency.currencyData.rates.EUR
          : formik.values.max;
      type === "expense"
        ? dispatch(
            fetchFilteredExpenses({
              values: {
                min: curMin,
                max: curMax,
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
                type: formik.values.type,
              },
              page,
            })
          )
        : dispatch(
            fetchFilteredIncome({
              values: {
                min: curMin,
                max: curMax,
                startDate: formik.values.startDate,
                endDate: formik.values.endDate,
                type: formik.values.type,
              },
              page,
            })
          );
    } else {
      dispatch(type === "expense" ? fetchExpenses(page) : fetchIncome(page));
    }
  }, [dispatch, page]);
  const renderDocs = created?.docs?.map((doc) => {
    return (
      <ContentDetails
        item={doc}
        key={doc?._id}
        type={type}
        format={format}
        currency={currency}
      />
    );
  });
  return (
    <>
      <div
        className="container"
        hidden={format === "short" || userAuth?.user?.role === "User"}
        style={{
          textAlign: "center",
        }}
      >
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            setShow(!show);
          }}
          style={{
            marginTop: "16px",
            marginBottom: "16px",
          }}
        >
          Show Filters
        </button>
      </div>
      <Filters shown={show} formik={formik} />
      <section>
        <div
          className="container"
          style={{
            marginTop: "30px",
          }}
        >
          <div className="row">
            <div className="col-12">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  marginTop: "0px",
                }}
              >
                <div />
                <h4 className="fs-1 fw-bold">
                  {type === "expense" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -32 640 640"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                    >
                      {}
                      <path d="M535 7.03C544.4-2.343 559.6-2.343 568.1 7.029L632.1 71.02C637.5 75.52 640 81.63 640 87.99C640 94.36 637.5 100.5 632.1 104.1L568.1 168.1C559.6 178.3 544.4 178.3 535 168.1C525.7 159.6 525.7 144.4 535 135L558.1 111.1L384 111.1C370.7 111.1 360 101.2 360 87.99C360 74.74 370.7 63.99 384 63.99L558.1 63.1L535 40.97C525.7 31.6 525.7 16.4 535 7.03V7.03zM104.1 376.1L81.94 400L255.1 399.1C269.3 399.1 279.1 410.7 279.1 423.1C279.1 437.2 269.3 447.1 255.1 447.1L81.95 448L104.1 471C114.3 480.4 114.3 495.6 104.1 504.1C95.6 514.3 80.4 514.3 71.03 504.1L7.029 440.1C2.528 436.5-.0003 430.4 0 423.1C0 417.6 2.529 411.5 7.03 407L71.03 343C80.4 333.7 95.6 333.7 104.1 343C114.3 352.4 114.3 367.6 104.1 376.1H104.1zM95.1 64H337.9C334.1 71.18 332 79.34 332 87.1C332 116.7 355.3 139.1 384 139.1L481.1 139.1C484.4 157.5 494.9 172.5 509.4 181.9C511.1 184.3 513.1 186.6 515.2 188.8C535.5 209.1 568.5 209.1 588.8 188.8L608 169.5V384C608 419.3 579.3 448 544 448H302.1C305.9 440.8 307.1 432.7 307.1 423.1C307.1 395.3 284.7 371.1 255.1 371.1L158.9 372C155.5 354.5 145.1 339.5 130.6 330.1C128.9 327.7 126.9 325.4 124.8 323.2C104.5 302.9 71.54 302.9 51.23 323.2L31.1 342.5V128C31.1 92.65 60.65 64 95.1 64V64zM95.1 192C131.3 192 159.1 163.3 159.1 128H95.1V192zM544 384V320C508.7 320 480 348.7 480 384H544zM319.1 352C373 352 416 309 416 256C416 202.1 373 160 319.1 160C266.1 160 223.1 202.1 223.1 256C223.1 309 266.1 352 319.1 352z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -32 576 576"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                    >
                      <path d="M48.66 79.13C128.4 100.9 208.2 80.59 288 60.25C375 38.08 462 15.9 549 48.38C565.9 54.69 576 71.62 576 89.66V399.5C576 423.4 550.4 439.2 527.3 432.9C447.6 411.1 367.8 431.4 288 451.7C200.1 473.9 113.1 496.1 26.97 463.6C10.06 457.3 0 440.4 0 422.3V112.5C0 88.59 25.61 72.83 48.66 79.13L48.66 79.13zM287.1 352C332.2 352 368 309 368 255.1C368 202.1 332.2 159.1 287.1 159.1C243.8 159.1 207.1 202.1 207.1 255.1C207.1 309 243.8 352 287.1 352zM63.1 416H127.1C127.1 380.7 99.35 352 63.1 352V416zM63.1 143.1V207.1C99.35 207.1 127.1 179.3 127.1 143.1H63.1zM512 303.1C476.7 303.1 448 332.7 448 368H512V303.1zM448 95.1C448 131.3 476.7 159.1 512 159.1V95.1H448z"></path>
                    </svg>
                  )}{" "}
                  {type === "expense" ? "Expenses" : "Income"}
                </h4>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    {format === "short" ? (
                      <tr>
                        <th scope="col">
                          <small>Title</small>
                        </th>
                        <th scope="col">
                          <small>Amount</small>
                        </th>
                      </tr>
                    ) : (
                      <tr>
                        <th scope="col">
                          <small>Desription</small>
                        </th>
                        <th scope="col">
                          <small>Type</small>
                        </th>
                        <th scope="col">
                          <small>Date</small>
                        </th>
                        <th scope="col">
                          <small>Amount</small>
                        </th>
                        <th scope="col">
                          <small>Action</small>
                        </th>
                      </tr>
                    )}
                  </thead>
                  <tbody>{renderDocs}</tbody>
                </table>
                {serverErr || appErr ? (
                  <div className="alert alert-danger" role="alert">
                    {serverErr} {appErr}
                  </div>
                ) : null}
                {bankServerErr || bankAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {bankServerErr} {bankAppErr}
                  </div>
                ) : null}
                {degiroServerErr || degiroAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {degiroServerErr} {degiroAppErr}
                  </div>
                ) : null}
                {xtbServerErr || xtbAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {xtbServerErr} {xtbAppErr}
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
              </div>
              {format === "short" ? null : (
                <p className="text-end">
                  <a
                    class="btn btn-primary"
                    type="button"
                    href={type === "expense" ? "/add-expense" : "/add-income"}
                  >
                    {type === "expense" ? "Add Expense" : "Add Income"}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          {format === "short" ? null : (
            <AppPagination items={created?.totalPages} setPage={setPage} />
          )}
        </div>
      </section>
    </>
  );
};

export default TransactionTable;
