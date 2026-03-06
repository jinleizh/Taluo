# Tarot Love Reading - Five-Star Spread

A minimalist tarot card reading application for love and relationship divination, featuring the traditional Five-Star Spread (爱情五星阵).

## Features

- **Complete 78-Card Tarot Deck**: All Major and Minor Arcana with love-specific interpretations
- **Love Five-Star Spread**: Five-card reading focusing on:
  - Self (自己) - Your current state and feelings
  - Partner (对方) - Partner's current state and feelings
  - Past (过去) - Past influences affecting the relationship
  - Present (现在) - Current situation and dynamics
  - Future (未来) - Potential outcome and direction
- **Comprehensive Interpretations**: Detailed readings with position-specific meanings
- **Actionable Advice**: Practical guidance based on your reading
- **Minimalist Design**: Clean, text-based interface focused on the content
- **Reversals**: Cards can appear upright or reversed with different meanings

## Technology Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Pure CSS** - Styling with no external libraries
- **JavaScript ES6+** - Modern JavaScript features

## Getting Started

### Prerequisites

- Node.js 16+ and npm (or yarn/bun)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server will start at `http://localhost:5173` (or another port if 5173 is occupied).

## Project Structure

```
taluo_game/
├── src/
│   ├── components/          # React components
│   │   ├── StartScreen.jsx  # Welcome screen
│   │   ├── QuestionInput.jsx # Question entry
│   │   ├── Card.jsx         # Card display component
│   │   ├── CardDrawing.jsx  # Card drawing interface
│   │   └── Report.jsx       # Reading report
│   ├── data/
│   │   └── tarotDeck.js     # 78 tarot cards with meanings
│   ├── utils/
│   │   ├── shuffle.js       # Card shuffling logic
│   │   └── interpretations.js # Report generation
│   ├── App.jsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.jsx             # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## How to Use

1. **Start**: Click "Begin Reading" on the welcome screen
2. **Question**: Enter your love/relationship question (optional)
3. **Draw Cards**: Click the deck to draw each of the 5 cards sequentially
4. **Read**: Review your comprehensive reading with interpretations and advice
5. **New Reading**: Start over for another reading

## Card Meanings

Each card has:
- **Upright meaning**: Positive or direct interpretation
- **Reversed meaning**: Blocked, internal, or shadow aspect
- **Love-specific interpretation**: Tailored for relationship questions
- **Advice**: Actionable guidance

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Netlify

```bash
# Build the project
npm run build

# Deploy the dist/ folder to Netlify
```

### GitHub Pages

Add to `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

Then deploy the `dist/` folder to GitHub Pages.

## Customization

### Adding New Spreads

1. Define new spread positions in `src/data/tarotDeck.js`
2. Update card drawing logic in `src/components/CardDrawing.jsx`
3. Adjust interpretation logic in `src/utils/interpretations.js`

### Styling

All styles are in `src/App.css`. The design uses:
- Minimalist color palette (beige/white backgrounds, dark text)
- Clean typography hierarchy
- Responsive layout for mobile and desktop

## Future Enhancements

- [ ] Card images instead of text placeholders
- [ ] Additional spread types (3-card, Celtic Cross)
- [ ] Reading history with local storage
- [ ] Share reading via URL
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Animation improvements

## License

MIT

## Credits

Tarot card meanings are based on traditional Rider-Waite-Smith interpretations, adapted for love and relationship readings.
