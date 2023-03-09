import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./appStore";
import { Provider } from "react-redux";
// import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import { SnackbarProvider } from 'notistack';
import DatePicker from 'react-dater';
import './translation/i18n';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <SnackbarProvider preventDuplicate hideIconVariant={true}>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
