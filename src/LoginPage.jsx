import React from 'react';
import './LoginPage.css';
import cowLogo from './assets/cow-logo.png';
import cowSilhouette from './assets/cow-silhouette.png';
import googleLogo from './assets/google-logo.png';
import { useEffect } from 'react';

function LoginPage() {
  useEffect(() => {
  fetch("http://localhost:5000/auth/user", { credentials: "include" })
    .then(res => res.json())
    .then(data => console.log("Logged in user:", data));
}, []);

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="panel welcome-panel">
          <img src={cowLogo} alt="Cattl-ist Logo" className="logo" />
          <div className="welcome-content">
            <h2>Welcome To...</h2>
            <h1>The <span>CATTL-IST</span></h1>
            <p>
              Your own smart companion for cattle breed recognition. Capture, identify, and learn about
              breeds instantly with the power of AI, designed to support farmers, researchers, and enthusiasts
              alike.
            </p>
          </div>
        </div>
        <div className="panel login-panel">
          <h2>Login or Sign Up</h2>
          <form>
            <input type="text" placeholder="Enter Your Username" />
            <input type="password" placeholder="Enter Your Password" />
            <button type="submit" className="arrow-button">
              <span>→</span>
            </button>
          </form>
      <button
  className="social-button"
  onClick={() => {
    window.location.href = "http://localhost:5000/auth/google"; 
  }}
>
  <img src={googleLogo} alt="Google" /> Sign in with Google
</button>


          <button className="social-button">
            Sign in with mobile number
          </button>
          <img src={cowSilhouette} alt="Cow silhouette" className="silhouette" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;