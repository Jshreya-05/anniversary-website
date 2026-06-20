import { useState, useEffect } from 'react';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { letterList } from '../../data/letters';

function EnvelopeCard({ letter, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-64 sm:w-72 h-48 sm:h-52 cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      aria-label={`Open ${letter.title}`}
    >
      <div
        className="absolute inset-0 rounded-xl shadow-xl transition-shadow duration-500 group-hover:shadow-2xl group-hover:glow-gold"
        style={{
          background: 'linear-gradient(145deg, #FDE2E4, #F9C6C6)',
          border: '2px solid rgba(201, 132, 42, 0.25)',
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-500 group-hover:-rotate-6"
        style={{
          background: 'linear-gradient(145deg, #F9C6C6, #FDE2E4)',
          clipPath: 'polygon(0 0, 50% 75%, 100% 0)',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl mb-3 group-hover:scale-110 transition-transform animate-heart-beat">💌</span>
        <p className="font-playfair text-bronze text-lg font-semibold">{letter.author}'s Letter</p>
        <p className="font-cormorant text-bronze/60 text-sm mt-1 italic">Tap to read</p>
      </div>
      <div className="absolute -inset-1 rounded-xl bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500 -z-10 blur-sm" />
    </button>
  );
}

function LetterModal({ letterIndex, onClose, onNavigate }) {
  const [unfolded, setUnfolded] = useState(false);
  const letter = letterList[letterIndex];

  useEffect(() => {
    setUnfolded(false);
    const timer = setTimeout(() => setUnfolded(true), 150);
    return () => clearTimeout(timer);
  }, [letterIndex]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const goPrev = () => onNavigate((letterIndex - 1 + letterList.length) % letterList.length);
  const goNext = () => onNavigate((letterIndex + 1) % letterList.length);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-[#2d1f14]/65 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Centered Premium Letter Paper */}
      <div className="relative z-10 w-full max-w-[900px] min-h-[600px] animate-fade-in-up my-auto flex flex-col">
        
        {/* Paper Container */}
        <div
          className={`letter-paper relative flex-1 transition-all duration-700 ease-out bg-[#faf3e8] paper-texture rounded-2xl shadow-2xl p-6 sm:p-12 md:p-16 border border-bronze/15 ${
            unfolded ? 'letter-unfolded' : 'letter-folded'
          }`}
        >
          {/* Close Button at top-right of the paper */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-bronze/60 hover:text-bronze hover:bg-bronze/10 text-xl font-light transition-all cursor-pointer"
            aria-label="Close letter"
          >
            ✕
          </button>

          {/* Letter fold corner decoration */}
          <div className="letter-fold-corner opacity-40" />

          {/* Content Wrapper */}
          <div className="max-w-[750px] mx-auto flex flex-col justify-between h-full">
            
            {/* Header */}
            <div className="border-b border-bronze/15 pb-5 mb-8 text-center md:text-left">
              <p className="font-inter text-xs uppercase tracking-[0.25em] text-bronze/50 mb-2">
                A letter written with love
              </p>
              <h3 className="font-playfair text-3xl sm:text-4xl text-bronze font-bold">
                {letter.title}
              </h3>
            </div>

            {/* Emotional Readable Letter Content */}
            <div className="letter-content flex-1 font-cormorant text-bronze text-[20px] sm:text-[22px] leading-[2.0] text-justify md:text-left whitespace-pre-line tracking-wide">
              {letter.content}
            </div>

            {/* Bottom Heart & Pagination */}
            <div className="mt-12">
              <div className="flex justify-center mb-8">
                <span className="text-3xl animate-heart-beat">❤️</span>
              </div>

              {/* Navigation Controls inside Paper */}
              <div className="pt-6 border-t border-bronze/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={goPrev}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-bronze/25 text-bronze font-cormorant text-lg hover:bg-bronze/5 transition-all hover:scale-105 hover:glow-rose cursor-pointer"
                >
                  ← Previous Letter
                </button>
                
                <span className="font-inter text-bronze/50 text-xs tracking-widest uppercase">
                  {letterIndex + 1} of {letterList.length}
                </span>
                
                <button
                  onClick={goNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-bronze/25 text-bronze font-cormorant text-lg hover:bg-bronze/5 transition-all hover:scale-105 hover:glow-rose cursor-pointer"
                >
                  Next Letter →
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default function EnvelopeLetterSection() {
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <SectionWrapper id="letters">
      <SectionTitle emoji="💌" title="A Letter From Your Children" subtitle="Words from our hearts to yours" />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-12 sm:gap-20 max-w-3xl mx-auto">
        {letterList.map((letter, i) => (
          <EnvelopeCard key={letter.id} letter={letter} onClick={() => setModalIndex(i)} />
        ))}
      </div>

      {modalIndex !== null && (
        <LetterModal
          letterIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNavigate={setModalIndex}
        />
      )}
    </SectionWrapper>
  );
}
