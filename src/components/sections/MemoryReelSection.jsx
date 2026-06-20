import { useState, useEffect, useRef, useCallback } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { storyCategories } from '../../data/stories';

const STORY_DURATION = 5000;

export default function MemoryReelSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStory, setActiveStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const intervalRef = useRef(null);

  const category = storyCategories[activeCategory];
  const stories = category.stories;

  const nextStory = useCallback(() => {
    if (activeStory < stories.length - 1) {
      setActiveStory((s) => s + 1);
    } else if (activeCategory < storyCategories.length - 1) {
      setActiveCategory((c) => c + 1);
      setActiveStory(0);
    } else {
      setActiveCategory(0);
      setActiveStory(0);
    }
    setProgress(0);
  }, [activeStory, activeCategory, stories.length]);

  const prevStory = useCallback(() => {
    if (activeStory > 0) {
      setActiveStory((s) => s - 1);
    } else if (activeCategory > 0) {
      const prevCat = activeCategory - 1;
      setActiveCategory(prevCat);
      setActiveStory(storyCategories[prevCat].stories.length - 1);
    }
    setProgress(0);
  }, [activeStory, activeCategory]);

  useEffect(() => {
    if (paused) return;
    const step = 50;
    intervalRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          nextStory();
          return 0;
        }
        return p + (step / STORY_DURATION) * 100;
      });
    }, step);
    return () => clearInterval(intervalRef.current);
  }, [paused, activeCategory, activeStory, nextStory]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextStory();
      else prevStory();
    }
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x > rect.width / 2) nextStory();
    else prevStory();
  };

  return (
    <SectionWrapper id="memory-reel" dark>
      <SectionTitle emoji="🎞" title="Our Journey Through Time" subtitle="Swipe or tap to explore our stories" />

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {storyCategories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(i); setActiveStory(0); setProgress(0); }}
            className={`px-4 py-2 rounded-full text-sm font-inter transition-all ${
              i === activeCategory
                ? 'bg-gradient-to-r from-gold to-bronze text-white glow-gold'
                : 'glass text-bronze hover:bg-blush/50'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div
        className="relative max-w-sm mx-auto rounded-2xl overflow-hidden glow-gold cursor-pointer select-none"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex gap-1 p-2 absolute top-0 left-0 right-0 z-20">
          {stories.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{
                  width: i < activeStory ? '100%' : i === activeStory ? `${progress}%` : '0%',
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative aspect-[9/16] bg-bronze/10 overflow-hidden">
          {stories.map((story, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === activeStory ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Blurred background image to fill the 9:16 aspect ratio beautifully */}
              <img 
                src={story.image} 
                alt="" 
                className="absolute inset-0 w-full h-full object-cover filter blur-lg opacity-40 scale-110 pointer-events-none" 
              />
              
              {/* Contained foreground image that fits perfectly without cropping */}
              <img 
                src={story.image} 
                alt={story.caption} 
                className="relative z-10 w-full h-full object-contain mx-auto" 
              />
              
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
                <p className="font-cormorant text-white text-lg sm:text-xl italic text-center drop-shadow-lg">
                  {story.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-12 left-0 right-0 text-center z-20">
          <span className="glass px-4 py-1 rounded-full text-white text-sm font-inter">
            {category.name}
          </span>
        </div>
      </div>
    </SectionWrapper>
  );
}
