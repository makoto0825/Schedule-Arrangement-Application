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

// Type for Frontend to Show
export type Vote = {
  id: number;
  availability: Availability;
  voter_id: number;
  voter_name: string;
  created_at: Date;
  updated_at: Date;
};

export type Availability = "available" | "unavailable" | "unknown";

export type TimeSlotWithVotes = TimeSlot & {
  votes: Vote[];
};

// Type to send to Backend
export type VoteData = {
  voterName: string;
  availabilities: TimeSlotAvailability[];
};

export type TimeSlotAvailability = {
  time_slot_id: TimeSlot["id"];
  availability: Availability;
};
