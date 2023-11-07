import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  connectFioAction,
  disconnectFioAction,
} from "../../redux/slices/connect/fioSlice";
import {
  connectDegiroAction,
  disconnectDegiroAction,
} from "../../redux/slices/connect/degiroSlice";
import {
  connectXtbAction,
  disconnectXtbAction,
} from "../../redux/slices/connect/xtbSlice";
const formSchema = Yup.object({
  apiKey: Yup.string().required("Required field"),
  password: Yup.string(),
  from: Yup.date(),
});
const Connections = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [connect, setConnect] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  const { loading, appErr, serverErr } = useSelector((state) => {
    if (type === "fio") {
      return state.fio;
    } else if (type === "degiro") {
      return state.degiro;
    } else if (type === "xtb") {
      return state.xtb;
    } else {
      return {
        loading: false,
        connected: false,
        disconnected: false,
        appErr: undefined,
        serverErr: undefined,
      };
    }
  });
  const { userAuth, userServerErr, userAppErr } = useSelector(
    (state) => state.users
  );

  const formik = useFormik({
    initialValues: {
      apiKey: "",
      password: "",
      from: new Date(),
    },
    onSubmit: (values) => {
      if (type === "fio") {
        dispatch(
          connectFioAction({ apiKey: values.apiKey, from: values.from })
        );
      } else if (type === "degiro") {
        dispatch(
          connectDegiroAction({
            degiroId: values.apiKey,
            degiroPass: values.password,
          })
        );
      } else if (type === "xtb") {
        dispatch(
          connectXtbAction({ xtbId: values.apiKey, xtbPass: values.password })
        );
      }
      values.apiKey = "";
      values.password = "";
    },
    validationSchema: formSchema,
  });
  useEffect(() => {
    console.log(type, connect, disconnect);
  }, [type, connect, disconnect]);
  return (
    <>
      {type !== "" && (
        <div
          className={`modal fade justify-content-center align-items-center`}
          role="dialog"
          tabIndex={-1}
          id="modal-1"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4
                  className="modal-title"
                  style={{
                    color: "rgb(0, 0, 0)",
                  }}
                >
                  Connect
                </h4>
                <button
                  type="button"
                  onClick={() => {
                    setConnect(false);
                    setDisconnect(false);
                  }}
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                {appErr || serverErr ? (
                  <div class="alert alert-danger" role="alert">
                    {serverErr} {appErr}
                  </div>
                ) : null}
                <p
                  className="text-center"
                  style={{
                    color: "rgb(0, 0, 0)",
                    fontSize: "24px",
                  }}
                >
                  {type === "degiro"
                    ? "Username"
                    : type === "xtb"
                    ? "XTB ID (right next to your account name)"
                    : "API Key"}
                </p>
                <input
                  type="text"
                  className="form-control"
                  value={formik.values.apiKey}
                  onChange={formik.handleChange("apiKey")}
                  onBlur={formik.handleBlur("apiKey")}
                  name="apiKey"
                />
                {type === "degiro" || type === "xtb" ? (
                  <>
                    <p
                      className="text-center"
                      style={{
                        color: "rgb(0, 0, 0)",
                        fontSize: "24px",
                      }}
                    >
                      Password
                    </p>
                    <input
                      type="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange("password")}
                      onBlur={formik.handleBlur("password")}
                      name="password"
                    />
                  </>
                ) : (
                  <>
                    <p
                      className="text-center"
                      style={{
                        color: "rgb(0, 0, 0)",
                        fontSize: "24px",
                      }}
                    >
                      Import from:
                    </p>
                    <input
                      type="date"
                      className="form-control"
                      value={formik.values.from}
                      onChange={formik.handleChange("from")}
                      onBlur={formik.handleBlur("from")}
                      name="from"
                    />
                  </>
                )}
                {type === "fio" ? (
                  <p
                    className="text-center"
                    style={{
                      color: "rgb(0, 0, 0)",
                      marginTop: "16px",
                    }}
                  >
                    Don't know your Fio API Key? Visit{" "}
                    <a href="https://www.youtube.com/watch?v=-CwSJUQfowg&feature=youtu.be">
                      here...
                    </a>
                  </p>
                ) : null}
              </div>
              <div className="modal-footer">
                <button
                  className={`btn ${
                    disconnect === true ? "btn-success disabled" : "btn-primary"
                  } shadow`}
                  type="button"
                  onClick={() => {
                    if (type === "fio") {
                      dispatch(disconnectFioAction());
                    } else if (type === "degiro") {
                      dispatch(disconnectDegiroAction());
                    } else {
                      dispatch(disconnectXtbAction());
                    }
                    setDisconnect(true);
                  }}
                >
                  {disconnect === true ? "Disconnected" : "Disconnect"}
                </button>
                <button
                  className={`btn ${
                    connect === true ? "btn-success disabled" : "btn-primary"
                  } shadow`}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setConnect(true);
                    formik.handleSubmit();
                  }}
                >
                  {connect === true ? "Send" : "Sent"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Connections */}
      <div
        className="container text-white bg-primary border rounded border-0 p-4 p-lg-5 py-4 py-xl-5"
        style={{
          maxWidth: "75%",
        }}
      >
        {userServerErr || userAppErr ? (
          <div className="alert alert-danger" role="alert">
            {userServerErr} {userAppErr}
          </div>
        ) : null}
        <div className="row mb-5">
          <div className="col-md-8 col-xl-6 text-center mx-auto">
            <h2 className="text-white">FinTech connections</h2>
            <p>
              Connect to your favourite platforms regarding finance by clicking
              on their respective icon
            </p>
          </div>
        </div>
        <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
          <div className="col">
            <div className={"d-flex"}>
              <div className="bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-bank2"
                >
                  <path d="M8.277.084a.5.5 0 0 0-.554 0l-7.5 5A.5.5 0 0 0 .5 6h1.875v7H1.5a.5.5 0 0 0 0 1h13a.5.5 0 1 0 0-1h-.875V6H15.5a.5.5 0 0 0 .277-.916l-7.5-5zM12.375 6v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zm-2.5 0v7h-1.25V6h1.25zM8 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM.5 15a.5.5 0 0 0 0 1h15a.5.5 0 1 0 0-1H.5z" />
                </svg>
              </div>
              <div
                className="px-3"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#modal-1"
                onClick={() => setType("fio")}
              >
                <h4 className="text-white">Bank API</h4>
                <p />
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={
                userAuth?.user?.role === "Pro" ||
                userAuth?.user?.role === "Admin"
                  ? "d-flex"
                  : "d-none"
              }
            >
              <div className="bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="bi bi-gear-wide-connected"
                >
                  <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z" />
                </svg>
              </div>
              <div
                className="px-3"
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#modal-1"
                onClick={() =>
                  userAuth?.user?.role === "Pro" ||
                  userAuth?.user?.role === "Admin"
                    ? setType("degiro")
                    : setType("")
                }
              >
                <h4 className="text-white">DeGiro</h4>
                <p />
              </div>
            </div>
          </div>
          <div className="col">
            <div
              className={
                userAuth?.user?.role === "Pro" ||
                userAuth?.user?.role === "Admin"
                  ? "d-flex"
                  : "d-none"
              }
            >
              <div className="bs-icon-sm bs-icon-rounded bs-icon-semi-white text-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block mb-3 bs-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -32 576 576"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                >
                  {}
                  <path d="M550.5 241l-50.089-86.786c1.071-2.142 1.875-4.553 1.875-7.232 0-8.036-6.696-14.733-14.732-15.001l-55.447-95.893c.536-1.607 1.071-3.214 1.071-4.821 0-8.571-6.964-15.268-15.268-15.268-4.821 0-8.839 2.143-11.786 5.625H299.518C296.839 18.143 292.821 16 288 16s-8.839 2.143-11.518 5.625H170.411C167.464 18.143 163.447 16 158.625 16c-8.303 0-15.268 6.696-15.268 15.268 0 1.607.536 3.482 1.072 4.821l-55.983 97.233c-5.356 2.41-9.107 7.5-9.107 13.661 0 .535.268 1.071.268 1.607l-53.304 92.143c-7.232 1.339-12.59 7.5-12.59 15 0 7.232 5.089 13.393 12.054 15l55.179 95.358c-.536 1.607-.804 2.946-.804 4.821 0 7.232 5.089 13.393 12.054 14.732l51.697 89.732c-.536 1.607-1.071 3.482-1.071 5.357 0 8.571 6.964 15.268 15.268 15.268 4.821 0 8.839-2.143 11.518-5.357h106.875C279.161 493.857 283.447 496 288 496s8.839-2.143 11.518-5.357h107.143c2.678 2.946 6.696 4.821 10.982 4.821 8.571 0 15.268-6.964 15.268-15.268 0-1.607-.267-2.946-.803-4.285l51.697-90.268c6.964-1.339 12.054-7.5 12.054-14.732 0-1.607-.268-3.214-.804-4.821l54.911-95.358c6.964-1.339 12.322-7.5 12.322-15-.002-7.232-5.092-13.393-11.788-14.732zM153.535 450.732l-43.66-75.803h43.66v75.803zm0-83.839h-43.66c-.268-1.071-.804-2.142-1.339-3.214l44.999-47.41v50.624zm0-62.411l-50.357 53.304c-1.339-.536-2.679-1.34-4.018-1.607L43.447 259.75c.535-1.339.535-2.679.535-4.018s0-2.41-.268-3.482l51.965-90c2.679-.268 5.357-1.072 7.768-2.679l50.089 51.965v92.946zm0-102.322l-45.803-47.41c1.339-2.143 2.143-4.821 2.143-7.767 0-.268-.268-.804-.268-1.072l43.928-15.804v72.053zm0-80.625l-43.66 15.804 43.66-75.536v59.732zm326.519 39.108l.804 1.339L445.5 329.125l-63.75-67.232 98.036-101.518.268.268zM291.75 355.107l11.518 11.786H280.5l11.25-11.786zm-.268-11.25l-83.303-85.446 79.553-84.375 83.036 87.589-79.286 82.232zm5.357 5.893l79.286-82.232 67.5 71.25-5.892 28.125H313.714l-16.875-17.143zM410.411 44.393c1.071.536 2.142 1.072 3.482 1.34l57.857 100.714v.536c0 2.946.803 5.624 2.143 7.767L376.393 256l-83.035-87.589L410.411 44.393zm-9.107-2.143L287.732 162.518l-57.054-60.268 166.339-60h4.287zm-123.483 0c2.678 2.678 6.16 4.285 10.179 4.285s7.5-1.607 10.179-4.285h75L224.786 95.821 173.893 42.25h103.928zm-116.249 5.625l1.071-2.142a33.834 33.834 0 0 0 2.679-.804l51.161 53.84-54.911 19.821V47.875zm0 79.286l60.803-21.964 59.732 63.214-79.553 84.107-40.982-42.053v-83.304zm0 92.678L198 257.607l-36.428 38.304v-76.072zm0 87.858l42.053-44.464 82.768 85.982-17.143 17.678H161.572v-59.196zm6.964 162.053c-1.607-1.607-3.482-2.678-5.893-3.482l-1.071-1.607v-89.732h99.91l-91.607 94.821h-1.339zm129.911 0c-2.679-2.41-6.428-4.285-10.447-4.285s-7.767 1.875-10.447 4.285h-96.429l91.607-94.821h38.304l91.607 94.821H298.447zm120-11.786l-4.286 7.5c-1.339.268-2.41.803-3.482 1.339l-89.196-91.875h114.376l-17.412 83.036zm12.856-22.232l12.858-60.803h21.964l-34.822 60.803zm34.822-68.839h-20.357l4.553-21.16 17.143 18.214c-.535.803-1.071 1.874-1.339 2.946zm66.161-107.411l-55.447 96.697c-1.339.535-2.679 1.071-4.018 1.874l-20.625-21.964 34.554-163.928 45.803 79.286c-.267 1.339-.803 2.678-.803 4.285 0 1.339.268 2.411.536 3.75z" />
                </svg>
              </div>
              <div
                className={"px-3"}
                style={{ cursor: "pointer" }}
                data-bs-toggle="modal"
                data-bs-target="#modal-1"
                onClick={() => setType("xtb")}
              >
                <h4 className="text-white">XTB</h4>
                <p />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Connections;
