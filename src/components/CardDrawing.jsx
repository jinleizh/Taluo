import { useState } from 'react';
import Card from './Card';
import { spreadPositions } from '../data/tarotDeck';
import { isCardReversed } from '../utils/shuffle';
import { getTranslation } from '../translations';

function CardDrawing({ shuffledDeck, drawnCards, onCardDrawn, language }) {
  const [flippingCard, setFlippingCard] = useState(null);
  const t = (key) => getTranslation(language, key);

  const handleCardClick = (position) => {
    // 检查该位置是否已经翻开
    const alreadyDrawn = drawnCards.find(c => c.position === position);
    if (alreadyDrawn) return;

    // 设置翻转动画
    setFlippingCard(position);

    // 延迟以显示翻转动画
    setTimeout(() => {
      const card = shuffledDeck[position];
      const reversed = isCardReversed();
      onCardDrawn(card, position, reversed);
      setFlippingCard(null);
    }, 300);
  };

  const getPositionName = (position) => {
    const positionKeys = ['positionSelf', 'positionPartner', 'positionPast', 'positionPresent', 'positionFuture'];
    return t(positionKeys[position]);
  };

  return (
    <div className="card-drawing">
      <h2>{t('drawingTitle')}</h2>

      {/* Spread Layout */}
      <div className="spread-layout">
        {spreadPositions.map((position, index) => {
          const drawnCard = drawnCards.find(c => c.position === index);
          const isFlipping = flippingCard === index;

          return (
            <div key={position.id} className={`card-position position-${index}`}>
              <div className="position-label">
                {getPositionName(index)}
              </div>
              <div className={`card-container ${isFlipping ? 'flipping' : ''}`}>
                {drawnCard ? (
                  <Card
                    card={drawnCard}
                    isFaceDown={false}
                    isReversed={drawnCard.isReversed}
                    language={language}
                  />
                ) : (
                  <Card
                    isFaceDown={true}
                    onClick={() => handleCardClick(index)}
                    language={language}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Drawing Status */}
      {drawnCards.length < 5 && (
        <div className="deck-prompt">
          <p>{t('drawingPrompt')}</p>
        </div>
      )}

      {drawnCards.length === 5 && (
        <div className="deck-prompt">
          <p>{t('drawingComplete')}</p>
        </div>
      )}
    </div>
  );
}

export default CardDrawing;
