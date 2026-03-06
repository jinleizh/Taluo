import { getTranslation } from '../translations';

function AnalyzingScreen({ language }) {
  const t = (key) => getTranslation(language, key);

  return (
    <div className="analyzing-screen">
      <div className="analyzing-content">
        <div className="tarot-spinner">
          <div className="spinner-card"></div>
          <div className="spinner-card"></div>
          <div className="spinner-card"></div>
        </div>
        <h2>{t('analyzingTitle')}</h2>
        <p>{t('analyzingMessage')}</p>
        <div className="dots-loader">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default AnalyzingScreen;
