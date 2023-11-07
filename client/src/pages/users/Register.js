import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../config/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  loginUserAction,
  registerUserAction,
} from "../../redux/slices/users/usersSlice";
//form validation
const formSchema = Yup.object({
  username: Yup.string().required("Required field"),
  realname: Yup.string().required("Required field"),
  email: Yup.string().required("Required field"),
  password: Yup.string().required("Required field"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [method, setMethod] = useState("email");
  const [uid, setUid] = useState("");
  const [email, setEmail] = useState("");
  const user = useSelector((state) => state?.users);
  const { userAppErr, userServerErr, userIsLoading, userAuth } = user;
  //formik form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });
  const signUpWithGoogle = () => {
    setMethod("google");
    signInWithPopup(auth, new GoogleAuthProvider()).then((res) => {
      console.log(res);
      const resObj = {
        email: res.user.email,
        password: res.user.uid,
        realname: res.user.displayName,
        username: res.user.providerId + res.user.uid,
        googleRegister: true,
      };
      setEmail(res.user.email);
      setUid(res.user.uid);
      dispatch(registerUserAction(resObj));
    });
  };
  useEffect(() => {
    if (userAuth && method === "google") {
      dispatch(loginUserAction({ email, password: uid }));
    }
    if (userAuth?.token) {
      setUid("");
      setEmail("");
      navigate("/dashboard");
    }
  }, [userAuth]);

  return (
    <section className="position-relative py-5 overflow-hidden vh-100">
      <div className="d-none d-md-block position-absolute top-0 start-0 bg-dark w-75 h-100"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 text-white">
                A small step for man but a giant leap for your financial freedom
              </h2>
            </div>
          </div>
          <div className="col-12 col-lg-5 ms-auto">
            <div className="p-5 bg-light rounded text-center">
              <form onSubmit={formik.handleSubmit}>
                {/* Display err here */}
                {userAppErr || userServerErr ? (
                  <div class="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null}
                <input
                  value={formik.values.realname}
                  onChange={formik.handleChange("realname")}
                  onBlur={formik.handleBlur("realname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Real Name"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.realname && formik.errors.realname}
                </div>
                <input
                  value={formik.values.username}
                  onChange={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Username"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.username && formik.errors.username}
                </div>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="Email"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary py-2 w-100 mb-4"
                  disabled={userIsLoading}
                  style={{ marginTop: "12px" }}
                >
                  Register
                </button>
                <button
                  class="btn btn-primary d-xxl-flex justify-content-xxl-center align-items-xxl-center py-2 w-100 mb-4"
                  type="button"
                  onClick={() => signUpWithGoogle()}
                  style={{ marginTop: "-6px" }}
                >
                  Sign up with
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

                {userAuth ? (
                  <>
                    <div class="alert alert-success" role="alert">
                      Check your email to verify your account, also we require
                      2FA so scan the QR code below
                    </div>
                    <img
                      src={userAuth.data}
                      alt="..."
                      style={{ width: "200px", height: "200px" }}
                    />
                  </>
                ) : null}
                <p style={{ color: "#000000" }}>
                  Already have an account, <a href="/login">then log in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
