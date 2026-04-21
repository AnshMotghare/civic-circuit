import React from 'react'

function LearningModules() {
  const modules = [
    {
      title: 'The Parliament',
      articles: 'Articles 79-122',
      description: 'Explore Lok Sabha, Rajya Sabha & the law-making process.',
      image: '/src/assets/legislature.png.jpg',
      topics: [
        'Lok Sabha & Rajya Sabha',
        'Powers, Sessions, Law-making',
        'Speaker & Chairman roles',
        'Parliamentary procedures'
      ]
    },
    {
      title: 'Legislative Powers',
      articles: 'Articles 123-151',
      description: 'Discover ordinances, parliamentary privileges & the Supreme Court.',
      image: '/src/assets/legislative-power.png.jpg',
      topics: [
        'Ordinances',
        'Parliamentary privileges',
        'Union Judiciary (Supreme Court basics)',
        'Comptroller & Auditor General of India'
      ]
    },
    {
      title: 'The State Executive',
      articles: 'Articles 152-167',
      description: 'Understand the Governor, Chief Minister & State Executive.',
      image: '/src/assets/state-executive.png.jpg',
      topics: [
        'Governor',
        'Chief Minister & Council of Ministers',
        'Advocate General of State',
        "Council of Ministers' Responsibility"
      ]
    },
    {
      title: 'The State Legislature',
      articles: 'Articles 168-212',
      description: 'Learn about State Assemblies, Councils & law-making powers.',
      image: '/src/assets/state-legislative.png.jpg',
      topics: [
        'State Legislative Assembly & its Council',
        'Law-making process in states',
        'Speaker & Chairman roles',
        'Powers and privileges of state legislature'
      ]
    }
  ]

  return (
    <section className="learning-modules reveal" id="modules">
      <div className="container">
        <h2 className="section-title reveal">What You'll Learn</h2>
        
        <div className="modules-grid-four-column reveal delay-2">
          {modules.map((module, index) => (
            <div key={index} className="learning-card-vertical">
              <img src={module.image} alt={module.title} className="learning-image" />
              <div className="learning-content">
                <h3>{module.title}</h3>
                <p className="articles">{module.articles}</p>
                <p className="description">{module.description}</p>
                <div className="topics">
                  <p className="topics-title">Topics:</p>
                  {module.topics.map((topic, idx) => (
                    <p key={idx} className="topic-item">{topic}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LearningModules
