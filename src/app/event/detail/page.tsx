import React from 'react';
import { CiEdit } from 'react-icons/ci';

//津賀担当予定
const page = () => {
  //ハードコーディング用のデータ
  const optionsList = [
    ['January 20th, 2025', '7:00PM ~'],
    ['January 20th, 2025', 'All Day'],
    [
      'January 20th, 2025',
      'This is an example for a long comment. The long texts are wrapped.This is an example for a long comment. The long texts are wrapped',
    ],
    ['January 20th, 2025', 'Day'],
  ];
  return (
    <div className='m-4 sm:m-20'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold p-2'>Title of Event</h1>
        <div className='cursor-pointer'>
          <CiEdit size={40} />
        </div>
      </div>
      <p className='sm:w-3/4 p-2 mb-4 sm:mb-16'>
        We’re organising a team lunch, and we’d love to find a time that works
        for everyone! To make scheduling easy, please select a date that you’re
        available, and optionally add a preferred time or any comments
      </p>
      <div className='bg-white sm:w-2/3 border rounded sm:p-10 h-[400px] overflow-y-auto overflow-x-hidden'>
        <div className='p-2 flex justify-end'>
          <div className='cursor-pointer'>
            <CiEdit size={40} />
          </div>
        </div>
        {optionsList.map((text, index) => (
          <div
            key={index}
            className='flex border-b flex-wrap border-gray-200 p-4 group'
          >
            <div className='w-2/5'>{text[0]}</div>
            <div className='flex-1 break-words'>{text[1]}</div>
          </div>
        ))}
      </div>
      <div className='text-center sm:text-left'>
        <button className='text-2xl sm:w-1/4 mt-10 p-4 bg-blue-600 text-white rounded'>
          Share the link
        </button>
      </div>
    </div>
  );
};

export default page;
