import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { FaLock, FaUnlock, FaRedoAlt, FaGithub, FaExternalLinkAlt, FaTimes } from 'react-icons/fa';

// --- Card Icons for the Memory Game ---
const cardIcons = [
  '⭐', '🚀', '💡', '💻', 
  // Keep the list short, as we'll only use 4 unique icons for an 8-card game
];

// Utility function to shuffle an array (Fisher-Yates)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Component to generate the initial set of cards
const generateCards = () => {
  const pairs = cardIcons.slice(0, 4); // Use 4 unique icons
  const cards = [...pairs, ...pairs]; // Create 8 cards (4 pairs)
  return shuffleArray(cards.map((icon, index) => ({
    id: index,
    icon,
    isFlipped: false,
    isMatched: false,
  })));
};

function PortfolioEntryGate() {
  const [isOpen, setIsOpen] = useState(true); // Open by default for an entry gate
  const [isGameActive, setIsGameActive] = useState(false);
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(true); // Portfolio lock state
  const [isChecking, setIsChecking] = useState(false); // State to prevent fast clicking

  // --- Game Logic ---

  const initializeGame = useCallback(() => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMatchedIndices([]);
    setMoves(0);
    setIsGameActive(true);
    setIsLocked(true); // Ensure lock is active at start
  }, []);

  useEffect(() => {
    // Initialize game when component mounts
    initializeGame();
  }, [initializeGame]);


  const isGameWon = matchedIndices.length === cards.length && cards.length > 0;

  useEffect(() => {
    if (isGameWon) {
      setIsLocked(false);
      setIsGameActive(false);
      // Keep the modal open to show the win state
    }
  }, [isGameWon]);

  const handleCardClick = (index) => {
    if (isChecking || matchedIndices.includes(index) || flippedIndices.includes(index) || isGameWon) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      setMoves(m => m + 1);

      const [idx1, idx2] = newFlipped;
      const card1 = cards[idx1];
      const card2 = cards[idx2];

      if (card1.icon === card2.icon) {
        // Match found
        setTimeout(() => {
          setMatchedIndices(m => [...m, idx1, idx2]);
          setFlippedIndices([]);
          setIsChecking(false);
        }, 500); // Short delay for match visibility
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]); // Flip them back
          setIsChecking(false);
        }, 1000); // Longer delay to see the failed attempt
      }
    }
  };

  const handleUnlockPortfolio = () => {
    // 1. Close the modal
    setIsOpen(false);
    // 2. Potentially redirect or show the portfolio content on the main page
    // For this example, we'll just close the gate.
    console.log("Portfolio Unlocked! Redirecting...");
    // window.location.href = "/portfolio"; // Example redirect
  }


  // --- Render Helpers ---

  const Card = ({ card, index, onClick }) => {
    const isFlipped = flippedIndices.includes(index) || matchedIndices.includes(index);
    const isMatched = matchedIndices.includes(index);
    
    return (
      <button 
        onClick={() => onClick(index)} 
        disabled={isFlipped || isChecking || isGameWon}
        className={`flex h-full w-full items-center justify-center rounded-lg border-2 
                    shadow-lg transition-all duration-300 transform-gpu 
                    ${isMatched ? 'bg-green-500/80 border-green-400 scale-105' : 
                      isFlipped ? 'bg-[#bd34fe]/80 border-[#bd34fe]' : 
                      'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:scale-105'
                    }
                    ${isFlipped ? 'rotate-y-0' : 'rotate-y-180'}
                    `}
        style={{ perspective: '1000px', transformStyle: 'preserve-3d', transition: 'transform 0.5s', transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
      >
        <div className="text-4xl font-bold text-white backface-hidden" style={{ transform: 'rotateY(180deg)', display: isFlipped ? 'block' : 'none' }}>
            {card.icon}
        </div>
        <div className="text-xl font-bold text-gray-300 backface-hidden" style={{ display: isFlipped ? 'none' : 'block' }}>
            ?
        </div>
      </button>
    );
  };
  
  // Custom backface-hidden utility might be needed in a real Tailwind setup
  // For this simplified example, CSS is inline.

  // --- Component Render ---

  return (
    <Fragment>
      {/* The main portfolio content will be rendered here when isOpen is false */}

      {/* Pop-up Modal Container */}
      {/* z-[60] to ensure it's above everything */}
      <div 
        className={`fixed inset-0 z-[60] flex items-center justify-center 
                    ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Overlay - Smoother fade */}
        <div 
          onClick={() => setIsOpen(false)} 
          className={`fixed inset-0 bg-black/70 transition-opacity duration-300 
                      ${isOpen ? 'opacity-100' : 'opacity-0'}`} 
          aria-hidden="true" 
        />
        
        {/* Actual Pop-up Panel */}
        <div 
          className={`relative flex w-full max-w-md max-h-[90vh] flex-col bg-[#16161a] ring-1 ring-white/5 rounded-lg shadow-2xl m-4
                      transition-all duration-500 ease-out-expo transform-gpu 
                      ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-4 shadow-md bg-[#1d1d21] rounded-t-lg">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#bd34fe]">
              {isLocked ? <FaLock className="text-2xl" /> : <FaUnlock className="text-2xl text-green-400" />} 
              {isLocked ? 'Portfolio Access Gate' : 'Access Granted!'}
            </h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#bd34fe]/50" 
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-6 relative overflow-y-auto text-center">
            
            {!isGameActive && !isGameWon && (
                <div className="flex flex-col items-center">
                    <p className="mb-6 text-xl font-semibold text-gray-200">
                        Welcome! Before diving in, please accept this small challenge.
                    </p>
                    <button
                        onClick={() => setIsGameActive(true)}
                        className="rounded-md bg-[#bd34fe] px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-[#bd34fe]/30 
                                hover:bg-[#a020f0] active:scale-95 transition-all duration-200 ease-out flex items-center justify-center gap-3"
                    >
                        <FaRedoAlt /> Start Memory Game
                    </button>
                    <p className="mt-4 text-sm text-gray-400">Match the pairs to unlock the full portfolio!</p>
                </div>
            )}
            
            {isGameActive && !isGameWon && (
                <Fragment>
                    <p className="text-sm text-gray-400 mb-4">
                        Moves: <span className="font-bold text-white">{moves}</span> | Pairs Left: <span className="font-bold text-white">{4 - (matchedIndices.length / 2)}</span>
                    </p>
                    
                    {/* Game Board */}
                    <div className="grid grid-cols-4 gap-3 aspect-[4/2.5] w-full"> 
                        {cards.map((card, index) => (
                            <Card 
                                key={card.id} 
                                card={card} 
                                index={index} 
                                onClick={handleCardClick}
                            />
                        ))}
                    </div>
                    
                    <button
                        onClick={initializeGame}
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-gray-600/50 px-4 py-2 text-sm font-semibold text-white 
                                hover:bg-gray-600 transition-colors"
                    >
                        <FaRedoAlt /> Restart Game
                    </button>
                </Fragment>
            )}

            {isGameWon && (
                <div className="py-8">
                    <FaUnlock className="text-6xl text-green-400 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-3xl font-bold text-white mb-2">Success! Portfolio Unlocked.</h3>
                    <p className="text-lg text-gray-300 mb-6">You completed the challenge in **{moves} moves**! Enjoy your visit.</p>

                    <button
                        onClick={handleUnlockPortfolio}
                        className="rounded-md bg-green-500 px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-green-500/30 
                                hover:bg-green-600 active:scale-95 transition-all duration-200 ease-out flex items-center justify-center gap-3 w-full"
                    >
                        <FaExternalLinkAlt /> View My Portfolio
                    </button>
                    
                    <a
                      href="https://github.com/YOUR_GITHUB_PROFILE" // <<< REPLACE WITH YOUR GITHUB PROFILE
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-300 
                                hover:bg-gray-700 transition-colors"
                    >
                        <FaGithub /> Check out the Code
                    </a>
                </div>
            )}
            
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default PortfolioEntryGate;