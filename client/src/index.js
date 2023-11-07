import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import "./config/firebaseConfig";
import store from "./redux/store/store";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleReCaptchaProvider
      reCaptchaKey="6Lefp2YkAAAAACKM9xuRDeqOId_xIAGRT4W-_uNZ"
      language="en"
      useRecaptchaNet="true"
      container={{
        // optional to render inside custom element
        element: "recaptcha-container",
        parameters: {
          badge: "bottomleft", // optional, default undefined
          theme: "dark", // optional, default undefined
        },
      }}
    >
      <App />
    </GoogleReCaptchaProvider>
  </Provider>
);
