import React from "react";
import { render } from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./store";
import { Provider } from "react-redux";

//persist로 새로고침시 유지
import { PersistGate } from "redux-persist/integration/react";

const component = document.getElementById("root");
render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  component
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
