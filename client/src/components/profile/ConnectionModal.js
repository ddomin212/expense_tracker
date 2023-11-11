import React, { useState } from "react";
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

function ConnectionModal({ type }) {
  const dispatch = useDispatch();
  const [connect, setConnect] = useState(false);
  const [disconnect, setDisconnect] = useState(false);

  const handleConnect = (type, values) => {
    if (type === "fio") {
      dispatch(connectFioAction({ apiKey: values.apiKey, from: values.from }));
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
  };

  const formik = useFormik({
    initialValues: {
      apiKey: "",
      password: "",
      from: new Date(),
    },
    onSubmit: (values) => handleConnect(type, values),
    validationSchema: formSchema,
  });

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

  return (
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
  );
}

export default ConnectionModal;
