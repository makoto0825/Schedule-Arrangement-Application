'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HiOutlinePencil } from 'react-icons/hi';
import { EventWithDetails } from '../common/type';
import { TimeSlots } from './TimeSlots';
import Link from 'next/link';

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [event, setEvent] = useState<EventWithDetails | null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const getEventData = async (eventId: string) => {
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
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event data:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const refetchData = async () => {
    if (!eventId) return;
    setIsLoaded(false);
    await getEventData(eventId);
  };

  useEffect(() => {
    console.log('Event ID:', eventId);
    if (!eventId) return;
    getEventData(eventId);
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
          <TimeSlots slots={event.time_slots} onVoteChange={refetchData} />
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
