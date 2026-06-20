import { useState } from 'react';
import FloatingHeartBalloons from '../background/FloatingHeartBalloons';
import { Confetti } from '../background/Sparkles';
import Sparkles from '../background/Sparkles';
import SectionWrapper from '../layout/SectionWrapper';

export default function GrandFinaleSection({ onMusicBoost }) {
  const [opened, setOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    onMusicBoost?.();
    setTimeout(() => setShowMessage(true), 1500);
  };

  return (
    <SectionWrapper id="finale" className="min-h-screen flex items-center">
      {opened && (
        <>
          <FloatingHeartBalloons intense showText />
          <Confetti active count={200} />
          <Sparkles count={80} />
        </>
      )}

      <div className="text-center w-full">
        {!opened ? (
          <div className="animate-fade-in">
            <button
              onClick={handleOpen}
              className="group relative mx-auto block"
            >
              <div className="text-8xl sm:text-9xl mb-6 group-hover:scale-110 transition-transform duration-500 animate-pulse-glow">
                🎁
              </div>
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-bronze text-glow mb-4">
                Open Your Final Surprise
              </h2>
              <p className="font-cormorant text-lg text-bronze/60 italic">Click the gift to reveal</p>
            </button>
          </div>
        ) : (
          <div className={`transition-opacity duration-[2000ms] ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
              <p className="font-cormorant text-xl sm:text-2xl text-bronze/80 italic animate-fade-in-up">
                Not a house.
              </p>
              <p className="font-cormorant text-xl sm:text-2xl text-bronze/80 italic animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                Not a career.
              </p>
              <p className="font-cormorant text-xl sm:text-2xl text-bronze/80 italic animate-fade-in-up" style={{ animationDelay: '1s' }}>
                Not a bank balance.
              </p>

              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-8" />

              <p className="font-playfair text-2xl sm:text-3xl md:text-4xl text-bronze font-semibold text-glow animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
                The most beautiful thing Aai and Baba built in 24 years is:
              </p>

              <div className="space-y-3 animate-fade-in-up" style={{ animationDelay: '2s' }}>
                <p className="font-playfair text-3xl sm:text-4xl text-bronze">A Family.</p>
                <p className="font-cormorant text-xl sm:text-2xl text-bronze/80 italic">A Lifetime of Memories.</p>
                <p className="font-cormorant text-xl sm:text-2xl text-bronze/80 italic">A Love Story.</p>
                <p className="font-playfair text-3xl sm:text-4xl text-bronze mt-4">And Us.</p>
              </div>

              <div className="flex justify-center gap-8 mt-10 animate-fade-in-up" style={{ animationDelay: '2.5s' }}>
                <span className="font-cormorant text-xl text-bronze">❤️ Shreya</span>
                <span className="font-cormorant text-xl text-bronze">❤️ Swanand</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
