import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"user" | "reporter">("user");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nav = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();
    setErr("");

    if (password !== confirmPassword) {
      setErr("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
        role,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/");
    } catch (e: any) {
      setErr(e.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      {err && <p className="text-red-600 text-sm mb-2">{err}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border rounded p-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password field with toggle */}
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

        {/* Confirm password with toggle */}
        <div className="relative">
          <input
            className="w-full border rounded p-2 pr-10"
            placeholder="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-2 cursor-pointer text-sm text-gray-600"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <select
          className="w-full border rounded p-2"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="user">Normal User</option>
          <option value="reporter">Market Reporter</option>
        </select>

        <button
          className="w-full bg-black text-white rounded p-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Wait a sec..." : "Create Account"}
        </button>
      </form>
      <p className="text-sm mt-3">
        Have account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
}
