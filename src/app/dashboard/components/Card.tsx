import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { CardProps } from '../types';
import { useRouter } from 'next/navigation';

const Card = ({ event, color }: CardProps) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        console.log(event);
        // クリックしたら、eventのidを渡して、詳細画面に遷移する
        router.push(`/event/detail?eventId=${event.id}`);
      }}
    >
      <Transition
        as={Fragment}
        appear
        show
        enter='transition ease-out duration-300'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
      >
        <div
          className={`rounded-2xl border p-4 bg-white text-gray-700 border-t-8 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg ${
            color === 'upcoming' ? ' border-blue-500  ' : ' border-gray-300'
          }`}
        >
          <h3 className='font-semibold text-lg truncate'>{event.name}</h3>
          {/* <p className='text-sm text-gray-500'>
          {event.dateOptions[0].toLocaleString()}
        </p>
        <p className='text-sm text-gray-400'>{event.respondents} respondents</p> */}
        </div>
      </Transition>
    </div>
  );
};

export default Card;
