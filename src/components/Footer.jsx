import React from 'react'

function Footer({ onNavigateHome, onNavigateDashboard, onNavigateSupport, isLoggedIn }) {
  
  const handleSupportNavigation = (e, section) => {
    e.preventDefault();
    if (onNavigateSupport) {
      onNavigateSupport(section);
    } else {
      window.location.href = '/support#' + section;
    }
  }

  const handleHomeNavigation = (e) => {
    e.preventDefault();
    if (isLoggedIn && onNavigateDashboard) {
      onNavigateDashboard();
    } else if (onNavigateHome) {
      onNavigateHome();
    } else {
       window.location.href = '/';
    }
  }

  const handleSectionNavigation = (e, section) => {
    // If we're on a specific page that isn't home or dashboard, we might need to go back first.
    // However, if we're just using hash links and the app state handles it, we can just use href.
    // For now, let's keep it simple with hrefs that should work if we're on those pages.
  }

  return (
    <footer className="footer" style={{ width: '100%' }}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3 onClick={handleHomeNavigation} style={{ cursor: 'pointer' }}>Civic Circuit</h3>
            <h4>Know it, Live it</h4>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Quick Links</h4>
              <a href={isLoggedIn ? "/dashboard" : "/"} onClick={handleHomeNavigation}>Home</a>
              <a href={isLoggedIn ? "/dashboard#aim" : "/#aim"} onClick={isLoggedIn ? handleHomeNavigation : null}>About</a>
              <a href={isLoggedIn ? "/dashboard#game" : "/#game"} onClick={isLoggedIn ? handleHomeNavigation : null}>Games</a>
              <a href={isLoggedIn ? "/dashboard#download" : "/#download"} onClick={isLoggedIn ? handleHomeNavigation : null}>Download</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="/support#faq" onClick={(e) => handleSupportNavigation(e, 'faq')}>
                Help Center
              </a>
              <a href="/support#contact" onClick={(e) => handleSupportNavigation(e, 'contact')}>
                Contact Us
              </a>
              <a href="/support#feedback" onClick={(e) => handleSupportNavigation(e, 'feedback')}>
                Feedback
              </a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="https://www.legislative.gov.in/constitution-of-india" target="_blank" rel="noopener noreferrer">Constitution of India</a>
              <a href="https://www.legislative.gov.in/legal-glossary" target="_blank" rel="noopener noreferrer">Legal Glossary</a>
              <a href="https://www.constitutionofindia.net/learn/" target="_blank" rel="noopener noreferrer">Learning Material</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Civic Circuit All rights reserved. | A Digital India Initiative</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
