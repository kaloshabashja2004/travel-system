import { useState } from "react";

function RegisterPage({ setPage, setCurrentUser }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    birthDate: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill required fields");
      return;
    }

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    if (users.find((u) => u.email === form.email)) {
      alert("Email already exists");
      return;
    }

    const newUser = {
      ...form,
      role: "user",
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setCurrentUser(newUser);
    setPage("profile");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Register</h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="date"
          name="birthDate"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button className="primary" onClick={register}>
          Create Account
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => setPage("login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;