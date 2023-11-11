import React from "react";

import { useSelector } from "react-redux";
import baseUrl from "../utils/baseUrl";

const PricingTiles = () => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  return (
    <>
      <section className="py-5">
        <div className="container py-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2 className="fw-bold">Subscriptions</h2>
              <p className="text-muted">
                We can't give you our services for free, computing costs
                money...
              </p>
            </div>
          </div>
          <div className="row g-0 row-cols-1 row-cols-md-2 row-cols-xl-3 d-flex align-items-md-center align-items-xl-center">
            <div className="col offset-xl-2 mb-4">
              <div className="card bg-dark border-dark">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="fw-bold mb-0">Basic</h3>
                      <p>to see if it sticks</p>
                      <h4 className="display-4 fw-bold">$1/month</h4>
                    </div>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Bank Integration</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Dark Mode</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-primary-light bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Manual Payment Input</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="btn btn-primary d-block w-100"
                    type="button"
                    href={`${baseUrl}/stripe/User?id=${userAuth?.user?.id}`}
                  >
                    Subscribe NOW!
                  </a>
                </div>
              </div>
            </div>
            <div className="col mb-4">
              <div className="card text-white bg-primary">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="fw-bold text-white mb-0">Pro</h3>
                      <p>to control your budget</p>
                      <h4 className="display-4 fw-bold text-white">
                        $10/month
                      </h4>
                    </div>
                    <div>
                      <span className="badge rounded-pill bg-primary text-uppercase bg-semi-white">
                        Best Value
                      </span>
                    </div>
                  </div>
                  <div>
                    <ul className="list-unstyled">
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Bank and FinTechApps</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Pletherea of visualizations</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>AI payment recognition</span>
                      </li>
                      <li className="d-flex mb-2">
                        <span className="bs-icon-xs bs-icon-rounded bs-icon-semi-white bs-icon bs-icon-xs me-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="bi bi-check-lg text-primary"
                          >
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                          </svg>
                        </span>
                        <span>Payment Input Automation</span>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="btn btn-primary d-block w-100 bg-semi-white"
                    type="button"
                    href={`${baseUrl}/stripe/Pro?id=${userAuth?.user?.id}`}
                  >
                    Subscribe NOW!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PricingTiles;
