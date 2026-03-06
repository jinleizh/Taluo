function Card({ card, isFaceDown, isReversed, onClick, language = 'en' }) {
  if (isFaceDown) {
    return (
      <div className="card face-down" onClick={onClick}>
        <div style={{ color: '#888', fontSize: '2rem' }}>✦</div>
      </div>
    );
  }

  const cardName = language === 'zh' ? card.nameZh : card.name;
  const orientationLabel = language === 'zh'
    ? (isReversed ? '逆位' : '正位')
    : (isReversed ? 'Reversed' : 'Upright');

  return (
    <div className={`card face-up ${isReversed ? 'reversed' : ''}`}>
      {isReversed && (
        <div className="orientation-marker top">
          ↓
        </div>
      )}
      <div className="orientation-badge">
        {orientationLabel}
      </div>
      <div className="card-name">{cardName}</div>
      {!isReversed && (
        <div className="orientation-marker bottom">
          ↑
        </div>
      )}
    </div>
  );
}

export default Card;
