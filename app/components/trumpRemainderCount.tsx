"use client";
import React, { useEffect, useState } from "react";

const TrumpRemainderCount: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2029-01-20T00:00:00-05:00"); // January 20, 2029, 12:00 AM EST

    const updateCountdown = () => {
      const now = new Date();

      let years = targetDate.getFullYear() - now.getFullYear();
      let months = targetDate.getMonth() - now.getMonth();
      let days = targetDate.getDate() - now.getDate();
      let hours = targetDate.getHours() - now.getHours();
      let minutes = targetDate.getMinutes() - now.getMinutes();
      let seconds = targetDate.getSeconds() - now.getSeconds();

      // Adjust for negative values
      if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
      }
      if (minutes < 0) {
        minutes += 60;
        hours -= 1;
      }
      if (hours < 0) {
        hours += 24;
        days -= 1;
      }
      if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months -= 1;
      }
      if (months < 0) {
        months += 12;
        years -= 1;
      }

      if (years < 0) {
        setTimeLeft({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      } else {
        setTimeLeft({ years, months, days, hours, minutes, seconds });
      }
    };

    updateCountdown(); // Ensure the countdown is updated immediately on mount
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="card mx-4 sm:mx-0 bg-base-100 shadow-sm transition-all duration-300 break-inside-avoid">
      <div className="card-body">
        <div className="items-center justify-between space-x-4 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1">
          <h3 className="mb-2 sm:mb-auto text-center sm:text-left card-title text-2xl block">
            Trump&#39;s Remaining Time in Office
          </h3>
          <div className="sm:flex grid sm:grid-none sm:grid-rows-none grid-cols-6 gap-0 sm:gap-5 mb-2 sm:mb-auto text-center sm:text-right">
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.years } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.years} years`}
                >
                  {timeLeft.years}
                </span>
              </span>
              years
            </div>
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.months } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.months} months`}
                >
                  {timeLeft.months}
                </span>
              </span>
              months
            </div>
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.days } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.days} days`}
                >
                  {timeLeft.days}
                </span>
              </span>
              days
            </div>
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.hours } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.hours} hours`}
                >
                  {timeLeft.hours}
                </span>
              </span>
              hours
            </div>
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.minutes } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.minutes} minutes`}
                >
                  {timeLeft.minutes}
                </span>
              </span>
              min
            </div>
            <div>
              <span className="countdown font-mono text-2xl">
                <span
                  style={{ "--value": timeLeft.seconds } as React.CSSProperties}
                  aria-live="polite"
                  aria-label={`${timeLeft.seconds} seconds`}
                >
                  {timeLeft.seconds}
                </span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrumpRemainderCount;
