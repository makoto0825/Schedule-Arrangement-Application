import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { parse } from 'date-fns';

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw new Error('Database connection error');
  }
}

export const PUT = async (request: Request) => {
  const eventData = await request.json();
  console.log('eventData', eventData);
  const { id, eventName, eventDescription, timeSlots, deletedTimeSlots } =
    eventData;

  try {
    await main();
    //insert event data into the database
    const eventPut = await prisma.event.update({
      where: { id: Number(id) },
      data: {
        name: eventName,
        description: eventDescription,
      },
    });
    //insert time slots into the database
    const eventId = eventPut.id;

    const timeSlotData = timeSlots.map((slot: string[]) => {
      let date;
      try {
        // まず "April 16th, 2025" 形式を試す
        date = parse(slot[0], 'MMMM do, yyyy', new Date());

        // 日付が無効な場合、別の形式を試す
        if (isNaN(date.getTime())) {
          // ISO形式を試す
          date = new Date(slot[0]);

          // それでも無効な場合、エラーを投げる
          if (isNaN(date.getTime())) {
            throw new Error(`Invalid date format: ${slot[0]}`);
          }
        }
      } catch (error) {
        console.error('Date parsing error:', error);
        throw error;
      }

      return {
        event_id: eventId,
        event_date: date,
        time: slot[1],
      };
    });

    await prisma.timeSlot.createMany({
      data: timeSlotData,
    });

    //削除された時間スロットを削除
    await prisma.timeSlot.deleteMany({
      where: {
        id: { in: deletedTimeSlots.map((slot: string[]) => slot[2]) },
      },
    });

    return NextResponse.json({ message: 'success', eventId }, { status: 200 });
  } catch (error) {
    // console.error('Error creating event:', error);
    if (error instanceof Error) {
      console.log('Error: ', error.stack);
    }
    return NextResponse.json({ message: 'error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
