import React from "react";
import assignRank from "../../utils/assignRank";

function CardInfo({ data, userAuth }) {
  return (
    <div
      id="cardEntrada-2"
      className="p-4 text-center shadow-lg m-5 rounded-5"
      style={{
        background: "var(--bs-purple)",
        width: "280px",
      }}
    >
      <img
        className="pt-2 w-50"
        src="assets/img/swiftui.png"
        alt="User profile"
      />
      <h3 className="text-white text-center pt-2">
        {userAuth?.user?.realname || userAuth?.user?.username}
      </h3>
      <p className="fw-bold pt-1 text-white p-0 m-0">
        {assignRank(data?.incomes[0]?.total - data?.expenses[0]?.total)}
      </p>
      <hr className="text-white" />
      <div className="col-12">
        <a
          href="/edit-profile"
          className="btn btn-primary"
          type="button"
          style={{
            background: "rgb(244, 66, 55)",
          }}
        >
          Edit Profile
        </a>
      </div>
    </div>
  );
}

export default CardInfo;
