'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { HiOutlinePencil } from 'react-icons/hi';
import { EventWithDetails, VoterWithVotes } from '../common/type';
import { TimeSlots } from './TimeSlots';
import { getEventData } from './actions';

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [event, setEvent] = useState<
    (EventWithDetails & { voters: VoterWithVotes[] }) | null
  >(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const fetchData = async () => {
    if (!eventId) return;
    setIsLoaded(false);
    const eventData = await getEventData(eventId);
    setIsLoaded(true);

    if (eventData) {
      setEvent(eventData);
    } else {
      setEvent(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      {event ? (
        <div>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="title">{event.name}</h1>
              <p className="mt-2 text-sm text-foreground-weak">
                {event.description}
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Link
                href={`/event/detail?eventId=${eventId}`}
                className="button-with-icon button-secondary"
              >
                <HiOutlinePencil />
                Organizer View
              </Link>
            </div>
          </div>
          <TimeSlots
            highestAvailableCount={event.highest_available_count}
            slots={event.time_slots}
            voters={event.voters}
            onVoteChange={fetchData}
          />
        </div>
      ) : isLoaded ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Event not found.</p>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Page;
