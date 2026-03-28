import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>🎉 Welcome to User Auth Portal</h1>
        <p>You have successfully logged in.</p>

        <Link to="/" className="logout-btn">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default HomePage;