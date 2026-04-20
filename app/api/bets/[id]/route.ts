// =========================================================
// PAGE/API: Dynamic Bet Update Endpoint
// DESCRIPTION: Handles status updates (Won/Lost) for a specific bet.
// =========================================================

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(
  req: Request, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { status } = await req.json();
    
    const resolvedParams = await params; 
    const id = resolvedParams.id; 

    const client = await clientPromise;
    const db = client.db("betcha");

    const result = await db.collection("bets").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Bet not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}