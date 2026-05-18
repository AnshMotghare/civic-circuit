import React, { useState } from 'react'
import './DownloadSection.css'

function DownloadSection() {
  const getPdfUrl = (fileName) => `${import.meta.env.BASE_URL}constitution/${fileName}`

  const languages = [
    { name: 'English', native: 'English', pdfFile: 'english-constitution-of-india.pdf' },
    { name: 'Bengali', native: 'বাংলা (Bengali)', pdfFile: 'the-constitution-of-india-bengali.pdf' },
    { name: 'Hindi', native: 'हिंदी (Hindi)', pdfFile: 'hindi-constitution-of-india.pdf' },
    { name: 'Tamil', native: 'தமிழ் (Tamil)', pdfFile: 'tamil-the-constitution-of-india.pdf' },
    { name: 'Telugu', native: 'తెలుగు (Telugu)', pdfFile: 'telugu-the-constitution-of-india.pdf' },
    { name: 'Marathi', native: 'मराठी (Marathi)', pdfFile: 'marathi-the-constitution-of-india-in-marathi.pdf' },
    { name: 'Gujarati', native: 'ગુજરાતી (Gujarati)', pdfFile: 'the-constitution-of-india-gujarati.pdf' },
    { name: 'Sanskrit', native: 'संस्कृत (Sanskrit)', pdfFile: 'the-constitution-of-india-sanskrit.pdf' }
  ]

  const [downloadStatus, setDownloadStatus] = useState(null)

  const handleDownload = (index, lang) => {
    setDownloadStatus({ index, message: 'Download started.' })

    const link = document.createElement('a')
    link.href = getPdfUrl(lang.pdfFile)
    link.download = `${lang.name}-Constitution.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      setDownloadStatus(null)
    }, 2500)
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
                className="download-btn"
                onClick={() => handleDownload(index, lang)}
              >
                Download PDF
              </button>
              {downloadStatus?.index === index && (
                <p className="download-status">{downloadStatus.message}</p>
              )}
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
