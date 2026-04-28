/**
 * =========================================================
 * PAGE: History Page (app/history/page.tsx)
 * DESCRIPTION: Displays a filtered list of resolved bets (Won/Lost).
 * This page ensures only authenticated users can view their betting history,
 * and only shows bets that belong to the logged-in user.
 * AUTHOR: Pranati Sunil
 * =========================================================
 */

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import HistoryView from "@/components/HistoryView";

// Helper function to fetch resolved bets directly from MongoDB for a specific user
async function getResolvedBets(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("betcha");
    const bets = await db.collection("bets")
      .find({ status: { $ne: "pending" }, userId })
      .sort({ createdAt: -1 })
      .toArray();
    return bets;
  } catch (error) {
    console.error("Failed to fetch history:", error);
    return [];
  }
}

export default async function HistoryPage() {
  // Authentication Guard: Redirect to home if no session or user id is found
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/");
  }

  const historyBets = await getResolvedBets(session.user.id);

  // Serialize MongoDB documents before passing to client component
  const serializedBets = historyBets.map((bet) => ({
    ...bet,
    _id: bet._id.toString(),
  }));

  return <HistoryView historyBets={serializedBets} />;
}