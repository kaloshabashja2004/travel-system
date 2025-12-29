import { useEffect, useState } from "react";

function ProfilePage({ currentUser, setCurrentUser, setPage }) {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        role: currentUser.role || "user",
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container">
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  /* ===== SAVE PROFILE ===== */
  const saveProfile = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email
        ? {
            ...u,
            name: profile.name,
            phone: profile.phone,
            address: profile.address,
          }
        : u
    );

    const updatedCurrentUser = {
      ...currentUser,
      name: profile.name,
      phone: profile.phone,
      address: profile.address,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedCurrentUser)
    );

    setCurrentUser(updatedCurrentUser); // ✅ تحديث App
    setIsEditing(false);
  };

  /* ===== LOGOUT ===== */
  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setPage("login"); // ✅ صح
  };

  return (
    <div className="container">
      <h2>My Profile</h2>

      <div className="card">
        <label>Name</label>
        <input
          value={profile.name}
          disabled={!isEditing}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />

        <label>Email</label>
        <input value={profile.email} disabled />

        <label>Phone</label>
        <input
          value={profile.phone}
          disabled={!isEditing}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <label>Address</label>
        <input
          value={profile.address}
          disabled={!isEditing}
          onChange={(e) =>
            setProfile({ ...profile, address: e.target.value })
          }
        />

        <label>Role</label>
        <input value={profile.role} disabled />

        {!isEditing ? (
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            <button
              className="primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>

            <button
              className="secondary"
              onClick={() => setPage("myBookings")} // ✅ صح
            >
              My Bookings
            </button>

            <button className="danger" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
            <button className="primary" onClick={saveProfile}>
              Save
            </button>
            <button
              className="danger"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;