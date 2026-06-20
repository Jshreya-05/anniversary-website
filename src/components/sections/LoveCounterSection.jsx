import SectionWrapper, { SectionTitle } from '../layout/SectionWrapper';
import { useLiveCounter } from '../../hooks/useLiveCounter';

function CounterUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass glow-gold rounded-xl w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center mb-2">
        <span className="font-playfair text-2xl sm:text-3xl font-bold text-bronze">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="font-inter text-xs sm:text-sm text-bronze/60 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function LoveCounterSection() {
  const time = useLiveCounter();

  return (
    <SectionWrapper id="love-counter">
      <SectionTitle
        emoji="⏳"
        title="Live Love Counter"
        subtitle="Every second of love since 21 June 2002"
      />

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
        <CounterUnit value={time.years} label="Years" />
        <CounterUnit value={time.months} label="Months" />
        <CounterUnit value={time.days} label="Days" />
        <CounterUnit value={time.hours} label="Hours" />
        <CounterUnit value={time.minutes} label="Minutes" />
        <CounterUnit value={time.seconds} label="Seconds" />
      </div>

      <p className="text-center mt-8 font-cormorant text-bronze/60 italic text-lg">
        {time.totalDays.toLocaleString()} days of love and counting...
      </p>
    </SectionWrapper>
  );
}
