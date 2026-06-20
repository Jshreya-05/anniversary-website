import Sparkles from '../background/Sparkles';
import Particles from '../background/Particles';
import { images } from '../../data/images';
import { SITE_CONFIG } from '../../data/config';

export default function HeroSection() {
  const scrollToTimeline = () => {
    document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, #FDE2E4 0%, #FFF5F5 50%, #F9C6C6 100%)',
        }}
      />
      <Sparkles count={50} />
      <Particles count={25} />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-5xl sm:text-6xl mb-4 animate-fade-in-up">💍</div>

        <h1 className="font-playfair text-4xl sm:text-5xl md:text-7xl font-bold text-bronze text-glow mb-2 animate-fade-in-up">
          24 Years
        </h1>
        <p
          className="font-playfair text-2xl sm:text-3xl md:text-4xl text-bronze/80 mb-6 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          of Togetherness
        </p>

        <p
          className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-bronze mb-2 animate-fade-in-up"
          style={{ animationDelay: '0.4s' }}
        >
          {SITE_CONFIG.subtitle}
        </p>

        <p
          className="font-inter text-sm sm:text-base text-bronze/60 mb-10 tracking-widest uppercase animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          {SITE_CONFIG.anniversaryDate} → Forever
        </p>

        <div
          className="relative mx-auto mb-10 animate-fade-in-up"
          style={{ animationDelay: '0.8s', width: 'min(280px, 70vw)' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/40 to-rose/40 blur-xl scale-110" />
          <div className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white glow-gold shadow-2xl">
            <img
              src={images.hero.main}
              alt="Aai and Baba"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 text-3xl animate-heart-beat">❤️</div>
        </div>

        <button
          onClick={scrollToTimeline}
          className="group px-8 py-4 bg-gradient-to-r from-gold to-bronze text-white font-cormorant text-lg sm:text-xl rounded-full glow-gold hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in-up"
          style={{ animationDelay: '1s' }}
        >
          Begin Our Journey ❤️
          <span className="inline-block ml-2 group-hover:translate-y-1 transition-transform">↓</span>
        </button>
      </div>
    </section>
  );
}
