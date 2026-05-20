import React, { useState, useEffect } from 'react'
import Footer from './Footer'
import './Quiz.css'

const API_ROOT = import.meta.env.VITE_API_BASE_URL || 'https://civic-circuit.onrender.com'
const QUIZ_API_BASE = `${API_ROOT}/quiz`
const POINTS_PER_QUESTION = 100

// Simple shuffle for options so correct answer isn't always last
const shuffleArray = (array) => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function Quiz({ onLogout, onNavigateHome, onBackToDashboard }) {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [currentQuestion, setCurrentQuestion] = useState(0)
  // answers: { [qid]: selectedOptionText }
  const [answers, setAnswers] = useState({})
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  // resultMap: { [qid]: boolean } from backend
  const [resultMap, setResultMap] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const [score, setScore] = useState(0)
  const [totalPoints, setTotalPoints] = useState(2450)
  const [showScorePopup, setShowScorePopup] = useState(false)

  // ----------------- Fetch questions from backend -----------------
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(`${QUIZ_API_BASE}/quetions`)
        if (!res.ok) {
          throw new Error('Failed to fetch quiz questions')
        }

        const data = await res.json()

        // Backend fields: qid, quetion, option1, option2, option3, rightanswer
        const normalized = data.map(q => {
          const allOptions = [...new Set([
            q.option1,
            q.option2,
            q.option3,
            q.rightanswer
          ])]
          const shuffled = shuffleArray(allOptions)

          return {
            id: q.qid,                   // question id
            question: q.quetion,         // note: "quetion" typo from DB
            options: shuffled,           // 4 options, shuffled
            correctOption: q.rightanswer // correct option TEXT
          }
        })

        setQuestions(normalized)
      } catch (err) {
        console.error(err)
        setError(err.message || 'Error loading quiz')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  // Helper: selected answer text for current question
  const getSelectedAnswerForCurrent = () => {
    if (!questions.length) return null
    const qId = questions[currentQuestion].id
    return answers[qId] ?? null
  }

  // ----------------- Handle option click -----------------
  const handleAnswerClick = (optionText) => {
    if (!questions.length || submitted) return

    const qId = questions[currentQuestion].id

    // Store selected OPTION TEXT against that question id
    setAnswers(prev => ({
      ...prev,
      [qId]: optionText
    }))

    if (!answeredQuestions.includes(currentQuestion)) {
      setAnsweredQuestions(prev => [...prev, currentQuestion])
    }
  }

  // ----------------- Navigation -----------------
  const handleNextQuestion = () => {
    if (!questions.length) return

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Last question → submit quiz
      handleSubmitQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  // ----------------- Submit quiz to backend -----------------
  const handleSubmitQuiz = async () => {
    if (!questions.length) return

    const email = sessionStorage.getItem('email')
    if (!email) {
      setError('No email found in session. Please login again.')
      return
    }

    // Optional: warn if there are unanswered questions (Google Forms behavior)
    const unanswered = questions.filter(q => answers[q.id] === undefined)
    if (unanswered.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered.length} unanswered questions. Do you still want to submit?`
      )
      if (!confirmSubmit) return
    }

    try {
      setLoading(true)
      setError('')

      // Build payload EXACTLY as: { "qid": "selectedOptionText" }
      const payload = {}
      Object.keys(answers).forEach(qid => {
        payload[qid] = answers[qid]
      })

      console.log('Submitting answers payload (qid -> selected option):', payload)

      const res = await fetch(
        `${QUIZ_API_BASE}/submit/${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || 'Failed to submit quiz')
      }

      const result = await res.json() // Expecting: { "qid": true/false, ... }
      console.log('Result map from backend (qid -> isCorrect):', result)

      setResultMap(result)
      setSubmitted(true)

      // Calculate score from result map
      let correctCount = 0
      Object.keys(result).forEach(qId => {
        if (result[qId]) correctCount += 1
      })

      const finalScore = correctCount * POINTS_PER_QUESTION
      setScore(finalScore)
      setTotalPoints(prev => prev + finalScore)

      // Sync latest backend stats for this specific logged-in user so dashboard points update immediately.
      try {
        const statsRes = await fetch(`${API_ROOT}/app/user/${encodeURIComponent(email)}`)
        if (statsRes.ok) {
          const latestStats = await statsRes.json()
          sessionStorage.setItem(`userStats_${email}`, JSON.stringify(latestStats))
          window.dispatchEvent(new CustomEvent('user-stats-updated', { detail: { email } }))
        }
      } catch {
        // Non-blocking: popup should still show even if stats sync fails.
      }

      setShowScorePopup(true)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Error submitting quiz')
    } finally {
      setLoading(false)
    }
  }

  const handleCloseScorePopup = () => {
    // Close popup AND go back to dashboard
    setShowScorePopup(false)
    onBackToDashboard()
  }

  // ----------------- Option CSS classes (Google Forms-like) -----------------
  const getOptionClass = (optionText) => {
    if (!questions.length) return 'quiz-option'

    const q = questions[currentQuestion]
    const qId = q.id
    const selectedText = answers[qId] ?? null

    // Before submission → just highlight selected
    if (!submitted) {
      if (optionText === selectedText) {
        return 'quiz-option selected'
      }
      return 'quiz-option'
    }

    // After submission → mark correct and wrong
    const isQuestionCorrect = resultMap && resultMap[qId]

    // Highlight correct answer
    if (optionText === q.correctOption) {
      return 'quiz-option correct-answer'
    }

    // Highlight user's wrong selection
    if (!isQuestionCorrect && optionText === selectedText) {
      return 'quiz-option wrong-answer'
    }

    if (optionText === selectedText) {
      return 'quiz-option selected'
    }

    return 'quiz-option'
  }

  // ----------------- Rendering states -----------------
  if (loading && !questions.length) {
    return (
      <div className="quiz-page">
        <div className="quiz-loading">Loading quiz...</div>
      </div>
    )
  }

  if (error && !questions.length) {
    return (
      <div className="quiz-page">
        <div className="quiz-error">{error}</div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="quiz-page">
        <div className="quiz-error">No questions available.</div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const selectedForCurrent = getSelectedAnswerForCurrent()
  const maxScore = questions.length * POINTS_PER_QUESTION
  const scorePercentage = Math.round((score / maxScore) * 100)
  const correctAnswers = score / POINTS_PER_QUESTION

  return (
    <div className="quiz-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <h1
              className="dashboard-logo"
              onClick={onNavigateHome}
              style={{ cursor: 'pointer' }}
            >
              Civic Circuit
            </h1>
            <div className="user-section">
              <span className="username">
                {sessionStorage.getItem('email') || 'Guest'}
              </span>
              {onBackToDashboard && (
                <button className="logout-btn" onClick={onBackToDashboard}>
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Global error */}
      {error && (
        <div className="quiz-error" style={{ textAlign: 'center', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {/* Quiz Title Pill - matching Lexicon Circuit style */}
      <div className="quiz-title-section">
          <div className="quiz-title-pill">
              <span>Civic Quiz</span>
          </div>
          <p className="quiz-title-subtitle">Test your knowledge of the Indian Constitution.</p>
      </div>

      {/* Quiz Container */}

      <div className="quiz-wrapper">
        <div className="quiz-container">
          {/* LEFT SIDEBAR - Question List */}
          <div className="quiz-sidebar">
            <div className="questions-list">
              {questions.map((q, index) => (
                <div
                  key={q.id + '-' + index}
                  className={`
                    question-tab 
                    ${currentQuestion === index ? 'active' : ''} 
                    ${answeredQuestions.includes(index) ? 'answered' : ''}
                  `}
                  onClick={() => setCurrentQuestion(index)}
                >
                  Question No. {index + 1}
                </div>
              ))}
            </div>

            {/* Bottom Section - Exit Button Only */}
            <div className="quiz-sidebar-bottom">
              <button className="exit-btn" onClick={onBackToDashboard}>
                Back
              </button>
            </div>
          </div>

          {/* RIGHT SIDE - Question Content */}
          <div className="quiz-main">
            {/* Question Header */}
            <div className="quiz-header">
              <h2>Question No. {currentQuestion + 1}</h2>
              <span className="points-badge">
                {POINTS_PER_QUESTION} Points
              </span>
            </div>

            {/* Question Text */}
            <div className="quiz-question">
              <p>{currentQ.question}</p>
            </div>

            {/* Options */}
            <div className="quiz-options">
            {currentQ.options.map((option, index) => {
              const qId = currentQ.id
              const selectedText = answers[qId] ?? null
              const isSelected = selectedText === option
              const isCorrectOption = option === currentQ.correctOption
              const isCorrectAnswer = resultMap && resultMap[qId]

              let optionClass = 'quiz-option'

              // BEFORE SUBMIT
              if (!submitted) {
                if (isSelected) {
                  optionClass = 'quiz-option selected'
                }
              }

              // AFTER SUBMIT
              else {

                // Correct answer always green
                if (isCorrectOption) {
                  optionClass = 'quiz-option correct-answer'
                }

                // Wrong selected answer red
                if (isSelected && !isCorrectAnswer) {
                  optionClass = 'quiz-option wrong-answer'
                }
              }

              return (
                <div
                  key={`${qId}-${option}`}
                  className={optionClass}
                  onClick={() => !submitted && handleAnswerClick(option)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (!submitted && (e.key === 'Enter' || e.key === ' ')) {
                      handleAnswerClick(option)
                    }
                  }}
                >
                  <span className="option-number">{index + 1}.</span>
                  <span className="option-text">{option}</span>

                  {/* BEFORE SUBMIT */}
                  {!submitted && isSelected && (
                    <span className="option-result-tag">
                      Selected
                    </span>
                  )}

                  {/* AFTER SUBMIT */}
                  {submitted && isCorrectOption && (
                    <span className="option-result-tag">
                      ✓ Correct Answer
                    </span>
                  )}

                  {submitted && isSelected && !isCorrectAnswer && (
                    <span className="option-result-tag">
                      ✗ Your Answer
                    </span>
                  )}
                </div>
              )
            })}
          </div>


            {/* Bottom Navigation */}
            <div className="quiz-bottom">
              <button
                className="prev-btn"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button
                className="next-btn"
                onClick={handleNextQuestion}
                disabled={loading}
              >
                {currentQuestion < questions.length - 1
                  ? 'Next →'
                  : submitted
                    ? 'View Results →'
                    : 'Submit Quiz →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Score Popup */}
      {showScorePopup && (
        <div className="score-popup-overlay">
          <div className="score-popup">
            <button
              className="close-popup-btn"
              onClick={() => setShowScorePopup(false)}
              aria-label="Close score card"
            >
              ✖
            </button>

            <div className="score-popup-header">
              <div className="trophy-icon">🏆</div>
              <div>
                <h2>Quiz Completed!</h2>
                <p className="score-popup-subtitle">Great effort. Here is your summary.</p>
              </div>
            </div>

            <div className="score-popup-content">
              <div className="final-score">
                <p className="final-score-label">Your Score</p>
                <p className="score-number">{score} / {maxScore}</p>
                <p className="score-percentage">{scorePercentage}%</p>
              </div>

              <div className="score-stats">
                <div className="stat-item">
                  <span className="stat-label">Correct Answers</span>
                  <span className="stat-value">{correctAnswers} / {questions.length}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Points Earned</span>
                  <span className="stat-value">+{score}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">New Total</span>
                  <span className="stat-value">{totalPoints}</span>
                </div>
              </div>

              <button
                className="back-dashboard-btn"
                onClick={handleCloseScorePopup}
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigateSupport={(section) => {
          window.location.href = '/support#' + section
        }}
      />
    </div>
  )
}

export default Quiz
