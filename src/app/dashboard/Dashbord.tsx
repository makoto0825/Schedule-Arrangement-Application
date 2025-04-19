'use client';
import React, { useEffect, useState } from 'react';
import Card from './components/Card';
import { Event } from '../common/type';

const Dashboard = ({ userId }: { userId: string }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const getEvents = async () => {
    //仮としてユーザーID:acb8a683-f951-469c-9c17-68fa2cfe9a91を渡す
    const res = await fetch(`/api/getEvents?userId=${userId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    const data = await res.json();
    setEvents(data);
    console.log(data);
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className='h-full'>
        {/* Upcoming Events */}
        <div className='mb-20  mx-auto '>
          <h2 className='text-xl font-semibold mb-4'>Upcoming Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {events
              .filter((event) => {
                const isUpcoming = event.time_slots.some((timeSlot) => {
                  const slotDate = new Date(timeSlot.event_date);
                  const now = new Date();
                  return slotDate >= now;
                });
                return isUpcoming;
              })
              .map((event) => (
                <Card key={event.id} event={event} color={'upcoming'}></Card>
              ))}
          </div>
        </div>

        {/* Past Events */}
        <div className='mb-8 mx-auto'>
          <h2 className='text-xl font-semibold mb-4'>Past Events</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {events
              .filter((event) =>
                event.time_slots.every(
                  (timeSlot) =>
                    new Date(timeSlot.event_date).getTime() < Date.now()
                )
              )
              .map((event) => (
                <Card key={event.id} event={event} color='past' />
              ))}
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
