import { useState, useEffect, useMemo } from 'react';
import { SectionTitle } from '../layout/SectionWrapper';
import { wishes } from '../../data/wishes';
import { constellationStars, constellationLines } from '../../data/constellation';

function ShootingStar() {
  const [visible, setVisible] = useState(false);
  const style = useMemo(() => ({
    top: `${10 + Math.random() * 40}%`,
    left: `${60 + Math.random() * 30}%`,
    animationDuration: `${1.5 + Math.random()}s`,
  }), []);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 2000);
    };
    const interval = setInterval(show, 6000 + Math.random() * 8000);
    const initial = setTimeout(show, 3000);
    return () => { clearInterval(interval); clearTimeout(initial); };
  }, []);

  if (!visible) return null;

  return (
    <div className="absolute shooting-star pointer-events-none" style={style} />
  );
}

function StarButton({ star, isActive, onClick }) {
  const glowSize = star.brightness * 20;

  return (
    <button
      onClick={onClick}
      className={`absolute group transition-all duration-500 cursor-pointer ${
        isActive ? 'z-20 scale-125' : 'hover:scale-110'
      }`}
      style={{
        left: `${star.x}%`,
        top: `${star.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      aria-label={`Wish for year ${star.year}`}
    >
      {/* Halo glow */}
      <div
        className="absolute rounded-full transition-opacity duration-500 pointer-events-none"
        style={{
          width: glowSize * 2.5,
          height: glowSize * 2.5,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle, rgba(240,192,96,${star.brightness * 0.6}) 0%, transparent 70%)`,
          opacity: isActive ? 1 : 0.5,
        }}
      />

      {/* Tweaking Star Icon */}
      <div
        className="relative animate-star-twinkle"
        style={{
          width: star.size + 4,
          height: star.size + 4,
          animationDelay: `${star.id * 0.2}s`,
          animationDuration: `${2.5 + star.brightness * 2}s`,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-[0_0_8px_rgba(240,192,96,0.8)]">
          <path
            d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"
            fill={`rgba(255, 255, ${200 + star.brightness * 55}, ${star.brightness})`}
            stroke={`rgba(240, 192, 96, ${star.brightness * 0.9})`}
            strokeWidth="0.5"
          />
        </svg>
      </div>

      {/* Year Label */}
      <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/50 font-inter whitespace-nowrap transition-all duration-300 ${
        isActive ? 'opacity-100 text-gold text-xs font-semibold' : 'opacity-0 group-hover:opacity-100'
      }`}>
        {star.year}
      </span>
    </button>
  );
}

function FloatingWishCard({ wish, star, onClose }) {
  return (
    <div 
      className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-[#040208]/40 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative wish-card-float glass-dark glow-gold rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center shadow-2xl border border-gold/30 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sparkle decorative icons */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-6xl animate-star-twinkle text-gold drop-shadow-[0_0_10px_rgba(240,192,96,0.8)]">✨</div>
        
        <p className="font-inter text-xs uppercase tracking-[0.25em] text-gold/60 mb-6 mt-2">
          Year {star.year} — Constellation Wish
        </p>
        
        <blockquote className="font-cormorant text-2xl sm:text-3xl text-white leading-relaxed italic pr-1">
          "{wish}"
        </blockquote>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto my-8" />
        
        <button
          onClick={onClose}
          className="px-8 py-2.5 rounded-full bg-gradient-to-r from-gold to-bronze text-white font-inter text-sm hover:scale-105 hover:glow-gold transition-all shadow-md cursor-pointer"
        >
          Close Wish
        </button>
      </div>
    </div>
  );
}

export default function WishingStarsSection() {
  const [activeStar, setActiveStar] = useState(null);

  // Generate background stars
  const bgStars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        opacity: 0.15 + Math.random() * 0.6,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      })),
    []
  );

  return (
    <section 
      id="wishing-stars" 
      className="relative w-full min-h-[850px] md:min-h-[900px] bg-[#05030b] overflow-hidden py-16 px-4 md:px-8 flex flex-col justify-between"
      style={{
        background: 'linear-gradient(180deg, #100a26 0%, #05030b 40%, #05030b 80%, #0a0618 100%)'
      }}
    >
      {/* Background Star Field */}
      {bgStars.map((s) => (
        <div
          key={`bg-${s.id}`}
          className="absolute rounded-full bg-white animate-star-twinkle pointer-events-none"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      {/* Constant flow of shooting stars */}
      <ShootingStar />
      <ShootingStar />

      {/* Header (Inside night sky, styled correctly) */}
      <div className="relative z-10 text-center select-none pt-4">
        <SectionTitle 
          emoji="🌟" 
          title="24 Wishing Stars" 
          subtitle="A glowing constellation of wishes celebrating 24 years of love" 
        />
      </div>

      {/* Main Night Sky Constellation Area */}
      <div className="relative flex-1 w-full max-w-[1400px] mx-auto min-h-[500px]">
        {/* Constellation SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {constellationLines.map(([a, b], i) => {
            const starA = constellationStars[a];
            const starB = constellationStars[b];
            if (!starA || !starB) return null;
            return (
              <line
                key={i}
                x1={starA.x}
                y1={starA.y}
                x2={starB.x}
                y2={starB.y}
                stroke="rgba(240, 192, 96, 0.22)"
                strokeWidth="0.12"
                strokeDasharray="1.5 1.5"
                className="constellation-line"
              />
            );
          })}
        </svg>

        {/* Constellation Interactive Stars */}
        {constellationStars.map((star) => (
          <StarButton
            key={star.id}
            star={star}
            isActive={activeStar?.id === star.id}
            onClick={() => setActiveStar(star)}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center pt-8 pb-4 pointer-events-none select-none">
        <p className="font-cormorant text-gold/40 text-base tracking-[0.2em] uppercase">
          24 stars · 24 years · infinite love
        </p>
      </div>

      {/* Wish Floating Card Popup (Scoped inside this section) */}
      {activeStar && (
        <FloatingWishCard
          wish={wishes[activeStar.id]}
          star={activeStar}
          onClose={() => setActiveStar(null)}
        />
      )}
    </section>
  );
}
