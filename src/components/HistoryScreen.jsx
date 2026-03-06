import { useState } from 'react';
import { getTranslation } from '../translations';
import { loadHistory, clearHistory } from '../utils/readingHistory';
import ConfirmDialog from './ConfirmDialog';

function HistoryScreen({ onBack, onSelectReading, language }) {
  const t = (key) => getTranslation(language, key);
  const history = loadHistory();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearHistory = () => {
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    clearHistory();
    setShowConfirm(false);
    // Force re-render by going back
    onBack();
  };

  const handleCancelClear = () => {
    setShowConfirm(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(language === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSelectReading = (reading) => {
    onSelectReading(reading);
  };

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
      <div className="history-screen">
        <h1>{t('historyTitle')}</h1>

      {history.readings.length === 0 ? (
        <div className="history-empty">
          <p className="empty-message">{t('historyEmpty')}</p>
          <p className="empty-description">{t('historyEmptyDescription')}</p>
        </div>
      ) : (
        <>
          <div className="history-actions">
            <button
              className="button-secondary button-small"
              onClick={handleClearHistory}
            >
              {t('historyClearButton')}
            </button>
          </div>

          <div className="history-list">
            {history.readings.map((reading) => (
              <div
                key={reading.id}
                className="history-item"
                onClick={() => handleSelectReading(reading)}
              >
                <div className="history-item-header">
                  <div className="history-date">
                    {formatDate(reading.timestamp)}
                  </div>
                  <div className="history-language-badge">
                    {reading.language === 'zh' ? '中文' : 'English'}
                  </div>
                </div>
                <div className="history-question">
                  {reading.question}
                </div>
                <div className="history-cards-preview">
                  {reading.drawnCards.slice(0, 5).map((card, idx) => (
                    <span key={idx} className="card-preview-badge">
                      {reading.language === 'zh' ? card.nameZh : card.name}
                      {card.isReversed && ' ↓'}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="history-back-action">
        <button onClick={onBack}>{t('historyBackButton')}</button>
      </div>
      </div>
    </>
  );
}

export default HistoryScreen;
