import React from "react";
import moneySVG from "../img/money.svg";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { editExpense } from "../redux/slices/expense/expensesSlice";
import { editIncome } from "../redux/slices/income/incomeSlice";

const formSchema = Yup.object({
  title: Yup.string().required("Required field"),
  amount: Yup.number().required("Required field"),
  description: Yup.string().required("Required field"),
});

const EditContent = () => {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serverErr, appErr, created, loading } = useSelector((state) =>
    data?.type === "income" ? state?.income : state?.expenses
  );
  const formik = useFormik({
    initialValues: {
      title: data?.item?.title,
      amount: data?.item?.amount,
      description: data?.item?.description,
    },
    onSubmit: (values) => {
      dispatch(
        data?.type === "income"
          ? editIncome({ values, id: data?.item?._id })
          : editExpense({ values, id: data?.item?._id })
      );
      navigate("/" + data?.type);
    },
    validationSchema: formSchema,
  });
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
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-dark">
              <form onSubmit={formik.handleSubmit}>
                <span className="text-muted">
                  {data?.type === "income" ? " Income" : " Expense"}
                </span>
                <h2 className="mb-4 fw-light">
                  {data?.type === "income"
                    ? " Update Income"
                    : " Update Expense"}
                </h2>
                {/* Display Err */}
                {serverErr || appErr ? (
                  <div className="alert alert-danger" role="alert">
                    {serverErr} {appErr}
                  </div>
                ) : null}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.title}
                    onChange={formik.handleChange("title")}
                    onBlur={formik.handleBlur("title")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Title"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.title && formik.errors.title}
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.description}
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Description"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.description && formik.errors.description}
                </div>

                <div className="mb-3 input-group">
                  <input
                    value={formik.values.amount}
                    onChange={formik.handleChange("amount")}
                    onBlur={formik.handleBlur("amount")}
                    className="form-control"
                    type="number"
                    placeholder="Enter Amount"
                  />
                </div>
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.amount && formik.errors.amount}
                </div>
                <button type="submit" className="btn btn-primary mb-4 w-100">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
