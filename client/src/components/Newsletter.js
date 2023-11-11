import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { newsletterSubAction } from "../redux/slices/home/newsletterSlice";
import { FormItem } from "./components";
import ErrorInlineMessage from "./ErrorInlineMessage";

const formSchema = Yup.object({
  email: Yup.string().required("Required field"),
});

function Newsletter() {
  const dispatch = useDispatch();
  const newsletter = useSelector((state) => state?.newsletter);
  const { appErr, serverErr, subbed } = newsletter;
  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: (values) => {
      dispatch(newsletterSubAction(values));
    },
    validationSchema: formSchema,
  });
  return (
    <section class="py-5">
      <div class="container">
        <div class="bg-dark border rounded border-dark d-flex flex-column justify-content-between align-items-center flex-lg-row p-4 p-lg-5">
          <div class="text-center text-lg-start py-3 py-lg-1">
            <h2 class="fw-bold mb-2">Subscribe to our newsletter</h2>
            <p class="mb-0">
              And you'll get informed on free-trial oppurtunites and special
              discounts
            </p>
          </div>
          {/* Display Err */}
          <form
            class="d-flex justify-content-center flex-wrap flex-lg-nowrap"
            onSubmit={formik.handleSubmit}
          >
            <ErrorInlineMessage appErr={appErr} serverErr={serverErr} />
            <FormItem formik={formik} name="email" />
            <div class="my-2">
              <button
                class={`btn ${
                  (subbed === true) & !appErr & !serverErr
                    ? "btn-warning disabled"
                    : "btn-primary"
                } shadow ms-2`}
                type="submit"
              >
                {(subbed === true) & !appErr & !serverErr
                  ? "Subscribed"
                  : "Subscribe"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
