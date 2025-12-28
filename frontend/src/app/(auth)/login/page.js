// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../../../providers/auth.provider";
// import { loginUser } from "../../../lib/auth";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await loginUser({ email, password });

//       login(res.token); // 🔑 KEY LINE
//       router.push("/");

//     } catch (err) {
//       setError("Invalid email or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main style={{ padding: "2rem", maxWidth: 400 }}>
//       <h2>Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//     </main>
//   );
// }








"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../providers/auth.provider";
import { loginUser } from "../../../lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await loginUser({ email, password });
      login(res.token);
      router.push("/");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="page">
        <aside className="left">
          <div className="brand">
            <h1>Dev Prep</h1>
            <p>
              Serious preparation for serious technical interviews.
            </p>
          </div>

          <div className="manifesto">
            <p>
              Built for students who refuse shortcuts.
              <br />
              Practice deeply. Think clearly. Perform decisively.
            </p>
          </div>
        </aside>

        <section className="right">
          <div className="login">
            <h2>Member Access</h2>

            <form onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>

              <button disabled={loading}>
                {loading ? "Verifying…" : "Enter Dev Prep"}
              </button>

              {error && <div className="error">{error}</div>}
            </form>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes reveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          min-height: 100vh;
          background: #fff;
          color: #000;
        }

        .left {
          padding: 4rem;
          border-right: 1px solid #000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          animation: reveal 0.8s ease-out;
        }

        .brand h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 3.2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .brand p {
          max-width: 420px;
          font-size: 1rem;
          line-height: 1.6;
          color: #222;
        }

        .manifesto {
          font-family: "Courier New", monospace;
          font-size: 0.9rem;
          color: #333;
          border-top: 1px solid #000;
          padding-top: 1.5rem;
        }

        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: reveal 1s ease-out;
        }

        .login {
          width: 100%;
          max-width: 380px;
        }

        .login h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 1.8rem;
          margin-bottom: 2rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        label {
          display: flex;
          flex-direction: column;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        input {
          margin-top: 0.5rem;
          padding: 0.6rem 0;
          border: none;
          border-bottom: 1px solid #000;
          font-size: 0.95rem;
          outline: none;
        }

        input:focus {
          border-bottom: 2px solid #000;
        }

        button {
          margin-top: 1rem;
          padding: 0.8rem;
          background: #000;
          color: #fff;
          border: none;
          font-size: 0.85rem;
          cursor: pointer;
        }

        button:hover {
          background: #111;
        }

        button:disabled {
          background: #555;
          cursor: not-allowed;
        }

        .error {
          font-size: 0.85rem;
          border-left: 3px solid #000;
          padding-left: 0.75rem;
        }

        @media (max-width: 900px) {
          .page {
            grid-template-columns: 1fr;
          }

          .left {
            border-right: none;
            border-bottom: 1px solid #000;
          }
        }
      `}</style>
    </>
  );
}
