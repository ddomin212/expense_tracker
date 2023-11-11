import React from "react";

import Newsletter from "../components/Newsletter";

const Home2 = () => {
  return (
    <>
      <header class="bg-dark">
        <div class="container pt-4 pt-xl-5">
          <section class="py-4 py-xl-5">
            <div class="container h-100">
              <div class="row h-100">
                <div class="col-md-10 col-xl-8 text-center d-flex d-sm-flex d-md-flex justify-content-center align-items-center mx-auto justify-content-md-start align-items-md-center justify-content-xl-center">
                  <div>
                    <h2 class="text-uppercase fw-bold mb-3">
                      are you a frugal person who also invests in the stock
                      market?
                    </h2>
                    <p class="mb-4">
                      Then this might be just the budgeting app for you, since
                      we ALSO offer integration with XTB, DeGiro and other
                      popular fintech platforms
                    </p>
                    <a
                      class="btn btn-primary fs-5 me-2 py-2 px-4"
                      type="button"
                      href="/register"
                    >
                      Free Trial
                    </a>
                    <a
                      class="btn btn-outline-primary fs-5 py-2 px-4"
                      type="button"
                      href="/buy"
                    >
                      Subscribe
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>
      <section>
        <div class="container bg-dark py-5">
          <div class="row">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <p class="fw-bold text-success mb-2">Our Services</p>
              <h3 class="fw-bold">
                How do we differ from other budgeting apps?
              </h3>
            </div>
          </div>
          <div class="py-5 p-lg-5">
            <div
              class="row row-cols-1 row-cols-md-2 mx-auto"
              style={{ maxWidth: "900px" }}
            >
              <div class="col mb-5">
                <div class="card shadow-sm">
                  <div class="card-body px-4 py-5 px-md-5">
                    <div
                      class="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -32 576 576"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        class="text-success"
                      >
                        <path d="M550.5 241l-50.089-86.786c1.071-2.142 1.875-4.553 1.875-7.232 0-8.036-6.696-14.733-14.732-15.001l-55.447-95.893c.536-1.607 1.071-3.214 1.071-4.821 0-8.571-6.964-15.268-15.268-15.268-4.821 0-8.839 2.143-11.786 5.625H299.518C296.839 18.143 292.821 16 288 16s-8.839 2.143-11.518 5.625H170.411C167.464 18.143 163.447 16 158.625 16c-8.303 0-15.268 6.696-15.268 15.268 0 1.607.536 3.482 1.072 4.821l-55.983 97.233c-5.356 2.41-9.107 7.5-9.107 13.661 0 .535.268 1.071.268 1.607l-53.304 92.143c-7.232 1.339-12.59 7.5-12.59 15 0 7.232 5.089 13.393 12.054 15l55.179 95.358c-.536 1.607-.804 2.946-.804 4.821 0 7.232 5.089 13.393 12.054 14.732l51.697 89.732c-.536 1.607-1.071 3.482-1.071 5.357 0 8.571 6.964 15.268 15.268 15.268 4.821 0 8.839-2.143 11.518-5.357h106.875C279.161 493.857 283.447 496 288 496s8.839-2.143 11.518-5.357h107.143c2.678 2.946 6.696 4.821 10.982 4.821 8.571 0 15.268-6.964 15.268-15.268 0-1.607-.267-2.946-.803-4.285l51.697-90.268c6.964-1.339 12.054-7.5 12.054-14.732 0-1.607-.268-3.214-.804-4.821l54.911-95.358c6.964-1.339 12.322-7.5 12.322-15-.002-7.232-5.092-13.393-11.788-14.732zM153.535 450.732l-43.66-75.803h43.66v75.803zm0-83.839h-43.66c-.268-1.071-.804-2.142-1.339-3.214l44.999-47.41v50.624zm0-62.411l-50.357 53.304c-1.339-.536-2.679-1.34-4.018-1.607L43.447 259.75c.535-1.339.535-2.679.535-4.018s0-2.41-.268-3.482l51.965-90c2.679-.268 5.357-1.072 7.768-2.679l50.089 51.965v92.946zm0-102.322l-45.803-47.41c1.339-2.143 2.143-4.821 2.143-7.767 0-.268-.268-.804-.268-1.072l43.928-15.804v72.053zm0-80.625l-43.66 15.804 43.66-75.536v59.732zm326.519 39.108l.804 1.339L445.5 329.125l-63.75-67.232 98.036-101.518.268.268zM291.75 355.107l11.518 11.786H280.5l11.25-11.786zm-.268-11.25l-83.303-85.446 79.553-84.375 83.036 87.589-79.286 82.232zm5.357 5.893l79.286-82.232 67.5 71.25-5.892 28.125H313.714l-16.875-17.143zM410.411 44.393c1.071.536 2.142 1.072 3.482 1.34l57.857 100.714v.536c0 2.946.803 5.624 2.143 7.767L376.393 256l-83.035-87.589L410.411 44.393zm-9.107-2.143L287.732 162.518l-57.054-60.268 166.339-60h4.287zm-123.483 0c2.678 2.678 6.16 4.285 10.179 4.285s7.5-1.607 10.179-4.285h75L224.786 95.821 173.893 42.25h103.928zm-116.249 5.625l1.071-2.142a33.834 33.834 0 0 0 2.679-.804l51.161 53.84-54.911 19.821V47.875zm0 79.286l60.803-21.964 59.732 63.214-79.553 84.107-40.982-42.053v-83.304zm0 92.678L198 257.607l-36.428 38.304v-76.072zm0 87.858l42.053-44.464 82.768 85.982-17.143 17.678H161.572v-59.196zm6.964 162.053c-1.607-1.607-3.482-2.678-5.893-3.482l-1.071-1.607v-89.732h99.91l-91.607 94.821h-1.339zm129.911 0c-2.679-2.41-6.428-4.285-10.447-4.285s-7.767 1.875-10.447 4.285h-96.429l91.607-94.821h38.304l91.607 94.821H298.447zm120-11.786l-4.286 7.5c-1.339.268-2.41.803-3.482 1.339l-89.196-91.875h114.376l-17.412 83.036zm12.856-22.232l12.858-60.803h21.964l-34.822 60.803zm34.822-68.839h-20.357l4.553-21.16 17.143 18.214c-.535.803-1.071 1.874-1.339 2.946zm66.161-107.411l-55.447 96.697c-1.339.535-2.679 1.071-4.018 1.874l-20.625-21.964 34.554-163.928 45.803 79.286c-.267 1.339-.803 2.678-.803 4.285 0 1.339.268 2.411.536 3.75z"></path>
                      </svg>
                    </div>
                    <h5 class="fw-bold card-title">
                      Unparalleled connectivity
                    </h5>
                    <p class="text-muted card-text mb-4">
                      From banks to trading apps, we can handle it all and give
                      you the most recent data avaiable
                    </p>
                    <button class="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div class="col mb-5">
                <div class="card shadow-sm">
                  <div class="card-body px-4 py-5 px-md-5">
                    <div
                      class="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <i class="icon ion-coffee text-success"></i>
                    </div>
                    <h5 class="fw-bold card-title">Payment recognition</h5>
                    <p class="text-muted card-text mb-4">
                      Our very smart AI friend can recognize if your expense is
                      from your barber shop or local hipster coffe shop
                    </p>
                    <button class="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div class="col mb-4">
                <div class="card shadow-sm">
                  <div class="card-body px-4 py-5 px-md-5">
                    <div
                      class="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        class="bi bi-shield-lock text-success"
                      >
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z"></path>
                      </svg>
                    </div>
                    <h5 class="fw-bold card-title">Privacy is key</h5>
                    <p class="text-muted card-text mb-4">
                      We won't sell your data <br />
                      to the Chinese goverment, <br />
                      or any other for that matter.
                    </p>
                    <button class="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
              <div class="col mb-4">
                <div class="card shadow-sm">
                  <div class="card-body px-4 py-5 px-md-5">
                    <div
                      class="bs-icon-lg d-flex justify-content-center align-items-center mb-3 bs-icon"
                      style={{
                        top: "1rem",
                        right: "1rem",
                        position: "absolute",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        class="bi bi-shield-exclamation text-success"
                      >
                        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"></path>
                        <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"></path>
                      </svg>
                    </div>
                    <h5 class="fw-bold card-title">Maximum security</h5>
                    <p class="text-muted card-text mb-4">
                      Although inconvinient, we require two-factor
                      authentihication for maximum security of your account,
                      we're talking money here after all...
                    </p>
                    <button class="btn btn-primary shadow" type="button">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="row">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
          <h3 class="fw-bold">When should you use our app?</h3>
        </div>
      </div>
      <section>
        <div class="container py-5">
          <div class="mx-auto" style={{ maxWidth: "900px" }}>
            <div class="row row-cols-1 row-cols-md-2 d-flex justify-content-center">
              <div class="col mb-4">
                <div class="card bg-primary-light">
                  <div class="card-body text-center px-4 py-5 px-md-5">
                    <p class="fw-bold text-primary card-text mb-2">
                      We all remember our student years where we had to penny
                      pinch just to get by the next week
                    </p>
                    <h5 class="fw-bold card-title mb-3">Student</h5>
                  </div>
                </div>
              </div>
              <div class="col mb-4">
                <div class="card bg-secondary-light">
                  <div class="card-body text-center px-4 py-5 px-md-5">
                    <p class="fw-bold text-secondary card-text mb-2">
                      Saving up for something can be hard, especially if we
                      can't see the accumulated sum of our day-to-day spending
                    </p>
                    <h5 class="fw-bold card-title mb-3">Saving Up</h5>
                  </div>
                </div>
              </div>
              <div class="col mb-4">
                <div class="card bg-info-light">
                  <div class="card-body text-center px-4 py-5 px-md-5">
                    <p class="fw-bold text-info card-text mb-2">
                      How many unessential things do we buy in a day, a month, a
                      year? We have to deal with all the accumulated stuff down
                      the line, might as well just not buy it at all.
                    </p>
                    <h5 class="fw-bold card-title mb-3">Minimalism</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="py-5 mt-5">
        <div class="container py-5">
          <div class="row mb-5">
            <div class="col-md-8 col-xl-6 text-center mx-auto">
              <p class="fw-bold text-success mb-2">Testimonials</p>
              <h2 class="fw-bold">
                <strong>What People Say About us</strong>
              </h2>
              <p class="text-muted">
                No matter the project, our team can handle it.&nbsp;
              </p>
            </div>
          </div>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 d-sm-flex justify-content-sm-center">
            <div class="col mb-4">
              <div class="d-flex flex-column align-items-center align-items-sm-start">
                <p class="bg-dark border rounded border-dark p-4">
                  This app enabled me to save up for a new car and a phone to
                  top it off. Love it!
                </p>
                <div class="d-flex">
                  <img
                    class="rounded-circle flex-shrink-0 me-3 fit-cover"
                    width="50"
                    height="50"
                    src="assets/img/team/avatar2.jpg"
                  />
                  <div>
                    <p class="fw-bold text-primary mb-0">Pablo Especia</p>
                    <p class="text-muted mb-0"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4">
              <div class="d-flex flex-column align-items-center align-items-sm-start">
                <p class="bg-dark border rounded border-dark p-4">
                  This app saves me from buying bull*hit I don't need while
                  saving me money. Wonderful!
                </p>
                <div class="d-flex">
                  <img
                    class="rounded-circle flex-shrink-0 me-3 fit-cover"
                    width="50"
                    height="50"
                    src="assets/img/team/avatar4.jpg"
                  />
                  <div>
                    <p class="fw-bold text-primary mb-0">John Smith</p>
                    <p class="text-muted mb-0"></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col mb-4">
              <div class="d-flex flex-column align-items-center align-items-sm-start">
                <p class="bg-dark border rounded border-dark p-4">
                  Nothing special, expected more connectivity and features,
                  guess I'll have to look elsewhere
                </p>
                <div class="d-flex">
                  <img
                    class="rounded-circle flex-shrink-0 me-3 fit-cover"
                    width="50"
                    height="50"
                    src="assets/img/team/avatar5.jpg"
                  />
                  <div>
                    <p class="fw-bold text-primary mb-0">Lucy Wandersnow</p>
                    <p class="text-muted mb-0"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  );
};

export default Home2;
