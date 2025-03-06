'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className='w-3/4 mx-auto p-6'>
      <h2 className='text-2xl font-semibold'>Create Your Next Event</h2>
      <div className='mt-4  w-1/2'>
        <label className='block text-gray-700'>Event name</label>
        <input type='text' className='w-full mt-1 p-2 border rounded' />
      </div>
      <div className='mt-4 w-3/4'>
        <label className='block text-gray-700'>
          Event description (optional)
        </label>
        <textarea className='w-full h-[100px]  mt-1 p-2 border rounded'>
          We're organising a team lunch, and we'd love to find a time that works
          for everyone! To make scheduling easy, please select a date that
          you're available, and optionally add a preferred time or any comments.
        </textarea>
      </div>
      <div className='mt-4'>
        <label className='block text-gray-700'>Select Date and Time</label>
        <div className='w-2/5'>
          <div className='w-full'>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat='MMMM d, yyyy'
              inline
            />
          </div>
          <h2 className='font-semibold mt-2'>
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })
              : 'No date selected'}
          </h2>
          <input type='text' className='w-full mt-1 p-2 border rounded' />
        </div>
      </div>
      <div className='mt-4 flex justify-between'>
        <button className='px-4 py-2 bg-blue-600 text-white rounded'>
          Create Event
        </button>
        <button className='px-4 py-2 text-gray-700 border rounded'>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Page;
