import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/slices/users/usersSlice";
import { verifyPassAction } from "../../redux/slices/auth/authSlice";
import FormItem from "../FormItem";

const formSchema = Yup.object({
  email: Yup.string(),
  username: Yup.string(),
  realname: Yup.string(),
  old_password: Yup.string(),
  new_password: Yup.string(),
});

const EditContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userAuth, userServerErr, userAppErr, updated } = useSelector(
    (state) => state?.users
  );

  const { verified, appErr, serverErr, loading } = useSelector(
    (state) => state?.auth
  );

  const handleUserUpdate = (values, userAuth) => {
    const { email, username, realname, new_password } = values;
    const valueObj = {
      email,
      username,
      realname,
      password: new_password,
    };
    dispatch(updateUserAction({ values: valueObj, id: userAuth?.user?.id }));
    navigate("/profile");
  };

  const formik = useFormik({
    initialValues: {
      email: userAuth?.user?.email,
      username: userAuth?.user?.username,
      realname: userAuth?.user?.realname,
      old_password: "",
      new_password: "",
    },
    onSubmit: (values) => handleUserUpdate(values, userAuth),
    validationSchema: formSchema,
  });

  return (
    <section className="py-5 bg-gray vh-100">
      <div className="container text-center">
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-dark">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(
                    verifyPassAction({ password: formik.values?.old_password })
                  );
                  if (verified) {
                    formik.handleSubmit(e);
                  }
                }}
              >
                <span className="text-muted">Profile</span>
                <h2 className="mb-4 fw-light">Edit your profile</h2>
                <FormItem formik={formik} name="username" />
                <FormItem formik={formik} name="realname" />
                <FormItem formik={formik} name="email" />
                <FormItem formik={formik} name="old_password" type="password" />
                <FormItem formik={formik} name="new_password" type="password" />
                <button
                  type="submit"
                  className={`btn ${
                    updated ? "btn-success disabled" : "btn-primary"
                  } mb-4 w-100`}
                >
                  {updated === true ? "Updated" : "Update"}
                </button>
                {serverErr || appErr ? (
                  <div className="alert alert-danger" role="alert">
                    {serverErr} {appErr}
                  </div>
                ) : null}
                {userServerErr || userAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContent;
