import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../store/authSlice";

function Navbar() {
  var user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const backendUrl = "https://concert-backend-api.vercel.app/"

  function logout() {
    if (user) {
      axios.post(
        `${backendUrl}api/logout`,
        {},
        {
          headers: { Authorization: "Bearer " + user.token },
        }
      );
      dispatch(removeUser());
      navigate("/login");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <Link to={"/"} className="navbar-brand concertNation">
        Concert Nation
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink
              to={"/"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/allevents"}
              className={
                "nav-link " + ((status) => (status.isActive ? "active" : ""))
              }
            >
              Events
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/mybookings"
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "")
              }
            >
              Bookings
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {user ? (
            <li className="nav-item">
              <span className="nav-link" onClick={logout}>
                Logout
              </span>
            </li>
          ) : (
            <li className="nav-item">
              <NavLink
                to={"/login"}
                className={
                  "nav-link " + ((status) => (status.isActive ? "active" : ""))
                }
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
