import SectionWrapper from '../layout/SectionWrapper';

export default function FutureMessageSection() {
  return (
    <section
      className="relative py-20 sm:py-28 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF5F5 0%, #1a1033 50%, #2d1b4e 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <p className="font-inter text-sm text-white/40 uppercase tracking-[0.3em] mb-8">
          Message From Future Shreya & Swanand
        </p>

        <div className="relative">
          <span className="text-6xl sm:text-7xl block mb-8 opacity-80">💫</span>
          <blockquote className="font-playfair text-2xl sm:text-3xl md:text-4xl text-white/90 leading-relaxed italic">
            "No matter how old we become,
            <br />
            you will always be our first home."
          </blockquote>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mt-10" />
          <p className="font-cormorant text-white/50 text-lg mt-6">
            — Shreya & Swanand, forever your children
          </p>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 100 + i * 30,
              height: 100 + i * 30,
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `star-twinkle ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
