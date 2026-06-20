import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { timelineData } from '../../data/timeline';

function TimelineItem({ item, index }) {
  const ref = useScrollAnimation();
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`reveal relative flex items-center mb-12 sm:mb-16 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col gap-6 md:gap-10`}
    >
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'} text-center`}>
        <div className="inline-block glass rounded-2xl p-4 sm:p-6 glow-rose">
          <span className="text-3xl block mb-2">{item.emoji}</span>
          <h3 className="font-playfair text-2xl sm:text-3xl font-semibold text-bronze">{item.year}</h3>
          <h4 className="font-cormorant text-xl text-bronze/80 mb-3">{item.title}</h4>
          <p className="font-inter text-sm sm:text-base text-bronze/70 leading-relaxed">{item.description}</p>
        </div>
      </div>

      <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-gold border-4 border-white glow-gold z-10 hidden md:block" />
      <div className="absolute left-5 w-4 h-4 rounded-full bg-gold border-4 border-white glow-gold z-10 md:hidden" />

      <div className="w-full md:w-5/12">
        <div className="relative rounded-2xl overflow-hidden glow-rose group">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bronze/20 to-transparent" />
        </div>
      </div>
    </div>
  );
}

export default function TimelineSection() {
  return (
    <SectionWrapper id="timeline">
      <SectionTitle emoji="📜" title="Their Love Story" subtitle="Every milestone, a chapter of love" />

      <div className="relative timeline-line">
        {timelineData.map((item, index) => (
          <TimelineItem key={item.year} item={item} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
