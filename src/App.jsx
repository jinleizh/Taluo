import { useState } from 'react'
import StartScreen from './components/StartScreen'
import QuestionInput from './components/QuestionInput'
import CardDrawing from './components/CardDrawing'
import AnalyzingScreen from './components/AnalyzingScreen'
import Report from './components/Report'
import HistoryScreen from './components/HistoryScreen'
import { shuffleDeck } from './utils/shuffle'
import { tarotDeck } from './data/tarotDeck'
import { getTranslation } from './translations'
import { findCachedReading } from './utils/readingHistory'

function App() {
  const [phase, setPhase] = useState('start') // start, question, drawing, analyzing, report, history
  const [question, setQuestion] = useState('')
  const [language, setLanguage] = useState('zh') // 'en' or 'zh'
  const [shuffledDeck, setShuffledDeck] = useState([])
  const [drawnCards, setDrawnCards] = useState([])
  const [isFromCache, setIsFromCache] = useState(false)

  const handleBegin = () => {
    setPhase('question')
  }

  const handleQuestionSubmit = (userQuestion) => {
    setQuestion(userQuestion)

    // Check if we have a cached reading for this question
    const cached = findCachedReading(userQuestion, language)

    if (cached) {
      // Use cached result - skip drawing phase
      setDrawnCards(cached.drawnCards)
      setIsFromCache(true)
      setPhase('report')
    } else {
      // New question - proceed with normal flow
      setShuffledDeck(shuffleDeck(tarotDeck))
      setDrawnCards([])
      setIsFromCache(false)
      setPhase('drawing')
    }
  }

  const handleCardDrawn = (card, position, isReversed) => {
    const newCard = {
      ...card,
      position,
      isReversed
    }
    const updatedCards = [...drawnCards, newCard]
    setDrawnCards(updatedCards)

    // Move to analyzing phase when all 5 cards are drawn
    if (updatedCards.length === 5) {
      setTimeout(() => {
        setPhase('analyzing')
        // After 3 seconds of analysis, show the report
        setTimeout(() => setPhase('report'), 3000)
      }, 500)
    }
  }

  const handleNewReading = () => {
    setPhase('start')
    setQuestion('')
    setShuffledDeck([])
    setDrawnCards([])
    setIsFromCache(false)
  }

  const handleViewHistory = () => {
    setPhase('history')
  }

  const handleBackFromHistory = () => {
    setPhase('start')
  }

  const handleSelectHistoryReading = (reading) => {
    setQuestion(reading.question)
    setDrawnCards(reading.drawnCards)
    setIsFromCache(true)
    setPhase('report')
  }

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'en' ? 'zh' : 'en')
  }

  return (
    <div className="app">
      {/* Language Toggle Button */}
      <button className="language-toggle" onClick={toggleLanguage}>
        {getTranslation(language, 'languageSwitch')}
      </button>

      {phase === 'start' && (
        <StartScreen
          onBegin={handleBegin}
          onViewHistory={handleViewHistory}
          language={language}
        />
      )}
      {phase === 'history' && (
        <HistoryScreen
          onBack={handleBackFromHistory}
          onSelectReading={handleSelectHistoryReading}
          language={language}
        />
      )}
      {phase === 'question' && <QuestionInput onSubmit={handleQuestionSubmit} language={language} />}
      {phase === 'drawing' && (
        <CardDrawing
          shuffledDeck={shuffledDeck}
          drawnCards={drawnCards}
          onCardDrawn={handleCardDrawn}
          language={language}
        />
      )}
      {phase === 'analyzing' && <AnalyzingScreen language={language} />}
      {phase === 'report' && (
        <Report
          question={question}
          drawnCards={drawnCards}
          onNewReading={handleNewReading}
          language={language}
          isFromCache={isFromCache}
        />
      )}
    </div>
  )
}

export default App
