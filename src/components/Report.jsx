import { useEffect, useState } from 'react';
import {
  interpretCard,
  generateReadingOverview,
  generateOverallAnalysis,
  generateActionableAdvice
} from '../utils/interpretations';
import { getTranslation } from '../translations';
import Card from './Card';
import { saveReading, findCachedReading, clearHistory } from '../utils/readingHistory';
import ConfirmDialog from './ConfirmDialog';

function Report({ question, drawnCards, onNewReading, language, isFromCache = false }) {
  const t = (key) => getTranslation(language, key);
  const [showConfirm, setShowConfirm] = useState(false);

  // Save this reading to history if it's new (not cached)
  useEffect(() => {
    if (drawnCards.length === 5 && question) {
      const cached = findCachedReading(question, language);
      if (!cached) {
        // This is a new reading, save it
        saveReading(question, drawnCards, language);
      }
    }
  }, [question, drawnCards, language]);

  const interpretations = drawnCards.map(card =>
    interpretCard(card, card.position, card.isReversed, language)
  );

  const overview = generateReadingOverview(drawnCards, language);
  const analysis = generateOverallAnalysis(drawnCards, language);
  const advice = generateActionableAdvice(drawnCards, language);

  const handlePrint = () => {
    window.print();
  };

  const handleClearHistory = () => {
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    clearHistory();
    setShowConfirm(false);
  };

  const handleCancelClear = () => {
    setShowConfirm(false);
  };

  const generalReading = t('generalReading');

  return (
    <>
      <ConfirmDialog
        isOpen={showConfirm}
        title={t('historyClearButton')}
        message={t('historyClearConfirm')}
        onConfirm={handleConfirmClear}
        onCancel={handleCancelClear}
        language={language}
      />
      <div className="report">
        <h1>{t('reportTitle')}</h1>

      {/* Cached Reading Badge */}
      {isFromCache && (
        <div className="cached-notice">
          <span className="cached-badge">{t('historyCachedBadge')}</span>
          <p>{t('historyCachedNotice')}</p>
        </div>
      )}

      {question && question !== generalReading && (
        <div className="report-question">
          <p><strong>{t('reportQuestion')}</strong> {question}</p>
        </div>
      )}

      {/* Reading Overview */}
      <div className="report-section">
        <h2>{t('reportOverviewTitle')}</h2>
        <p>{overview}</p>
      </div>

      {/* Individual Card Interpretations */}
      <div className="report-section">
        <h2>{t('reportCardsTitle')}</h2>
        {interpretations.map((interp, index) => {
          const drawnCard = drawnCards[index];
          return (
            <div key={index} className="card-interpretation">
              <div className="card-interpretation-content">
                <div className="card-display">
                  <Card
                    card={drawnCard}
                    isFaceDown={false}
                    isReversed={drawnCard.isReversed}
                    language={language}
                  />
                </div>
                <div className="card-interpretation-text">
                  <div className="card-interpretation-header">
                    <div className="card-title">
                      {language === 'zh' ? interp.card.nameZh : interp.card.name}
                    </div>
                    <div className="card-orientation">{interp.orientation}</div>
                  </div>
                  <div className="position-meaning">
                    <strong>{interp.positionName}:</strong> {interp.positionMeaning}
                  </div>
                  <p>{interp.meaning}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Analysis */}
      <div className="report-section">
        <h2>{t('reportAnalysisTitle')}</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{analysis}</p>
      </div>

      {/* Actionable Advice */}
      <div className="report-section">
        <h2>{t('reportAdviceTitle')}</h2>
        <ul className="advice-list">
          {advice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="report-actions">
        <button onClick={onNewReading}>{t('reportNewButton')}</button>
        <button className="button-secondary" onClick={handlePrint}>{t('reportPrintButton')}</button>
        <button className="button-danger" onClick={handleClearHistory}>
          {t('historyClearButton')}
        </button>
      </div>
      </div>
    </>
  );
}

export default Report;
