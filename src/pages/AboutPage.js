import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      <section className="profile-section">
        <img src="profile-placeholder.png" alt="Profile" className="profile-picture"/>
        <h2 className="profile-name">Ryan Owens</h2>
        <button className="contact-button">Contact Me!</button>
      </section>
      <section className="about-section">
        <h2 className="about-title">About Me</h2>
        <p className="about-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ...
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
