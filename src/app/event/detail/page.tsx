'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { HiOutlinePencil } from 'react-icons/hi';
import { format } from 'date-fns';
import { Event } from '../../common/type';

const formatDate = (date: Date) => {
  return format(date, 'MMMM d, yyyy');
};

const Page = () => {
  const [eventData, setEventData] = useState<Event|null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [copySuccess, setCopySuccess] = useState(false);

  const getEventData = async (eventId: string) => {
    const res = await fetch(`/api/getDetailEvent?eventId=${eventId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    setEventData(data);
  };

  useEffect(() => {
    if (!eventId) return;
    getEventData(eventId);
  }, []);

  const handleCopyLink = async () => {
    if (!eventId) return;

    const voteLink = `${window.location.origin}/vote?eventId=${eventId}`;
    try {
      await navigator.clipboard.writeText(voteLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (!eventData) {
    return <div className='flex justify-center items-center h-screen'>Loading...</div>;
  }

  return (
    <div className=''>
      <div className='flex items-center gap-3'>
        <h1 className='title'>{eventData.name}</h1>
        <div
          className='cursor-pointer'
          onClick={() => {
            window.location.href = `/event/edit?eventId=${eventData.id}`;
          }}
        >
          <HiOutlinePencil size={24} />
        </div>
      </div>
      <p className='sm:w-3/4 p-2 mb-4 sm:mb-8'>{eventData.description}</p>
      <div className='bg-white sm:w-2/3 border rounded sm:p-10 h-[400px] overflow-y-auto overflow-x-hidden'>
        <div className='p-2 flex justify-end'>
          <div
            className='cursor-pointer'
            onClick={() => {
              window.location.href = `/event/edit?eventId=${eventData.id}`;
            }}
          >
            <HiOutlinePencil size={24} />
          </div>
        </div>
        {eventData.time_slots.map((timeSlot, index) => (
          <div
            key={index}
            className='flex border-b flex-wrap border-gray-200 p-4 group'
          >
            <div className='w-2/5'>
              {formatDate(new Date(timeSlot.event_date))}
            </div>
            <div className='flex-1 break-words'>{timeSlot.time}</div>
          </div>
        ))}
      </div>
      <button
        onClick={handleCopyLink}
        className='button button-primary mt-8'
      >
        {copySuccess ? 'Link copied!' : 'Share the link'}
      </button>
    </div>
  );
};

export default Page;
