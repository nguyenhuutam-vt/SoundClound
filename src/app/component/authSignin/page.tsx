"use client";

import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const AuthSignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const res = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/");
    } else {
      alert(res?.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Icon Lock */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#e5e7eb",
              padding: "12px",
              borderRadius: "50%",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ height: "24px", width: "24px", color: "#374151" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c.828 0 1.5-.672 1.5-1.5S12.828 8 12 8s-1.5.672-1.5 1.5S11.172 11 12 11zM6 20v-2a6 6 0 1112 0v2H6z"
              />
            </svg>
          </div>
        </div>

        <h2
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "1.5rem",
          }}
        >
          Sign in
        </h2>

        {/* Username */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "4px",
            }}
          >
            Username *
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1.5rem", position: "relative" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "4px",
            }}
          >
            Password *
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              outline: "none",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "35px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              color: "#6b7280",
            }}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "16px",
          }}
          onClick={handleSignIn}
        >
          SIGN IN
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "1.5rem 0",
          }}
        >
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}
          ></div>
          <span style={{ margin: "0 8px", color: "#6b7280", fontSize: "14px" }}>
            Or using
          </span>
          <div
            style={{ flexGrow: 1, height: "1px", backgroundColor: "#d1d5db" }}
          ></div>
        </div>

        {/* Social buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
          <button
            style={{
              padding: "12px",
              backgroundColor: "#facc15",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => signIn("github")}
          >
            <FaGithub size={22} />
          </button>
          <button
            style={{
              padding: "12px",
              backgroundColor: "#facc15",
              borderRadius: "50%",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => signIn("google")}
          >
            <FaGoogle size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSignIn;
