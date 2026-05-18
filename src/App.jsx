import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ThreeModules from './components/ThreeModules'
import OurAim from './components/OurAim'
import LearningModules from './components/LearningModules'
import Games from './components/Games'
import DownloadSection from './components/DownloadSection'
import Footer from './components/Footer'
import AuthModals from './components/AuthModals'
import UserDashboard from './components/UsersDashboard'
import SupportPage from './components/Supportpage'
import UnionExecutiveBook from './components/UnionExecutiveBook'
import TheParliamentBook from './components/TheParliamentBook'
import LegislativePowersBook from './components/LegislativePowersBook'
import TheStateExecutiveBook from './components/TheStateExecutiveBook'
import TheStateLegislatureBook from './components/TheStateLegislatureBook'
import TheStateJudiciaryBook from './components/TheStateJudiciaryBook'
import Quiz from './components/Quiz'
import CircuitSpin from './components/CircuitSpin'
import LexiconCircuit from './components/LexiconCircuit'

function App() {




  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [currentPage, setCurrentPage] = useState(sessionStorage.getItem('isLoggedIn') === 'true' ? 'dashboard' : 'home')
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true')
  const [supportSection, setSupportSection] = useState('faq')
  const [selectedModule, setSelectedModule] = useState(null)

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentPage, isLoggedIn]);

  const openLogin = () => {
    setShowLogin(true)
    setShowSignup(false)
  }

  const openSignup = () => {
    setShowSignup(true)
    setShowLogin(false)
  }

  const closeModals = () => {
    setShowLogin(false)
    setShowSignup(false)
  }

  const handleLoginSuccess = (userData) => {
    // store any provided user data from the auth modal
    if (userData && userData.email) {
      sessionStorage.setItem('email', userData.email)
    }
    if (userData && userData.fullname) {
      sessionStorage.setItem('fullname', userData.fullname)
    }

    // determine if this is the user's first time (persisted by email)
    const email = sessionStorage.getItem('email')
    if (email) {
      const seenKey = `seen_${email}`
      const seen = localStorage.getItem(seenKey)
      if (!seen) {
        sessionStorage.setItem('firstTime', 'true')
        localStorage.setItem(seenKey, Date.now().toString())
      } else {
        sessionStorage.setItem('firstTime', 'false')
      }
    } else {
      sessionStorage.setItem('firstTime', 'false')
    }

    setIsLoggedIn(true)
    sessionStorage.setItem('isLoggedIn', 'true')
    setCurrentPage('dashboard')
    closeModals()
  }

  const handleSignupSuccess = () => {
    setShowSignup(false)
    setShowLogin(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    sessionStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('email')
    setCurrentPage('home')
    setSelectedModule(null)
  }

  const navigateToSupport = (section = 'faq') => {
    setSupportSection(section)
    setCurrentPage('support')
  }

  const navigateToHome = () => {
    setCurrentPage('home')
    setSelectedModule(null)
  }

  const handleModuleSelect = (module) => {
    setSelectedModule(module)
    setCurrentPage('book')
  }

  const handleCloseBook = () => {
    setSelectedModule(null)
    setCurrentPage('dashboard')
  }

  const handleStartQuiz = () => {
    console.log('Starting quiz...')
    setCurrentPage('quiz')
  }

  const handleBackToDashboard = () => {
    console.log('Back to dashboard...')
    setCurrentPage('dashboard')
  }

  const handleStartSpinWheel = () => {
    console.log('Starting spin wheel game...')
    setCurrentPage('spin-wheel')
  }

  const handleStartLexicon = () => {
    console.log('Starting lexicon game...')
    setCurrentPage('lexicon')
  }

  const handleCloseGame = () => {
    setCurrentPage('dashboard')
  }

  // Circuit Spin Game page rendering (Fullscreen override)
  if (currentPage === 'spin-wheel') {
    return <CircuitSpin onClose={handleCloseGame} />
  }

  // Lexicon Circuit Game page rendering (Fullscreen override)
  if (currentPage === 'lexicon') {
    return <LexiconCircuit onClose={handleCloseGame} />
  }

  // ✅ PERFECTLY INTEGRATED: Book page rendering (Fullscreen override)
  if (currentPage === 'book' && isLoggedIn && selectedModule) {
    if (selectedModule.id === 'parliament') {
      return <TheParliamentBook module={selectedModule} onClose={handleCloseBook} />
    }
    if (selectedModule.id === 'powers') {
      return <LegislativePowersBook module={selectedModule} onClose={handleCloseBook} />
    }
    if (selectedModule.id === 'state-executive') {
      return <TheStateExecutiveBook module={selectedModule} onClose={handleCloseBook} />
    }
    if (selectedModule.id === 'state-legislature') {
      return <TheStateLegislatureBook module={selectedModule} onClose={handleCloseBook} />
    }
    if (selectedModule.id === 'judiciary') {
      return <TheStateJudiciaryBook module={selectedModule} onClose={handleCloseBook} />
    }
    return <UnionExecutiveBook module={selectedModule} onClose={handleCloseBook} />
  }

  // Quiz page rendering (Fullscreen override)
  if (currentPage === 'quiz' && isLoggedIn) {
    return (
      <Quiz
        onLogout={handleLogout}
        onNavigateHome={navigateToHome}
        onBackToDashboard={handleBackToDashboard}
      />
    )
  }

  // Main Application Output (Home, Dashboard, Support)
  return (
    <div className="App">
      {/* Dynamic Main Body */}
      {currentPage === 'dashboard' && isLoggedIn ? (
        <UserDashboard
          onLogout={handleLogout}
          onNavigateHome={navigateToHome}
          onNavigateSupport={navigateToSupport}
          onModuleSelect={handleModuleSelect}
          onStartQuiz={handleStartQuiz}
          onStartSpinWheel={handleStartSpinWheel}
          onStartLexicon={handleStartLexicon}
        />
      ) : currentPage === 'support' ? (
        <>
          <SupportPage
            onNavigateHome={navigateToHome}
            onNavigateSupport={navigateToSupport}
            onNavigateDashboard={() => setCurrentPage('dashboard')}
            isLoggedIn={isLoggedIn}
            scrollToSection={supportSection}
          />
        </>
      ) : (
        <>
          <Header 
            onOpenLogin={openLogin} 
            onOpenSignup={openSignup} 
            isLoggedIn={isLoggedIn}
            onNavigateDashboard={() => setCurrentPage('dashboard')}
            onNavigateHome={navigateToHome}
          />
          <HeroSection onStartLearning={openLogin} />
          <ThreeModules />
          <OurAim />
          <LearningModules />
          <Games
            onStartQuiz={handleStartQuiz}
            onStartSpinWheel={handleStartSpinWheel}
            onStartLexicon={handleStartLexicon}
            onOpenLogin={openLogin}
            isLoggedIn={isLoggedIn}
          />
          <DownloadSection />
          <Footer 
            onNavigateHome={navigateToHome}
            onNavigateDashboard={() => setCurrentPage('dashboard')}
            onNavigateSupport={navigateToSupport}
            isLoggedIn={isLoggedIn}
          />
        </>
      )}

      {/* Global Auth Modals */}
      <AuthModals
        showLogin={showLogin}
        showSignup={showSignup}
        onClose={closeModals}
        onSwitchToLogin={openLogin}
        onSwitchToSignup={openSignup}
        onLoginSuccess={handleLoginSuccess}
        onSignupSuccess={handleSignupSuccess}
      />
    </div>
  )
}

export default App
