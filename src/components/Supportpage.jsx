import React, { useEffect, useMemo, useRef, useState } from 'react'
import Footer from './Footer'

const API_ROOT = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const API_BASE_URL = `${API_ROOT}/app`

function SupportPage({ onNavigateHome, onNavigateDashboard, onNavigateSupport, isLoggedIn, scrollToSection }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [feedbackState, setFeedbackState] = useState({ status: 'idle', message: '' })
  const faqRef = useRef(null)
  const contactRef = useRef(null)
  const feedbackRef = useRef(null)

  const faqs = useMemo(() => ([
    {
      question: '1. What is this platform about?',
      answer: 'This platform helps you learn the Indian Constitution in a simple and engaging way using short lessons and interactive games.'
    },
    {
      question: '2. Do I need prior knowledge of the Constitution to start?',
      answer: 'Not at all! Our lessons start from the basics and guide you step by step.'
    },
    {
      question: '3. How does learning through games work?',
      answer: 'You complete a learning module, then unlock a related game to test your knowledge in a fun way.'
    },
    {
      question: '4. Do I have to complete learning before playing the games?',
      answer: 'Yes, each game is linked to a lesson. Completing the lesson first ensures you understand the concepts before playing.'
    },
    {
      question: '5. Can I track my progress?',
      answer: 'Yes, each card shows your progress with a bar and percentage so you always know how far you have come.'
    },
    {
      question: '6. Is the content based on real articles from the Constitution?',
      answer: 'Yes, our modules are based directly on the Articles of the Indian Constitution, but explained in simple language.'
    },
    {
      question: '7. How long does each learning module take?',
      answer: 'Most modules can be completed in 5-10 minutes, depending on your pace.'
    },
    {
      question: '8. Is this platform free to use?',
      answer: 'Yes, it is completely free to learn, play, and explore.'
    },
    {
      question: '9. Will my progress be saved if I log in from another device?',
      answer: 'Yes. Once you create an account, your progress is stored securely, so you can continue learning from any device.'
    },
    {
      question: '10. Will this help me prepare for exams?',
      answer: 'Yes. While it is designed to make learning fun for everyone, it can also help students preparing for exams like UPSC, SSC, and law entrance tests by simplifying complex topics.'
    }
  ]), [])

  useEffect(() => {
    const scrollToRef = (ref) => {
      if (ref?.current) {
        setTimeout(() => {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    if (scrollToSection === 'faq') {
      scrollToRef(faqRef)
    } else if (scrollToSection === 'contact') {
      scrollToRef(contactRef)
    } else if (scrollToSection === 'feedback') {
      scrollToRef(feedbackRef)
    }
  }, [scrollToSection])

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target
    setFeedbackForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    setFeedbackState({ status: 'loading', message: 'Sending your feedback...' })

    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(feedbackForm)
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.message || 'Feedback could not be sent right now.')
      }

      setFeedbackState({
        status: 'success',
        message: data.message || 'Thanks for your feedback. We received it successfully.'
      })
      setFeedbackForm({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setFeedbackState({ status: 'error', message: error.message || 'Something went wrong while sending feedback.' })
    }
  }

  return (
    <>
      <div className="support-page">
        <div className="support-topbar reveal active">
          <div className="container">
            <div className="support-topbar-content">
              <button className="support-brand" type="button" onClick={onNavigateHome}>
                Civic Circuit <span className="support-badge">Support Center</span>
              </button>

              <div className="support-user-actions">
                {isLoggedIn ? (
                  <>
                    <span className="support-username">{sessionStorage.getItem('email') || 'User'}</span>
                    <button className="support-home-btn" type="button" onClick={onNavigateHome}>
                      Home
                    </button>
                    <button className="support-home-btn support-logout-btn" type="button" onClick={onNavigateDashboard}>
                      Log Out
                    </button>
                  </>
                ) : (
                  <button className="support-home-btn" type="button" onClick={onNavigateHome}>
                    Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="support-main reveal active">
          <div className="container">
            <div className="support-layout">
              <section className="support-column support-faq-column" ref={faqRef} id="faq">
                <div className="support-section-title-wrap">
                  <h2>FAQ's</h2>
                </div>
                <div className="faq-container support-faq-container">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`faq-item reveal delay-${(index % 4) + 1}`}>
                      <button
                        className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => toggleFAQ(index)}
                        type="button"
                      >
                        <span>{faq.question}</span>
                        <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
                      </button>
                      {activeIndex === index && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="support-column support-side-column">
                <div className="support-panel" ref={contactRef} id="contact">
                  <h2>Contact Us</h2>
                  <div className="support-contact-grid">
                    <div className="team-card support-mini-card reveal delay-1">
                      <h3>Team Phoenix</h3>
                      <h4>Pruthviraj Patil</h4>
                      <p className="role">Ministry of Backend</p>
                      <p>Sangav.</p>
                      <p>Pin: 416001</p>
                      <p>Tel: 8766842665</p>
                      <p>Mail: pruthvirajpatil.dyp@gmail.com</p>
                    </div>
                    <div className="team-card support-mini-card reveal delay-2">
                      <h3>Team Phoenix</h3>
                      <h4> Ansh Motghare</h4>
                      <p className="role">Ministry of Frontend</p>
                      <p>Chandrapur.</p>
                      <p>Pin: 416001</p>
                      <p>Tel: 9373285186</p>
                      <p>Mail: anshmotghare953@gmail.com</p>
                    </div>
                    <div className="team-card support-mini-card reveal delay-3">
                      <h3>Team Phoenix</h3>
                      <h4> Pranav Parit</h4>
                      <p className="role">Ministry of Designing</p>
                      <p>Gokul Shirgaon.</p>
                      <p>Pin: 416001</p>
                      <p>Tel: 9021251753</p>
                      <p>Mail: paritpranav48@gmail.com</p>
                    </div>
                    <div className="team-card support-mini-card reveal delay-4">
                      <h3>Team Phoenix</h3>
                      <h4> Swapnil Patil</h4>
                      <p className="role">Ministry of Documentations</p>
                      <p>Nandurbar.</p>
                      <p>Pin: 416001</p>
                      <p>Tel: 9561153704</p>
                      <p>Mail: swapnil.sp4444@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="support-panel support-feedback-panel" ref={feedbackRef} id="feedback">
                  <h2>Send Feedback</h2>
                  <p className="form-note">*Indicates mandatory field</p>
                  <form className="feedback-form support-feedback-form" onSubmit={handleFeedbackSubmit}>
                    <input name="name" type="text" placeholder="Name*" required value={feedbackForm.name} onChange={handleFeedbackChange} />
                    <input name="email" type="email" placeholder="Email*" required value={feedbackForm.email} onChange={handleFeedbackChange} />
                    <input name="subject" type="text" placeholder="Subject*" required value={feedbackForm.subject} onChange={handleFeedbackChange} />
                    <textarea name="message" placeholder="Your Message*" rows="6" required value={feedbackForm.message} onChange={handleFeedbackChange} />
                    <button type="submit" className="submit-feedback-btn" disabled={feedbackState.status === 'loading'}>
                      {feedbackState.status === 'loading' ? 'Sending...' : 'Send'}
                    </button>
                    {feedbackState.message && (
                      <p className={`feedback-status feedback-status--${feedbackState.status}`} aria-live="polite">
                        {feedbackState.message}
                      </p>
                    )}
                  </form>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={() => {
          if (sessionStorage.getItem('isLoggedIn') === 'true') {
            onNavigateDashboard()
          } else {
            onNavigateHome()
          }
        }}
        onNavigateSupport={onNavigateSupport}
        isLoggedIn={isLoggedIn}
      />
    </>
  )
}

export default SupportPage
