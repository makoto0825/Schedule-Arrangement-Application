import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection error');
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  //   const eventId = searchParams.get('eventId');
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json(
      { message: 'User ID is required' },
      { status: 400 }
    );
  }

  try {
    await main();
    // Fetch event data from the database

    // Fetch time slots associated with the event
    const events = await prisma.event.findMany({
      where: { user_id: userId },
    });
    if (!events) {
      return NextResponse.json(
        { message: 'Events not found' },
        { status: 404 }
      );
    }
    //eventsにtime_slotsを追加
    const eventsWithTimeSlots = await Promise.all(
      events.map(async (event) => {
        const timeSlots = await prisma.timeSlot.findMany({
          where: { event_id: event.id },
        });
        return { ...event, time_slots: timeSlots };
      })
    );

    return NextResponse.json(eventsWithTimeSlots, { status: 200 });
  } catch (error) {
    console.error('Error fetching event data:', error);
    return NextResponse.json(
      { message: 'Error fetching event data' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
