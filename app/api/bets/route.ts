// =========================================================
// PAGE/API: Bets Endpoint
// DESCRIPTION: Exposes GET and POST methods for the "bets" collection.
// =========================================================

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("betcha"); // Explicitly naming our DB
    
    // Fetch all bets, newest first
    const bets = await db
      .collection("bets")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bets);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch bets" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Auth guard: only logged-in users can create bets
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Input validation: title must exist and not be blank
    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("betcha");

    // We explicitly structure the object here to ensure 
    // "amount" is never accidentally saved if old code calls this.
    // userId is stored to enable per-user filtering and ownership checks.
    const newBet = {
      title: body.title.trim(),
      creatorName: session.user.name ?? "Anonymous",
      userId: session.user.id, // Ties the bet to the authenticated user
      status: "pending", // All new bets start as pending
      createdAt: new Date(),
    };

    const result = await db.collection("bets").insertOne(newBet);
    
    return NextResponse.json({ 
      _id: result.insertedId, 
      ...newBet 
    }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create bet" }, { status: 500 });
  }
}