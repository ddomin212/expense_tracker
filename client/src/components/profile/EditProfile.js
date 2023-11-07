import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/slices/users/usersSlice";
import { verifyPassAction } from "../../redux/slices/auth/authSlice";
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
  const formik = useFormik({
    initialValues: {
      email: userAuth?.user?.email,
      username: userAuth?.user?.username,
      realname: userAuth?.user?.realname,
      old_password: "",
      new_password: "",
    },
    onSubmit: (values) => {
      const { email, username, realname, new_password } = values;
      const valueObj = {
        email,
        username,
        realname,
        password: new_password,
      };
      dispatch(updateUserAction({ values: valueObj, id: userAuth?.user?.id }));
      navigate("/profile");
    },
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
                {/* Display Err */}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.username}
                    onChange={formik.handleChange("username")}
                    onBlur={formik.handleBlur("username")}
                    className="form-control"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                {/* Err */}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.realname}
                    onChange={formik.handleChange("realname")}
                    onBlur={formik.handleBlur("realname")}
                    className="form-control"
                    type="text"
                    placeholder="Name"
                  />
                </div>

                <div className="mb-3 input-group">
                  <input
                    value={formik.values.email}
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    className="form-control"
                    type="text"
                    placeholder="Enter Email"
                  />
                </div>
                {/* Err */}
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.old_password}
                    onChange={formik.handleChange("old_password")}
                    onBlur={formik.handleBlur("old_password")}
                    className="form-control"
                    type="text"
                    placeholder="Old Password"
                  />
                </div>
                <div className="mb-3 input-group">
                  <input
                    value={formik.values.new_password}
                    onChange={formik.handleChange("new_password")}
                    onBlur={formik.handleBlur("new_password")}
                    className="form-control"
                    type="text"
                    placeholder="Enter New Password"
                  />
                </div>
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
