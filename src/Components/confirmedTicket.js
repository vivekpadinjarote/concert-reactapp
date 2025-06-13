import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import Navbar from "./Navbar";

function ConfirmedBooking() {
  const { eventId } = useParams();
  const [ticketData, setBookingData] = useState({});
  const [qr, setQR] = useState();
  const [loading, setLoading] = useState(true);

  const backendUrl = "https://concert-backend-api.vercel.app/"

  async function getData(id) {
    try {
      const response = await axios.get(
        `${backendUrl}api/confirmedBooking/${id}`
      );

      await setBookingData(response.data.bookingData);
      console.log(response.data.bookingData);
      await setQR(response.data.QRCode);
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

  useEffect(() => {
    getData(eventId);
  }, [eventId]);

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
      <div className="container mt-5 p-5 mb-5 text-light rounded shadow-lg">
        <Link to="/" className="nav-link text-info mb-2">
          {"<<"} Bact to Home
        </Link>
        <div className="text-center mb-5">
          <h1 className="display-4 text-info">Booking Successful! 🎉</h1>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card bg-light text-light mb-3 ">
              <div className="card-body text-dark">
                <h3 className="card-title text-warning mb-4">
                  🎤 Concert Details
                </h3>
                <p>
                  <strong>Concert Name: </strong>
                  {ticketData.concertName}{" "}
                </p>
                <p>
                  <strong>Location: </strong>
                  {ticketData.location}
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card bg-light text-light mb-3 ">
              <div className="card-body text-dark">
                <h3 className="card-title text-warning  mb-4">
                  📄 Booking Details
                </h3>
                <p>
                  <strong>Tickets Booked:</strong> {ticketData.ticketsBooked}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹{ticketData.totalAmount}
                </p>
                <p>
                  <strong>Email:</strong> {ticketData.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="mb-4 text-info">🎫 Your QR Code</h2>
          <div className="d-inline-block p-3 bg-light rounded shadow">
            <img
              src={`${qr}`}
              alt="QR Code"
              className="img-fluid rounded"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmedBooking;
