import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Spinner from "./Spinner";
import checkAuth from "./auth/checkAuth";

function Details() {
  const { eventId } = useParams();
  const [concert, setConcert] = useState({});
  const user = useSelector((store) => store.auth.user);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [ticketnumber, setTicketNumber] = useState("");
  const [totalPrice, setTotal] = useState(0);

  const navigate = useNavigate();

  const backendUrl = "https://concert-backend-api.vercel.app/"

  async function getEvent(id) {
    try {
      const token = user?.token || localStorage.getItem("token");

      const response = await axios.get(
        `${backendUrl}api/details/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setConcert(response.data.concert);
      setUserEmail(response.data.email);
      setUserName(response.data.username);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to connect to API");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(id) {
    if (!userName || !userEmail || !ticketnumber) {
      alert("Please make sure all required fields are filled.");
      return;
    }
    var fieldDatas = {
      userName: userName,
      userEmail: userEmail,
      location: concert.location,
      totalAmount: totalPrice,
      ticketsBooked: ticketnumber,
    };
    axios
      .post(`${backendUrl}api/booknow/${id}`, fieldDatas)
      .then((response) => {
        const bookingId = response.data.bookingId;
        console.log(response.data.message);
        navigate("/confirmedTicket/" + bookingId);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Failed to connect to API");
        }
      });
  }

  function calculateTotalPrice(e) {
    const value = e.target.value;
    setTicketNumber(value);
  }
  useEffect(() => {
    const numericTickets = Number(ticketnumber);
    setTotal(numericTickets ? numericTickets * concert.price : 0);
  }, [ticketnumber, concert.price]);

  useEffect(() => {
    if (!user) {
      alert("Login required");
    } else {
      getEvent(eventId);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container col-md-8 mt-4 mb-4  rounded">
        <h1 className="pt-3 pb-3 text-center">{concert.concertName}</h1>
        <img
          src={
            concert.coverPic
              ? "data:image/*;base64," + concert.coverPic
              : "/placeholder.jpg"
          }
          alt="event Image"
          className="col-md-12"
        />
        <p className="mt-2" style={{ textAlign: "justify" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          mollitia natus enim earum expedita? Odit quaerat dolorem sunt, culpa
          maiores ducimus consequatur dolore quod sed facere neque et aperiam
          reiciendis.
        </p>

        <div className="row mt-4">
          <div className="col-6">
            <p>Event Location: {concert.location}</p>
            <p>Event Date: {concert.date}</p>
            <p>Event Time: {concert.eventTime}</p>
          </div>
          <div
            className="col-6"
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <p>Tickets Left: {concert.ticketsAvailable}</p>
            <p>Ticket Price: {concert.price} Rs</p>
          </div>
          {concert.ticketsAvailable > 0 ? (
            <a
              href="#booknow"
              className="btn btn-info mb-4 rounded-pill"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="booknow"
              style={{ width: "30%", margin: "auto" }}
            >
              Book Now
            </a>
          ) : (
            <p
              className="badge badge-warning mb-4 py-2"
              style={{ width: "20%", margin: "auto", fontSize: "small" }}
            >
              Sold Out!
            </p>
          )}
        </div>

        <div className="collapse" id="booknow">
          <div className="card card-body">
            <form>
              <div className="form-row text-info mt-2">
                <div
                  className="col-md-6 d-flex p-0"
                  style={{ alignItems: "center" }}
                >
                  <label className="p-0 col-form-label col-3">
                    <b>User Name: </b>
                  </label>
                  <input
                    type="text"
                    className="form-control-plaintext col-6"
                    id="userName"
                    name="userName"
                    value={userName}
                    readOnly
                    style={{ height: "2rem", width: "150px" }}
                    autoComplete="off"
                  />
                </div>
                <div
                  className="col-md-6 d-flex p-0 "
                  style={{ alignItems: "center" }}
                >
                  <label className="p-0 col-form-label col-2">
                    <b>Email: </b>
                  </label>
                  <input
                    type="text"
                    className="form-control-plaintext col-7"
                    id="userEmail"
                    name="userEmail"
                    value={userEmail}
                    readOnly
                    style={{ height: "2rem", width: "150px" }}
                  />
                </div>
              </div>
              <div className="form-row mt-2 text-info">
                <div
                  className="col-md-6 d-flex p-0"
                  style={{ height: "2rem", alignItems: "center" }}
                >
                  <label className=" col-form-label col-3 p-0">
                    <b>Event Location:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control-plaintext col-6 p-0 "
                    id="location"
                    name="location"
                    value={concert.location || ""}
                    readOnly
                    style={{ height: "2rem", width: "150px" }}
                  />
                </div>
                <div
                  className="col-md-3 d-flex p-0"
                  style={{ alignItems: "center" }}
                >
                  <label className=" col-form-label col-5 p-0 ">
                    <b> Event Date:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control-plaintext col-7 "
                    id="date"
                    name="date"
                    value={concert.date || ""}
                    readOnly
                    style={{ height: "2rem" }}
                  />
                </div>
                <div
                  className="col-md-3 d-flex p-0"
                  style={{ alignItems: "center" }}
                >
                  <label className="p-0 col-form-label col-5">
                    <b>Event Time:</b>
                  </label>
                  <input
                    type="text"
                    className="form-control-plaintext col-7 "
                    id="eventTime"
                    name="eventTime"
                    value={concert.eventTime || ""}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-row mt-2">
                <div
                  className="form-group col-md-6 p-0 d-flex text-info"
                  style={{ alignItems: "center" }}
                >
                  <label className="col-form-label col-3 p-0">
                    <b>No of Tickets:</b>
                  </label>
                  <select
                    id="ticketsBooked"
                    name="ticketsBooked"
                    className="form-control-plaintext col-6 p-0 "
                    onChange={calculateTotalPrice}
                    value={ticketnumber}
                    style={{
                      height: "2rem",
                      borderBottom: "1px solid white",
                      width: "150px",
                    }}
                  >
                    <option className="text-dark" value="">
                      Choose...
                    </option>
                    {Array.from(
                      { length: Math.min(3, concert.ticketsAvailable) },
                      (_, i) => {
                        const val = (i + 1).toString();
                        return (
                          <option className="text-dark" key={val} value={val}>
                            {val}
                          </option>
                        );
                      }
                    )}
                  </select>
                </div>

                <div
                  className="form-group col-md-3 d-flex p-0"
                  style={{ alignItems: "center" }}
                >
                  <label className="col-form-label col-5 p-0 text-info">
                    <b>Total Amount:</b>
                  </label>
                  <input
                    type="number"
                    className="form-control-plaintext col-6 p-0"
                    style={{ height: "2rem", borderBottom: "1px solid white" }}
                    id="totalAmount"
                    name="totalAmount"
                    value={totalPrice}
                    readOnly
                  />
                </div>
                <div
                  className="form-group col-md-3 d-flex p-0"
                  style={{ alignItems: "center" }}
                >
                  <label className="col-form-label col-5 p-0 text-info">
                    <b>Ticket Price:</b>
                  </label>
                  <input
                    type="number"
                    className="form-control-plaintext col-7 p-0 "
                    id="price"
                    name="price"
                    value={concert.price || ""}
                    style={{ height: "2rem" }}
                    readOnly
                  />
                </div>
              </div>
              <div className="row my-3 justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success rounded-pill"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(eventId);
                  }}
                >
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default checkAuth(Details);
