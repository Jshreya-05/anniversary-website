import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { SITE_CONFIG } from '../data/config';

const AudioContext = createContext(null);

export function AudioProvider({ children }) {
  const [bgPlaying, setBgPlaying] = useState(false);
  const [bgVolume, setBgVolume] = useState(0.5);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const [voiceCurrentTime, setVoiceCurrentTime] = useState(0);
  const [voiceDuration, setVoiceDuration] = useState(0);
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem('anniversary_website_visited');
  });

  const bgAudioRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const boostTimeoutRef = useRef(null);
  const isBoostedRef = useRef(false);

  // Initialize Background Music
  const initBgAudio = useCallback(() => {
    if (!bgAudioRef.current) {
      bgAudioRef.current = new Audio(SITE_CONFIG.audio.backgroundMusic);
      bgAudioRef.current.loop = true;
      bgAudioRef.current.volume = voicePlaying ? 0.05 : (isBoostedRef.current ? Math.min(1.0, bgVolume + 0.25) : bgVolume);
      
      bgAudioRef.current.addEventListener('play', () => setBgPlaying(true));
      bgAudioRef.current.addEventListener('pause', () => setBgPlaying(false));
    }
    return bgAudioRef.current;
  }, [bgVolume, voicePlaying]);

  // Initialize Voice Audio
  const initVoiceAudio = useCallback(() => {
    if (!voiceAudioRef.current) {
      voiceAudioRef.current = new Audio(SITE_CONFIG.audio.voiceMessage);
      
      voiceAudioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(voiceAudioRef.current.duration);
      });
      voiceAudioRef.current.addEventListener('durationchange', () => {
        setDuration(voiceAudioRef.current.duration);
      });
      voiceAudioRef.current.addEventListener('timeupdate', () => {
        setVoiceCurrentTime(voiceAudioRef.current.currentTime);
      });
      voiceAudioRef.current.addEventListener('play', () => {
        setVoicePlaying(true);
      });
      voiceAudioRef.current.addEventListener('pause', () => {
        setVoicePlaying(false);
      });
      voiceAudioRef.current.addEventListener('ended', () => {
        setVoicePlaying(false);
        setVoiceCurrentTime(0);
      });
    }
    return voiceAudioRef.current;
  }, []);

  const setDuration = (d) => {
    if (d && !isNaN(d) && isFinite(d)) {
      setVoiceDuration(d);
    }
  };

  // Toggle Background Music
  const toggleBg = useCallback(() => {
    const audio = initBgAudio();
    if (bgPlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Autoplay blocked:', err));
    }
  }, [bgPlaying, initBgAudio]);

  // Adjust Background Music Volume
  const changeBgVolume = useCallback((v) => {
    setBgVolume(v);
    if (bgAudioRef.current) {
      // If voice is currently playing, we maintain the ducked 5% volume,
      // but save the new bgVolume so when voice ends it restores to the new value.
      if (!voicePlaying && !isBoostedRef.current) {
        bgAudioRef.current.volume = v;
      }
    }
  }, [voicePlaying]);

  // Toggle Voice Message
  const toggleVoice = useCallback(() => {
    const audio = initVoiceAudio();
    if (voicePlaying) {
      audio.pause();
    } else {
      audio.play().catch(err => console.log('Playback error:', err));
    }
  }, [voicePlaying, initVoiceAudio]);

  // Seek Voice Message
  const seekVoice = useCallback((time) => {
    const audio = initVoiceAudio();
    audio.currentTime = time;
    setVoiceCurrentTime(time);
  }, [initVoiceAudio]);

  // Duck Background Music when Voice plays
  useEffect(() => {
    if (bgAudioRef.current) {
      if (voicePlaying) {
        bgAudioRef.current.volume = 0.05;
      } else {
        bgAudioRef.current.volume = isBoostedRef.current ? Math.min(1.0, bgVolume + 0.25) : bgVolume;
      }
    }
  }, [voicePlaying, bgVolume]);

  // Boost volume when gift box is opened
  const boostBgVolume = useCallback(() => {
    const audio = initBgAudio();
    
    // Clear existing boost timeout if any
    if (boostTimeoutRef.current) {
      clearTimeout(boostTimeoutRef.current);
    }

    isBoostedRef.current = true;
    const boostedVol = Math.min(1.0, bgVolume + 0.25);
    audio.volume = voicePlaying ? 0.05 : boostedVol;

    // Start playing background music if it is not already playing
    if (audio.paused) {
      audio.play().catch(err => console.log('Autoplay blocked on boost:', err));
    }

    boostTimeoutRef.current = setTimeout(() => {
      isBoostedRef.current = false;
      if (bgAudioRef.current) {
        bgAudioRef.current.volume = voicePlaying ? 0.05 : bgVolume;
      }
    }, 10000);
  }, [bgVolume, voicePlaying, initBgAudio]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (bgAudioRef.current) bgAudioRef.current.pause();
      if (voiceAudioRef.current) voiceAudioRef.current.pause();
      if (boostTimeoutRef.current) clearTimeout(boostTimeoutRef.current);
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        bgPlaying,
        bgVolume,
        voicePlaying,
        voiceCurrentTime,
        voiceDuration,
        showWelcome,
        setShowWelcome,
        toggleBg,
        changeBgVolume,
        toggleVoice,
        seekVoice,
        boostBgVolume,
        initBgAudio
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}
