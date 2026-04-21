import React from 'react'

function OurAim() {
  return (
    <section className="our-aim reveal" id="aim">
      <div className="container">
        <h2 className="section-title reveal">Our Aim</h2>
        
        {/* Problem and Solution Side by Side */}
        <div className="problem-solution-container">
          {/* The Problem */}
          <div className="problem-box reveal delay-1">
            <h3>The Problem</h3>
            <p>
              India's Constitution, particularly its core institutions (Legislature,
              Executive, Judiciary), remains inaccessible due to complex language.
              This prevents citizens, especially youth and those with diverse
              educational backgrounds, from understanding their rights, duties, and
              democratic processes, resulting in widespread constitutional illiteracy.
            </p>
            <div className="stats-grid">
              <div className="stat-box">
                <h4>73%</h4>
                <p>Citizens lack constitutional awareness</p>
              </div>
              <div className="stat-box">
                <h4>85%</h4>
                <p>Youth find constitution complex</p>
              </div>
            </div>
          </div>

          {/* Our Solution */}
          <div className="solution-box reveal delay-2">
            <h3>Our Solution</h3>
            <p>
              We aim to create accessible explanations of key constitutional articles
              through interactive games and multilingual support.
            </p>
            <div className="solution-features">
              <div className="solution-feature">
                <img src="/src/assets/simplified.png.jpg" alt="Simplified Explanations" className="solution-icon" />
                <div className="solution-text">
                  <h4>Simplified Explanations</h4>
                  <p>Complex constitutional articles broken down into easy-to-understand language</p>
                </div>
              </div>
              <div className="solution-feature">
                <img src="/src/assets/interactive.png.jpg" alt="Interactive Games" className="solution-icon" />
                <div className="solution-text">
                  <h4>Interactive Games</h4>
                  <p>Gamified learning experiences that make constitutional education engaging</p>
                </div>
              </div>
              <div className="solution-feature">
                <img src="/src/assets/multilingual.png.jpg" alt="Multi-language Support" className="solution-icon" />
                <div className="solution-text">
                  <h4>Multi-language Support</h4>
                  <p>Available in Multiple Indian languages for inclusive learning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expected Impact */}
        <div className="impact-section">
          <h3>Expected Impact</h3>
          <p>Increased constitutional literacy and stronger civic engagement among Indian citizens.</p>
        </div>
      </div>
    </section>
  )
}

export default OurAim
