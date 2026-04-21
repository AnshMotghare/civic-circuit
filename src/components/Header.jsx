import React, { useState, useRef, useEffect } from 'react'

function Header({ onOpenLogin, onOpenSignup, isLoggedIn, onNavigateDashboard, onNavigateHome }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // Toggle dropdown on Get Started click
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleLoginClick = () => {
    onOpenLogin()
    setShowDropdown(false)
  }

  const handleSignupClick = () => {
    onOpenSignup()
    setShowDropdown(false)
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="logo" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>Civic Circuit</h1>
          <nav className="nav">
            <a href="/#aim">Our Aim</a>
            <a href="/#modules">Modules</a>
            <a href="/#game">Game</a>
            <a href="/#download">Download Constitution</a>
          </nav>
          <div 
            className="get-started-wrapper"
            ref={dropdownRef}
          >
            {isLoggedIn ? (
              <button className="cta-btn" onClick={onNavigateDashboard}>
                Go to Dashboard
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ marginLeft: '4px' }}
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ) : (
              <>
                <button 
                  className="cta-btn"
                  onClick={toggleDropdown}
                >
                  Get Started
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ marginLeft: '4px' }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={handleSignupClick} className="dropdown-item">
                      Sign Up
                    </button>
                    <div className="dropdown-divider"></div>
                    <button onClick={handleLoginClick} className="dropdown-item">
                      Login
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
