// =========================================================
// PAGE/API: Dynamic Bet Update Endpoint
// DESCRIPTION: Handles status updates (Won/Lost) for a specific bet.
// =========================================================

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

// Whitelist of valid statuses to prevent arbitrary data being written to MongoDB
const VALID_STATUSES = ["won", "lost"];

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // Auth guard: only logged-in users can resolve bets
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();

    // Input validation: status must be one of the allowed values
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const resolvedParams = await params; 
    const id = resolvedParams.id; 

    const client = await clientPromise;
    const db = client.db("betcha");

    // Ownership check: fetch the bet first and confirm the
    // requesting user is the one who created it
    const bet = await db.collection("bets").findOne({ _id: new ObjectId(id) });

    if (!bet) {
      return NextResponse.json({ error: "Bet not found" }, { status: 404 });
    }

    if (bet.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.collection("bets").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}