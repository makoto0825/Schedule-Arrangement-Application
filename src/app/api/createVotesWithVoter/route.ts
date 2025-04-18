import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { VoteData } from "@/app/common/type";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Database connection error");
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  const { voterName, availabilities } = data as VoteData;

  try {
    await main();
    //insert voter data into the database
    const voterPost = await prisma.voter.create({
      data: {
        name: voterName,
      },
    });

    //insert votes data into the database
    const voterId = voterPost.id;

    const votes = availabilities.map(({ availability, time_slot_id }) => ({
      availability,
      time_slot_id,
      voter_id: voterId,
    }));

    await prisma.vote.createMany({
      data: votes,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ message: "error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
