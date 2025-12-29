import "../styles/main.css";

function LandingPage({ setPage }) {
  return (
    <div className="landing">
      <div className="landing-overlay">
        <h1>Travel Booking System</h1>
        <p>
          Book your next adventure easily and manage your trips
          in one place.
        </p>

        <div className="landing-buttons">
          <button
            className="primary"
            onClick={() => setPage("trips")}
          >
            Explore Trips
          </button>

          <button
            className="secondary"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;