import { useState, useEffect } from 'react';
import FloatingHeartBalloons from '../background/FloatingHeartBalloons';
import Sparkles from '../background/Sparkles';

export default function LoadingScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);
    const completeTimer = setTimeout(() => onComplete(), 3000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ background: 'linear-gradient(135deg, #FFF5F5 0%, #FDE2E4 50%, #F9C6C6 100%)' }}
    >
      <FloatingHeartBalloons count={8} />
      <Sparkles count={40} />

      <div className="relative z-10 text-center px-6">
        <div className="text-4xl mb-6 animate-heart-beat">❤️</div>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-bronze mb-4 text-glow">
          A Love Story Since 2002
        </h1>
        <div className="flex justify-center gap-3 text-2xl">
          <span className="animate-sparkle" style={{ animationDelay: '0s' }}>✨</span>
          <span className="animate-sparkle" style={{ animationDelay: '0.5s' }}>💕</span>
          <span className="animate-sparkle" style={{ animationDelay: '1s' }}>✨</span>
        </div>
        <div className="mt-8 w-48 h-1 mx-auto bg-blush rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose to-gold rounded-full"
            style={{ animation: 'fade-in 3s ease-out forwards', width: '100%', transformOrigin: 'left' }}
          />
        </div>
      </div>
    </div>
  );
}
