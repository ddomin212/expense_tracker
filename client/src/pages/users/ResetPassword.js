import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassAction } from "../../redux/slices/auth/authSlice";
import FormItem from "../../components/FormItem";
import ErrorInlineMessage from "../../components/ErrorInlineMessage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const formSchema = Yup.object({
  password: Yup.string().required("Required field"),
});
function ResetPass() {
  const navigate = useNavigate();
  const query = useQuery();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const { appErr, serverErr, loading, reset } = auth;
  //formik form
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      dispatch(
        resetPassAction({
          password: values.password,
          token: query.get("token"),
          email: query.get("email"),
        })
      );
      navigate("/login");
    },
    validationSchema: formSchema,
  });
  return (
    <section class="py-4 py-xl-5">
      <div class="container">
        <h1 class="text-center">Reset Password</h1>
      </div>
      <div class="container d-flex justify-content-center flex-wrap">
        <ErrorInlineMessage appErr={appErr} serverErr={serverErr} />
        <form class="form-inline" onSubmit={formik.handleSubmit}>
          <FormItem formik={formik} name={"password"} />
          <button
            class={`btn ${reset ? "btn-success disabled" : "btn-primary"}`}
            type="submit"
          >
            Reset
          </button>
        </form>
      </div>
    </section>
  );
}

export default ResetPass;
