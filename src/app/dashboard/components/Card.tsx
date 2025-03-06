import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CardProps } from '../types';

const Card = ({ event, color }: CardProps) => {
  return (
    <Transition
      as={Fragment}
      appear
      show
      enter='transition ease-out duration-300'
      enterFrom='opacity-0 scale-95'
      enterTo='opacity-100 scale-100'
    >
      <div
        className={`rounded-2xl border p-4 shadow-lg bg-white text-gray-700 border-t-8 cursor-pointer  ${
          color === 'upcoming' ? ' border-blue-500  ' : ' border-gray-300'
        }`}
      >
        <h3 className='font-semibold text-lg truncate'>{event.title}</h3>
        <p className='text-sm text-gray-500'>
          {event.dateOptions[0].toLocaleString()}
        </p>
        <p className='text-sm text-gray-400'>{event.respondents} respondents</p>
      </div>
    </Transition>
  );
};

export default Card;
