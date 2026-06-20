import { useState, useRef } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { images } from '../../data/images';

export default function ThenVsNowSection() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const updatePosition = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e) => { if (isDragging.current) updatePosition(e.clientX); };
  const handleTouchMove = (e) => { updatePosition(e.touches[0].clientX); };

  return (
    <SectionWrapper id="then-vs-now">
      <SectionTitle emoji="💫" title="Then ❤️ and Now ❤️" subtitle="A love that only grows more beautiful" />

      <div
        ref={containerRef}
        className="relative max-w-lg mx-auto aspect-[3/4] rounded-2xl overflow-hidden glow-gold shadow-2xl cursor-col-resize select-none"
        style={{ containerType: 'inline-size' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        <img
          src={images.thenVsNow.now}
          alt="Now"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={images.thenVsNow.then}
            alt="Then"
            className="absolute top-0 left-0 h-full max-w-none object-cover"
            style={{ width: '100cqw' }}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-bronze font-bold cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
          >
            ⇔
          </div>
        </div>

        <span className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-sm font-cormorant text-bronze font-semibold">
          Before
        </span>
        <span className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-sm font-cormorant text-bronze font-semibold">
          Now
        </span>
      </div>
    </SectionWrapper>
  );
}
