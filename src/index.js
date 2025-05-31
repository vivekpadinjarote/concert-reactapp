import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./Components/router";
import { Provider } from "react-redux";
import store from "./store/store";
import AutoLogin from "./Components/auth/AutoLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AutoLogin>
      <RouterProvider router={router} />
    </AutoLogin>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
