'use client';

import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns'; // date-fns を使う場合

type TimeSlot = {
  id: number;
  event_id: number;
  event_date: string;
  time: string;
  created_at: string;
  updated_at: string;
};

const Page = () => {
  //Event info
  const [eventName, setEventName] = useState<string>('');
  const [eventDescription, setEventDescription] = useState<string>('');
  //time slot info
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [option, setOption] = useState<string>('');
  const [optionsList, setOptionsList] = useState<string[][]>([]);
  const [originalOptionsList, setOriginalOptionsList] = useState<string[][]>(
    []
  );

  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const getEventData = async (eventId: string) => {
    const res = await fetch(`/api/getDetailEvent?eventId=${eventId}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    //setEvent
    setEventName(data.name);
    setEventDescription(data.description);
    const formattedList = data.time_slots.map((slot: TimeSlot) => {
      const date = format(new Date(slot.event_date), 'MMMM do, yyyy'); // 例: "March 30th, 2025"
      return [date, slot.time, slot.id];
    });
    setOptionsList(formattedList);
    setOriginalOptionsList(formattedList);
  };

  useEffect(() => {
    if (!eventId) return;
    getEventData(eventId);
  }, []);

  const addOptionClick = () => {
    //validate time slot
    if (option === '') {
      alert('Please enter a time slot');
      return;
    }
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
          '',
        ],
      ]);
      setOption('');
    } else {
      alert('Please select a date');
    }
  };

  const onClickUpdateEvent = async () => {
    //validate event name and time slots
    if (eventName === '') {
      alert('Please enter an event name');
      return;
    }
    if (optionsList.length === 0) {
      alert('Please add at least one time slot');
      return;
    }

    //オリジナルの時間スロットから、optionsListに含まれていないものを削除
    const deletedTimeSlots = originalOptionsList.filter(
      (slot) => !optionsList.includes(slot)
    );
    //optionsListから[2]が""のものだけ抽出
    const newTimeSlots = optionsList.filter((slot) => slot[2] == '');

    const eventData = {
      id: eventId,
      eventName: eventName,
      eventDescription: eventDescription,
      timeSlots: newTimeSlots,
      deletedTimeSlots: deletedTimeSlots,
    };
    //Send eventData to the server
    try {
      const response = await fetch('/api/updateEvent', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        alert('Failed to update event. Please try again.');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      const eventId = data.eventId;
      alert('Event update successfully!');
      window.location.href = `/event/detail?eventId=${eventId}`;

      // return data;
    } catch (error) {
      console.error('Error update event:', error);
      alert('Failed to update event. Please try again.');
    }
  };

  return (
    <div className=''>
      <h2 className='text-xl sm:text-2xl font-semibold py-4'>Edit Event</h2>
      <div className='my-4  sm:w-1/2'>
        <label className='block text-gray-700'>Event name</label>
        <input
          type='text'
          className='w-full mt-1 p-2 border rounded'
          value={eventName}
          onChange={(e) => {
            setEventName(e.target.value);
          }}
          required
        />
      </div>
      <div className='my-4 sm:w-3/4'>
        <label className='block text-gray-700'>
          Event description (optional)
        </label>
        <textarea
          className='w-full h-[100px]  mt-1 p-2 border rounded'
          value={eventDescription}
          onChange={(e) => {
            setEventDescription(e.target.value);
          }}
        ></textarea>
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
              <RiDeleteBin6Line
                className='cursor-pointer  opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                onClick={() => {
                  const newOptionsList = optionsList.filter(
                    (_, i) => i !== index
                  );
                  setOptionsList(newOptionsList);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='sm:w-3/5 mt-12 flex justify-between'>
        <button
          className='w-1/2 px-4 bg-blue-600 text-white rounded'
          onClick={onClickUpdateEvent}
        >
          Update Event
        </button>
        <button
          className='w-1/2 px-4 py-4 text-gray-700 '
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Page;
