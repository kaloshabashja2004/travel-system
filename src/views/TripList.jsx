import { useEffect, useState } from "react";
import tripsData from "../data/trips";

const ITEMS_PER_PAGE = 15;

function TripList({ currentUser }) {
  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");

  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [tickets, setTickets] = useState({});

  /* ===== Load Trips ===== */
  useEffect(() => {
    const storedTrips =
      JSON.parse(localStorage.getItem("trips")) || tripsData;

    localStorage.setItem("trips", JSON.stringify(storedTrips));
    setTrips(storedTrips);
  }, []);

  /* ================= Wishlist ================= */
  const toggleWishlist = (tripId) => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.find(
      (w) =>
        w.tripId === tripId &&
        w.userEmail === currentUser.email
    );

    const updatedWishlist = exists
      ? wishlist.filter(
          (w) =>
            !(
              w.tripId === tripId &&
              w.userEmail === currentUser.email
            )
        )
      : [...wishlist, { userEmail: currentUser.email, tripId }];

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  /* ================= Booking ================= */
  const handleBook = (trip) => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    const count = tickets[trip.id] || 1;

    if (count < 1 || count > trip.availableSeats) {
      alert("Invalid tickets count");
      return;
    }

    const bookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    bookings.push({
      id: Date.now(),
      tripId: trip.id,
      tripTitle: trip.title,
      userEmail: currentUser.email,
      tickets: count,
      totalPrice: count * trip.price,
    });

    localStorage.setItem("bookings", JSON.stringify(bookings));

    const updatedTrips = trips.map((t) =>
      t.id === trip.id
        ? { ...t, availableSeats: t.availableSeats - count }
        : t
    );

    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));

    alert("Trip booked successfully");
  };

  /* ================= Filters ================= */
  const approvedTrips = trips.filter(
    (t) => t.status === "approved"
  );

  const filteredTrips = approvedTrips
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.location.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => {
      if (priceFilter === "low") return t.price <= 1000;
      if (priceFilter === "mid") return t.price > 1000 && t.price <= 1500;
      if (priceFilter === "high") return t.price > 1500;
      return true;
    })
    .filter((t) => {
      if (durationFilter === "short") return t.days <= 3;
      if (durationFilter === "medium") return t.days > 3 && t.days <= 6;
      if (durationFilter === "long") return t.days > 6;
      return true;
    })
    .filter((t) => {
      if (availabilityFilter === "available")
        return t.availableSeats > 0;
      if (availabilityFilter === "sold")
        return t.availableSeats === 0;
      return true;
    });

  /* ================= Pagination ================= */
  const totalPages = Math.ceil(filteredTrips.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTrips = filteredTrips.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="container">
      <h2>Available Trips</h2>

      {/* ===== Filters ===== */}
      <div className="trip-filter">
        <input
          placeholder="Search by name or location"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="low">Below $1000</option>
          <option value="mid">$1000 - $1500</option>
          <option value="high">Above $1500</option>
        </select>

        <select
          value={durationFilter}
          onChange={(e) => setDurationFilter(e.target.value)}
        >
          <option value="all">All Durations</option>
          <option value="short">1 - 3 Days</option>
          <option value="medium">4 - 6 Days</option>
          <option value="long">7+ Days</option>
        </select>

        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="sold">Sold Out</option>
        </select>
      </div>

      {/* ===== Trips ===== */}
      <div className="cards">
        {currentTrips.map((trip) => (
          <div className="card" key={trip.id}>
            {/* ❤️ Wishlist */}
            <button
              className="wishlist-btn"
              onClick={() => toggleWishlist(trip.id)}
            >
              ❤️
            </button>

            <img
              src={trip.image}
              alt={trip.title}
              className="trip-image"
            />

            <div className="card-content">
              <h3>{trip.title}</h3>
              <p>{trip.location}</p>
              <p>{trip.days} days</p>
              <p className="price">${trip.price}</p>
              <p className="seats">
                Seats: {trip.availableSeats}/{trip.totalSeats}
              </p>

              {/* ===== ACTIONS ===== */}
              <div className="card-actions">
                {trip.availableSeats === 0 ? (
                  <button className="sold-out" disabled>
                    Sold Out
                  </button>
                ) : (
                  <>
                    <input
                      type="number"
                      min="1"
                      max={trip.availableSeats}
                      value={tickets[trip.id] || 1}
                      onChange={(e) =>
                        setTickets({
                          ...tickets,
                          [trip.id]: Number(e.target.value),
                        })
                      }
                    />

                    <button
                      className="primary"
                      onClick={() => handleBook(trip)}
                    >
                      Book Trip
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Pagination ===== */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default TripList;