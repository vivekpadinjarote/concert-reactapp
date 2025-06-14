import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import moment from "moment";

function UpdateEvent() {
  const user = useSelector((store) => store.auth.user);
  const token = user.token;
  const { event_Id } = useParams();
  const [event, setEvent] = useState({});
  const [newDate, setNewDate] = useState("");
  const navigate = useNavigate();

  const [concertName, setConcertName] = useState("");
  const [eventId, setEventId] = useState("");
  const [location, setLocation] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [price, setPrice] = useState("");
  const [ticketsAvailable, setTicketsAvailable] = useState("");
  const [coverPic, setCoverPic] = useState(null);
  const [fileName, setFileName] = useState(null);

  const backendUrl = "https://concert-backend-api.vercel.app/"

  const getEventDetails = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}api/events/${event_Id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEvent(response.data.concert);
    } catch (error) {
      if (error) {
        alert(error);
      } else {
        alert("Failed to connect to API");
      }
    }
  };

  useEffect(() => {
    getEventDetails();
  }, []);

  useEffect(() => {
    if (event?._id) {
      setConcertName(event.concertName || "");
      setEventId(event.eventId || "");
      setLocation(event.location || "");
      setEventTime(event.eventTime || "");
      setPrice(event.price || "");
      setTicketsAvailable(event.ticketsAvailable || "");
      setNewDate(moment(event.date, "DD-MM-YYYY").format("YYYY-MM-DD"));
    }
  }, [event]);

  const handleUpdate = async () => {
    try {
      console.log(newDate);
      const formData = new FormData();
      formData.append("concertName", concertName);
      formData.append("eventId", eventId);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("date", newDate);
      formData.append("eventTime", eventTime);
      formData.append("ticketsAvailable", ticketsAvailable);
      formData.append("coverPic", coverPic);

      const response = await axios.put(
        `${backendUrl}api/events/${event._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(response.data.message);
      navigate("/allevents");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <div className="container mt-5">
          <h1 className="playwrite-de-grund-headfont mb-5">Update Events</h1>
          <form>
            <div className="row justify-content-center">
              <div className="form-group  col-12">
                <label>Event name</label>
                <input
                  type="text"
                  className="form-control"
                  id="eventName"
                  name="concertName"
                  value={concertName}
                  onChange={(e) => {
                    setConcertName(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEventId(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setEventTime(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  name="date"
                  value={newDate}
                  onChange={(e) => {
                    setNewDate(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setTicketsAvailable(e.target.value);
                  }}
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
                handleUpdate();
              }}
            >
              Update Event
            </button>
            <Link to={"/allevents"} className="btn btn-warning float-right">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UpdateEvent;
