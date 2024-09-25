import React from 'react';
import './NotFound.css'; // Import your CSS file for styles

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <p>Please check the URL or go back to the homepage.</p>
      <a href="/" className="home-button">Go to Homepage</a>
    </div>
  );
};

export default NotFound;
