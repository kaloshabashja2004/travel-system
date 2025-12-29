function Navbar({ currentUser, setPage, logout }) {
  return (
    <nav className="navbar">
      <h2 onClick={() => setPage("landing")}>
        Travel Booking
      </h2>

      <div>
        <button onClick={() => setPage("trips")}>
          Trips
        </button>

        {currentUser && (
          <>
            <button onClick={() => setPage("wishlist")}>
              Wishlist 
            </button>

            <button onClick={() => setPage("profile")}>
              Profile
            </button>

            {currentUser.role === "admin" && (
              <button
                onClick={() => setPage("dashboard")}
              >
                Dashboard
              </button>
            )}

            <button onClick={logout}>Logout</button>
          </>
        )}

        {!currentUser && (
          <>
            <button onClick={() => setPage("login")}>
              Login
            </button>
            <button
              onClick={() => setPage("register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;