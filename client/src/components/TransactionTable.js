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
import AppPagination from "../components/AppPagination";
import { fetchFioAction } from "../redux/slices/connect/fioSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Filters from "./Filters";
import { fetchXtbAction } from "../redux/slices/connect/xtbSlice";
import { fetchDegiroAction } from "../redux/slices/connect/degiroSlice";
import { fetchUserCurrency } from "../redux/slices/users/currencySlice";
import ErrorInlineMessage from "./ErrorInlineMessage";
import TransTable from "./TransTable";
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

  const handleFilters = (values, currency, formik) => {
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
  };

  const formik = useFormik({
    initialValues: {
      min: 0,
      max: 1000,
      endDate: new Date(),
      startDate: new Date("1970-01-01"),
      type: "",
    },
    onSubmit: (values) => handleFilters(values, currency, formik),
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (fioConnected) dispatch(fetchFioAction());
    if (xtbConnected) dispatch(fetchXtbAction());
    if (degiroConnected) dispatch(fetchDegiroAction());
  });

  useEffect(() => {
    dispatch(fetchUserCurrency());
  }, [dispatch]);

  useEffect(() => {
    if (show && formik.values && currency) {
      handleFilters(formik.values, currency, formik);
    } else {
      dispatch(type === "expense" ? fetchExpenses(page) : fetchIncome(page));
    }
  }, [dispatch, page]);

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
              <TransTable
                type={type}
                created={created}
                format={format}
                currency={currency}
              />
              <ErrorInlineMessage appErr={appErr} serverErr={serverErr} />
              <ErrorInlineMessage
                appErr={currencyAppErr}
                serverErr={currencyServerErr}
              />
              <ErrorInlineMessage
                appErr={userAppErr}
                serverErr={userServerErr}
              />
              <ErrorInlineMessage
                appErr={bankAppErr}
                serverErr={bankServerErr}
              />
              <ErrorInlineMessage appErr={xtbAppErr} serverErr={xtbServerErr} />
              <ErrorInlineMessage
                appErr={degiroAppErr}
                serverErr={degiroServerErr}
              />
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
