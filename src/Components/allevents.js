import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import { useSelector } from "react-redux";
import checkAuth from "./auth/checkAuth";

function DisplayEvents() {
  const [concerts, setConcerts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedConcertName, setSelectedConcertName] = useState("");
  const [pageRefresh, setPageRefresh] = useState(false);
  const user = useSelector((store) => store.auth.user);

  const backendUrl = "https://concert-backend-api.vercel.app/"

  const fetchConcerts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${backendUrl}api/allevents?page=${pageNumber}&limit=3`,
        { headers: { Authorization: "Bearer " + user.token } }
      );
      setConcerts(res.data.concerts);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await axios
      .delete(`${backendUrl}api/events/${id}`, {
        headers: { Authorization: "Bearer " + user.token },
      })
      .then((response) => alert(response.data.message))
      .catch((err) => {
        alert(err);
      });
    setPageRefresh(!pageRefresh);
  };

  useEffect(() => {
    if (!user) {
      alert("Login required");
    } else {
      fetchConcerts(page);
    }
  }, [page, pageRefresh]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Spinner />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="my-5  playwrite-de-grund-headfont">
          Events{" "}
          {user?.role === "admin" ? (
            <Link
              to={"/register_event"}
              className="btn btn-info mt-3 float-right"
              style={{ fontSize: "small" }}
            >
              + Add New Event
            </Link>
          ) : (
            ""
          )}
        </h1>
        {concerts.map((event, index) => (
          <div className="card event-card mb-4 bg-info text-light" key={index}>
            <div className="row no-gutters">
              <div className="col-md-3">
                <img
                  src={`data:image/*;base64,${event.coverPic}`}
                  className="card-img event-img"
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
                  <h4 className="card-title pb-2">{event.concertName}</h4>
                  <p
                    className="card-text"
                    style={{ display: "inline-block", marginRight: "3%" }}
                  >
                    <strong>Location:</strong> {event.location}
                  </p>
                  <p
                    className="card-text"
                    style={{ display: "inline-block", marginRight: "3%" }}
                  >
                    <strong>Date:</strong> {event.date}
                  </p>
                  <p
                    className="card-text"
                    style={{ display: "inline-block", marginRight: "3%" }}
                  >
                    <strong>Time:</strong> {event.eventTime}
                  </p>
                  <p
                    className="card-text"
                    style={{ display: "inline-block", marginRight: "3%" }}
                  >
                    <strong>Price:</strong> {event.price} Rs
                  </p>
                  <p
                    className="card-text"
                    style={{ display: "inline-block", marginRight: "3%" }}
                  >
                    <strong>Tickets Available:</strong> {event.ticketsAvailable}
                  </p>
                </div>
              </div>
              <div className="col-md-2 my-auto rounded-left">
                <Link
                  to={`/details/${event._id}`}
                  className="btn event-btn btn-primary"
                  style={{ display: "inline-block", width: "100%" }}
                >
                  Details
                </Link>
                {user?.role === "admin" ? (
                  <>
                    <Link
                      to={`/update_event/${event._id}`}
                      className="btn event-btn btn-primary my-2"
                      style={{ display: "inline-block", width: "100%" }}
                    >
                      <i className="fas fa-edit"></i> Update
                    </Link>
                    <Link
                      className="btn btn-danger"
                      data-toggle="modal"
                      data-target={`#confirmDelete${event._id}`}
                      style={{ display: "inline-block", width: "100%" }}
                      onClick={(e) => {
                        setSelectedEvent(event._id);
                        setSelectedConcertName(event.concertName);
                      }}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </Link>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ))}
        {user?.role === "admin" && (
          <div
            className="modal fade"
            id={`confirmDelete${selectedEvent}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="DeleteConfirmationModal"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="DeleteConfirmationModal">
                    Confirm Deletion
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
                <div className="modal-body">
                  Are you sure you want to delete 
                  <strong> {selectedConcertName}</strong>? This action cannot be
                  undone.
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) =>{e.preventDefault(); handleDelete(selectedEvent)}}
                    data-dismiss="modal"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-center my-3">
          <button
            className="btn btn-outline-info mx-1"
            disabled={!pagination.hasPrevPage}
            onClick={() => {
              setPage(pagination.prevPage);
            }}
          >
            Prev
          </button>

          {[...Array(pagination.totalPages || 0)].map((_, i) => (
            <button
              key={i}
              className={`btn mx-1 ${
                page === i + 1 ? "btn-light" : "btn-outline-info"
              }`}
              onClick={() => {
                setPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-info mx-1"
            disabled={!pagination.hasNextPage}
            onClick={() => {
              setPage(pagination.nextPage);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default checkAuth(DisplayEvents);
