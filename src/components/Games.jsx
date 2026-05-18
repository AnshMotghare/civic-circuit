import React from 'react'

function Games({ onStartQuiz, onStartSpinWheel, onStartLexicon, onOpenLogin, isLoggedIn }) {
  const games = [
    {
      id: 'knowledge-quest',
      title: 'Quiz Circuit',
      subtitle: 'Quick Quiz Format',
      image: '/assets/knowledge-quest.png.jpg',
      description: 'Test your constitutional knowledge with rapid-fire questions about Indian Constitution articles, institutions, and fundamental rights.',
      objectives: [
        'Quick recall of constitutional facts.',
        'Understanding of fundamental rights.',
        'Knowledge of constitutional articles'
      ],
      features: [
        'Multiple Choice Questions',
        'Instant Feedback',
        'Score Tracking'
      ],
      buttonText: 'Play Quiz Circuit'
    },
    {
      id: 'lexicon-circuit',
      title: 'Lexicon Circuit',
      subtitle: 'Constitution Word Game',
      image: '/assets/Word Game Icon.png',
      description: 'Match constitutional terms with their meanings, articles with their concepts, and institutions with their roles',
      objectives: [
        'Strengthening constitutional vocabulary.',
        'Recognizing important articles and concepts.',
        'Improving recall through word association.'
      ],
      features: [
        'Letter-based word formation',
        'Level Progression',
        'Concept Focus'
      ],
      buttonText: 'Play Lexicon Circuit'
    },
    {
      id: 'spin-wheel',
      title: 'Circuit Spin',
      subtitle: 'Board Game Style',
      image: '/assets/spin-wheel.png.jpg',
      description: "Embark on a level-based journey to learn and explore India's Legislature, Executive, and Judiciary effectively.",
      objectives: [
        'Complete Constitutional Framework.',
        'Deep knowledge of Parts V and VI.',
        'Practical application of constitutional principles.'
      ],
      features: [
        'Story-based progression',
        'Comprehensive coverage',
        'Achievement system'
      ],
      buttonText: 'Play Circuit Spin'
    }
  ]

  const handlePlayClick = (game) => {
    if (!isLoggedIn) {
      onOpenLogin()
    } else {
      if (game.id === 'knowledge-quest') {
        alert('Please access Quiz Circuit from your Learning Dashboard!')
      } else if (game.id === 'spin-wheel') {
        alert('Please access Circuit Spin from your Learning Dashboard!')
      } else if (game.id === 'lexicon-circuit') {
        alert('Please access Lexicon Circuit from your Learning Dashboard!')
      } else {
        alert(`${game.title} - Coming Soon!`)
      }
    }
  }

  return (
    <section className="games reveal" id="game">
      <div className="container">
        <h2 className="section-title reveal">Games We Implemented</h2>
        <div className="games-grid reveal delay-1">
          {games.map((game, index) => (
            <div key={index} className="game-card">
              <img src={game.image} alt={game.title} className="game-image" />
              <h3>{game.title}</h3>
              <p className="game-subtitle">{game.subtitle}</p>
              <p className="game-description">{game.description}</p>
              <div className="game-objectives">
                <p className="objectives-title">Learning Objectives:</p>
                {game.objectives.map((objective, idx) => (
                  <p key={idx} className="objective-item">✓ {objective}</p>
                ))}
              </div>
              <div className="game-features">
                {game.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>
              <button
                className="game-btn"
                onClick={() => handlePlayClick(game)}
              >
                {game.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Games
