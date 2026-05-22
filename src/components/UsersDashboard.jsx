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

// ─── 31 curated Indian Constitution facts ────────────────────────────────────
// Rotates by day-of-year — same fact for every user on the same calendar day.
const CONSTITUTION_FACTS = [
  {
    category: "Preamble",
    title: "The Preamble – Soul of the Constitution",
    description:
      "The Preamble declares India a Sovereign, Socialist, Secular, Democratic Republic. The words 'Socialist' and 'Secular' were inserted by the 42nd Amendment in 1976, reflecting evolving national values.",
    highlight:
      "The Supreme Court held in Kesavananda Bharati (1973) that the Preamble is part of the Constitution and can be amended, but its basic structure cannot be destroyed."
  },
  {
    category: "Fundamental Rights",
    title: "Article 14 – Right to Equality",
    description:
      "Article 14 guarantees equality before the law and equal protection of the laws to every person within India's territory. It applies to citizens and non-citizens alike.",
    highlight:
      "The doctrine of 'reasonable classification' allows laws to treat different groups differently, provided the classification has a rational nexus to the law's objective."
  },
  {
    category: "Fundamental Rights",
    title: "Article 17 – Abolition of Untouchability",
    description:
      "Untouchability is abolished and its practice in any form is forbidden. Enforcement of any disability arising from untouchability is an offence punishable by law.",
    highlight:
      "The Protection of Civil Rights Act, 1955 and the SC/ST (Prevention of Atrocities) Act, 1989 give teeth to this constitutional mandate."
  },
  {
    category: "Fundamental Rights",
    title: "Article 19 – Six Freedoms",
    description:
      "Article 19 guarantees six freedoms: speech & expression, assembly, association, movement, residence, and profession. Each can be restricted by the State on specific grounds like security or public order.",
    highlight:
      "Freedom of the press is not separately mentioned but is considered part of freedom of speech and expression under Article 19(1)(a)."
  },
  {
    category: "Fundamental Rights",
    title: "Article 21 – Right to Life",
    description:
      "No person shall be deprived of their life or personal liberty except according to procedure established by law. The Supreme Court has read this to include rights to privacy, education, health, and a dignified death.",
    highlight:
      "In K.S. Puttaswamy v. Union of India (2017), a 9-judge bench unanimously held that privacy is a fundamental right under Article 21."
  },
  {
    category: "Fundamental Rights",
    title: "Article 21A – Right to Education",
    description:
      "Inserted by the 86th Amendment (2002), Article 21A mandates free and compulsory education for children aged 6 to 14 years. It led directly to the Right to Education Act, 2009.",
    highlight:
      "India is one of the few countries that makes elementary education a fundamental right enforceable in court."
  },
  {
    category: "Fundamental Rights",
    title: "Article 22 – Protection Against Arbitrary Arrest",
    description:
      "Every arrested person must be informed of the grounds of arrest, allowed to consult a lawyer of their choice, and produced before a magistrate within 24 hours of arrest.",
    highlight:
      "Preventive detention laws like the National Security Act operate under the exceptions carved in Article 22(3)–(7)."
  },
  {
    category: "Directive Principles",
    title: "Article 39A – Equal Justice & Free Legal Aid",
    description:
      "The State shall ensure that the operation of the legal system promotes justice on a basis of equal opportunity, providing free legal aid to those unable to afford it due to economic or other disabilities.",
    highlight:
      "This directive led to the Legal Services Authorities Act, 1987, which created a nationwide network of legal aid committees."
  },
  {
    category: "Directive Principles",
    title: "Article 44 – Uniform Civil Code",
    description:
      "The State shall endeavour to secure a Uniform Civil Code for citizens throughout India. It remains one of the most debated directives, balancing personal law traditions with national uniformity.",
    highlight:
      "Goa is the only Indian state that currently has a common civil code, inherited from Portuguese law."
  },
  {
    category: "Directive Principles",
    title: "Article 48A – Protection of Environment",
    description:
      "Added by the 42nd Amendment (1976), this article directs the State to protect and improve the environment and safeguard forests and wildlife, forming the constitutional basis for environmental legislation.",
    highlight:
      "Read with Article 51A(g) (Fundamental Duty to protect the environment), this creates both a state obligation and a citizen duty toward environmental protection."
  },
  {
    category: "Fundamental Duties",
    title: "Article 51A – Fundamental Duties",
    description:
      "Added by the 42nd Amendment (1976), the original list had 10 duties. The 86th Amendment (2002) added an 11th: to provide educational opportunities for children aged 6–14.",
    highlight:
      "Unlike Fundamental Rights, Fundamental Duties are not directly enforceable in court, but courts use them as tools to interpret laws and rights."
  },
  {
    category: "The Union Executive",
    title: "Article 52 – The President of India",
    description:
      "India shall have a President who is the constitutional head of the executive. The President is elected by an Electoral College comprising elected members of Parliament and State Legislative Assemblies.",
    highlight:
      "The President's election uses proportional representation by means of the single transferable vote to ensure uniformity among states."
  },
  {
    category: "The Union Executive",
    title: "Article 74 – Council of Ministers",
    description:
      "There shall be a Council of Ministers headed by the Prime Minister to aid and advise the President. The 44th Amendment clarified that the President may return advice once, but must act on re-submitted advice.",
    highlight:
      "In practice, all executive power is exercised by the Council of Ministers — the President acts on their advice in virtually all matters."
  },
  {
    category: "Parliament",
    title: "Article 79 – Constitution of Parliament",
    description:
      "Parliament consists of the President, the Rajya Sabha (Council of States), and the Lok Sabha (House of the People) — three components that together form the supreme legislative body.",
    highlight:
      "The Rajya Sabha is a permanent house that cannot be dissolved, while the Lok Sabha has a maximum term of 5 years."
  },
  {
    category: "Parliament",
    title: "Article 108 – Joint Sitting of Both Houses",
    description:
      "In case of a deadlock over an ordinary bill between the two Houses, the President may summon a joint sitting. The larger Lok Sabha typically prevails due to its greater membership.",
    highlight:
      "Only three joint sittings have been held in Indian history: in 1961, 1978, and 2002."
  },
  {
    category: "Parliament",
    title: "Article 110 – Definition of Money Bill",
    description:
      "A Money Bill deals exclusively with taxation, borrowing, or Consolidated Fund expenditure. It can only be introduced in Lok Sabha; the Rajya Sabha can suggest amendments but cannot reject it.",
    highlight:
      "The Speaker of Lok Sabha has the final say on certifying whether a bill is a Money Bill — this decision is not subject to judicial review."
  },
  {
    category: "Parliament",
    title: "Article 112 – The Union Budget",
    description:
      "The President shall cause to be laid before Parliament a statement of estimated receipts and expenditure — popularly called the Union Budget — for each financial year.",
    highlight:
      "India's financial year runs from 1 April to 31 March, a legacy of British colonial administration inherited at independence."
  },
  {
    category: "The Judiciary",
    title: "Article 124 – Establishment of Supreme Court",
    description:
      "The Supreme Court of India was established on 28 January 1950, two days after the Constitution came into force. It originally had a Chief Justice and 7 judges; today that strength stands at 34.",
    highlight:
      "The Supreme Court of India has original, appellate, and advisory jurisdiction all under one roof — making it one of the most powerful courts in the world."
  },
  {
    category: "The Judiciary",
    title: "Article 137 – Review of Judgments",
    description:
      "The Supreme Court has the power to review any judgment or order made by it, subject to the provisions of any law made by Parliament or rules under Article 145.",
    highlight:
      "A Review Petition must be filed within 30 days and is usually heard in-chamber by the same bench, without oral arguments."
  },
  {
    category: "Federalism",
    title: "Article 249 – Parliament's Power on State Subjects",
    description:
      "If the Rajya Sabha declares by a two-thirds majority that it is necessary in the national interest, Parliament can legislate on a State List subject for up to one year at a time.",
    highlight:
      "This provision underscores India's 'cooperative federalism' model — the centre can step in on state subjects during emergencies of national importance."
  },
  {
    category: "Federalism",
    title: "Article 262 – Inter-State Water Disputes",
    description:
      "Parliament may provide for adjudication of disputes relating to the waters of inter-state rivers, and may bar the Supreme Court's jurisdiction in such matters.",
    highlight:
      "This led to the Inter-State River Water Disputes Act, 1956, under which tribunals like the Cauvery Water Disputes Tribunal have been constituted."
  },
  {
    category: "Emergency Provisions",
    title: "Article 352 – National Emergency",
    description:
      "The President can proclaim a National Emergency if the security of India or any part is threatened by war, external aggression, or armed rebellion. Since 1950, it has been proclaimed three times.",
    highlight:
      "The 44th Amendment (1978) replaced 'internal disturbance' with 'armed rebellion' to prevent misuse — a direct response to the controversial Emergency of 1975–77."
  },
  {
    category: "Emergency Provisions",
    title: "Article 356 – President's Rule",
    description:
      "If the President is satisfied that the government of a state cannot be carried on in accordance with the Constitution, President's Rule can be imposed on the Governor's report or otherwise.",
    highlight:
      "President's Rule has been imposed over 130 times since 1950. In S.R. Bommai v. Union of India (1994), the Supreme Court held it is subject to judicial review."
  },
  {
    category: "Amendment Procedure",
    title: "Article 368 – Power to Amend",
    description:
      "Parliament may amend any provision of the Constitution by introducing a bill in either House. Some amendments need a special majority; others also require ratification by half the state legislatures.",
    highlight:
      "The Constitution has been amended over 105 times since 1950 — making it one of the world's most frequently amended constitutions."
  },
  {
    category: "Schedules",
    title: "The Ninth Schedule – Protected Laws",
    description:
      "Added by the First Amendment (1951), the Ninth Schedule lists laws that cannot be challenged in courts on Fundamental Rights grounds. It originally contained 13 laws; today it has 284.",
    highlight:
      "In I.R. Coelho v. State of Tamil Nadu (2007), the Supreme Court held that Ninth Schedule laws passed after 24 April 1973 can be reviewed if they violate the basic structure."
  },
  {
    category: "Schedules",
    title: "Tenth Schedule – Anti-Defection Law",
    description:
      "Added by the 52nd Amendment (1985), the Tenth Schedule disqualifies an MP or MLA if they voluntarily give up party membership or vote against party directions.",
    highlight:
      "The Speaker/Chairman decides disqualification petitions under the Tenth Schedule, but that decision itself is subject to judicial review by the High Court or Supreme Court."
  },
  {
    category: "Citizenship",
    title: "Article 11 – Parliament's Power on Citizenship",
    description:
      "Parliament has the power to make laws regulating the right of citizenship and matters connected with it. This led to the Citizenship Act, 1955, which governs acquisition and loss of Indian citizenship.",
    highlight:
      "India does not generally permit dual citizenship — the Overseas Citizen of India (OCI) card is not full citizenship but a long-term visa with certain rights."
  },
  {
    category: "Official Language",
    title: "Article 343 – Official Language of the Union",
    description:
      "Hindi in the Devanagari script is the official language of the Union. English was to continue for 15 years, but the Official Languages Act, 1963 extended its use indefinitely for official purposes.",
    highlight:
      "India has 22 languages listed in the Eighth Schedule. The Constitution does not designate a 'national language' — a distinction that is widely misunderstood."
  },
  {
    category: "Finance Commission",
    title: "Article 280 – Finance Commission",
    description:
      "The President constitutes a Finance Commission every five years to recommend how tax revenues should be distributed between the Centre and the States.",
    highlight:
      "The 16th Finance Commission (2024–29), chaired by Arvind Panagariya, is currently reviewing the devolution formula for state shares in central taxes."
  },
  {
    category: "Comptroller & Auditor General",
    title: "Article 148 – The CAG of India",
    description:
      "The Comptroller and Auditor General is the supreme audit institution of India, appointed by the President. The CAG audits all accounts of the Union and the States.",
    highlight:
      "The CAG's reports have been instrumental in exposing major scams — including the 2G spectrum and Commonwealth Games controversies — by placing findings before Parliament."
  },
  {
    category: "Election Commission",
    title: "Article 324 – Election Commission",
    description:
      "The superintendence, direction, and control of elections to Parliament and State Legislatures is vested in the Election Commission of India, an independent constitutional body.",
    highlight:
      "The Chief Election Commissioner can only be removed by the same process as a Supreme Court judge — impeachment by Parliament — ensuring independence."
  },
  {
    category: "Local Self-Government",
    title: "Articles 243-243O – Panchayati Raj",
    description:
      "The 73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions, mandating elections to village, intermediate, and district panchayats across India.",
    highlight:
      "One-third of all seats in Panchayati Raj institutions are reserved for women — a constitutional mandate that has put over 1.4 million women into elected local governance roles."
  }
]
// ─────────────────────────────────────────────────────────────────────────────

