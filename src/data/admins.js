export function seedAdmins() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        {
          id: 1,
          name: "Admin",
          email: "admin@travel.com",
          password: "admin123",
          role: "admin",
        },
      ])
    );
  }
}