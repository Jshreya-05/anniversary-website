import { useState } from 'react';
import { hiddenMessages } from '../../data/hiddenMessages';

export default function HiddenHearts() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [poppedHearts, setPoppedHearts] = useState(new Set());

  const heartPositions = [
    { top: '12%', left: '5%' },
    { top: '25%', left: '92%' },
    { top: '38%', left: '3%' },
    { top: '45%', left: '95%' },
    { top: '55%', left: '8%' },
    { top: '62%', left: '90%' },
    { top: '72%', left: '4%' },
    { top: '78%', left: '93%' },
    { top: '18%', left: '50%' },
    { top: '33%', left: '48%' },
    { top: '48%', left: '52%' },
    { top: '58%', left: '46%' },
    { top: '68%', left: '54%' },
    { top: '82%', left: '50%' },
    { top: '15%', left: '25%' },
    { top: '22%', left: '75%' },
    { top: '42%', left: '20%' },
    { top: '52%', left: '80%' },
    { top: '65%', left: '22%' },
    { top: '75%', left: '78%' },
    { top: '30%', left: '12%' },
    { top: '40%', left: '88%' },
    { top: '85%', left: '15%' },
    { top: '88%', left: '85%' },
  ];

  const handleClick = (index) => {
    if (poppedHearts.has(index)) return;
    setPoppedHearts((prev) => new Set([...prev, index]));
    setActiveMessage(hiddenMessages[index]);
    setTimeout(() => setActiveMessage(null), 4000);
  };

  return (
    <>
      {heartPositions.map((pos, i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`fixed z-30 transition-all duration-300 ${
            poppedHearts.has(i) ? 'opacity-0 scale-0' : 'opacity-30 hover:opacity-80 hover:scale-125'
          }`}
          style={{ top: pos.top, left: pos.left }}
          aria-label="Hidden heart message"
        >
          <span className="text-lg sm:text-xl animate-heart-beat" style={{ animationDuration: `${2 + i * 0.2}s` }}>
            💗
          </span>
        </button>
      ))}

      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
          <div className="glass glow-rose rounded-2xl p-6 sm:p-8 max-w-md text-center animate-fade-in-up pointer-events-auto shadow-2xl">
            <div className="text-3xl mb-3">✨</div>
            <p className="font-cormorant text-lg sm:text-xl text-bronze italic leading-relaxed">
              {activeMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
