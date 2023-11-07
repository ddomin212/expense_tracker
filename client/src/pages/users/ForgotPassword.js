import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassAction } from "../../redux/slices/auth/authSlice";
const formSchema = Yup.object({
  email: Yup.string().required("Required field"),
});
function ForgotPass() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const { appErr, serverErr, loading, forgot } = auth;
  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(forgotPassAction(values));
    },
    validationSchema: formSchema,
  });
  return (
    <section class="py-4 py-xl-5">
      <div class="container">
        <h1 class="text-center">Forgot your password?</h1>
      </div>

      <form class="form-inline" onSubmit={formik.handleSubmit}>
        <div class="container d-flex justify-content-center flex-wrap">
          {(appErr || serverErr) && !forgot ? (
            <div class="alert alert-danger" role="alert">
              {serverErr} {appErr}
            </div>
          ) : null}
          <input
            class="form-control"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            style={{ width: "35%", minWidth: "300px", marginTop: "10px" }}
            placeholder="Type your email here"
            name="email"
          />
        </div>
        <div class="container d-flex justify-content-center flex-wrap">
          <button
            class={`btn ${forgot ? "btn-success disabled" : "btn-primary"}`}
            type="submit"
            style={{ marginTop: "20px" }}
          >
            {forgot ? "Email sent" : "Submit"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPass;
