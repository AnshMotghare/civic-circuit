import React, { useState } from 'react'
import './DownloadSection.css'

function DownloadSection() {
  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Bengali', native: 'বাংলা (Bengali)' },
    { name: 'Hindi', native: 'हिंदी (Hindi)' },
    { name: 'Tamil', native: 'தமிழ் (Tamil)' },
    { name: 'Telugu', native: 'తెలుగు (Telugu)' },
    { name: 'Marathi', native: 'मराठी (Marathi)' },
    { name: 'Gujarati', native: 'ગુજરાતી (Gujarati)' },
    { name: 'Sanskrit', native: 'संस्कृत (Sanskrit)' }
  ]

  const [clickedIndex, setClickedIndex] = useState(null)

  const handleDownload = (index) => {
    setClickedIndex(index)
    // Here we would typically trigger an actual download
    // And reset after some time
    setTimeout(() => {
      setClickedIndex(null)
    }, 5000)
  }

  return (
    <section className="download-section reveal" id="download">
      <div className="container">
        <h2 className="section-title reveal">Download Constitution in Different Languages</h2>
        <div className="download-grid reveal delay-1">
          {languages.map((lang, index) => (
            <div key={index} className="download-card">
              <h4>{lang.native}</h4>
              <button 
                className={`download-btn ${clickedIndex === index ? 'started' : ''}`}
                onClick={() => handleDownload(index)}
              >
                {clickedIndex === index 
                  ? 'Download Started, if not click again on Download Button'
                  : 'Download PDF'}
              </button>
            </div>
          ))}
        </div>
        <div className="source-info reveal delay-2">
          <p>Source: Government of India - Legislative Department</p>
          <p>All documents are official and updated versions from government sources.</p>
        </div>
      </div>
    </section>
  )
}

export default DownloadSection
