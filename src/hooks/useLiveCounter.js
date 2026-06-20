import { useState, useEffect } from 'react';
import { ANNIVERSARY_DATE } from '../data/config';

function calculateTimeSince(startDate) {
  const now = new Date();
  const diff = now - startDate;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let daysRemainder = now.getDate() - startDate.getDate();

  if (daysRemainder < 0) {
    months--;
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    daysRemainder += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
    days: daysRemainder,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    totalDays: days,
  };
}

export function useLiveCounter() {
  const [time, setTime] = useState(() => calculateTimeSince(ANNIVERSARY_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeSince(ANNIVERSARY_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
