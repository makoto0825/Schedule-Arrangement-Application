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

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const voterId = searchParams.get('voterId');
  if (!voterId) {
    return NextResponse.json(
      { message: 'Voter ID is required' },
      { status: 400 }
    );
  }

  try {
    await main();
    //delete votes by the voter from the database
    await prisma.vote.deleteMany({
      where: {
        voter_id: Number(voterId),
      },
    });

    //delete voter from the database
    await prisma.voter.delete({
      where: { id: Number(voterId) },
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
