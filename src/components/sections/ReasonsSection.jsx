import { useState, useRef, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { reasons } from '../../data/reasons';

function GiftCard({ reason, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flip-card w-[280px] h-[350px] flex-shrink-0 cursor-pointer ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div className="flip-card-inner relative w-full h-full">
        {/* Front of card */}
        <div className="flip-card-front absolute inset-0 rounded-2xl bg-gradient-to-br from-gold via-amber-400 to-bronze flex flex-col items-center justify-between p-8 text-white shadow-2xl border border-white/20 glow-gold transition-all duration-300 hover:scale-[1.02]">
          <div className="text-left w-full">
            <span className="text-4xl filter drop-shadow-md">💝</span>
          </div>
          
          <div className="text-center my-auto">
            <p className="font-playfair text-2xl font-bold tracking-wide uppercase text-white/90">
              Reason
            </p>
            <p className="font-playfair text-5xl font-black mt-2 text-glow">
              #{String(index + 1).padStart(2, '0')}
            </p>
          </div>

          <div className="text-center w-full mt-4">
            <span className="font-inter text-xs bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 tracking-widest uppercase animate-pulse">
              Click to Open
            </span>
          </div>
        </div>

        {/* Back of card */}
        <div className="flip-card-back absolute inset-0 rounded-2xl glass-dark flex flex-col items-center justify-between p-8 shadow-2xl border border-gold/30 glow-rose">
          <div className="text-left w-full">
            <span className="text-3xl filter drop-shadow-sm text-rose-400">✨</span>
          </div>

          <p className="font-cormorant text-bronze text-2xl text-center italic leading-relaxed max-w-[220px] my-auto overflow-y-auto pr-1">
            "{reason}"
          </p>

          <div className="text-center w-full mt-4">
            <span className="font-inter text-[10px] text-bronze/50 uppercase tracking-widest">
              Tap to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReasonsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const trackRef = useRef(null);
  const touchStart = useRef(null);

  // Responsive card visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = reasons.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Touch Swipe Support
  const handleTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    touchStart.current = null;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Mouse Drag Swipe Support
  const dragStart = useRef(null);
  const handleMouseDown = (e) => {
    dragStart.current = e.clientX;
  };
  const handleMouseUp = (e) => {
    if (dragStart.current === null) return;
    const diff = dragStart.current - e.clientX;
    dragStart.current = null;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Card translation calculation:
  // Card width is 280px, gap is gap-8 (32px).
  // Translating by 1 card is translates index * (280 + 32)px = index * 312px.
  const translateAmount = currentIndex * 312;

  return (
    <SectionWrapper id="reasons" dark>
      <SectionTitle
        emoji="💝"
        title="24 Reasons We Love You"
        subtitle="Each one written with devotion, celebrating 24 beautiful years"
      />

      <div className="relative max-w-[1248px] mx-auto px-4 md:px-12 select-none">
        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass hover:bg-gold/30 hover:scale-110 flex items-center justify-center text-bronze text-xl font-bold transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:bg-white/10 shadow-lg glow-rose cursor-pointer"
          aria-label="Previous reasons"
        >
          ←
        </button>

        {/* Carousel Window */}
        <div 
          className="overflow-hidden py-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={trackRef}
            className="flex gap-8 transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${translateAmount}px)`,
              width: `${reasons.length * 280 + (reasons.length - 1) * 32}px`,
            }}
          >
            {reasons.map((reason, i) => (
              <div key={i} className="reveal visible">
                <GiftCard reason={reason} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={currentIndex >= maxIndex}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass hover:bg-gold/30 hover:scale-110 flex items-center justify-center text-bronze text-xl font-bold transition-all disabled:opacity-30 disabled:hover:scale-100 disabled:bg-white/10 shadow-lg glow-rose cursor-pointer"
          aria-label="Next reasons"
        >
          →
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentIndex ? 'bg-gold w-6 shadow-[0_0_8px_#F0C060]' : 'bg-bronze/30 hover:bg-bronze/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
