import React, { CSSProperties, useEffect, useState } from 'react';

type TimeRemaining = {
  total: number,
  days: number,
  hours: number,
  minutes: number,
  seconds: number
}

const CountdownTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const eventDate = new Date("July 9, 2023 16:00:00");

  useEffect(() => {
    const timerId = setInterval(() => {
      const t = calculateTimeRemaining(eventDate);

      if (t.total <= 0) {
        clearInterval(timerId);
      }

      setTimeRemaining(t);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  const calculateTimeRemaining = (endtime: Date): TimeRemaining => {
    const total = Date.parse(endtime.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  };

  return (
    <span className="countdown font-mono text-2xl">
    <span style={{ "--value": timeRemaining.days } as CSSProperties}></span>:
    <span style={{ "--value": timeRemaining.hours } as CSSProperties}></span>:
    <span style={{ "--value": timeRemaining.minutes } as CSSProperties}></span>:
    <span style={{ "--value": timeRemaining.seconds } as CSSProperties}></span>
  </span>
  );
};

export default CountdownTimer;
