import React, { useState, useEffect } from "react";
import { signInWithGoogle } from '../firebase'

const API_ROOT = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_BASE_URL = `${API_ROOT}/app`;
const hasFirebaseConfig = [
  import.meta.env.VITE_FIREBASE_API_KEY,
  import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  import.meta.env.VITE_FIREBASE_PROJECT_ID,
  import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  import.meta.env.VITE_FIREBASE_APP_ID,
].every(Boolean);

function AuthModals({
  showLogin,
  showSignup,
  onClose,
  onSwitchToLogin,
  onSwitchToSignup,
  onLoginSuccess,
  onSignupSuccess,
}) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (showLogin || showSignup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLogin, showSignup]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(errBody || "Login failed");
      }

      const user = await res.json();
      sessionStorage.setItem("email", user.email);
      if (user.fullname) {
        sessionStorage.setItem("fullname", user.fullname);
      }
      onLoginSuccess(user);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong during login.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (signupData.password !== signupData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Create a copy of signupData and merge firstName/lastName into 'name' for backend compatibility if needed
      // Most backends expect a 'name' field.
      const payload = {
        fullname: `${signupData.firstName} ${signupData.lastName}`.trim(),
        email: signupData.email,
        password: signupData.password,
      };

      const res = await fetch(`${API_BASE_URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(errBody || "Sign up failed");
      }

      const user = await res.json();
      alert("Account created successfully! Please login.");
      if (onSignupSuccess) onSignupSuccess(user);
      onSwitchToLogin();
    } catch (err) {
      console.error(err);
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        setError("Cannot reach backend. Ensure Spring Boot is running on http://localhost:8080.");
      } else {
        setError(err.message || "Something went wrong during sign up.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await signInWithGoogle();
      const userData = {
        email: user.email || "",
        fullname: user.displayName || user.email || "Google User",
      };

      sessionStorage.setItem("email", userData.email);
      sessionStorage.setItem("fullname", userData.fullname);
      onLoginSuccess(userData);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.message || "Google sign-in failed. Check your Firebase config.");
    } finally {
      setLoading(false);
    }
  };

  if (!showLogin && !showSignup) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="auth-modal">
        <div className="auth-main-content">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>

          <div className="auth-brand">
            <div className="auth-logo-svg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8s0-2 2-3c1-0.5 2-1.5 2-3s-2-3-4-3s-4 1.5-4 3s1 2.5 2 3c2 1 2 3 2 3z" />
              </svg>
            </div>
            <h1>Civic Circuit</h1>
          </div>

          {error && <p className="error-text" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
          {loading && <p className="loading-text" style={{ color: '#1a1a8e', marginBottom: '1rem', textAlign: 'center' }}>Processing...</p>}

          {/* -------- LOGIN -------- */}
          {showLogin && (
            <>
              <div className="auth-header">
                <h2>Login</h2>
                <p>Welcome back to Civic Circuit!</p>
              </div>

              <form onSubmit={handleLoginSubmit} className="auth-form">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button type="button" className="google-btn" onClick={handleGoogleSignIn} disabled={loading || !hasFirebaseConfig}>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                />
                {loading ? 'Signing in...' : 'Continue with Google'}
              </button>
              {!hasFirebaseConfig && (
                <p className="firebase-warning">Set the Firebase environment variables to enable Google sign-in.</p>
              )}

              <p className="switch-auth">
                Don't have an account?
                <button onClick={onSwitchToSignup} className="switch-btn">
                  Sign Up
                </button>
              </p>
            </>
          )}

          {/* -------- SIGN UP -------- */}
          {showSignup && (
            <>
              <div className="auth-header">
                <h2>Sign Up</h2>
                <p>Create your constitutional explorer account</p>
              </div>

              <form onSubmit={handleSignupSubmit} className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showSignupPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                    >
                      {showSignupPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </form>

              <div className="divider">
                <span>OR</span>
              </div>

              <button className="google-btn" onClick={handleGoogleSignIn} disabled={loading || !hasFirebaseConfig}>
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                />
                {loading ? 'Signing in...' : 'Continue with Google'}
              </button>
              {!hasFirebaseConfig && (
                <p className="firebase-warning">Set the Firebase environment variables to enable Google sign-in.</p>
              )}

              <p className="switch-auth">
                Already have an account?
                <button onClick={onSwitchToLogin} className="switch-btn">
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AuthModals;
