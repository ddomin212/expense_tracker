import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moneySVG from "../../img/money.svg";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { recordExpense } from "../../redux/slices/expense/expensesSlice";

const formSchema = Yup.object({
  title: Yup.string().required("Required field"),
  amount: Yup.number().required("Required field"),
  description: Yup.string().required("Required field"),
});

const AddExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serverErr, appErr, created, loading } = useSelector(
    (state) => state?.expenses
  );
  const formik = useFormik({
    initialValues: {
      title: "",
      amount: 0,
      description: "",
    },
    onSubmit: (values) => {
      dispatch(recordExpense(values));
      navigate("/expense");
    },
    validationSchema: formSchema,
  });
  return (
    <>
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
                  <span className="text-muted">Expense</span>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
                  {/* Display income Err */}
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
                  <button type="submit" className="btn btn-danger mb-4 w-100">
                    Record Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
