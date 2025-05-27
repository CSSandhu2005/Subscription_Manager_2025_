import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

// ✅ POST – Create a new subscription
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, price, category, renewDate, priority } = body;

    // ✅ Validate input
    if (!name || !price || !category || !renewDate || !priority) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('subscriptionManager');
    const collection = db.collection('subscriptions');

    const result = await collection.insertOne({
      name,
      price,
      category,
      renewDate,
      priority,
    });

    return NextResponse.json(
      { success: true, insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/subscriptions error:", error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}

// ✅ GET – Fetch all subscriptions
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('subscriptionManager');
    const collection = db.collection('subscriptions');

    const subscriptions = await collection.find({}).toArray();

    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/subscriptions error:", error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error.message },
      { status: 500 }
    );
  }
}
