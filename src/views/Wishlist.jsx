import { useEffect, useState } from "react";

function Wishlist({ currentUser }) {
  const [wishlistTrips, setWishlistTrips] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];
    const trips =
      JSON.parse(localStorage.getItem("trips")) || [];

    const userWishlist = wishlist
      .filter((w) => w.userEmail === currentUser.email)
      .map((w) => trips.find((t) => t.id === w.tripId))
      .filter(Boolean);

    setWishlistTrips(userWishlist);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container">
        <h2>Please login to view your wishlist</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>My Wishlist ❤️</h2>

      {wishlistTrips.length === 0 ? (
        <p>No trips in wishlist.</p>
      ) : (
        <div className="cards">
          {wishlistTrips.map((trip) => (
            <div className="card" key={trip.id}>
              <img
                src={trip.image}
                alt={trip.title}
                className="trip-image"
              />
              <h3>{trip.title}</h3>
              <p>{trip.location}</p>
              <p>{trip.days} days</p>
              <p>${trip.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;