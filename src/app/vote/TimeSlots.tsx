'use client';
import { formatDate } from 'date-fns';
import { HiCheck, HiOutlinePlusSm, HiOutlineX } from 'react-icons/hi';
import {
  Availability,
  TimeSlotAvailability,
  TimeSlotWithVotes,
  VoterWithAvailabilities,
} from '../common/type';
import { useState } from 'react';
import { AvailabilityOptions } from './AvailabilityOptions';

type Props = {
  slots: TimeSlotWithVotes[];
  voters: VoterWithAvailabilities[];
  onVoteChange: () => void;
};

type Mode = 'view' | 'add';
type Vote = {
  voterId: number | undefined; // undefined if adding
  voter_name: string;
  availabilities: TimeSlotAvailability[];
};

export const TimeSlots = ({ slots, voters, onVoteChange }: Props) => {
  const [mode, setMode] = useState<Mode>('view');
  const [vote, setVote] = useState<Vote | null>(null);

  const startAdding = () => {
    setMode('add');
    setVote({
      voterId: undefined,
      voter_name: '',
      availabilities: slots.map((slot) => ({
        time_slot_id: slot.id,
        availability: 'unknown',
      })),
    });
  };

  const resetEditingState = () => {
    setMode('view');
    setVote(null);
  };

  const submitVote = async () => {
    if (!vote) return;

    if (!vote.voter_name) {
      alert('Please enter your name');
      return;
    }

    if (!vote.voterId) {
      const response = await fetch('/api/createVotesWithVoter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vote),
      });

      if (response.ok) {
        resetEditingState();
      } else {
        console.error('Failed to submit vote');
      }
    }

    onVoteChange();
  };

  const onChangeAvailability = (slotId: number, availability: Availability) => {
    if (!vote) return;
    const newVote = { ...vote };
    const index = newVote.availabilities.findIndex(
      (availability) => availability.time_slot_id === slotId
    );

    if (index !== -1) {
      newVote.availabilities[index] = {
        ...newVote.availabilities[index],
        availability,
      };

      setVote(newVote);
    }
  };

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                  <th
                    scope="col"
                    className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  ></th>
                  {slots.map((slot) => (
                    <th
                      key={slot.id}
                      scope="col"
                      className="sticky top-0 z-10 px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                    >
                      {formatDate(new Date(slot.event_date), 'MMM dd')}{' '}
                      {slot.time}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="sticky top-0 z-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="divide-x divide-gray-200">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                    Total
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-500 sm:pl-6">
                    <div className="flex items-center justify-center gap-x-4">
                      <div className="flex items-center justify-center">
                        <HiCheck size={16} />: 0
                      </div>
                      <div className="flex items-center justify-center">
                        ?: 0
                      </div>
                      <div className="flex items-center justify-center">
                        <HiOutlineX size={16} />: 0
                      </div>
                    </div>
                  </td>
                  <td></td>
                </tr>
                {voters.map((voter) => (
                  <tr key={voter.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                      {voter.name}
                    </td>
                    {slots.map((slot) => {
                      const availability = voter.availabilities.find(
                        (a) => a.time_slot_id === slot.id
                      )?.availability;
                      return (
                        <td
                          key={slot.id}
                          className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                        >
                          <div className="flex items-center justify-center">
                            {availability === 'available' ? (
                              <HiCheck size={16} />
                            ) : availability === 'unknown' ? (
                              '?'
                            ) : (
                              <HiOutlineX size={16} />
                            )}
                          </div>
                        </td>
                      );
                    })}
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm font-semibold sm:pr-6">
                      <button
                        type="button"
                        className="text-primary hover:text-blue-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {mode === 'view' && (
                  <tr className="divide-x divide-gray-200">
                    <td
                      colSpan={slots.length + 2}
                      className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500"
                    >
                      <button
                        type="button"
                        className="button-primary button-with-icon m-auto"
                        onClick={startAdding}
                      >
                        <HiOutlinePlusSm className="text-white" />
                        Add My Availability
                      </button>
                    </td>
                  </tr>
                )}
                {mode === 'add' && vote && (
                  <tr className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="text"
                        className="input-text w-auto m-auto"
                        placeholder="Your Name"
                        value={vote.voter_name}
                        onChange={(e) => {
                          setVote({
                            ...vote,
                            voter_name: e.target.value,
                          });
                        }}
                      />
                    </td>
                    {slots.map((slot) => (
                      <td
                        key={slot.id}
                        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                      >
                        <AvailabilityOptions
                          selectedOption={
                            vote.availabilities.find(
                              (v) => v.time_slot_id === slot.id
                            )!.availability
                          }
                          onChange={(value) =>
                            onChangeAvailability(slot.id, value)
                          }
                        />
                      </td>
                    ))}
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center gap-x-10 justify-center">
                        <button
                          type="button"
                          className="button-secondary button"
                          onClick={resetEditingState}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="button-primary button"
                          onClick={submitVote}
                        >
                          Submit
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
