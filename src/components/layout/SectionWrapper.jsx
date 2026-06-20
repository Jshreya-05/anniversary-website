export default function SectionWrapper({ id, children, className = '', dark = false }) {
  return (
    <section
      id={id}
      className={`relative py-16 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 ${
        dark ? 'bg-gradient-to-b from-blush/30 via-cream/50 to-cream' : ''
      } ${className}`}
    >
      <div className="max-w-[1600px] mx-auto relative z-10">{children}</div>
    </section>
  );
}

export function SectionTitle({ emoji, title, subtitle }) {
  return (
    <div className="text-center mb-14 sm:mb-18 md:mb-20 reveal">
      {emoji && (
        <span className="text-4xl sm:text-5xl block mb-5 animate-heart-beat" style={{ animationDuration: '2.5s' }}>
          {emoji}
        </span>
      )}
      <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-semibold text-bronze text-glow mb-4 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="font-cormorant text-lg sm:text-xl md:text-2xl text-bronze/70 italic max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent mx-auto mt-8 shadow-[0_0_12px_rgba(240,192,96,0.4)]" />
    </div>
  );
}