function UserDashboard({ onLogout, onNavigateHome, onNavigateSupport, onModuleSelect, onStartQuiz, onStartSpinWheel, onStartLexicon }) {
  const API_ROOT = import.meta.env.VITE_API_BASE_URL || 'https://civic-circuit.onrender.com'
  const storedFullname = sessionStorage.getItem('fullname') || ''
  const storedEmail = sessionStorage.getItem('email') || ''
  const displayNameOverride = storedEmail ? (localStorage.getItem(`displayName_${storedEmail}`) || '') : ''
  const emailName = storedEmail.includes('@') ? storedEmail.split('@')[0] : ''
  const displayName = (displayNameOverride || storedFullname || emailName || 'Guest').trim()
  const [userStats, setUserStats] = useState({ gamesCompleted: 0, accuracyRate: 0, attempted: 0, factor: 0 })
  const [nameInput, setNameInput] = useState(displayName)
  const isFirstTime = sessionStorage.getItem('firstTime') === 'true'
  const [showNamePrompt, setShowNamePrompt] = useState(isFirstTime && !displayNameOverride)
  const [dailyFact, setDailyFact] = useState(null)
  const [factLoading, setFactLoading] = useState(true)

  useEffect(() => {
    const email = sessionStorage.getItem('email')
    if (!email) return

    const applyStats = (data) => {
      const overallAccuracy = Number(data?.accuracyRate || 0)
      const lexiconAccuracy = Number(data?.lexiconAccuracyRate || 0)

      setUserStats({
        gamesCompleted: Number(data?.gamesCompleted || 0),
        accuracyRate: overallAccuracy > 0 ? overallAccuracy : lexiconAccuracy,
        attempted: Number(data?.attempted || 0),
        factor: Number(data?.factor || 0)
      })
    }

    const cachedStats = sessionStorage.getItem(`userStats_${email}`)
    if (cachedStats) {
      try {
        applyStats(JSON.parse(cachedStats))
      } catch {
        // Ignore malformed cache and continue with API fetch.
      }
    }

    const fetchUserStats = async () => {
      try {
        const response = await fetch(`${API_ROOT}/app/user/${encodeURIComponent(email)}`)
        if (!response.ok) return
        const data = await response.json()
        applyStats(data)
        sessionStorage.setItem(`userStats_${email}`, JSON.stringify(data))
      } catch {
        // Keep fallback static stats if API call fails.
      }
    }

    const handleStatsUpdated = (event) => {
      if (event?.detail?.email === email) fetchUserStats()
    }

    fetchUserStats()
    window.addEventListener('user-stats-updated', handleStatsUpdated)
    return () => window.removeEventListener('user-stats-updated', handleStatsUpdated)
  }, [API_ROOT])

  // ── Daily Fact — no API, rotates by day-of-year ──────────────────────────
  useEffect(() => {
    const getDayOfYear = () => {
      const now = new Date()
      const start = new Date(now.getFullYear(), 0, 0)
      return Math.floor((now - start) / (1000 * 60 * 60 * 24))
    }

    const today = new Date().toDateString()
    const cachedDate = localStorage.getItem('dailyFactDate')

    // Serve from cache if it's still today
    if (cachedDate === today) {
      try {
        const cached = localStorage.getItem('dailyFact')
        if (cached) {
          setDailyFact(JSON.parse(cached))
          setFactLoading(false)
          return
        }
      } catch {
        // Cache corrupt — fall through to recalculate
      }
    }

    const index = getDayOfYear() % CONSTITUTION_FACTS.length
    const fact = CONSTITUTION_FACTS[index]

    localStorage.setItem('dailyFact', JSON.stringify(fact))
    localStorage.setItem('dailyFactDate', today)
    setDailyFact(fact)
    setFactLoading(false)
  }, [])
  // ─────────────────────────────────────────────────────────────────────────

  const totalPoints = Math.max(0, userStats.factor * POINTS_PER_CORRECT_ANSWER)
  const learnerLevel = getLearnerLevel(totalPoints)

  const learningModules = [
    {
      id: 'executive',
      image: '/assets/Executive.png',
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
      image: '/assets/legislature.png.jpg',
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
      image: '/assets/legislative-power.png.jpg',
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
      image: '/assets/state-executive.png.jpg',
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
      image: '/assets/State.png',
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
      image: '/assets/state-legislative.png.jpg',
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
      image: '/assets/knowledge-quest.png.jpg',
      title: 'Quiz Circuit',
      subtitle: 'Quiz Game Mode',
      description: "Test your understanding of India's Legislature, Executive, and Judiciary through structured quizzes.",
      objectives: [
        'Clear grasp of the constitutional framework',
        'In-depth understanding of Parts V and VI',
        'Practical application of constitutional principles'
      ],
      features: ['Question Progression', 'Score Tracking', 'Complete Coverage'],
      buttonText: 'Play Quiz Circuit'
    },
    {
      id: 'lexicon-circuit',
      image: '/assets/Word Game Icon.png',
      title: 'Lexicon Circuit',
      subtitle: 'Constitution Word Game',
      description: 'Match constitutional terms with their meanings, articles with their concepts, and institutions with their roles',
      objectives: [
        'Strengthening constitutional vocabulary',
        'Recognizing important articles and concepts',
        'Improving recall through word association'
      ],
      features: ['Letter-based word formation', 'Level Progression', 'Concept Focus'],
      buttonText: 'Play Lexicon Circuit'
    },
    {
      id: 'spin-wheel',
      image: '/assets/spin-wheel.png.jpg',
      title: 'Circuit Spin',
      subtitle: 'Spin to Explore Constitutional Topics',
      description: 'Spin the wheel to unlock constitutional categories and explore related articles, institutions, and key provisions.',
      objectives: [
        'Spin the wheel to choose a category',
        'View all articles linked to that category',
        'Learn concepts in a structured, visual way'
      ],
      features: ['Rights, Duties, and Procedures', 'Constitutional Articles', 'Institutions & Powers'],
      buttonText: 'Spin the Circuit'
    }
  ]

  const handleGameButtonClick = (game) => {
    if (game.id === 'knowledge-quest') onStartQuiz()
    else if (game.id === 'spin-wheel') onStartSpinWheel()
    else if (game.id === 'lexicon-circuit') onStartLexicon()
    else console.log(`${game.title} - Coming Soon!`)
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
            <nav className="dashboard-nav"></nav>
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
          <div className="welcome-banner-gradient">
            <h2>{isFirstTime ? `Welcome, ${displayName}!` : `Welcome back, ${displayName}!`}</h2>
            <p>Ready to continue your constitutional learning journey? You're making great progress!</p>

            {showNamePrompt && (
              <div className="name-prompt">
                <p style={{ marginBottom: '8px' }}>Looks like this is your first time — pick a display name to show in the app:</p>
                <div className="name-prompt-row">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Display name"
                    className="name-prompt-input"
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

          {/* Stats Cards */}
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
                src="/assets/bulb-idea-light_svgrepo.com (1).png"
                alt="Idea Icon"
                className="fact-icon-svg-new"
              />
            </div>
            <div className="fact-content-new">
              <div className="fact-header-new">
                <h3>Constitutional Fact of the Day</h3>
                {factLoading
                  ? <span className="fact-category-badge">Loading...</span>
                  : <span className="fact-category-badge">{dailyFact?.category}</span>
                }
              </div>
              {factLoading ? (
                <p className="fact-description-new" style={{ opacity: 0.6 }}>Fetching today's constitutional fact...</p>
              ) : (
                <>
                  <p className="fact-description-new">
                    <strong>{dailyFact?.title}</strong> — {dailyFact?.description}
                  </p>
                  <p className="fact-highlight-new">{dailyFact?.highlight}</p>
                </>
              )}
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
                <button className="game-btn" onClick={() => handleGameButtonClick(game)}>
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
                <button className="module-btn" onClick={() => onModuleSelect(module)}>
                  {module.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={() => {}}
        onNavigateSupport={onNavigateSupport}
        isLoggedIn={true}
      />
    </div>
  )
}

export default UserDashboard