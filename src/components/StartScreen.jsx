import { getTranslation } from '../translations';

function StartScreen({ onBegin, onViewHistory, language }) {
  const t = (key) => getTranslation(language, key);

  return (
    <div className="start-screen">
      <h1>{t('startTitle')}</h1>
      <h2>{t('startSubtitle')}</h2>
      <p>{t('startDescription1')}</p>
      <p>{t('startDescription2')}</p>
      <div className="start-actions">
        <button onClick={onBegin}>{t('startButton')}</button>
        <button className="button-secondary" onClick={onViewHistory}>
          {t('historyViewButton')}
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
