import { useAudioContext } from '../../context/AudioContext';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';

export default function VoiceMessageSection() {
  const {
    voicePlaying,
    voiceCurrentTime,
    voiceDuration,
    toggleVoice,
    seekVoice
  } = useAudioContext();

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e) => {
    seekVoice(parseFloat(e.target.value));
  };

  const progressPercentage = voiceDuration ? (voiceCurrentTime / voiceDuration) * 100 : 0;

  return (
    <SectionWrapper id="voice-message" dark>
      <SectionTitle emoji="🎤" title="Special Message From Us" />

      <div className="max-w-xl mx-auto px-4">
        <div className="glass glow-gold rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden border border-white/10 shadow-premium">
          <div className="absolute top-0 left-0 w-20 h-20 bg-gold/5 rounded-full blur-xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-rose/5 rounded-full blur-xl" />

          <h3 className="font-playfair text-xl sm:text-2xl text-bronze font-bold mb-6 text-glow">
            ❤️ A Special Message From Shreya & Swanand ❤️
          </h3>

          {/* Large Play/Pause Button */}
          <button
            onClick={toggleVoice}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gold to-bronze flex items-center justify-center text-white text-3xl mx-auto mb-6 hover:scale-110 active:scale-95 transition-transform shadow-lg glow-gold cursor-pointer"
            aria-label={voicePlaying ? 'Pause voice message' : 'Play voice message'}
          >
            {voicePlaying ? '⏸' : '▶'}
          </button>

          {/* Animated Waveform */}
          <div className="flex items-end justify-center gap-1.5 h-12 mb-6">
            {Array.from({ length: 28 }, (_, i) => {
              // Custom heights for an attractive waveform curve
              const defaultHeight = i % 2 === 0 ? '12px' : '8px';
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    voicePlaying ? 'bg-gradient-to-t from-gold to-bronze animate-waveform' : 'bg-bronze/30'
                  }`}
                  style={{
                    animation: voicePlaying ? `waveform 0.${4 + (i % 6)}s ease-in-out infinite` : 'none',
                    animationDelay: `${i * 0.04}s`,
                    height: voicePlaying ? undefined : defaultHeight,
                  }}
                />
              );
            })}
          </div>

          {/* Custom Timeline Progress Bar */}
          <div className="space-y-2 mb-4">
            <div className="relative group w-full flex items-center h-2">
              <input
                type="range"
                min="0"
                max={voiceDuration || 100}
                value={voiceCurrentTime}
                onChange={handleProgressChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                aria-label="Voice message progress"
              />
              {/* Progress Track Background */}
              <div className="absolute left-0 right-0 h-1.5 bg-blush/60 rounded-full z-10" />
              {/* Progress Fill */}
              <div
                className="absolute left-0 h-1.5 bg-gradient-to-r from-gold to-bronze rounded-full z-10"
                style={{ width: `${progressPercentage}%` }}
              />
              {/* Slider Thumb */}
              <div
                className="absolute w-3.5 h-3.5 bg-bronze border-2 border-white rounded-full shadow-md z-10 scale-0 group-hover:scale-100 transition-transform duration-200"
                style={{ left: `calc(${progressPercentage}% - 7px)` }}
              />
            </div>

            {/* Time Indicators */}
            <div className="flex justify-between text-xs font-inter text-bronze/60">
              <span>{formatTime(voiceCurrentTime)}</span>
              <span>{formatTime(voiceDuration)}</span>
            </div>
          </div>

          <p className="font-cormorant text-bronze/80 text-base sm:text-lg italic leading-relaxed">
            Press play to hear a special anniversary message from your children.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
