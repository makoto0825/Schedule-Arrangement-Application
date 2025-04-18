"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Event } from "../common/type";

const Page = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [event, setEvent] = useState<Event | null>(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  const getEventData = async (eventId: string) => {
    try {
      const res = await fetch(`/api/getDetailEvent?eventId=${eventId}`, {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event data:", error);
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    console.log("Event ID:", eventId);
    if (!eventId) return;
    getEventData(eventId);
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {event ? (
        <div>
          <h1 className="title mb-6">{event.name}</h1>
          <p className="mb-8">{event.description}</p>
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
