import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
function HomePage() {
  const [event, setEvent] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const [message,setMessage] = useState("");
  console.log(user);
  useEffect(() => {
    axios
      .get("https://food-ordering-qv4kxm5jo-vivekpadinjarotes-projects.vercel.app/api/home")
      .then((response) => {
        setEvent(response.data.eventData);
        setMessage(response.data.message);
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert("Failed to connet API");
        }
      });
  }, []);

  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide row-md-5"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/images/banner1.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner2.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/banner3.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-target="#carouselExampleControls"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </button>
      </div>

      <div className="container mt-5">
        <h3 className="text-danger mb-3">WHAT'S NEW:</h3>
              <h1>{message}</h1>
        <div className="row row-cols-1 row-cols-md-3">
          {event.map((e, index) => (
            <div className="col mb-4 " key={e._id}>
              <div className="card h-100 bg-info text-light">
                <img
                  src={`data:image/*;base64,${e.coverPic}`}
                  className="card-img-top"
                  alt="Event"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>{e.concertName}</b>
                  </h5>
                  <p className="card-text">
                    <b>Location: </b>
                    {e.location}{" "}
                  </p>
                  <p className="card-text">
                    <b>Date: </b>
                    {e.date}{" "}
                  </p>
                  <p className="card-text">
                    <b>Time: </b>
                    {e.eventTime}
                  </p>
                </div>
                <div className="btn">
                  <Link to={`/details/${e._id}`} className="btn btn-primary">
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="text-dark bg-info-gradient mb-5 py-4 "
        style={{ textAlign: "center" }}
      >
        <h3>Signup to Concert Nation</h3>
        <h5>Dive into more</h5>
        <form className="d-flex">
          <Link
            to="/signup"
            className="btn btn-info text-light"
            style={{
              fontSize: "small",
              margin: "auto",
              fontWeight: "bold",
            }}
          >
            Signup
          </Link>
        </form>
      </div>
    </>
  );
}

export default HomePage;
