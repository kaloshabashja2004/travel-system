import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import TripList from "./views/TripList";
import ProfilePage from "./views/ProfilePage";
import AdminDashboard from "./views/AdminDashboard";
import Wishlist from "./views/Wishlist";
import MyBookings from "./views/MyBookings";

function App() {
  const [page, setPage] = useState("landing");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  /* ===== Sync currentUser with localStorage ===== */
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  /* ===== Logout ===== */
  const logout = () => {
    setCurrentUser(null);
    setPage("landing");
  };

  /* ===== Render Pages ===== */
  const renderPage = () => {
    switch (page) {
      case "landing":
        return <LandingPage setPage={setPage} />;

      case "login":
        return (
          <LoginPage
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        );

      case "register":
        return (
          <RegisterPage
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        );

      case "trips":
        return <TripList currentUser={currentUser} />;

      case "wishlist":
        return <Wishlist currentUser={currentUser} />;

      case "profile":
        return (
          <ProfilePage
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            setPage={setPage}   // 👈 مهم جدًا
          />
        );

      case "myBookings":
        return (
          <MyBookings
            currentUser={currentUser}
          />
        );

      case "dashboard":
        return <AdminDashboard currentUser={currentUser} />;

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar
        currentUser={currentUser}
        setPage={setPage}
        logout={logout}
      />
      {renderPage()}
    </>
  );
}

export default App;