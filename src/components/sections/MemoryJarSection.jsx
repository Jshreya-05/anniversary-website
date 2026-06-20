import { useState, useCallback } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import Sparkles from '../background/Sparkles';
import { chestMemories } from '../../data/memories';

function TreasureChest({ isOpen, isOpening }) {
  return (
    <div className={`relative w-56 sm:w-72 h-44 sm:h-52 transition-transform duration-700 ${isOpening ? 'scale-105' : ''}`}>
      {/* Glow from inside when open */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 bottom-8 w-40 h-20 transition-opacity duration-1000 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse, rgba(240,192,96,0.6) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Chest body */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 sm:h-32 rounded-b-lg rounded-t-sm"
        style={{
          background: 'linear-gradient(180deg, #8B5E2A 0%, #6B4423 40%, #5C3A1E 100%)',
          boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.1), 0 8px 24px rgba(0,0,0,0.3)',
          border: '2px solid #C9842A',
        }}
      >
        {/* Gold band */}
        <div className="absolute top-3 left-0 right-0 h-3 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-bronze border-2 border-gold/80 shadow-lg flex items-center justify-center">
          <div className="w-3 h-4 bg-bronze/80 rounded-sm" />
        </div>
        {/* Wood grain lines */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 9px)',
        }} />
      </div>

      {/* Chest lid */}
      <div
        className={`absolute top-0 left-0 right-0 h-20 sm:h-24 origin-bottom transition-transform duration-1000 ease-out ${
          isOpen ? 'chest-lid-open' : ''
        }`}
        style={{
          background: 'linear-gradient(180deg, #A0713F 0%, #8B5E2A 60%, #6B4423 100%)',
          borderRadius: '8px 8px 2px 2px',
          border: '2px solid #C9842A',
          borderBottom: 'none',
          boxShadow: isOpen ? '0 -4px 20px rgba(240,192,96,0.3)' : '0 4px 12px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-gold/50 via-gold to-gold/50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl opacity-60">
          ✨
        </div>
      </div>

      {/* Floating particles when open */}
      {isOpen && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className="absolute text-gold animate-sparkle"
              style={{
                left: `${20 + Math.random() * 60}%`,
                bottom: `${30 + Math.random() * 40}%`,
                animationDelay: `${i * 0.2}s`,
                fontSize: `${8 + Math.random() * 8}px`,
              }}
            >
              ✦
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function MemoryCard({ memory, visible, flipping }) {
  if (!memory) return null;

  return (
    <div
      className={`w-full max-w-[500px] mx-auto transition-all duration-700 ${
        visible ? 'memory-card-rise opacity-100' : 'opacity-0 translate-y-16 scale-90'
      } ${flipping ? 'memory-card-flip' : ''}`}
    >
      <div className="polaroid relative bg-white p-6 pb-16 rounded-md shadow-2xl glow-gold hover:-translate-y-2 transition-transform duration-300 border border-[#f0f0f0]">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-amber-100/70 rotate-[-1.5deg] shadow-sm border-b border-amber-200/50" />
        <p className="font-inter text-xs text-bronze/50 uppercase tracking-[0.2em] text-center mb-4">
          Memory #{String(memory.id).padStart(2, '0')}
        </p>
        <h4 className="font-playfair text-2xl sm:text-3xl text-bronze text-center mb-5 font-bold tracking-tight">
          {memory.title}
        </h4>
        <div className="overflow-hidden rounded-md mb-6 shadow-inner border border-bronze/10">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
        <p className="font-cormorant text-bronze text-xl sm:text-2xl italic text-center leading-relaxed px-4">
          "{memory.description}"
        </p>
      </div>
    </div>
  );
}

function PlaceholderCard() {
  return (
    <div className="w-full max-w-[500px] mx-auto opacity-75">
      <div className="polaroid relative bg-white/80 backdrop-blur-sm p-6 pb-16 rounded-md shadow-xl border border-dashed border-bronze/30 flex flex-col items-center justify-center min-h-[480px]">
        <span className="text-6xl mb-6 animate-heart-beat" style={{ animationDuration: '3s' }}>✨</span>
        <h4 className="font-playfair text-2xl text-bronze/60 text-center mb-3">Your Journey Awaits</h4>
        <p className="font-cormorant text-xl text-bronze/50 italic text-center max-w-[280px]">
          Click "Open A Memory" or use the controls to recall a magical moment from the chest.
        </p>
      </div>
    </div>
  );
}

export default function MemoryJarSection() {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [flipping, setFlipping] = useState(false);

  const openMemory = useCallback((index) => {
    if (isOpening) return;
    setIsOpening(true);
    setCardVisible(false);
    setFlipping(true);

    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setFlipping(false);
        setTimeout(() => setCardVisible(true), 400);
        setIsOpening(false);
      }, 1200);
    } else {
      setCardVisible(false);
      setTimeout(() => {
        setCurrentIndex(index);
        setFlipping(false);
        setTimeout(() => setCardVisible(true), 300);
        setIsOpening(false);
      }, 500);
    }
  }, [isOpen, isOpening]);

  const pickRandom = () => {
    let idx;
    do {
      idx = Math.floor(Math.random() * chestMemories.length);
    } while (idx === currentIndex && chestMemories.length > 1);
    openMemory(idx);
  };

  const goPrev = () => {
    if (currentIndex === null) return;
    openMemory((currentIndex - 1 + chestMemories.length) % chestMemories.length);
  };

  const goNext = () => {
    if (currentIndex === null) return;
    openMemory((currentIndex + 1) % chestMemories.length);
  };

  return (
    <SectionWrapper id="memory-chest" dark>
      <Sparkles count={25} className="opacity-60" />
      <SectionTitle
        emoji="✨"
        title="Magical Memory Chest"
        subtitle="Treasures from our journey together"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 max-w-6xl mx-auto items-center px-4">
        {/* Left Column: Chest & Buttons */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="absolute -inset-10 bg-gold/15 rounded-full blur-3xl animate-pulse-glow" />
            <TreasureChest isOpen={isOpen} isOpening={isOpening} />
          </div>

          <button
            onClick={pickRandom}
            disabled={isOpening}
            className="group px-10 py-4 bg-gradient-to-r from-gold via-bronze to-gold bg-[length:200%_100%] text-white font-cormorant text-xl rounded-full glow-gold hover:scale-105 hover:bg-right transition-all duration-500 disabled:opacity-50 shadow-xl mb-8 cursor-pointer"
          >
            <span className="group-hover:animate-pulse">✨ Open A Memory ✨</span>
          </button>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 w-full">
            <button
              onClick={goPrev}
              disabled={isOpening || currentIndex === null}
              className="px-5 py-2.5 rounded-full border border-bronze/20 text-bronze font-cormorant text-base hover:bg-bronze/5 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all cursor-pointer"
            >
              ← Previous
            </button>
            <button
              onClick={pickRandom}
              disabled={isOpening}
              className="px-5 py-2.5 rounded-full bg-rose/20 text-bronze font-cormorant text-base hover:bg-rose/30 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all cursor-pointer border border-rose/30"
            >
              🎲 Random
            </button>
            <button
              onClick={goNext}
              disabled={isOpening || currentIndex === null}
              className="px-5 py-2.5 rounded-full border border-bronze/20 text-bronze font-cormorant text-base hover:bg-bronze/5 hover:scale-105 disabled:opacity-30 disabled:hover:scale-100 transition-all cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right Column: Memory Card */}
        <div className="lg:col-span-7 flex items-center justify-center min-h-[500px] w-full">
          {currentIndex !== null ? (
            <MemoryCard
              memory={chestMemories[currentIndex]}
              visible={cardVisible}
              flipping={flipping}
            />
          ) : (
            <PlaceholderCard />
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
