import React, { useCallback, useEffect, useState } from 'react';
import Footer from './Footer';
import './LexiconCircuit.css';
import bulbIcon from '../assets/Hint.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const dictionary = [
    {
        word: 'GOVERNOR',
        hints: [
            'Read the chapter about the State Executive first.',
            'This office is appointed, not chosen by voters.',
            'It is the highest office in the state government and works with the Chief Minister.'
        ],
        article: 'Articles 157-160',
        title: 'The Governor',
        description: (
            <>
                <strong>Article 153</strong> states that there shall be a Governor for each state. The Governor is the executive head of the state. <strong>Article 157 and 158</strong> lay down the qualifications for appointment as Governor:
                <ol>
                    <li>Must be a citizen of India.</li>
                    <li>Must have completed 35 years of age.</li>
                    <li>Must not be a member of either House of Parliament or State Legislature.</li>
                </ol>
                The Governor is appointed by the President and holds office during their pleasure.
            </>
        )
    },
    {
        word: 'JUDGES',
        hints: [
            'Read the part about courts and how disputes are settled.',
            'These people sit on the bench and decide cases.',
            'They interpret the law and deliver justice in the courtroom.'
        ],
        article: 'Articles 124 & 217',
        title: 'The Judiciary (Judges)',
        description: (
            <>
                <strong>Article 124</strong> details the establishment of the Supreme Court and the appointment of Judges. <strong>Article 217</strong> deals with the appointment of Judges of High Courts in states.<br /><br />
                To be appointed as a Judge, an individual must:
                <ol>
                    <li>Be an Indian citizen.</li>
                    <li>Have served as a judge of a High Court for at least 5 years, or an advocate of a High Court for at least 10 years (for Supreme Court).</li>
                </ol>
            </>
        )
    },
    {
        word: 'PRESIDENT',
        hints: [
            'Read the section about the Union Executive first.',
            'This office is the formal head of the country, not the daily administrator.',
            'It is the top constitutional authority at the Union level.'
        ],
        article: 'Articles 52-58',
        title: 'The President',
        description: (
            <>
                <strong>Article 52</strong> states that there shall be a President of India. <strong>Article 53</strong> vests the executive power of the Union in the President.<br /><br />
                <strong>Article 58</strong> outlines qualifications for election as President:
                <ol>
                    <li>Must be an Indian citizen.</li>
                    <li>Must have completed 35 years of age.</li>
                    <li>Qualified for election as a member of the House of the People (Lok Sabha).</li>
                </ol>
            </>
        )
    },
    {
        word: 'MINISTER',
        hints: [
            'Read the part about the Council that helps run the country.',
            'This role belongs to the team that advises the executive.',
            'It is one of the people who assist in running the government.'
        ],
        article: 'Articles 74 & 75',
        title: 'Council of Ministers',
        description: (
            <>
                <strong>Article 74</strong> provides for a Council of Ministers with the Prime Minister at the head to aid and advise the President.<br /><br />
                <strong>Article 75</strong> details the appointment of Ministers:
                <ol>
                    <li>The Prime Minister is appointed by the President, and other Ministers are appointed by the President on the advice of the PM.</li>
                    <li>A Minister must be a member of either House of Parliament within six consecutive months of their appointment.</li>
                </ol>
            </>
        )
    },
    {
        word: 'JUDICIARY',
        hints: [
            'Read the part about the branch that settles disputes.',
            'It checks whether laws are applied properly.',
            'This branch interprets the Constitution and protects rights.'
        ],
        article: 'Part V, Ch. IV',
        title: 'The Independent Judiciary',
        description: (
            <>
                The Indian Constitution ensures an independent judicial system. It consists of the Supreme Court at the top, followed by High Courts in the States, and Subordinate Courts.<br /><br />
                The <strong>Supreme Court</strong> is the highest court of appeal and the ultimate interpreter of the Constitution. The judiciary's primary role is to enforce the rule of law, protect fundamental rights, and resolve disputes between the state and citizens or between states.
            </>
        )
    },
    {
        word: 'LEGISLATURE',
        hints: [
            'Read the chapter about making laws in a state.',
            'Bills are discussed here before they become law.',
            'This is the law-making body of the government.'
        ],
        article: 'Articles 168 & 173',
        title: 'State Legislature',
        description: (
            <>
                <strong>Article 168</strong> says that every Indian State must have a Legislature along with a Governor. A State Legislature can be of two types:
                <ol>
                    <li><strong>Unicameral (One House):</strong><br />The state has only the Legislative Assembly (Vidhan Sabha).</li>
                    <li><strong>Bicameral (Two Houses):</strong><br />The state has both the Legislative Assembly (Vidhan Sabha) and the Legislative Council (Vidhan Parishad). Only a few states have two houses today, such as Uttar Pradesh, Maharashtra, and Bihar.</li>
                </ol>
                <strong>Article 173</strong> explains who can become a member of a State Legislature. A person must:
                <ol>
                    <li>Be an Indian citizen.</li>
                    <li>Be at least 25 years old to become a member of the State Legislative Assembly.</li>
                    <li>Be at least 30 years old to become a member of the State Legislative Council.</li>
                </ol>
            </>
        )
    },
    {
        word: 'EXECUTIVE',
        hints: [
            'Read the part about how government decisions are carried out.',
            'This branch handles administration, not law-making.',
            'It puts laws and policies into action.'
        ],
        article: 'Part V, Ch. I',
        title: 'The Executive Branch',
        description: (
            <>
                The <strong>Executive branch</strong> is responsible for implementing and enforcing laws made by the Legislature.<br /><br />
                At the Union level, it consists of the President, the Vice-President, and the Council of Ministers headed by the Prime Minister.<br /><br />
                At the State level, it includes the Governor and the Council of Ministers headed by the Chief Minister. They perform the daily administration of the state apparatus.
            </>
        )
    },
    {
        word: 'CONSTITUTION',
        hints: [
            'Read the document that begins with the Preamble.',
            'It is the main source of rules for how the country is governed.',
            'It explains how power is shared between institutions.'
        ],
        article: 'Preamble',
        title: 'The Constitution of India',
        description: (
            <>
                The <strong>Constitution of India</strong> is the supreme law of India. It lays down the framework defining fundamental political principles, establishes the structure, procedures, powers, and duties of government institutions, and sets out fundamental rights, directive principles, and the duties of citizens.<br /><br />
                It is the longest written constitution of any country in the world, adopted by the Constituent Assembly on <strong>26th November 1949</strong> and effective from <strong>26th January 1950</strong>.
            </>
        )
    },
    {
        word: 'SECULARISM',
        hints: [
            'Read the idea that appears in the Preamble with equality in mind.',
            'It asks the state to stay neutral among religions.',
            'It means the government should treat all faiths with equal respect.'
        ],
        article: 'Articles 25-28',
        title: 'Secularism in India',
        description: (
            <>
                The term <strong>'Secular'</strong> was added to the Preamble by the 42nd Amendment in 1976. It indicates that the State has no official religion and treats all religions equally.<br /><br />
                <strong>Articles 25 to 28</strong> guarantee the Right to Freedom of Religion:
                <ol>
                    <li>Freedom to profess, practice, and propagate any religion.</li>
                    <li>Freedom to manage religious affairs.</li>
                    <li>Freedom from paying taxes for the promotion of any particular religion.</li>
                </ol>
            </>
        )
    }
];

