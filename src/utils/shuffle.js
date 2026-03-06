// Fisher-Yates shuffle algorithm for randomizing the deck
export function shuffleDeck(deck) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Randomly determine if a card should be reversed (50% chance)
export function isCardReversed() {
  return Math.random() < 0.5;
}
