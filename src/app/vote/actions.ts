import {
  CreateVotesData,
  EventWithDetails,
  TimeSlotWithVotes,
  UpdateVotesData,
  VoterWithVotes,
} from '../common/type';

export const getEventData = async (eventId: string) => {
  try {
    const res = await fetch(
      `/api/getDetailEvent?eventId=${eventId}&withVotes=true`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = (await res.json()) as EventWithDetails;
    const availabilitiesByVoters = generateVotersWithVotes(data.time_slots);
    return {
      ...data,
      voters: availabilitiesByVoters,
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
};

export const generateVotersWithVotes = (
  timeSlotsWithVotes: TimeSlotWithVotes[]
): VoterWithVotes[] => {
  const groupedVotes: VoterWithVotes[] = [];
  timeSlotsWithVotes.forEach((slot) => {
    slot.votes.forEach((vote) => {
      const existingVoter = groupedVotes.find(
        (voter) => voter.id === vote.voter_id
      );

      if (existingVoter) {
        existingVoter.votes.push(vote);
      } else {
        groupedVotes.push({
          id: vote.voter_id,
          name: vote.voter_name,
          votes: [vote],
        });
      }
    });
  });

  // Sort voters by id
  const sortedGroupedVotes = [...groupedVotes].sort((a, b) => a.id - b.id);
  return sortedGroupedVotes;
};

export const createVotesOnDB = async (voter: CreateVotesData) => {
  const res = await fetch(`/api/createVotesWithVoter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(voter),
  });

  if (!res.ok) {
    throw new Error('Failed to create data');
  }
};

export const updateVotesOnDB = async (voter: UpdateVotesData) => {
  const res = await fetch(`/api/updateVotesWithVoter`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(voter),
  });

  if (!res.ok) {
    throw new Error('Failed to update data');
  }
};

export const deleteVoterWithVotesOnDB = async (voterId: number) => {
  const res = await fetch(`/api/deleteVoterWithVotes?voterId=${voterId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete data');
  }
};
