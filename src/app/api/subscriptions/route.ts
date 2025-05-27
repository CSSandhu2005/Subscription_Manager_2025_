import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// GET /api/subscriptions
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('subscriptionManager');
    const collection = db.collection('subscriptions');

    const subscriptions = await collection.find({}).toArray();

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error: unknown) {
    console.error('GET /api/subscriptions error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

// POST /api/subscriptions
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Optional: validate data here

    const client = await clientPromise;
    const db = client.db('subscriptionManager');
    const collection = db.collection('subscriptions');

    const result = await collection.insertOne(data);

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('POST /api/subscriptions error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
