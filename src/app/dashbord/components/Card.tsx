import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CardProps } from '../types';

const Card = ({ children, highlight }: CardProps) => {
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
          highlight ? ' border-blue-500  ' : ' border-gray-300'
        }`}
      >
        {children}
      </div>
    </Transition>
  );
};

export default Card;
