'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const STEPS = [
  {
    imageSrc: '/images/step1.png',
    caption: 'Step 1',
    title: 'Create an Event',
    description:
      'Create an event and choose time slots for everyone to vote on.',
  },
  {
    imageSrc: '/images/step2.png',
    caption: 'Step 2',
    title: 'Share the Link',
    description:
      'Send the event link to your friends—no app download required!',
  },
  {
    imageSrc: '/images/step3.png',
    caption: 'Step 3',
    title: 'Get Their Votes',
    description:
      'Your friends vote on the best time, no account needed for voting.',
  },
  {
    imageSrc: '/images/step4.png',
    caption: "That's it!",
    title: 'Your Event is Set!',
    description: 'The top choice wins—get ready to meet up!',
  },
];

export const Steps = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === STEPS.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => resetTimeout();
  }, [currentIndex]);

  return (
    <div className="flex-1 relative w-full overflow-hidden flex flex-col">
      <div
        className="flex transition-transform duration-500 ease-in-out flex-1 text-white"
        style={{
          width: `${STEPS.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / STEPS.length)}%)`,
        }}
      >
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="w-full flex-1 flex-shrink-0 flex flex-col items-center justify-center text-xl font-bold text-center"
            style={{ width: `${100 / STEPS.length}%` }}
          >
            <div className="flex-1 w-full flex items-center justify-center">
              <Image
                src={step.imageSrc}
                alt={step.title}
                width={200}
                height={200}
                className="max-w-[200px] lg:max-w-[320px] w-full h-auto object-cover"
              />
            </div>
            <div className="py-6">
              <p className="text-base font-semibold text-whit mt-4">
                {step.caption}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold">{step.title}</h3>
              <p className="text-center text-base font-normal mt-2 leading-tight">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Navigation */}
      <div className="mt-4 flex justify-center space-x-3">
        {STEPS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-fuchsia-300 w-10' : 'bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
