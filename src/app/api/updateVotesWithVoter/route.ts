import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Vote, Voter } from '../../common/type';

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
  const data = await request.json();
  const { voter_id, voter_name, votes } = data as {
    voter_id: Voter['id'];
    voter_name: Voter['name'];
    votes: Vote[];
  };

  try {
    await main();
    //update voter data into the database
    await prisma.voter.update({
      where: { id: Number(voter_id) },
      data: {
        name: voter_name,
      },
    });

    //update votes data in the database
    votes.forEach(async (vote) => {
      const { id, availability } = vote;
      await prisma.vote.update({
        where: {
          id: Number(id),
        },
        data: {
          availability,
        },
      });
    });
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error: ', error.stack);
    }
    return NextResponse.json({ message: 'error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
