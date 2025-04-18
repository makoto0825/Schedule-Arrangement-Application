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
  console.log('GET request received', request.url);
  const { searchParams } = new URL(request.url);
  const eventId = searchParams.get('eventId');
  if (!eventId) {
    return NextResponse.json(
      { message: 'Event ID is required' },
      { status: 400 }
    );
  }

  try {
    await main();
    // Fetch event data from the database
    const eventData = await prisma.event.findUnique({
      where: { id: Number(eventId) },
    });

    if (!eventData) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }
    // Fetch time slots associated with the event
    const timeSlots = await prisma.timeSlot.findMany({
      where: { event_id: Number(eventId) },
    });
    if (!timeSlots) {
      return NextResponse.json(
        { message: 'Time slots not found' },
        { status: 404 }
      );
    }
    // create eventData object with time slots
    const eventDataWithTimeSlots = {
      ...eventData,
      time_slots: timeSlots,
    };

    return NextResponse.json(eventDataWithTimeSlots, { status: 200 });
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
