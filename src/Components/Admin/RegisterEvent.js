import axios from "axios";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function RegisterEvent() {
  const user = useSelector((store) => store.auth.user);

  const [concertName, setConcertName] = useState("");
  const [eventId, setEventId] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [price, setPrice] = useState("");
  const [ticketsAvailable, setTicketsAvailable] = useState("");
  const [coverPic, setCoverPic] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [reset, setReset] = useState(false);

  function handleFieldReset() {
    setConcertName("");
    setCoverPic(null);
    setDate("");
    setEventId("");
    setEventTime("");
    setFileName(null);
    setLocation("");
    setPrice("");
    setTicketsAvailable("");
  }

  useEffect(() => {
    handleFieldReset();
  }, [reset]);

  function handleRegister() {
    const formData = new FormData();
    formData.append("concertName", concertName);
    formData.append("eventId", eventId);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("eventTime", eventTime);
    formData.append("price", price);
    formData.append("ticketsAvailable", ticketsAvailable);
    formData.append("coverPic", coverPic);

    axios
      .post("http://localhost:8080/api/register_event", formData, {
        headers: { Authorization: "Bearer " + user.token },
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        alert(response.data.message);
        setReset(!reset);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  return (
    <>
      <Navbar />
      <div>
        <div className="container mt-5">
          <h1 className="playwrite-de-grund-headfont mb-5">Register Events</h1>
          <form>
            <div className="row justify-content-center">
              <div className="form-group  col-12">
                <label>Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="concertName"
                  value={concertName}
                  onChange={(e) => setConcertName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label>Event ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventId"
                  name="eventId"
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  required
                />
              </div>
              <div className="form-group col-6">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-3 mb-3">
                <label>Event Time</label>
                <input
                  type="time"
                  className="form-control"
                  id="eventTime"
                  name="eventTime"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Available Tickets</label>
                <input
                  type="number"
                  className="form-control"
                  id="ticketsAvailable"
                  name="ticketsAvailable"
                  value={ticketsAvailable}
                  onChange={(e) => setTicketsAvailable(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="custom-file mt-3 mb-4 col-12">
              <input
                type="file"
                className="custom-file-input"
                name="coverPic"
                onChange={(e) => {
                  setCoverPic(e.target.files[0]);
                  setFileName(e.target.files[0]?.name || "");
                }}
                required
              />
              <label className="custom-file-label">
                {fileName ? fileName : "Choose Image File"}
              </label>
            </div>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleRegister();
              }}
            >
              Register Event
            </button>
            <Link to={"/allevents"} className="btn btn-warning float-right">
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterEvent;
