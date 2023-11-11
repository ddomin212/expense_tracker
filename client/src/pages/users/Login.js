import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUserAction } from "../../redux/slices/users/usersSlice";
import { useEffect } from "react";
import { auth } from "../../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import ErrorInlineMessage from "../../components/ErrorInlineMessage";
import FormItem from "../../components/FormItem";

const formSchema = Yup.object({
  email: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
});

const LoginButtons = ({ userIsLoading, dispatch }) => {
  const loginWithGoogle = () => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      dispatch(
        loginUserAction({ email: res.user.email, password: res.user.uid })
      );
    });
  };

  return (
    <div>
      <button
        type="submit"
        className="btn btn-primary py-2 w-100 mb-4"
        disabled={userIsLoading}
        style={{ marginTop: "12px" }}
      >
        Login
      </button>
      <button
        class="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center py-2 w-100 mb-4"
        type="button"
        onClick={loginWithGoogle}
        style={{ marginTop: "-6px" }}
      >
        Login with
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-12 0 512 512"
          width="1em"
          height="1em"
          fill="currentColor"
          style={{ fontSize: "19px", marginLeft: "10px" }}
        >
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
        </svg>
      </button>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userIsLoading, userAuth } = user;

  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      token2fa: "",
    },
    onSubmit: (values) => {
      dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    if (userAuth) {
      navigate("/dashboard");
    }
  }, [userAuth]);

  return (
    <section
      style={{ height: "100vh" }}
      className="position-relative py-5  overflow-hidden bg-dark"
    >
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                Budget like a pro!
              </h2>
              <hr className="text-warning w-100" />
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              {/* Display Err */}

              <ErrorInlineMessage
                appErr={userAppErr}
                serverErr={userServerErr}
              />
              <form onSubmit={formik.handleSubmit}>
                <FormItem formik={formik} name="email" />
                <FormItem formik={formik} name="password" />
                <FormItem formik={formik} name="token2fa" />
                <LoginButtons
                  userIsLoading={userIsLoading}
                  dispatch={dispatch}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
