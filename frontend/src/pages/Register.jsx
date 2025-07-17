import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pwd)) return "Must include an uppercase letter";
    if (!/[a-z]/.test(pwd)) return "Must include a lowercase letter";
    if (!/[0-9]/.test(pwd)) return "Must include a number";
    if (!/[!@#$%^&*]/.test(pwd)) return "Must include a special character";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") {
      setPasswordError(validatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (passwordError) return;
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", form);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-6xl px-4 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-md p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl"
          autoComplete="off"
        >
          <h2 className="mb-6 text-3xl font-bold text-center text-indigo-700">Create Account</h2>
          {error && <div className="mb-4 text-center text-red-600">{error}</div>}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-medium text-gray-700">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <div className="mt-1 text-sm text-red-500">{passwordError}</div>
            )}
          </div>
          <button
            className="w-full py-2 font-semibold text-white transition bg-indigo-600 rounded shadow hover:bg-indigo-700"
            type="submit"
            disabled={!!passwordError}
          >
            Register
          </button>
          <div className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;