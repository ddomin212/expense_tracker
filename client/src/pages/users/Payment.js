import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchUserPayment } from "../../redux/slices/users/paymentSlice";
import { updateUserAction } from "../../redux/slices/users/usersSlice";
function Payment() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { payment } = useSelector((state) => state?.payment);
  const { userAuth } = useSelector((state) => state?.users);

  const verifyPayment = () => {
    if (payment?.verificationToken === searchParams.get("session_id")) {
      dispatch(
        updateUserAction({
          values: { role: searchParams.get("type") },
          id: userAuth?.user?.id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchUserPayment());
  }, []);

  useEffect(() => {
    verifyPayment();
  }, [payment]);

  return (
    <section class="py-4 py-xl-5">
      <div class="container">
        <h1 class="text-center">
          {payment?.verificationToken === searchParams.get("session_id")
            ? "Your payment has been processed successfuly!"
            : "Unauthorized"}
        </h1>
      </div>
      <div class="container d-flex justify-content-center">
        <a
          href="/login"
          class="btn btn-primary"
          type="button"
          style={{ marginTop: "32px", width: "200px", height: "50px" }}
        >
          Log In
        </a>
      </div>
    </section>
  );
}

export default Payment;
