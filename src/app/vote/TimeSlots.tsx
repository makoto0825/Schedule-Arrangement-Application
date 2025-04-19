'use client';
import { formatDate } from 'date-fns';
import { HiCheck, HiOutlineX } from 'react-icons/hi';
import {
  Availability,
  TimeSlotAvailability,
  TimeSlotWithVotes,
} from '../common/type';
import { useState } from 'react';
import { AvailabilityOptions } from './AvailabilityOptions';

type Props = {
  slots: TimeSlotWithVotes[];
  onVoteChange: () => void;
};

type Mode = 'view' | 'add';
type Vote = {
  voterId: number | undefined; // undefined if adding
  voter_name: string;
  availabilities: TimeSlotAvailability[];
};

export const TimeSlots = ({ slots, onVoteChange }: Props) => {
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
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Schedule
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    <HiCheck className="mx-auto" size={20} />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-lg font-semibold text-gray-900"
                  >
                    ?
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    <HiOutlineX className="mx-auto" size={20} />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 align-middle text-center text-sm font-semibold text-gray-900"
                  >
                    {mode === 'add' && vote ? (
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
                    ) : (
                      <button
                        type="button"
                        className="button-primary button mx-auto"
                        onClick={startAdding}
                      >
                        Set My Availability
                      </button>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {slots.map((slot) => (
                  <tr key={slot.id} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6">
                      {formatDate(new Date(slot.event_date), 'MMMM dd, yyyy')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500">
                      0
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {mode === 'add' && vote && (
                        <AvailabilityOptions
                          selectedOption={
                            vote.availabilities.find(
                              (availability) =>
                                availability.time_slot_id === slot.id
                            )!.availability
                          }
                          onChange={(value) => {
                            onChangeAvailability(
                              slot.id,
                              value as Availability
                            );
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
                {mode === 'add' && vote && (
                  <tr className="divide-x divide-gray-200">
                    <td
                      colSpan={4}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-6"
                    ></td>
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
