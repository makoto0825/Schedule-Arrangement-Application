export type Event = {
  id: number;
  name: string;
  description: string;
  time_slots: TimeSlot[];
  // dateOptions: Date[];
  // respondents: number;
};

export type EventWithDetails = Event & {
  time_slots: TimeSlotWithVotes[];
};

export type TimeSlot = {
  id: number;
  event_id: number;
  event_date: Date;
  time: string;
  created_at: Date;
  updated_at: Date;
};

// Type for Frontend
export type Vote = {
  id: number;
  status: string;
  voter_id: number;
  voter_name: string;
  created_at: Date;
  updated_at: Date;
};

export type TimeSlotWithVotes = TimeSlot & {
  votes: Vote[];
};
