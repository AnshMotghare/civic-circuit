import React from 'react';
import Footer from './Footer';
import './UnionExecutiveBook.css';

const TheStateJudiciaryBook = ({ module, onClose }) => {
  return (
    <div className="ueb-body">
      {/* HEADER */}
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <h1 className="dashboard-logo" onClick={onClose} style={{ cursor: 'pointer' }}>
              Civic Circuit <h4>{module?.title || "State Judiciary"}</h4>
            </h1>
            <div className="user-section">
              <span className="username"> {sessionStorage.getItem("email") || "User123"} 👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* BACK BUTTON */}
      <div>
        <button className="ueb-back-btn" onClick={onClose}>
          ← Back to Dashboard
        </button>
      </div>

      {/* TITLE */}
      <div className="ueb-title-box">
        <span>{module?.title || "State Judiciary"}</span>
      </div>

      {/* BOOK */}
      <div className="ueb-book-container">
        <div className="ueb-book-card">
          <div className="ueb-flipbook-wrapper">
            <iframe 
              width="500px" 
              allowFullScreen 
              allow="fullscreen" 
              height="500px" 
              src="https://www.wisppal.com/embed/M1ln">
            </iframe>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <Footer 
        onNavigateHome={onClose} 
        onNavigateDashboard={onClose}
        onNavigateSupport={(section) => { window.location.href = '/support#' + section; }}
        isLoggedIn={true}
      />
    </div>
  );
};

export default TheStateJudiciaryBook;
