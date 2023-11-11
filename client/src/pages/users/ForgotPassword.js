import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotPassAction } from "../../redux/slices/auth/authSlice";
import ErrorInlineMessage from "../../components/ErrorInlineMessage";
import FormItem from "../../components/FormItem";

const formSchema = Yup.object({
  email: Yup.string().required("Required field"),
});
function ForgotPass() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const { appErr, serverErr, loading, forgot } = auth;

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
          <ErrorInlineMessage appErr={appErr} serverErr={serverErr} />
          <FormItem formik={formik} name={"email"} />
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
