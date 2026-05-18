import React, { useEffect, useState } from 'react'
import Footer from './Footer'

const POINTS_PER_CORRECT_ANSWER = 100

const getLearnerLevel = (points) => {
  if (points >= 5000) return { rank: 4, title: 'Constitution Champion' }
  if (points >= 3000) return { rank: 3, title: 'Advanced Learner' }
  if (points >= 1500) return { rank: 2, title: 'Intermediate Learner' }
  if (points >= 500) return { rank: 1, title: 'Rising Learner' }
  return { rank: 0, title: 'Basic Learner' }
}


function UserDashboard({ onLogout, onNavigateHome, onNavigateSupport, onModuleSelect, onStartQuiz, onStartSpinWheel, onStartLexicon }) {
  const API_ROOT = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
  const storedFullname = sessionStorage.getItem('fullname') || ''
  const storedEmail = sessionStorage.getItem('email') || ''
  const displayNameOverride = storedEmail ? (localStorage.getItem(`displayName_${storedEmail}`) || '') : ''
  const emailName = storedEmail.includes('@') ? storedEmail.split('@')[0] : ''
  const displayName = (displayNameOverride || storedFullname || emailName || 'Guest').trim()
  const [userStats, setUserStats] = useState({ gamesCompleted: 0, accuracyRate: 0, attempted: 0, factor: 0 })
  const [nameInput, setNameInput] = useState(displayName)
  const isFirstTime = sessionStorage.getItem('firstTime') === 'true'
  const [showNamePrompt, setShowNamePrompt] = useState(isFirstTime && !displayNameOverride)

  useEffect(() => {
    const email = sessionStorage.getItem('email')
    if (!email) {
      return
    }

    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${API_ROOT}/app/user/${encodeURIComponent(email)}`)
        if (!response.ok) {
          return
        }

        const data = await response.json()
        const overallAccuracy = Number(data.accuracyRate || 0)
        const lexiconAccuracy = Number(data.lexiconAccuracyRate || 0)

        setUserStats({
          gamesCompleted: Number(data.gamesCompleted || 0),
          accuracyRate: overallAccuracy > 0 ? overallAccuracy : lexiconAccuracy,
          attempted: Number(data.attempted || 0),
          factor: Number(data.factor || 0)
        })
      } catch {
        // Keep fallback static stats if API call fails.
      }
    }

    fetchUserStats()
  }, [API_ROOT])

  const totalPoints = Math.max(0, userStats.factor * POINTS_PER_CORRECT_ANSWER)
  const learnerLevel = getLearnerLevel(totalPoints)

  const learningModules = [
    {
      id: 'executive',
      image: 'src/assets/Executive.png',
      title: 'The Executive (Union Level)',
      articles: 'Articles 52-78',
      description: 'Learn about the President, Vice President, Prime Minister, and Council of Ministers who run the Union Government.',
      topics: ['President (election, powers, impeachment)', 'Vice-President', 'Prime Minister & Council of Ministers', 'Attorney General of India'],
      time: '0 min',
      progress: 0,
      buttonText: 'Learn Executive',
    },
    {
      id: 'parliament',
      image: 'src/assets/legislature.png.jpg',
      title: 'The Parliament',
      articles: 'Articles 79-122',
      description: 'Explore how Lok Sabha and Rajya Sabha work, how laws are made, and the powers of Parliament in India.',
      topics: ['Lok Sabha & Rajya Sabha', 'Powers, Sessions, Law-making', 'Speaker & Chairman roles', 'Parliamentary procedures'],
      time: '0 min',
      progress: 0,
      buttonText: 'Explore Parliament',
    },
    {
      id: 'powers',
      image: 'src/assets/legislative-power.png.jpg',
      title: 'Legislative Powers',
      articles: 'Articles 123-151',
      description: "Discover Presidential ordinances, parliamentary privileges, the Supreme Court's role, and the powers of the CAG.",
      topics: ['Ordinances', 'Parliamentary privileges', 'Union Judiciary (Supreme Court basics)', 'Comptroller & Auditor General of India'],
      time: '0 min',
      progress: 0,
      buttonText: 'Study Powers',
    },
    {
      id: 'state-executive',
      image: 'src/assets/state-executive.png.jpg',
      title: 'The State Executive',
      articles: 'Articles 152-167',
      description: "Understand the Governor's role, Chief Minister's leadership, and how the State Executive functions.",
      topics: ['Governor', 'Chief Minister & Council of Ministers', 'Advocate General of State', "Council of Ministers' Responsibility"],
      time: '0 min',
      progress: 0,
      buttonText: 'Learn State Executive',
    },
    {
      id: 'state-legislature',
      image: 'src/assets/State.png',
      title: 'The State Legislature',
      articles: 'Articles 168-212',
      description: 'Learn about the State Legislative Assembly and Council, their powers, and how state laws are created.',
      topics: ['State Legislative Assembly & its Council', 'Law-making process in states', 'Speaker & Chairman roles', 'Powers and privileges of state legislature'],
      time: '0 min',
      progress: 0,
      buttonText: 'Explore State Legislature',
    },
    {
      id: 'judiciary',
      image: 'src/assets/state-legislative.png.jpg',
      title: 'State Judiciary',
      articles: 'Articles 213-237',
      description: "Study the structure and powers of High Courts, Subordinate Courts, and the Governor's ordinance powers.",
      topics: ['High Courts', 'Subordinate Courts', 'Powers of Governor (ordinances, etc.)', 'Miscellaneous provisions'],
      time: '0 min',
      progress: 0,
      buttonText: 'Study Judiciary',
    }
  ]


  const games = [
    {
      id: 'knowledge-quest',
      image: 'src/assets/knowledge-quest.png.jpg',
      title: 'Quiz Circuit',
      subtitle: 'Quiz Game Mode',
      description: "Test your understanding of India's Legislature, Executive, and Judiciary through structured quizzes.",
      objectives: [
        'Clear grasp of the constitutional framework',
        'In-depth understanding of Parts V and VI',
        'Practical application of constitutional principles'
      ],
      features: [
        'Question Progression',
        'Score Tracking',
        'Complete Coverage'
      ],
      buttonText: 'Play Quiz Circuit'
    },
    {
      id: 'lexicon-circuit',
      image: 'src/assets/Word Game Icon.png',
      title: 'Lexicon Circuit',
      subtitle: 'Constitution Word Game',
      description: 'Match constitutional terms with their meanings, articles with their concepts, and institutions with their roles',
      objectives: [
        'Strengthening constitutional vocabulary',
        'Recognizing important articles and concepts',
        'Improving recall through word association'
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
      image: 'src/assets/spin-wheel.png.jpg',
      title: 'Circuit Spin',
      subtitle: 'Spin to Explore Constitutional Topics',
      description: 'Spin the wheel to unlock constitutional categories and explore related articles, institutions, and key provisions.',
      objectives: [
        'Spin the wheel to choose a category',
        'View all articles linked to that category',
        'Learn concepts in a structured, visual way'
      ],
      features: [
        'Rights, Duties, and Procedures',
        'Constitutional Articles',
        'Institutions & Powers'
      ],
      buttonText: 'Spin the Circuit'
    }
  ]

  const handleNavigateSupport = () => {
    console.log('Navigate to support')
  }

  // ADDED: Handle game button clicks
  const handleGameButtonClick = (game) => {
    if (game.id === 'knowledge-quest') {
      onStartQuiz()
    } else if (game.id === 'spin-wheel') {
      onStartSpinWheel()
    } else if (game.id === 'lexicon-circuit') {
      onStartLexicon()
    } else {
      console.log(`${game.title} - Coming Soon!`)
    }
  }

  const handleSaveDisplayName = () => {
    const name = (nameInput || '').trim()
    if (!name) return

    if (storedEmail) {
      localStorage.setItem(`displayName_${storedEmail}`, name)
      sessionStorage.setItem('fullname', name)
      sessionStorage.setItem('firstTime', 'false')
      setShowNamePrompt(false)
    }
  }

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <h1 className="dashboard-logo" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
              Civic Circuit <span className="learning-badge">Learning Dashboard</span>
            </h1>
            <nav className="dashboard-nav">
              {/* Removed Home and Support links per user request */}
            </nav>
            <div className="user-section">
              <span className="username"> {sessionStorage.getItem("email") || "Guest"}</span>
              <button className="logout-btn" onClick={onLogout}>Log Out</button>
            </div>
          </div>
        </div>
      </div>


      {/* Welcome Section with Gradient Banner */}
      <section className="welcome-section">
        <div className="container">
          {/* Gradient Welcome Banner */}
          <div className="welcome-banner-gradient">
            <h2>{isFirstTime ? `Welcome, ${displayName}!` : `Welcome back, ${displayName}!`}</h2>
            <p>Ready to continue your constitutional learning journey? You're making great progress!</p>

            {showNamePrompt && (
              <div className="name-prompt">
                <p style={{ marginBottom: '8px' }}>Looks like this is your first time — pick a display name to show in the app:</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Display name"
                    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc' }}
                  />
                  <button onClick={handleSaveDisplayName} className="save-name-btn">Save</button>
                </div>
              </div>
            )}

            <div className="banner-stats-inline">
              <span>• Level {learnerLevel.rank}: {learnerLevel.title}</span>
              <span>• {totalPoints} Total Points</span>
            </div>
          </div>


          {/* Stats Cards Below Banner */}
          <div className="stats-grid-dash">
            <div className="stat-card-dash">
              <div className="stat-card-header">
                <h4>Games Completed</h4>
                <span className="stat-icon">🏆</span>
              </div>
              <p className="stat-value">{userStats.gamesCompleted}</p>
            </div>


            <div className="stat-card-dash">
              <div className="stat-card-header">
                <h4>Accuracy Rate</h4>
                <span className="stat-icon">🎯</span>
              </div>
              <p className="stat-value">{Math.round(userStats.accuracyRate)}%</p>
            </div>
          </div>


          {/* Fact of the Day */}
          <div className="fact-of-the-day-new">
            <div className="fact-icon-container">
              <img 
                src="src/assets/bulb-idea-light_svgrepo.com (1).png" 
                alt="Idea Icon" 
                className="fact-icon-svg-new"
              />
            </div>
            <div className="fact-content-new">
              <div className="fact-header-new">
                <h3>Constitutional Fact of the Day</h3>
                <span className="fact-category-badge">Fundamental Rights</span>
              </div>
              <p className="fact-description-new">
                Article 21 of the Indian Constitution guarantees the Right to Life and Personal Liberty, 
                which has been interpreted by the Supreme Court to include the right to a clean environment, privacy, and dignified life.
              </p>
              <p className="fact-highlight-new">
                This article has been the basis for over 50 landmark Supreme Court judgments expanding citizen rights.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* GAMES SECTION */}
      <section className="games-section">
        <div className="container">
          <h2 className="section-title">Games</h2>
          <div className="games-grid">
            {games.map((game, index) => (
              <div key={index} className="game-card">
                {/* Game Image */}
                <div className="game-image-container">
                  <img src={game.image} alt={game.title} className="game-image" />
                </div>


                <h3 className="game-title">{game.title}</h3>
                <p className="game-subtitle">{game.subtitle}</p>
                <p className="game-description">{game.description}</p>


                <div className="game-objectives">
                  <p className="objectives-title">Learning Objectives:</p>
                  {game.objectives.map((objective, idx) => (
                    <p key={idx} className="objective-item">
                      <span style={{ color: '#16a34a', fontWeight: 'bold', marginRight: '4px' }}>✓</span>
                      {objective}
                    </p>
                  ))}
                </div>


                <div className="game-features">
                  {game.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>


                {/* UPDATED: Add onClick handler with game ID check */}
                <button
                  className="game-btn"
                  onClick={() => handleGameButtonClick(game)}
                >
                  {game.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Learning Material */}
      <section className="learning-material-section">
        <div className="container">
          <h2 className="section-title">Learning Material</h2>
          <div className="modules-grid-dashboard">
            {learningModules.map((module, index) => (
              <div key={index} className="dashboard-card">
                {/* Module Image */}
                <div className="module-image-container">
                  <img src={module.image} alt={module.title} className="module-image" />
                </div>


                <h3>{module.title}</h3>
                <p className="articles">{module.articles}</p>
                <p className="description">{module.description}</p>


                <div className="topics">
                  <p className="topics-title">Topics:</p>
                  {module.topics.map((topic, idx) => (
                    <p key={idx} className="topic-item">{topic}</p>
                  ))}
                </div>


                {/* UPDATED: Call onModuleSelect instead of opening modal */}
                <button
                  className="module-btn"
                  onClick={() => onModuleSelect(module)}
                >
                  {module.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer 
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={() => {}} // Already here
        onNavigateSupport={onNavigateSupport}
        isLoggedIn={true}
      />
    </div>
  )
}


export default UserDashboard
