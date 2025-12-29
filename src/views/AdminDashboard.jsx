import { useEffect, useState } from "react";

function AdminDashboard({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);

  const [section, setSection] = useState("users");

  const [editingBookingId, setEditingBookingId] = useState(null);
  const [editedTickets, setEditedTickets] = useState(1);

  const [analyticsSearch, setAnalyticsSearch] = useState("");

  const [newTrip, setNewTrip] = useState({
    title: "",
    location: "",
    price: "",
    days: "",
    totalSeats: "",
    image: "",
  });

  /* ===== Load Data ===== */
  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("users")) || []);
    setBookings(JSON.parse(localStorage.getItem("bookings")) || []);
    setTrips(JSON.parse(localStorage.getItem("trips")) || []);
  }, []);

  /* ===== Access Control ===== */
  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="container">
        <h2>Access Denied</h2>
      </div>
    );
  }

  /* ================= USER MANAGEMENT ================= */
  const toggleUserStatus = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email
        ? { ...u, isActive: u.isActive === false ? true : false }
        : u
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  /* ================= TRIP ANALYTICS ================= */
  const getTripAnalytics = (tripId) => {
    const related = bookings.filter((b) => b.tripId === tripId);
    return {
      totalTickets: related.reduce((s, b) => s + b.tickets, 0),
      totalRevenue: related.reduce((s, b) => s + b.totalPrice, 0),
    };
  };

  /* ===== TOGGLE APPROVED / PENDING ===== */
  const toggleTripStatus = (id) => {
    const updatedTrips = trips.map((t) =>
      t.id === id
        ? {
            ...t,
            status: t.status === "approved" ? "pending" : "approved",
          }
        : t
    );

    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  /* ===== Cancel Booking ===== */
  const cancelBooking = (booking) => {
    const updatedBookings = bookings.filter((b) => b.id !== booking.id);

    const updatedTrips = trips.map((t) =>
      t.id === booking.tripId
        ? {
            ...t,
            availableSeats: Math.min(
              t.availableSeats + booking.tickets,
              t.totalSeats
            ),
          }
        : t
    );

    setBookings(updatedBookings);
    setTrips(updatedTrips);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("trips", JSON.stringify(updatedTrips));
  };

  /* ===== Save Edited Booking ===== */
  const saveBookingEdit = (booking) => {
    const trip = trips.find((t) => t.id === booking.tripId);
    if (!trip) return;

    const diff = editedTickets - booking.tickets;

    if (editedTickets < 1 || trip.availableSeats < diff) {
      alert("Invalid tickets count");
      return;
    }

    const updatedBookings = bookings.map((b) =>
      b.id === booking.id
        ? {
            ...b,
            tickets: editedTickets,
            totalPrice: editedTickets * trip.price,
          }
        : b
    );

    const updatedTrips = trips.map((t) =>
      t.id === booking.tripId
        ? { ...t, availableSeats: t.availableSeats - diff }
        : t
    );

    setBookings(updatedBookings);
    setTrips(updatedTrips);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("trips", JSON.stringify(updatedTrips));

    setEditingBookingId(null);
  };

  /* ===== Add Trip ===== */
  const addTrip = () => {
    if (
      !newTrip.title ||
      !newTrip.location ||
      !newTrip.price ||
      !newTrip.days ||
      !newTrip.totalSeats
    ) {
      alert("Fill all fields");
      return;
    }

    const trip = {
      id: Date.now(),
      title: newTrip.title,
      location: newTrip.location,
      price: Number(newTrip.price),
      days: Number(newTrip.days),
      totalSeats: Number(newTrip.totalSeats),
      availableSeats: Number(newTrip.totalSeats),
      image:
        newTrip.image ||
        "https://via.placeholder.com/400x200?text=Trip",
      status: "pending",
    };

    const updatedTrips = [...trips, trip];
    setTrips(updatedTrips);
    localStorage.setItem("trips", JSON.stringify(updatedTrips));

    setNewTrip({
      title: "",
      location: "",
      price: "",
      days: "",
      totalSeats: "",
      image: "",
    });
  };

  /* ===== Delete Trip ===== */
  const deleteTrip = (id) => {
    if (!window.confirm("Delete trip?")) return;

    const updatedTrips = trips.filter((t) => t.id !== id);
    const updatedBookings = bookings.filter((b) => b.tripId !== id);

    setTrips(updatedTrips);
    setBookings(updatedBookings);

    localStorage.setItem("trips", JSON.stringify(updatedTrips));
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };

  return (
    <div className="dashboard">
      {/* ===== Sidebar ===== */}
      <aside className="sidebar">
        <h2>Admin</h2>
        <button className={section === "users" ? "active" : ""} onClick={() => setSection("users")}>Users</button>
        <button className={section === "analytics" ? "active" : ""} onClick={() => setSection("analytics")}>Analytics</button>
        <button className={section === "addTrip" ? "active" : ""} onClick={() => setSection("addTrip")}>Add Trip</button>
        <button className={section === "trips" ? "active" : ""} onClick={() => setSection("trips")}>Trips</button>
        <button className={section === "bookings" ? "active" : ""} onClick={() => setSection("bookings")}>Bookings</button>
      </aside>

      {/* ===== Content ===== */}
      <main className="dashboard-content">
        {/* USERS */}
        {section === "users" && (
          <>
            <h3>User Management</h3>
            <div className="cards">
              {users.map((u) => (
                <div className="card" key={u.email}>
                  <p><strong>{u.name}</strong></p>
                  <p>{u.email}</p>
                  <p>Role: {u.role}</p>
                  <p>Status: {u.isActive === false ? "Banned" : "Active"}</p>
                  {u.role !== "admin" && (
                    <button
                      className={u.isActive === false ? "primary" : "danger"}
                      onClick={() => toggleUserStatus(u.email)}
                    >
                      {u.isActive === false ? "Unban" : "Ban"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ANALYTICS */}
        {section === "analytics" && (
          <>
            <h3>Trip Analytics</h3>
            <input
              placeholder="Search trip..."
              value={analyticsSearch}
              onChange={(e) => setAnalyticsSearch(e.target.value)}
            />
            <div className="cards">
              {trips
                .filter((t) =>
                  t.title.toLowerCase().includes(analyticsSearch.toLowerCase())
                )
                .map((t) => {
                  const a = getTripAnalytics(t.id);
                  const sold = t.totalSeats - t.availableSeats;
                  const occupancy = ((sold / t.totalSeats) * 100).toFixed(1);

                  return (
                    <div className="card" key={t.id}>
                      <h4>{t.title}</h4>
                      <p>Tickets Sold: {a.totalTickets}</p>
                      <p>Revenue: ${a.totalRevenue}</p>
                      <p>Occupancy: {occupancy}%</p>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* ADD TRIP */}
        {section === "addTrip" && (
          <>
            <h3>Add Trip</h3>
            <div className="card">
              <input placeholder="Title" value={newTrip.title} onChange={(e)=>setNewTrip({...newTrip,title:e.target.value})} />
              <input placeholder="Location" value={newTrip.location} onChange={(e)=>setNewTrip({...newTrip,location:e.target.value})} />
              <input type="number" placeholder="Price" value={newTrip.price} onChange={(e)=>setNewTrip({...newTrip,price:e.target.value})} />
              <input type="number" placeholder="Days" value={newTrip.days} onChange={(e)=>setNewTrip({...newTrip,days:e.target.value})} />
              <input type="number" placeholder="Total Seats" value={newTrip.totalSeats} onChange={(e)=>setNewTrip({...newTrip,totalSeats:e.target.value})} />
              <input placeholder="Image URL" value={newTrip.image} onChange={(e)=>setNewTrip({...newTrip,image:e.target.value})} />
              <button className="primary" onClick={addTrip}>Add Trip</button>
            </div>
          </>
        )}

        {/* TRIPS */}
        {section === "trips" && (
          <>
            <h3>Trips Management</h3>
            <div className="cards">
              {trips.map((t) => (
                <div className="card" key={t.id}>
                  <img src={t.image} className="trip-image" />
                  <p><strong>{t.title}</strong></p>
                  <p>{t.location}</p>
                  <p>
                    Seats: {t.availableSeats}/{t.totalSeats}{" "}
                    {t.availableSeats === 0 && (
                      <strong style={{ color: "red" }}> SOLD OUT</strong>
                    )}
                  </p>
                  <p>Status: <strong>{t.status}</strong></p>

                  <button
                    className={t.status === "approved" ? "danger" : "primary"}
                    onClick={() => toggleTripStatus(t.id)}
                  >
                    {t.status === "approved" ? "Set Pending" : "Approve"}
                  </button>

                  <button className="danger" onClick={() => deleteTrip(t.id)}>
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* BOOKINGS */}
        {section === "bookings" && (
          <>
            <h3>All Bookings</h3>
            <div className="cards">
              {bookings.map((b) => (
                <div className="card" key={b.id}>
                  <p>{b.userEmail}</p>
                  <p>{b.tripTitle}</p>

                  {editingBookingId === b.id ? (
                    <>
                      <input type="number" min="1" value={editedTickets}
                        onChange={(e)=>setEditedTickets(Number(e.target.value))} />
                      <button className="primary" onClick={() => saveBookingEdit(b)}>Save</button>
                    </>
                  ) : (
                    <>
                      <p>Tickets: {b.tickets}</p>
                      <button
                        className="primary"
                        onClick={() => {
                          setEditingBookingId(b.id);
                          setEditedTickets(b.tickets);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}

                  <button className="danger" onClick={() => cancelBooking(b)}>
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;