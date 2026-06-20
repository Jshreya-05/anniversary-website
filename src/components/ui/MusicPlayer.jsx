import { useState } from 'react';
import { useAudioContext } from '../../context/AudioContext';
import { SITE_CONFIG } from '../../data/config';

function MusicNotes({ active }) {
  if (!active) return null;
  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none">
      {['♪', '♫', '♪'].map((note, i) => (
        <span
          key={i}
          className="absolute text-gold text-sm"
          style={{
            left: `${i * 12 - 12}px`,
            animation: `music-note 1.5s ease-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {note}
        </span>
      ))}
    </div>
  );
}

export default function MusicPlayer() {
  const [expanded, setExpanded] = useState(false);
  const { bgPlaying, bgVolume, toggleBg, changeBgVolume } = useAudioContext();

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        expanded ? 'w-64' : 'w-14'
      }`}
    >
      <div className="glass glow-gold rounded-2xl p-3 shadow-lg">
        <MusicNotes active={bgPlaying} />

        <div className="flex items-center gap-3">
          <button
            onClick={toggleBg}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center text-white text-lg hover:scale-110 transition-transform shadow-md flex-shrink-0 cursor-pointer"
            aria-label={bgPlaying ? 'Pause music' : 'Play music'}
          >
            {bgPlaying ? '⏸' : '▶'}
          </button>

          {expanded && (
            <div className="flex-1 min-w-0 animate-fade-in">
              <p className="font-cormorant text-sm text-bronze font-semibold truncate">
                {SITE_CONFIG.audio.title}
              </p>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgVolume}
                onChange={(e) => changeBgVolume(parseFloat(e.target.value))}
                className="w-full h-1 mt-1 accent-bronze cursor-pointer"
                aria-label="Volume"
              />
            </div>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-bronze/60 hover:text-bronze text-xs flex-shrink-0 transition-colors cursor-pointer"
            aria-label="Toggle player"
          >
            {expanded ? '◂' : '▸'}
          </button>
        </div>
      </div>
    </div>
  );
}
