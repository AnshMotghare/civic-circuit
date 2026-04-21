import React, { useState, useEffect, useRef } from 'react'
import Footer from './Footer'

function SupportPage({ onNavigateHome, onNavigateDashboard, onNavigateSupport, isLoggedIn, scrollToSection }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const faqRef = useRef(null)
  const contactRef = useRef(null)
  const feedbackRef = useRef(null)

  const faqs = [
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
      answer: "Yes, each card shows your progress with a bar and percentage so you always know how far you've come."
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
      answer: "Yes, it's completely free to learn, play, and explore."
    },
    {
      question: '9. Will my progress be saved if I log in from another device?',
      answer: 'Yes. Once you create an account, your progress is stored securely, so you can continue learning from any device.'
    },
    {
      question: '10. Will this help me prepare for exams?',
      answer: "Yes. While it's designed to make learning fun for everyone, it can also help students preparing for exams like UPSC, SSC, and law entrance tests by simplifying complex topics."
    }
  ]

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  // Scroll to specific section when component loads or scrollToSection changes
  useEffect(() => {
    const scrollToRef = (ref) => {
      if (ref && ref.current) {
        setTimeout(() => {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }

    if (scrollToSection === 'faq' && faqRef.current) {
      scrollToRef(faqRef)
    } else if (scrollToSection === 'contact' && contactRef.current) {
      scrollToRef(contactRef)
    } else if (scrollToSection === 'feedback' && feedbackRef.current) {
      scrollToRef(feedbackRef)
    }
  }, [scrollToSection])

  return (
    <div className="support-page">
      {/* Top support nav – Home stays at extreme right */}
      <div className="support-nav">
        <div className="container">
          <div className="support-nav-content">
            <h2
              className="support-logo"
              onClick={onNavigateHome}
              style={{ cursor: 'pointer' }}
            >
              Civic Circuit
            </h2>
            <div className="support-nav-links">
              {/* Home and Support/Dashboard buttons removed per user request */}
            </div>
          </div>
        </div>
      </div>

      {/* Visitors support page label */}
      <div className="visitors-label">
        <div className="container">
          <p>Visitors support page</p>
        </div>
      </div>

      {/* Support Hero */}
<section className="support-hero">
  <div className="container">
    <div className="support-hero-content">
      <h2 className="support-logo-large">Civic Circuit</h2>
      <span className="support-badge">Support Center</span>

      {/* ❌ REMOVED BLACK HOME BUTTON */}
      {/* <button className="home-btn-hero" onClick={onNavigateHome}>Home</button> */}

      {/* (Optional) If you want FAQ button here, uncomment this: */}
      {/*
      <button className="home-btn-hero"
        onClick={() => faqRef.current.scrollIntoView({ behavior: 'smooth' })}
      >
        FAQ's
      </button>
      */}
    </div>
  </div>
</section>


      {/* FAQ Section */}
      <section className="faq-section" ref={faqRef} id="faq">
        <div className="container">
          <h2 className="section-title">FAQ&apos;s</h2>
          <div className="faq-container">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {activeIndex === index ? '∧' : '∨'}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" ref={contactRef} id="contact">
        <div className="container">
          <h2 className="section-title">Contact Us</h2>
          <div className="team-grid">
            <div className="team-card">
              <h3>Team Phoenix</h3>
              <h4>Dr. Pruthviraj Patil</h4>
              <p className="role">Ministry of Backend</p>
              <p>Sangav.</p>
              <p>Pin: 416001</p>
              <p>Tel: 0123456789</p>
              <p>Mail: user@domain.com</p>
            </div>
            <div className="team-card">
              <h3>Team Phoenix</h3>
              <h4>Dr. Ansh Motghare</h4>
              <p className="role">Ministry of Frontend</p>
              <p>Chandrapur.</p>
              <p>Pin: 416001</p>
              <p>Tel: 0123456789</p>
              <p>Mail: user@domain.com</p>
            </div>
            <div className="team-card">
              <h3>Team Phoenix</h3>
              <h4>Dr. Pranav Parit</h4>
              <p className="role">Ministry of Designing</p>
              <p>Gokul Shirgaon.</p>
              <p>Pin: 416001</p>
              <p>Tel: 0123456789</p>
              <p>Mail: user@domain.com</p>
            </div>
            <div className="team-card">
              <h3>Team Phoenix</h3>
              <h4>Dr. Swapnil Patil</h4>
              <p className="role">Ministry of Documentations</p>
              <p>Nandurbar.</p>
              <p>Pin: 416001</p>
              <p>Tel: 0123456789</p>
              <p>Mail: user@domain.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="feedback-section" ref={feedbackRef} id="feedback">
        <div className="container">
          <h2 className="section-title">Send Feedback</h2>
          <p className="form-note">*Indicates mandatory field</p>
          <form className="feedback-form">
            <div className="form-row">
              <input type="text" placeholder="Name*" required />
              <input type="email" placeholder="Email*" required />
            </div>
            <input type="text" placeholder="Subject*" required />
            <textarea placeholder="Your Message*" rows="6" required></textarea>
            <button type="submit" className="submit-feedback-btn">
              Send
            </button>
          </form>
        </div>
      </section>

      <Footer 
        onNavigateHome={onNavigateHome}
        onNavigateDashboard={() => { 
          // If we want to allow going to dashboard from support if logged in
          if (sessionStorage.getItem('isLoggedIn') === 'true') {
             window.location.href = '/dashboard'; // Or handle via prompt if possible
          } else {
             onNavigateHome();
          }
        }}
        onNavigateSupport={onNavigateSupport}
        isLoggedIn={sessionStorage.getItem('isLoggedIn') === 'true'}
      />
    </div>
  )
}

export default SupportPage
