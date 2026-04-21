import React, { useState } from 'react';
import Footer from './Footer';
import './CircuitSpin.css';

const CircuitSpin = ({ onClose }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentTopic, setCurrentTopic] = useState(null);
    const [completedTopics, setCompletedTopics] = useState([]);
    const [rotation, setRotation] = useState(0);

    // Topics ordered clockwise from the top slice (which spans -30deg to 30deg)
    const topics = [
        {
            id: 1,
            name: 'State Relations',
            // this slice spans -30 to 30 deg. Center is 0 deg.
            angleOffset: 0,
            content: {
                title: 'State Relations',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    '(Artical 112): The Goverment presents an Annual Budget showing income and spending plans.',
                    '(Artical 266): Major goverment revenues are collected and kept in the Consolidated Fund.',
                    '(Artical 148): The CAG audits government accounts to ensure transparency and honesty',
                    '(Artical 110): A Bill dealing only with taxes or money matters is called a Money Bill'
                ]
            }
        },
        {
            id: 2,
            name: 'Judicial Writs',
            angleOffset: 60,
            content: {
                title: 'Judicial Writs',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    '(Artical 32): Critizens may move the Supreme Court if their fundamental rights are voilated.',
                    '(Artical 226): High Courts may issue writs to protect rights and enforce legal duties.',
                    '(Artical 32 & 226): Writ of Prohibition stops lower courts from acting beyond legal authority.',
                    '(Artical 32 & 226): Writ of Certiorari allows higher courts to correct lower court mistakes.'
                ]
            }
        },
        {
            id: 3,
            name: 'Executive Roles',
            angleOffset: 120,
            content: {
                title: 'Executive Roles',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    '(Articale 52): The President is the head of the Union Executive and represents the nation.',
                    '(Articale 74): The Council of Minister, led by the Prime Minister, aids and advise the President.',
                    '(Article 153): A Governor heads the State Executive and works under constitutional rules',
                    '(Article 123 & 213): President and Governor may issue temporary laws when the Legislature is not in session.'
                ]
            }
        },
        {
            id: 4,
            name: 'Law Making Flow',
            angleOffset: 180,
            content: {
                title: 'Law Making Flow',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    '(Article 107): A Bill is first introduced and debated in Parliament before approval.',
                    '(Article 108): A joint sitting may settle disagreements between the two Houses',
                    '(Article 111): A bill become law after the President gives approval known as assent.',
                    '(Article 109): Money Bills follow special financial procedures and begin in the Lok Sabha'
                ]
            }
        },
        {
            id: 5,
            name: 'Duty',
            angleOffset: 240,
            content: {
                title: 'Duty',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    '(Article 51A(a)): Citizens must respect the Constitution, national flag, and national anthem.',
                    '(Article 51A(d)): Every citizen should defend the nation when required.)',
                    '(Article 51A(i)): Public property must be protected and not damaged.',
                    '(Article 51(h)): Citizens shoul develop a scientific and questioning attitude.'
                ]
            }
        },
        {
            id: 6,
            name: 'Finacials',
            angleOffset: 300,
            content: {
                title: 'Finacials',
                description: 'This topic will explain an important part of the Constitution in simple words.',
                details: [
                    'Details here will describe how government powers and duties are organised.',
                    'This section will help you learn a constitutional idea through clear points.',
                    'Here you will read useful information about how our system works in India.'
                ]
            }
        }
    ];

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);

        // Select random topic from all topics (user image implies you can just spin over and over)
        const selectedTopic = topics[Math.floor(Math.random() * topics.length)];

        // Calculate rotation. 
        // We want the wheel to spin backwards (e.g., to the left) so the wheel rotates clockwise or counter-clockwise.
        // Let's do a few full spins (e.g. 5) + land on the selected topic.
        // If a topic is at 'angleOffset' degrees, to put it at 0 (top), we rotate the wheel by 360 - angleOffset.
        const spins = 5; 
        const targetAngle = (360 - selectedTopic.angleOffset) % 360;
        
        // Find current base angle (rotation modulo 360)
        let currentBase = rotation % 360;
        
        // Ensure forward rotation always increases
        let rotationChange = targetAngle - currentBase;
        if (rotationChange < 0) {
            rotationChange += 360;
        }
        
        const totalRotation = rotation + (spins * 360) + rotationChange;

        setRotation(totalRotation);

        setTimeout(() => {
            setIsSpinning(false);
            setCurrentTopic(selectedTopic);
            if (!completedTopics.includes(selectedTopic.id)) {
                setCompletedTopics([...completedTopics, selectedTopic.id]);
            }
        }, 4000); 
    };

    return (
        <div className="circuit-spin-container">
            {/* Standard Dashboard Header */}
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-header-content">
                        <h1 className="dashboard-logo" onClick={onClose} style={{ cursor: 'pointer' }}>
                            Civic Circuit
                        </h1>
                        <div className="user-section">
                            <span className="username"> {sessionStorage.getItem("email") || "Guest"}</span>
                            <button className="logout-btn" onClick={onClose}>Back</button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="spin-main-content">
                <div className="spin-title-section">
                    <div className="title-pill">
                        <h2>Circuit Spin</h2>
                    </div>
                    <p className="subtitle">Turn the wheel, discover civic power.</p>
                </div>

                <div className="wheel-content-wrapper">
                    {/* WHEEL SECTION */}
                    <div className="wheel-section">
                        <div className="wheel-outer">
                            <div className="wheel-rotate" style={{ transform: `rotate(${rotation}deg)` }}>
                                {topics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className="wheel-text-wrapper"
                                        style={{ transform: `rotate(${topic.angleOffset}deg)` }}
                                    >
                                        <div className="wheel-text">{topic.name}</div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* CENTER SPIN BUTTON */}
                            <div className="wheel-center-pointer-shape" onClick={spinWheel}>
                                <div className="wheel-center-pointer-text">
                                    <span className="spin-gradient-text">Spin</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CONTENT DISPLAY SECTION */}
                    <div className="content-section">
                        <div className="content-card">
                            <h3 className="content-header">Let's Learn About:</h3>

                            {isSpinning ? (
                                <div className="placeholder-content">
                                    <h2 className="topic-title">Topic loading...</h2>
                                    <div className="topic-details">
                                        <p className="detail-item" style={{color: '#046a38', fontSize: '1.2rem', fontWeight: 500}}>
                                            Spinning the wheel...
                                        </p>
                                    </div>
                                </div>
                            ) : currentTopic ? (
                                <div className="topic-content">
                                    <h2 className="topic-title">{currentTopic.content.title}</h2>
                                    <div className="topic-details">
                                        {currentTopic.content.details.map((detail, index) => (
                                            <p key={index} className="detail-item-green">
                                                {detail}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="placeholder-content">
                                    <h2 className="topic-title">Topic loading...</h2>
                                    <div className="topic-details">
                                        <p className="detail-item-green">
                                            This topic will explain an important part of the Constitution in simple words.
                                        </p>
                                        <p className="detail-item-green">
                                            Details here will describe how government powers and duties are organised.
                                        </p>
                                        <p className="detail-item-green">
                                            This section will help you learn a constitutional idea through clear points.
                                        </p>
                                        <p className="detail-item-green">
                                            Here you will read useful information about how our system works in India.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer 
              onNavigateHome={onClose} 
              onNavigateDashboard={onClose}
              onNavigateSupport={(section) => { window.location.href = '/support#' + section; }}
              isLoggedIn={true}
            />
        </div>
    );
};

export default CircuitSpin;
