import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrorMessage] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function attemptLogin() {
    axios
      .post("http://localhost:8080/api/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        setErrorMessage([]);
        const token = response.data.token;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiry = payload.exp * 1000;

        localStorage.setItem("tokenExpiry", expiry);
        var user = {
          email: response.data.user.email,
          token: token,
          role: response.data.user.role,
        };
        dispatch(setUser(user));

        navigate("/");
      })
      .catch((err) => {
        if (err.response.data.errors) {
          setErrorMessage(err.response.data.errors);
        } else if (err.response.data.message) {
          setErrorMessage([err.response.data.message]);
        } else {
          setErrorMessage(["Failed to Login"]);
        }
      });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 form">
            <h1 className="my-4 playwrite-de-grund-headfont">Login</h1>
            {errormessage.length > 0 && (
              <div className="alert alert-danger" role="alert">
                <ul className="mb-0 ">
                  {errormessage.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control form-control-sm"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                className="form-control form-control-sm"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group py-3 text-center">
              <button className="btn btn-info w-50" onClick={attemptLogin}>
                Login
              </button>
            </div>
            <div>
              <p className="text-center">
                Don't have an account? <Link to={"/signup"}>Signup</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
