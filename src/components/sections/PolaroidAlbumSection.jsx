import { useState, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { polaroidAlbums } from '../../data/stories';

function PolaroidCard({ photo, className = '', rotation = 0, isLarge = false }) {
  return (
    <div
      className={`polaroid relative cursor-pointer hover:-translate-y-4 hover:shadow-2xl transition-all duration-500 ease-out select-none ${className}`}
      style={{ 
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={() => window.dispatchEvent(new CustomEvent('lightbox', { detail: photo }))}
    >
      {/* Tape decoration at the top */}
      <div 
        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-100/60 shadow-sm rotate-[1.5deg] border-b border-amber-200/30 ${
          isLarge ? 'w-24 h-7' : 'w-16 h-5'
        }`} 
      />

      <div className="overflow-hidden rounded-sm bg-gray-50 border border-black/5 flex items-center justify-center">
        <img 
          src={photo.image} 
          alt={photo.caption} 
          className="w-full h-auto object-contain hover:scale-105 transition-transform duration-700" 
        />
      </div>
      
      <p className={`font-cormorant text-bronze text-center mt-4 italic font-semibold leading-snug ${
        isLarge ? 'text-lg sm:text-xl px-2' : 'text-sm sm:text-base px-1'
      }`}>
        {photo.caption}
      </p>
    </div>
  );
}

function Lightbox({ photo, onClose }) {
  if (!photo) return null;
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-white p-5 pb-16 rounded-md shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white font-inter text-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
        >
          ✕ Close
        </button>

        <div className="overflow-hidden rounded-sm border border-black/5">
          <img src={photo.image} alt={photo.caption} className="w-full h-auto max-h-[70vh] object-contain" />
        </div>
        
        <p className="font-cormorant text-bronze text-center mt-5 text-xl sm:text-2xl italic font-bold">
          {photo.caption}
        </p>
      </div>
    </div>
  );
}

export default function PolaroidAlbumSection() {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [activeAlbum, setActiveAlbum] = useState(0);

  useEffect(() => {
    const handler = (e) => setLightboxPhoto(e.detail);
    window.addEventListener('lightbox', handler);
    return () => window.removeEventListener('lightbox', handler);
  }, []);

  const album = polaroidAlbums[activeAlbum];
  const photos = album.photos;

  return (
    <SectionWrapper id="polaroid-album">
      <SectionTitle emoji="📸" title="Polaroid Family Album" subtitle="Snapshots of our beautiful life" />

      {/* Album Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
        {polaroidAlbums.map((album, i) => (
          <button
            key={album.id}
            onClick={() => setActiveAlbum(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-inter font-medium tracking-wide transition-all cursor-pointer shadow-sm hover:scale-105 ${
              i === activeAlbum
                ? 'bg-gradient-to-r from-rose via-rose/90 to-gold text-white glow-rose border border-rose/20'
                : 'glass text-bronze hover:bg-blush/40 hover:glow-rose'
            }`}
          >
            {album.title}
          </button>
        ))}
      </div>

      {/* Dynamic Polaroid Grid Layout */}
      <div className="flex flex-wrap justify-center gap-10 sm:gap-12 max-w-5xl mx-auto px-4 reveal visible">
        {photos.map((photo, i) => {
          // Dynamic rotations: alternating positive/negative slight angles for scrapbook feel
          const rotation = i % 4 === 0 ? 1.5 : i % 4 === 1 ? -2.2 : i % 4 === 2 ? 2.8 : -1.8;
          return (
            <div key={i} className="w-full max-w-[280px] sm:max-w-[300px]">
              <PolaroidCard
                photo={photo}
                className="w-full shadow-lg"
                rotation={rotation}
                isLarge={false}
              />
            </div>
          );
        })}
      </div>

      <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />
    </SectionWrapper>
  );
}
