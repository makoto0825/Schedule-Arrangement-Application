'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Page = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [option, setOption] = useState<string>('');
  const [optionsList, setOptionsList] = useState<string[][]>([]);

  const addOptionClick = () => {
    if (selectedDate) {
      setOptionsList([
        ...optionsList,
        [
          selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          }),
          option,
        ],
      ]);
      setOption('');
    } else {
      alert('Please select a date');
    }
  };

  return (
    <div className='sm:w-3/4 mx-auto p-6 pb-20'>
      <h2 className='text-xl sm:text-2xl font-semibold py-4'>
        Create Your Next Event
      </h2>
      <div className='my-4  sm:w-1/2'>
        <label className='block text-gray-700'>Event name</label>
        <input type='text' className='w-full mt-1 p-2 border rounded' />
      </div>
      <div className='my-4 sm:w-3/4'>
        <label className='block text-gray-700'>
          Event description (optional)
        </label>
        <textarea className='w-full h-[100px]  mt-1 p-2 border rounded'></textarea>
      </div>
      <label className='block text-gray-700'>Date /Time options</label>
      <div className='mt-2 block sm:flex sm:justify-between'>
        <div className='text-center sm:text-left sm:w-2/5'>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat='MMMM d, yyyy'
            inline
          />
          <h2 className='text-sm font-semibold mt-2'>
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })
              : 'No date selected'}
          </h2>
          <div className='flex justify-between pb-2 sm:pb-0 sm:block'>
            <input
              type='text'
              className='sm:w-4/5 mt-1 p-2 border rounded text-sm'
              placeholder='e.g. 7:00 PM'
              value={option}
              onChange={(e) => {
                setOption(e.target.value);
              }}
            />
            <div className='text-right sm:pr-[20%] '>
              <button
                className='mt-2 text-right px-4 py-2 bg-blue-600 text-white rounded'
                onClick={addOptionClick}
              >
                Add option
              </button>
            </div>
          </div>
        </div>
        <div className='bg-white sm:w-2/3 border rounded sm:p-10 h-[400px] overflow-y-auto overflow-x-hidden'>
          {optionsList.map((text, index) => (
            <div
              key={index}
              className='flex border-b flex-wrap border-gray-200 p-4 group'
            >
              <div className='w-2/5'>{text[0]}</div>
              <div className='flex-1 break-words'>{text[1]}</div>
              <RiDeleteBin6Line className='opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>
          ))}
        </div>
      </div>
      <div className='sm:w-3/5 mt-12 flex justify-between'>
        <button className='w-1/2 px-4 bg-blue-600 text-white rounded'>
          Create Event
        </button>
        <button className='w-1/2 px-4 py-4 text-gray-700 '>Cancel</button>
      </div>
    </div>
  );
};

export default Page;
