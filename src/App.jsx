import { useState, useEffect } from 'react';
import LoadingScreen from './components/ui/LoadingScreen';
import MusicPlayer from './components/ui/MusicPlayer';
import HiddenHearts from './components/ui/HiddenHearts';
import FloatingHeartBalloons from './components/background/FloatingHeartBalloons';
import HeroSection from './components/sections/HeroSection';
import TimelineSection from './components/sections/TimelineSection';
import MemoryReelSection from './components/sections/MemoryReelSection';
import EnvelopeLetterSection from './components/sections/EnvelopeLetterSection';
import ReasonsSection from './components/sections/ReasonsSection';
import VoiceMessageSection from './components/sections/VoiceMessageSection';
import ThenVsNowSection from './components/sections/ThenVsNowSection';
import WishingStarsSection from './components/sections/WishingStarsSection';
import MemoryJarSection from './components/sections/MemoryJarSection';
import LoveCounterSection from './components/sections/LoveCounterSection';
import GrandFinaleSection from './components/sections/GrandFinaleSection';
import FutureMessageSection from './components/sections/FutureMessageSection';
import { useScrollAnimationGroup } from './hooks/useScrollAnimation';
import { useAudioContext } from './context/AudioContext';

function App() {
  const [loading, setLoading] = useState(true);
  const [finaleActive, setFinaleActive] = useState(false);
  const { showWelcome, setShowWelcome, toggleBg, boostBgVolume } = useAudioContext();

  useScrollAnimationGroup();

  const handleMusicBoost = () => {
    setFinaleActive(true);
    boostBgVolume();
  };

  const handleAcceptMusic = () => {
    localStorage.setItem('anniversary_website_visited', 'true');
    setShowWelcome(false);
    toggleBg();
  };

  const handleDeclineMusic = () => {
    localStorage.setItem('anniversary_website_visited', 'true');
    setShowWelcome(false);
  };

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div className={`relative ${loading ? 'overflow-hidden h-screen' : ''}`}>
        {!finaleActive && <FloatingHeartBalloons count={14} />}
        <HiddenHearts />

        <main>
          <HeroSection />
          <TimelineSection />
          <MemoryReelSection />
          <EnvelopeLetterSection />
          <ReasonsSection />
          <VoiceMessageSection />
          <ThenVsNowSection />
          <WishingStarsSection />
          <MemoryJarSection />
          <LoveCounterSection />
          <GrandFinaleSection onMusicBoost={handleMusicBoost} />
          <FutureMessageSection />
        </main>

        {!loading && <MusicPlayer />}

        {/* Welcome Modal */}
        {!loading && showWelcome && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
            <div className="glass max-w-md w-full p-8 rounded-3xl shadow-2xl border border-white/20 text-center relative overflow-hidden animate-fade-in-up">
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose/10 rounded-full blur-xl" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-gold/10 rounded-full blur-xl" />
              
              <div className="text-4xl mb-4 animate-heart-beat">❤️</div>
              <h2 className="font-playfair text-2xl sm:text-3xl text-bronze font-bold mb-3 text-glow">
                Welcome to Aai & Baba's Love Story
              </h2>
              <p className="font-cormorant text-lg text-bronze/80 mb-6 italic leading-relaxed">
                Would you like to play background music as you browse their 24-year journey?
              </p>
              
              <button
                onClick={handleAcceptMusic}
                className="w-full py-3.5 mb-3 bg-gradient-to-r from-gold to-bronze hover:scale-105 active:scale-95 text-white rounded-full font-cormorant text-lg font-bold shadow-md transition-all duration-300 cursor-pointer"
              >
                Play Music 🎵
              </button>
              
              <button
                onClick={handleDeclineMusic}
                className="w-full py-2.5 text-bronze/60 hover:text-bronze font-inter text-sm hover:underline cursor-pointer"
              >
                Continue Without Music
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
