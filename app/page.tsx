// =========================================================
// PAGE: Home Page (/)
// DESCRIPTION: This is the main feed. It fetches the logged-in 
// user's active bets directly from MongoDB, filtering for "pending" 
// status. It allows authenticated users to create new bets and resolve current ones.
// AUTHOR: Anay Sharma
// =========================================================

import { auth } from "@/auth";
import clientPromise from "@/lib/mongodb";
import HomeView from "@/components/HomeView";

// Helper function to fetch the logged-in user's pending bets directly from MongoDB
async function getBets(userId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("betcha");
    const bets = await db.collection("bets")
      .find({ userId, status: "pending" })
      .sort({ createdAt: -1 })
      .toArray();
    return bets;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const session = await auth();
  // Only fetch bets if the user is logged in
  const activeBets = session?.user?.id ? await getBets(session.user.id) : [];

  // Serialize MongoDB documents before passing to client component
  const serializedBets = activeBets.map((bet) => ({
    ...bet,
    _id: bet._id.toString(),
  }));

  return (
    <HomeView
      userName={session?.user?.name ?? null}
      isLoggedIn={!!session}
      activeBets={serializedBets}
    />
  );
}