'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

import { CiEdit } from 'react-icons/ci';
import { format } from 'date-fns';

type TimeSlot = {
  event_date: Date;
  time: string;
};

const formatDate = (date: Date) => {
  return format(date, 'MMMM d, yyyy');
};

const Page = () => {
  const [eventData, setEventData] = useState({
    id: null,
    user_id: '',
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
    timeSlots: [],
  });
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

  return (
    <div className='m-4 sm:m-20'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold p-2'>{eventData.name}</h1>
        <div
          className='cursor-pointer'
          onClick={() => {
            window.location.href = `/event/edit?eventId=${eventData.id}`;
          }}
        >
          <CiEdit size={40} />
        </div>
      </div>
      <p className='sm:w-3/4 p-2 mb-4 sm:mb-16'>{eventData.description}</p>
      <div className='bg-white sm:w-2/3 border rounded sm:p-10 h-[400px] overflow-y-auto overflow-x-hidden'>
        <div className='p-2 flex justify-end'>
          <div
            className='cursor-pointer'
            onClick={() => {
              window.location.href = `/event/edit?eventId=${eventData.id}`;
            }}
          >
            <CiEdit size={40} />
          </div>
        </div>
        {eventData.timeSlots.map((timeSlot: TimeSlot, index) => (
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
      <div className='sm:w-1/3 text-center sm:text-left flex justify-between'>
        <button
          onClick={handleCopyLink}
          className='text-2xl sm:w-2/4  mt-10 p-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
        >
          {copySuccess ? 'Link copied!' : 'Share the link'}
        </button>
        <button
          className='text-2xl sm:w-2/5  mt-10 p-4 bg-green-400 text-white rounded hover:bg-green-700 transition-colors'
          onClick={() => {
            window.location.href = `/vote?eventId=${eventId}`;
          }}
        >
          Vote
        </button>
      </div>
    </div>
  );
};

export default Page;
