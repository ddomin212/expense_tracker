import React from "react";

const Starter = () => {
  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="row mb-4 mb-lg-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <p className="fw-bold text-success mb-2">
              How to start saving money NOW!
            </p>
            <h3 className="fw-bold">Starter Guide</h3>
          </div>
        </div>
        <div
          className="row row-cols-1 row-cols-md-2 mx-auto"
          style={{
            maxWidth: "900px",
          }}
        >
          <div className="col mb-5">
            <img
              className="rounded img-fluid shadow"
              src="assets/img/mobile.3536c1f8.png"
            />
          </div>
          <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
            <div>
              <h5 className="fw-bold">Import various accounts</h5>
              <p className="text-muted mb-4">
                Import your account from your bank or various FinTech apps
                (DeGiro, XTB, EToro, Robinhood)
              </p>
              <button className="btn btn-primary shadow" type="button">
                Importing accounts
              </button>
            </div>
          </div>
        </div>
        <div
          className="row row-cols-1 row-cols-md-2 mx-auto"
          style={{
            maxWidth: "900px",
          }}
        >
          <div className="col order-md-last mb-5">
            <img
              className="rounded img-fluid shadow"
              src="assets/img/cash-hero-TP.jpg"
            />
          </div>
          <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
            <div>
              <h5 className="fw-bold">Add your cash funds</h5>
              <p className="text-muted mb-4">
                We always have cash laying around, remember to check under all
                your family mattresses
              </p>
              <button className="btn btn-primary shadow" type="button">
                Adding cash funds
              </button>
            </div>
          </div>
        </div>
        <div
          className="row row-cols-1 row-cols-md-2 mx-auto"
          style={{
            maxWidth: "900px",
          }}
        >
          <div className="col mb-5">
            <img
              className="rounded img-fluid shadow"
              src="assets/img/The-trouble-with-graphs.jpg"
            />
          </div>
          <div className="col d-md-flex align-items-md-end align-items-lg-center mb-5">
            <div>
              <h5 className="fw-bold">Visualize your expenses</h5>
              <p className="text-muted mb-4">
                We offer charts to see if your hard-earned cash is going to the
                right places
              </p>
              <button className="btn btn-primary shadow" type="button">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Starter;
