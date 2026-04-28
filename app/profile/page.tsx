// =========================================================
// PAGE: Profile Page (/profile)
// LOGIC/REASONING: Displays user info and integrates the 
// streak calculation utility and counter component.
// AUTHOR: Jaia Neal
// =========================================================

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import { calculateStreak } from "@/lib/streakUtils";
import ProfileView from "@/components/ProfileView";

export default async function ProfilePage() {
  const session = await auth();

  // Authentication Guard: Redirect to home if no session or user id is found
  if (!session?.user?.id) {
    redirect("/");
  }

  // Fetch only resolved bets for this user to determine their streak
  const client = await clientPromise;
  const db = client.db("betcha");
  const userBets = await db.collection("bets")
    .find({ userId: session.user.id, status: { $ne: "pending" } })
    .sort({ createdAt: -1 })
    .toArray();

  // Calculating the streak using logic from streakUtils.ts
  const streakResult = calculateStreak(userBets);

  return (
    <ProfileView
      name={session.user.name ?? ""}
      email={session.user.email ?? ""}
      image={session.user.image ?? ""}
      streak={streakResult}
    />
  );
}