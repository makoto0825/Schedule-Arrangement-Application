'use client';
import { formatDate } from 'date-fns';
import { HiCheck, HiOutlinePlusSm, HiOutlineX } from 'react-icons/hi';
import {
  Availability,
  CreateVotesData,
  TimeSlotWithVotesAndCounts,
  UpdateVotesData,
  Voter,
  VoterWithVotes,
} from '../common/type';
import { useState } from 'react';
import { AvailabilityOptions } from './AvailabilityOptions';
import {
  createVotesOnDB,
  deleteVoterWithVotesOnDB,
  updateVotesOnDB,
} from './actions';
import { AlertDialog } from './AlertDialog';

type Props = {
  slots: TimeSlotWithVotesAndCounts[];
  voters: VoterWithVotes[];
  highestAvailableCount: number;
  onVoteChange: () => void;
};

type Mode = 'view' | 'add' | 'edit';

export const TimeSlots = ({
  slots,
  voters,
  highestAvailableCount,
  onVoteChange,
}: Props) => {
  const [mode, setMode] = useState<Mode>('view');
  const [newVotes, setNewVotes] = useState<CreateVotesData | null>(null);
  const [updatingVotes, setUpdatingVotes] = useState<UpdateVotesData | null>(
    null
  );
  const [deletingVoter, setDeletingVoter] = useState<Voter | null>(null);
  const startAdding = () => {
    setMode('add');
    setNewVotes({
      voter_name: '',
      votes: slots.map((slot) => ({
        time_slot_id: slot.id,
        availability: 'unknown',
      })),
    });
  };

  const endAdding = () => {
    setMode('view');
    setNewVotes(null);
  };

  const startEditing = ({
    id: voter_id,
    name: voter_name,
    votes,
  }: VoterWithVotes) => {
    setMode('edit');
    setUpdatingVotes({
      voter_id,
      voter_name,
      votes: [...votes],
    });
  };

  const endEditing = () => {
    setMode('view');
    setUpdatingVotes(null);
  };

  const submitNewVotes = async () => {
    if (!newVotes) return;
    if (!newVotes.voter_name) {
      alert('Please enter your name');
      return;
    }
    await createVotesOnDB(newVotes);
    endAdding();
    onVoteChange();
  };

  const submitUpdateVotes = async () => {
    if (!updatingVotes) return;
    await updateVotesOnDB(updatingVotes);
    endEditing();
    onVoteChange();
  };

  const submitDeleteVotes = async () => {
    if (!deletingVoter) return;
    await deleteVoterWithVotesOnDB(deletingVoter.id);
    setDeletingVoter(null);
    onVoteChange();
  };

  const updateAvailabilityForNewVotes = (
    slotId: number,
    availability: Availability
  ) => {
    if (!newVotes) return;
    const next = { ...newVotes };
    const index = next.votes.findIndex((v) => v.time_slot_id === slotId);

    if (index !== -1) {
      next.votes[index] = {
        ...next.votes[index],
        availability,
      };

      setNewVotes(next);
    }
  };

  const updateAvailabilityForUpdatingVotes = (
    voteId: number | undefined,
    availability: Availability
  ) => {
    if (!updatingVotes) return;
    const next = { ...updatingVotes };
    const index = next.votes.findIndex((v) => v.id === voteId);
    if (index !== -1) {
      next.votes[index] = {
        ...next.votes[index],
        availability,
      };
      setUpdatingVotes(next);
    }
  };

  return (
    <div>
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
                        {formatDate(new Date(slot.event_date), 'MMM dd')}
                        {' - '}
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
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-500 sm:pl-6">
                      Total
                    </td>
                    {slots.map((slot) => {
                      return (
                        <td
                          key={slot.id}
                          className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-500 sm:pl-6 ${
                            highestAvailableCount === slot.counts.available &&
                            'bg-blue-50 text-blue-500'
                          }`}
                        >
                          <div className="flex items-center justify-center gap-x-4">
                            <div className="flex items-center justify-center">
                              <HiCheck size={16} />: {slot.counts.available}
                            </div>
                            <div className="flex items-center justify-center">
                              ?: {slot.counts.unknown}
                            </div>
                            <div className="flex items-center justify-center">
                              <HiOutlineX size={16} />:{' '}
                              {slot.counts.unavailable}
                            </div>
                          </div>
                        </td>
                      );
                    })}
                    <td></td>
                  </tr>
                  {voters.map((voter) => (
                    <tr key={voter.id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:px-5">
                        {updatingVotes?.voter_id === voter.id &&
                        mode === 'edit' ? (
                          <input
                            type="text"
                            className="input-text"
                            placeholder="Your Name"
                            value={updatingVotes.voter_name}
                            onChange={(e) => {
                              setUpdatingVotes({
                                ...updatingVotes,
                                voter_name: e.target.value,
                              });
                            }}
                          />
                        ) : (
                          voter.name
                        )}
                      </td>
                      {slots.map((slot) => {
                        const vote = voter.votes.find(
                          ({ time_slot_id }) => time_slot_id === slot.id
                        );
                        const availability = vote?.availability || 'unknown';
                        return (
                          <td
                            key={slot.id}
                            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${
                              highestAvailableCount === slot.counts.available &&
                              'bg-blue-50 text-blue-500'
                            }`}
                          >
                            <div className="flex items-center justify-center">
                              {updatingVotes?.voter_id === voter.id &&
                              mode === 'edit' ? (
                                <AvailabilityOptions
                                  selectedOption={
                                    updatingVotes.votes.find(
                                      (v) => v.id === vote?.id
                                    )!.availability
                                  }
                                  onChange={(value) =>
                                    updateAvailabilityForUpdatingVotes(
                                      vote ? vote.id : undefined,
                                      value
                                    )
                                  }
                                />
                              ) : availability === 'available' ? (
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
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-center text-sm sm:pr-6">
                        {updatingVotes?.voter_id === voter.id &&
                        mode === 'edit' ? (
                          <div className="flex items-center gap-x-3 justify-center">
                            <button
                              type="button"
                              className="button-secondary button"
                              onClick={endEditing}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="button-primary button"
                              onClick={submitUpdateVotes}
                            >
                              Submit
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-x-6 justify-center">
                            <button
                              type="button"
                              className="text-primary hover:text-blue-900"
                              onClick={() => startEditing(voter)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="text-red-600 hover:text-red-900"
                              onClick={() => setDeletingVoter(voter)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
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
                  {mode === 'add' && newVotes && (
                    <tr className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 sm:px-6">
                        <input
                          type="text"
                          className="input-text"
                          placeholder="Your Name"
                          value={newVotes.voter_name}
                          onChange={(e) => {
                            setNewVotes({
                              ...newVotes,
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
                              newVotes.votes.find(
                                (v) => v.time_slot_id === slot.id
                              )!.availability
                            }
                            onChange={(value) =>
                              updateAvailabilityForNewVotes(slot.id, value)
                            }
                          />
                        </td>
                      ))}
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-x-3 justify-center">
                          <button
                            type="button"
                            className="button-secondary button"
                            onClick={endAdding}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="button-primary button"
                            onClick={submitNewVotes}
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
      {
        <AlertDialog
          open={!!deletingVoter}
          setOpen={(open) => {
            if (!open) {
              setDeletingVoter(null);
            }
          }}
          title={`Delete Votes by ${deletingVoter?.name}?`}
          description={`Are you sure you want to delete votes by ${deletingVoter?.name}? This action cannot be undone.`}
          confirmText="Delete"
          onConfirm={submitDeleteVotes}
          onCancel={() => setDeletingVoter(null)}
        />
      }
    </div>
  );
};
