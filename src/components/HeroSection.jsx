import React from 'react'

function HeroSection({ onStartLearning, onExploreGames }) {
  return (
    <section className="hero">
      <div className="container">
        <h1 className="hero-title reveal">Civic Circuit</h1>
        <h2 className="hero-subtitle reveal delay-1">Simplifying India's Constitution through Interactive Learning</h2>
        <p className="hero-description reveal delay-2">
          Making India's Constitution accessible through gamified learning. Understand
          your rights, duties, and democratic processes in a fun, interactive way.
        </p>
        <div className="hero-buttons reveal delay-3">
          <button className="btn-primary" onClick={onStartLearning}>Start Learning Journey</button>
          <button className="btn-secondary" onClick={() => {
            const el = document.getElementById('game');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}>Explore Games</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
