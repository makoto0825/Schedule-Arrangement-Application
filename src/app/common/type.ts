export type Event = {
  id: number;
  name: string;
  description: string;
  time_slots: TimeSlot[];
  // dateOptions: Date[];
  // respondents: number;
};

export type TimeSlot = {
  id: number;
  event_id: number;
  event_date: Date;
  time: string;
  created_at: Date;
  updated_at: Date;
};
