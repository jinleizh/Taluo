import { getTranslation } from '../translations';

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, language }) {
  if (!isOpen) return null;

  const t = (key) => getTranslation(language, key);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className="confirm-dialog-backdrop" onClick={handleBackdropClick}>
      <div className="confirm-dialog">
        <div className="confirm-icon">⚠️</div>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="button-secondary" onClick={onCancel}>
            {t('confirmCancel')}
          </button>
          <button className="button-danger" onClick={onConfirm}>
            {t('confirmDelete')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
