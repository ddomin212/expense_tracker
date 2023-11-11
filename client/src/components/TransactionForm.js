import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  recordExpense,
  editExpense,
} from "../redux/slices/expense/expensesSlice";
import { recordIncome, editIncome } from "../redux/slices/income/incomeSlice";
import { FormItem } from "./components";
import ErrorInlineMessage from "./ErrorInlineMessage";

const formSchema = Yup.object({
  title: Yup.string().required("Required field"),
  amount: Yup.number().required("Required field"),
  description: Yup.string().required("Required field"),
});

function TransactionForm({ type, editFlag, id }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { serverErr, appErr } = useSelector((state) =>
    type === "expense" ? state?.expenses : state?.income
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      amount: 0,
      description: "",
    },
    onSubmit: (values) => {
      if (!editFlag) {
        if (type === "expense") {
          dispatch(recordExpense(values));
          navigate("/expense");
        } else {
          dispatch(recordIncome(values));
          navigate("/income");
        }
      } else {
        if (type === "expense") {
          dispatch(editExpense({ values, id }));
          navigate("/expense");
        } else {
          dispatch(editIncome({ values, id }));
          navigate("/income");
        }
      }
    },
    validationSchema: formSchema,
  });

  return (
    <div className="row mb-4">
      <div className="col-12 col-md-8 col-lg-5 mx-auto">
        <div className="p-4 shadow-sm rounded bg-dark">
          <form onSubmit={formik.handleSubmit}>
            <span className="text-muted">{type}</span>
            <h2 className="mb-4 fw-light">Record New {type}</h2>
            <ErrorInlineMessage appErr={appErr} serverErr={serverErr} />
            <FormItem formik={formik} name="title" />
            <FormItem formik={formik} name="description" />
            <FormItem formik={formik} name="amount" type="number" />
            <button type="submit" className="btn btn-danger mb-4 w-100">
              Record {type}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransactionForm;
