import { useEffect, useState } from "react";

function MyBookings({ currentUser }) {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    setBookings(
      (JSON.parse(localStorage.getItem("bookings")) || []).filter(
        (b) => b.userEmail === currentUser.email
      )
    );

    setTrips(JSON.parse(localStorage.getItem("trips")) || []);
  }, [currentUser]);

  const sync = (updatedBookings, updatedTrips) => {
    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedBookings)
    );
    localStorage.setItem(
      "trips",
      JSON.stringify(updatedTrips)
    );

    setBookings(
      updatedBookings.filter(
        (b) => b.userEmail === currentUser.email
      )
    );
    setTrips(updatedTrips);
  };

  const increaseTickets = (booking) => {
    const trip = trips.find((t) => t.id === booking.tripId);
    if (!trip || trip.availableSeats < 1) return;

    const updatedBookings = bookings.map((b) =>
      b.id === booking.id
        ? {
            ...b,
            tickets: b.tickets + 1,
            totalPrice: (b.tickets + 1) * trip.price,
          }
        : b
    );

    const updatedTrips = trips.map((t) =>
      t.id === trip.id
        ? { ...t, availableSeats: t.availableSeats - 1 }
        : t
    );

    sync(updatedBookings, updatedTrips);
  };

  const decreaseTickets = (booking) => {
    if (booking.tickets <= 1) return;

    const trip = trips.find((t) => t.id === booking.tripId);

    const updatedBookings = bookings.map((b) =>
      b.id === booking.id
        ? {
            ...b,
            tickets: b.tickets - 1,
            totalPrice: (b.tickets - 1) * trip.price,
          }
        : b
    );

    const updatedTrips = trips.map((t) =>
      t.id === trip.id
        ? { ...t, availableSeats: t.availableSeats + 1 }
        : t
    );

    sync(updatedBookings, updatedTrips);
  };

  const cancelBooking = (booking) => {
    const updatedBookings = bookings.filter(
      (b) => b.id !== booking.id
    );

    const updatedTrips = trips.map((t) =>
      t.id === booking.tripId
        ? {
            ...t,
            availableSeats: t.availableSeats + booking.tickets,
          }
        : t
    );

    sync(updatedBookings, updatedTrips);
  };

  if (!currentUser) {
    return (
      <div className="container">
        <h2>Please login to view your bookings</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="cards">
          {bookings.map((b) => (
            <div className="card" key={b.id}>
              <h3>{b.tripTitle}</h3>
              <p>Tickets: {b.tickets}</p>
              <p>Total: ${b.totalPrice}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => increaseTickets(b)}>+</button>
                <button onClick={() => decreaseTickets(b)}>-</button>
              </div>

              <button
                className="danger"
                onClick={() => cancelBooking(b)}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;