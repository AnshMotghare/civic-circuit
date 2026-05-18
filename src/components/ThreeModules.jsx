import React from 'react'

function ThreeModules() {
  const modules = [
    {
      title: 'Legislature',
      subtitle: 'Law Making',
      image: '/assets/legislature.png.jpg' // Replace with your image path
    },
    {
      title: 'Executive',
      subtitle: 'Implementation',
      image: '/assets/executive.png.jpg' // Replace with your image path
    },
    {
      title: 'Judiciary',
      subtitle: 'Justice Delivery',
      image: '/assets/judiciary.png.jpg' // Replace with your image path
    }
  ]

  return (
    <section className="three-modules reveal">
      <div className="container">
        <div className="modules-grid reveal delay-1">
          {modules.map((module, index) => (
            <div key={index} className="module-card">
              <img src={module.image} alt={module.title} className="module-icon" />
              <h3>{module.title}</h3>
              <p>{module.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ThreeModules
