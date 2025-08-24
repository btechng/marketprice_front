import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    setErr("");
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/");
    } catch (e: any) {
      setErr(e.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input with toggle */}
        <div className="relative">
          <input
            className="w-full border rounded p-2 pr-10"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Wait a sec..." : "Login"}
        </button>
      </form>
      <p className="text-sm mt-3">
        No account?{" "}
        <Link to="/register" className="underline">
          Register
        </Link>
      </p>
    </div>
  );
}
