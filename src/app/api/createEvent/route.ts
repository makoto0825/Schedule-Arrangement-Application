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

export async function POST(request: Request) {
  const eventData = await request.json();

  const { userId, eventName, eventDescription, timeSlots } = eventData;

  try {
    await main();
    //insert event data into the database
    const eventPost = await prisma.event.create({
      data: {
        user_id: userId,
        name: eventName,
        description: eventDescription,
      },
    });
    //insert time slots into the database
    const eventId = eventPost.id;

    const timeSlotData = timeSlots.map((timeSlot: [string, string]) => ({
      event_id: eventId,
      event_date: new Date(timeSlot[0]),
      time: timeSlot[1],
    }));

    await prisma.timeSlot.createMany({
      data: timeSlotData,
    });

    return NextResponse.json({ message: 'success', eventId }, { status: 200 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
