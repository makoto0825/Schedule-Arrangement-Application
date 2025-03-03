import React from 'react';
import Card from './components/Card';
import { Event } from './types';

//ハードコーディング用のデータ
const events: Event[] = [
  {
    id: 1,
    title: '🍣 Sunday Dinner',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 5,
    upcoming: true,
  },
  {
    id: 2,
    title: '🏒 Hockey at West Mall',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 1,
    upcoming: true,
  },
  {
    id: 3,
    title: '🚀 Long Name will be text-overflowed',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 4,
    upcoming: true,
  },
  {
    id: 4,
    title: '🏒 Hockey at West Mall',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 1,
    upcoming: false,
  },
  {
    id: 5,
    title: '🍗 Sunday Dinner',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 4,
    upcoming: false,
  },
  {
    id: 6,
    title: '🍗 Sunday Dinner',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 4,
    upcoming: false,
  },
  {
    id: 7,
    title: '🍗 Sunday Dinner',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 4,
    upcoming: false,
  },
  {
    id: 8,
    title: '🍗 Sunday Dinner',
    date: 'Sun, Jan 8 | 5:00PM',
    respondents: 4,
    upcoming: false,
  },
];

const Page = () => {
  const upcomingEvents = events.filter((event) => event.upcoming);
  const pastEvents = events.filter((event) => !event.upcoming);

  return (
    <div className='bg-gray-100 h-full '>
      <div className=' px-[5%] py-6  '>
        {/* Upcoming Events */}
        <div className='mb-20  mx-auto '>
          <h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {upcomingEvents.map((event) => (
              <Card key={event.id} highlight={true}>
                <h3 className='font-semibold text-lg truncate'>
                  {event.title}
                </h3>
                <p className='text-sm text-gray-500'>{event.date}</p>
                <p className='text-sm text-gray-400'>
                  {event.respondents} respondents
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className='mb-8 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Past Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {pastEvents.map((event) => (
              <Card key={event.id} highlight={false}>
                <h3 className='font-semibold text-lg truncate'>
                  {event.title}
                </h3>
                <p className='text-sm text-gray-500'>{event.date}</p>
                <p className='text-sm text-gray-400'>
                  {event.respondents} respondents
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
