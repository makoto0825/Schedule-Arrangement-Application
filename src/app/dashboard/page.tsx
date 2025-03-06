import React from 'react';
import Card from './components/Card';
import { Event } from '../common/type';

const today = new Date();

//ハードコーディング用のデータ
const events: Event[] = [
  {
    id: 1,
    title: 'Event 1',
    dateOptions: [
      new Date('2025-01-08T17:00:00'),
      new Date('2025-01-09T17:00:00'),
    ],
    respondents: 5,
  },
  {
    id: 2,
    title: 'Event 2',
    dateOptions: [
      new Date('2025-04-08T17:00:00'),
      new Date('2025-05-09T17:00:00'),
    ],
    respondents: 1,
  },
  {
    id: 3,
    title: 'Event 3',
    dateOptions: [
      new Date('2025-04-08T17:00:00'),
      new Date('2025-05-09T17:00:00'),
    ],
    respondents: 4,
  },
  {
    id: 4,
    title: 'Event 4',
    dateOptions: [
      new Date('2023-01-08T17:00:00'),
      new Date('2023-01-09T17:00:00'),
    ],
    respondents: 1,
  },
  {
    id: 5,
    title: 'Event 5',
    dateOptions: [
      new Date('2023-01-08T17:00:00'),
      new Date('2023-01-09T17:00:00'),
    ],
    respondents: 4,
  },
  {
    id: 6,
    title: 'Event 6',
    dateOptions: [
      new Date('2023-01-08T17:00:00'),
      new Date('2023-01-09T17:00:00'),
    ],
    respondents: 4,
  },
  {
    id: 7,
    title: 'Event 7',
    dateOptions: [
      new Date('2023-01-08T17:00:00'),
      new Date('2023-01-09T17:00:00'),
    ],
    respondents: 4,
  },
  {
    id: 8,
    title: 'Event 8',
    dateOptions: [
      new Date('2023-01-08T17:00:00'),
      new Date('2023-01-09T17:00:00'),
    ],
    respondents: 4,
  },
];

const Page = () => {
  const upcomingEvents = events.filter((e) =>
    e.dateOptions.some((d) => d >= today)
  );
  const pastEvents = events.filter((e) =>
    e.dateOptions.every((d) => d < today)
  );

  return (
    <div className='bg-gray-100 h-full '>
      <div className=' px-[5%] py-6  '>
        {/* Upcoming Events */}
        <div className='mb-20  mx-auto '>
          <h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {upcomingEvents.map((event) => (
              <Card key={event.id} event={event} color={'upcoming'}></Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className='mb-8 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Past Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pastEvents.map((event) => (
              <Card key={event.id} event={event} color={'past'}></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
