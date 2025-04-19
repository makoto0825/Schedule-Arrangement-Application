export type Event = {
  id: number;
  name: string;
  description: string;
  time_slots: TimeSlot[];
  // dateOptions: Date[];
  // respondents: number;
};

export type EventWithDetails = Omit<Event, 'time_slots'> & {
  time_slots: TimeSlotWithVotesAndCounts[];
  highest_available_count: number;
};

export type TimeSlot = {
  id: number;
  event_id: number;
  event_date: Date;
  time: string;
  created_at: Date;
  updated_at: Date;
};

// Type for Frontend to Show
export type Vote = {
  id: number;
  availability: Availability;
  voter_id: number;
  voter_name: string;
  time_slot_id: number;
};

export type Availability = 'available' | 'unavailable' | 'unknown';

export type TimeSlotWithVotes = TimeSlot & {
  votes: Vote[];
};

export type TimeSlotWithVotesAndCounts = TimeSlot & {
  votes: Vote[];
  counts: {
    [key in Availability]: number;
  };
};

export type Voter = {
  id: number;
  name: string;
};

export type VoterWithVotes = Voter & {
  votes: Vote[];
};

// Type to send to Backend
export type CreateVotesData = {
  voter_name: Voter['name'];
  votes: TimeSlotAvailability[];
};

export type UpdateVotesData = {
  voter_id: Voter['id'];
  voter_name: Voter['name'];
  votes: Vote[];
};

export type TimeSlotAvailability = {
  time_slot_id: TimeSlot['id'];
  availability: Availability;
};
