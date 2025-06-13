import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";

function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errormessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();

  const backendUrl = "https://concert-backend-api.vercel.app/"

  function signupUser() {
    var user = {
      username: username,
      email: email,
      password: password,
      confirmpassword: confirmpassword,
    };

    axios
      .post(`${backendUrl}api/signup`, user)
      .then((response) => {
        setErrorMessage([]);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.errors) {
          console.log(typeof err.response.data.errors);
          setErrorMessage(err.response.data.errors);
        } else if (err.response.data.message) {
          setErrorMessage([err.response.data.message]);
        } else {
          setErrorMessage(["Failed to connect to api"]);
        }
      });
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-5 form">
            <h1 className="my-4 playwrite-de-grund-headfont">Signup</h1>
            {errormessage.length > 0 && (
              <div className="alert alert-danger" role="alert">
                <ul className="mb-0">
                  {errormessage.map((msg, index) => (
                    <li key={index}>{msg}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control form-control-sm"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control form-control-sm"
                value={confirmpassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group py-2 text-center">
              <button className="btn btn-info w-50" onClick={signupUser}>
                Signup
              </button>
            </div>
            <div>
              <p className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
