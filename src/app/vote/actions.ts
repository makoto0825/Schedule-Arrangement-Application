import {
  CreateVotesData,
  EventWithDetails,
  TimeSlotWithVotes,
  TimeSlotWithVotesAndCounts,
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
    const {
      voters: availabilitiesByVoters,
      time_slots,
      highest_available_count,
    } = generateDataFromTimeSlots(data.time_slots);
    return {
      ...data,
      voters: availabilitiesByVoters,
      time_slots,
      highest_available_count,
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
  }
};

export const generateDataFromTimeSlots = (
  timeSlotsWithVotes: TimeSlotWithVotes[]
): {
  time_slots: TimeSlotWithVotesAndCounts[];
  voters: VoterWithVotes[];
  highest_available_count: number;
} => {
  const groupedVotes: VoterWithVotes[] = [];
  let highestAvailableCount = 0;
  const timeSlotsWithCounts = timeSlotsWithVotes.map((slot) => {
    const counts: TimeSlotWithVotesAndCounts['counts'] = {
      available: 0,
      unavailable: 0,
      unknown: 0,
    };

    slot.votes.forEach((vote) => {
      counts[vote.availability]++;
      if (
        vote.availability === 'available' &&
        highestAvailableCount < counts.available
      ) {
        highestAvailableCount = counts.available;
      }

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

    return {
      ...slot,
      counts,
    };
  });

  // Sort voters by id
  const sortedGroupedVotes = [...groupedVotes].sort((a, b) => a.id - b.id);

  return {
    time_slots: timeSlotsWithCounts,
    voters: sortedGroupedVotes,
    highest_available_count: highestAvailableCount,
  };
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