const shuffleArray = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const makeTiles = (word) => {
    let tiles;
    do {
        tiles = shuffleArray(
            word.split('').map((letter, i) => ({ letter, id: i, used: false }))
        );
    } while (tiles.map((t) => t.letter).join('') === word && word.length > 1);
    return tiles;
};

const normalizeWord = (word) => (word || '').trim().toUpperCase();

const LexiconCircuit = ({ onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [tiles, setTiles] = useState(() => makeTiles(dictionary[0].word));
    const [usedOrder, setUsedOrder] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [hintCount, setHintCount] = useState(0);
    const [activeHintIndex, setActiveHintIndex] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [apiWord, setApiWord] = useState('');
    const [apiArticles, setApiArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loadingApi, setLoadingApi] = useState(false);
    const [totalSubmissions, setTotalSubmissions] = useState(0);
    const [correctSubmissions, setCorrectSubmissions] = useState(0);

    const currentItem = dictionary[currentIndex];
    const activeWord = apiWord || currentItem.word;
    const answer = usedOrder.map((id) => tiles.find((t) => t.id === id)?.letter ?? '').join('');
    const hintLimit = 3;
    const currentHint = currentItem.hints[Math.min(activeHintIndex, currentItem.hints.length - 1)] || '';
    const hintsUsedLabel = `You have used ${hintCount} hint${hintCount === 1 ? '' : 's'} of ${hintLimit}.`;

    const loadWord = useCallback(async (index) => {
        const fallbackWord = normalizeWord(dictionary[index].word);

        setLoadingApi(true);
        setApiWord('');
        setApiArticles([]);
        setSelectedArticle(null);
        setTiles(makeTiles(fallbackWord));
        setUsedOrder([]);
        setFeedback(null);
        setShowHint(false);
        setHintCount(0);
        setActiveHintIndex(0);

        try {
            const response = await fetch(`${API_BASE_URL}/lexicon/${index + 1}`);
            if (!response.ok) {
                return;
            }

            const data = await response.json();
            const fetchedWord = normalizeWord(data?.word);
            const fetchedArticles = Array.isArray(data?.articles) ? data.articles : [];

            if (fetchedWord) {
                setApiWord(fetchedWord);
                setTiles(makeTiles(fetchedWord));
            }

            setApiArticles(fetchedArticles);
        } catch {
            // Keep dictionary-based gameplay if API is unavailable.
        } finally {
            setLoadingApi(false);
        }
    }, []);

    useEffect(() => {
        loadWord(currentIndex);
    }, [currentIndex, loadWord]);

    const useTile = (tile) => {
        if (tile.used || feedback === 'correct') {
            return;
        }
        setTiles((prev) => prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t)));
        setUsedOrder((prev) => [...prev, tile.id]);
        if (feedback === 'wrong') {
            setFeedback(null);
        }
    };

    const handleBackspace = useCallback(() => {
        if (usedOrder.length === 0 || feedback === 'correct') {
            return;
        }
        const lastId = usedOrder[usedOrder.length - 1];
        setTiles((prev) => prev.map((t) => (t.id === lastId ? { ...t, used: false } : t)));
        setUsedOrder((prev) => prev.slice(0, -1));
        setFeedback(null);
    }, [usedOrder, feedback]);

    const handleClear = () => {
        setTiles((prev) => prev.map((t) => ({ ...t, used: false })));
        setUsedOrder([]);
        setFeedback(null);
    };

    const handleShowHint = () => {
        if (hintCount >= hintLimit) {
            return;
        }

        const nextHintCount = hintCount + 1;
        setHintCount(nextHintCount);
        setActiveHintIndex(nextHintCount - 1);
        setShowHint(true);
    };

    const handleNextWord = useCallback(() => {
        const next = currentIndex + 1;
        if (next >= dictionary.length) {
            const email = sessionStorage.getItem('email');
            if (email) {
                fetch(`${API_BASE_URL}/lexicon/complete/${encodeURIComponent(email)}`, {
                    method: 'POST'
                }).catch(() => {
                    // Completion tracking failure should not block UI.
                });
            }
            setGameComplete(true);
        } else {
            setCurrentIndex(next);
        }
    }, [currentIndex]);

    const trackLexiconAttempt = useCallback(async (isCorrect) => {
        const email = sessionStorage.getItem('email');
        if (!email) {
            return;
        }

        try {
            await fetch(`${API_BASE_URL}/lexicon/track/${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correct: isCorrect })
            });
        } catch {
            // Tracking must not block gameplay.
        }
    }, []);

    const handleSubmit = useCallback(() => {
        if (answer.length !== activeWord.length || feedback === 'correct') {
            return;
        }

        setTotalSubmissions((prev) => prev + 1);

        if (answer.toLowerCase() === activeWord.toLowerCase()) {
            setFeedback('correct');
            trackLexiconAttempt(true);
            setCorrectSubmissions((prev) => prev + 1);

            if (apiArticles.length > 0) {
                const randomIndex = Math.floor(Math.random() * apiArticles.length);
                setSelectedArticle(apiArticles[randomIndex]);
            } else {
                setSelectedArticle(null);
            }
        } else {
            setFeedback('wrong');
            setSelectedArticle(null);
            trackLexiconAttempt(false);
        }
    }, [answer, activeWord, feedback, apiArticles, trackLexiconAttempt]);

    const handleInputChange = (e) => {
        if (feedback === 'correct') {
            return;
        }

        const newVal = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');

        if (newVal.length > answer.length) {
            const addedChar = newVal[answer.length];
            const matchTile = tiles.find((t) => !t.used && t.letter === addedChar);
            if (matchTile) {
                useTile(matchTile);
            }
        } else if (newVal.length < answer.length) {
            handleBackspace();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (feedback === 'correct') {
                handleNextWord();
            } else {
                handleSubmit();
            }
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setGameComplete(false);
        setTotalSubmissions(0);
        setCorrectSubmissions(0);
        setHintCount(0);
        setActiveHintIndex(0);
    };

    const completionAccuracy = totalSubmissions === 0
        ? 0
        : Math.round((correctSubmissions / totalSubmissions) * 100);

    return (
        <div className="lexicon-container">
            <div className="dashboard-header">
                <div className="container">
                    <div className="dashboard-header-content">
                        <h1 className="dashboard-logo" onClick={onClose} style={{ cursor: 'pointer' }}>
                            Civic Circuit
                        </h1>
                        <div className="user-section">
                            <span className="username">{sessionStorage.getItem('email') || 'Guest'}</span>
                            <button className="logout-btn" onClick={onClose}>Back</button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="lexicon-main">
                <div className="lexicon-title-section">
                    <div className="lexicon-title-pill">
                        <span>Lexicon Circuit</span>
                    </div>
                    <p className="lexicon-subtitle">Unscramble the letters to form the correct civic term!</p>
                </div>

                {gameComplete ? (
                    <div className="lexicon-game-area">
                        <div className="game-complete">
                            <div className="game-complete-icon">🎉</div>
                            <h2>Congratulations!</h2>
                            <p>You have mastered the Civic Lexicon!</p>
                            <div className="lexicon-complete-stats">
                                <p><strong>Correct Words:</strong> {correctSubmissions}</p>
                                <p><strong>Total Submissions:</strong> {totalSubmissions}</p>
                                <p><strong>Accuracy:</strong> {completionAccuracy}%</p>
                            </div>
                            <button className="restart-btn" onClick={handleRestart}>Play Again</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="lexicon-progress-bar-container">
                            <div
                                className="lexicon-progress-bar"
                                style={{ width: `${(currentIndex / dictionary.length) * 100}%` }}
                            />
                            <span className="lexicon-progress-text">
                                {currentIndex} / {dictionary.length} Complete
                            </span>
                        </div>

                        <div className="lexicon-game-area">
                            <div className="word-number-badge">
                                Word {currentIndex + 1} of {dictionary.length}
                            </div>

                            {loadingApi && (
                                <div className="article-badge">Syncing word from API...</div>
                            )}

                            <div className="tiles-section">
                                <div className="tiles-label-row">
                                    <p className="tiles-label">Scrambled Letters:</p>
                                    <button
                                        className={`hint-bulb-btn ${showHint ? 'hint-bulb-btn--active' : ''} ${hintCount >= hintLimit ? 'hint-bulb-btn--spent' : ''}`}
                                        onClick={handleShowHint}
                                        title={hintCount >= hintLimit ? 'No hints left' : 'Use hint'}
                                        disabled={feedback === 'correct' || hintCount >= hintLimit}
                                    >
                                        <img src={bulbIcon} alt="Hint" className="hint-bulb-img" />
                                    </button>
                                </div>
                                <div className="letter-tiles">
                                    {tiles.map((tile) => (
                                        <button
                                            key={tile.id}
                                            className={`letter-tile ${tile.used ? 'letter-tile--used' : ''}`}
                                            onClick={() => useTile(tile)}
                                            disabled={tile.used || feedback === 'correct'}
                                            aria-label={`Letter ${tile.letter}`}
                                        >
                                            {tile.letter}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="answer-section">
                                <p className="answer-label">Your Answer:</p>
                                <div className="answer-input-row">
                                    <input
                                        type="text"
                                        className={[
                                            'lexicon-input',
                                            feedback === 'correct' ? 'lexicon-input--correct' : '',
                                            feedback === 'wrong' ? 'lexicon-input--wrong' : ''
                                        ].join(' ')}
                                        value={answer}
                                        onChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder={`Type ${activeWord.length} letters...`}
                                        disabled={feedback === 'correct'}
                                        autoFocus
                                        autoComplete="off"
                                        spellCheck={false}
                                    />
                                    <button
                                        className="control-btn control-btn--clear"
                                        onClick={handleClear}
                                        disabled={!answer || feedback === 'correct'}
                                        title="Clear all"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {feedback === 'wrong' && (
                                <div className="feedback-banner feedback-banner--wrong">
                                    Incorrect! Try again.
                                </div>
                            )}
                            {feedback === 'correct' && (
                                <div className="feedback-container">
                                    <div className="feedback-banner feedback-banner--correct">
                                        Correct! Read the details below and click Next Word.
                                    </div>
                                    <div className="lexicon-info-card">
                                        <h4 className="lexicon-info-card-title">{currentItem.title || activeWord}</h4>
                                        <div className="lexicon-info-card-content">
                                        {selectedArticle && (
                                            <>
                                                <p>
                                                    <strong>Related Article:</strong> {selectedArticle.atitle}
                                                </p>

                                                <p>
                                                    <strong>Article Number:</strong> {selectedArticle.anumber}
                                                </p>

                                                <p>{selectedArticle.adesc}</p>
                                            </>
                                        )}
                                    </div>
                                    </div>
                                </div>
                            )}

                            <div className="game-bottom-row">
                                {feedback === 'correct' ? (
                                    <button
                                        className="submit-btn submit-btn--solid"
                                        style={{ backgroundColor: '#046a38', borderColor: '#046a38' }}
                                        onClick={handleNextWord}
                                    >
                                        Next Word ➔
                                    </button>
                                ) : (
                                    <button
                                        className="submit-btn submit-btn--solid"
                                        onClick={handleSubmit}
                                        disabled={answer.length !== activeWord.length || feedback === 'wrong'}
                                    >
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </main>

            {showHint && (
                <div className="hint-modal-overlay" onClick={() => setShowHint(false)}>
                    <div className="hint-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="hint-modal-close" onClick={() => setShowHint(false)}>✕</button>
                        <div className="hint-modal-bulb">💡</div>
                        <h3 className="hint-modal-title">Hint {hintCount} of {hintLimit}</h3>
                        <p className="hint-modal-text">{currentHint}</p>
                        <p className="hint-modal-usage">{hintsUsedLabel}</p>
                    </div>
                </div>
            )}

            <Footer
                onNavigateHome={onClose}
                onNavigateDashboard={onClose}
                onNavigateSupport={(section) => { window.location.href = `/support#${section}`; }}
                isLoggedIn
            />
        </div>
    );
};

export default LexiconCircuit;
