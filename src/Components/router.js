import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import DisplayEvents from "./allevents";
import Details from "./Details";
import ConfirmedBooking from "./confirmedTicket";
import Mybookings from "./mybookings";
import RegisterEvent from "./Admin/RegisterEvent";
import UpdateEvent from "./Admin/UpdateEvent";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/allevents", element: <DisplayEvents /> },
  { path: "/details/:eventId", element: <Details /> },
  { path: "/confirmedTicket/:eventId", element: <ConfirmedBooking /> },
  { path: "/mybookings", element: <Mybookings /> },
  { path: "/register_event", element: <RegisterEvent /> },
  { path: "/update_event/:event_Id", element: <UpdateEvent /> },
]);

export default router;
