import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import checkAuth from "./auth/checkAuth";
import { Link } from "react-router-dom";

function Mybookings() {
  const [concerts, setConcerts] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  async function getBookedEvents() {
    await axios
      .get(`http://localhost:8080/api/mybookings?page=${page}`, {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => {
        setConcerts(response.data.events);
        setPagination(response.data.pagination);
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Failed to connect to API");
        }
      });
  }

  useEffect(() => {
    if (!user) {
      alert("Login required");
    } else getBookedEvents();
  }, [page]);

  const displayMargin = { display: "inline-block", marginRight: "3%" };

  if (concerts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container text-center">
          <h1 className="playwrite-de-grund-headfont my-5">Events</h1>
          <div>
            <p>No concerts booked yet!</p>
            <Link to={"/allevents"} className="btn btn-info">
              Browse Events
            </Link>
          </div>
          <div className="d-flex justify-content-center my-3">
            <button
              className="btn btn-outline-info mx-1"
              disabled={!pagination.hasPrevPage}
              onClick={() => setPage(pagination.prevPage)}
            >
              Prev
            </button>

            {[...Array(pagination.totalPages || 0)].map((_, i) => (
              <button
                key={i}
                className={`btn mx-1 ${
                  page === i + 1 ? "btn-light" : "btn-outline-info"
                }`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-outline-info mx-1"
              disabled={!pagination.hasNextPage}
              onClick={() => setPage(pagination.nextPage)}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container text-center">
        <h1 className="playwrite-de-grund-headfont my-5">Events</h1>
        <div>
          {concerts.map((event, index) => (
            <div key={index}>
              <div
                className="card event-card mb-4 bg-info text-light"
                style={{ height: "100%" }}
              >
                <div className="row no-gutters">
                  <div className="col-md-3">
                    <img
                      src={`data:image/*;base64,${event.coverPic}`}
                      className="card-img event-img "
                      alt="Event"
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="card-body">
                      <h4 className="card-title pb-2">
                        <b>{event.concertName}</b>
                      </h4>
                      <p className="card-text" style={displayMargin}>
                        <strong>Location:</strong> {event.location} ;
                      </p>
                      <p className="card-text" style={displayMargin}>
                        <strong>Date:</strong> {event.date} ;
                      </p>
                      <p className="card-text" style={displayMargin}>
                        <strong>Time:</strong> {event.eventTime} ;
                      </p>
                      <p className="card-text" style={displayMargin}>
                        <strong>Price:</strong> {event.price} Rs ;
                      </p>
                      <p className="card-text" style={displayMargin}>
                        <strong>Tickets Booked:</strong> {event.ticketsBooked} ;
                      </p>
                      <p className="card-text" style={displayMargin}>
                        <strong>Total Amount:</strong> {event.totalAmount}
                      </p>
                    </div>
                  </div>
                  <div className="col-md-2 my-auto bg-primary rounded-left">
                    <button
                      className="btn event-btn btn-primary"
                      data-toggle="modal"
                      data-target={`#qrModal${event._id}`}
                      style={{ display: "inline-block", width: "100%" }}
                    >
                      QR Code
                    </button>
                  </div>
                </div>
              </div>

              <div
                className="modal fade"
                id={`qrModal${event._id}`}
                tabIndex="-1"
                aria-labelledby={`qrModalLabel${event._id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id={`qrModalLabel${event._id}`}
                      >
                        Your Booking QR Code
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body text-center">
                      <img
                        src={event.qrCodeUrl}
                        alt="QR Code"
                        className="img-fluid"
                      />
                      <p>
                        {event.concertName} | {event.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center my-3">
          <button
            className="btn btn-outline-info mx-1"
            disabled={!pagination.hasPrevPage}
            onClick={() => setPage(pagination.prevPage)}
          >
            Prev
          </button>

          {[...Array(pagination.totalPages || 0)].map((_, i) => (
            <button
              key={i}
              className={`btn mx-1 ${
                page === i + 1 ? "btn-light" : "btn-outline-info"
              }`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-info mx-1"
            disabled={!pagination.hasNextPage}
            onClick={() => setPage(pagination.nextPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default checkAuth(Mybookings);
