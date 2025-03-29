import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Received body:', body);

  try {
    return NextResponse.json({ message: 'success2' }, { status: 200 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ message: 'error' }, { status: 500 });
  }
}
