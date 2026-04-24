// =========================================================
// PAGE: Profile Page (/profile)
// LOGIC/REASONING: Displays user info and integrates the 
// streak calculation utility and counter component.
// =========================================================

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { calculateStreak } from "@/lib/streakUtils"; 
import StreakCounter from "@/components/StreakCounter";

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

  // Calculating the streak using Jaia's logic
  const streakResult = calculateStreak(userBets);

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      {/* Home Navigation */}
      <Link href="/" style={{ color: "#3498db", textDecoration: "none", fontSize: "0.9rem", fontWeight: "bold" }}>
        ← Home
      </Link>
      
      <div style={{ 
        marginTop: "2rem", 
        padding: "2rem", 
        background: "white", 
        borderRadius: "15px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        textAlign: "center" 
      }}>
        {/* User Info Header */}
        <Image
          src={session.user?.image || ""}
          alt="Profile"
          width={90}
          height={90}
          style={{ borderRadius: "50%", marginBottom: "1rem", border: "4px solid #f0f2f5" }}
        />
        <h1 style={{ color: "#2c3e50", margin: "0", fontSize: "1.75rem" }}>{session.user?.name}</h1>
        <p style={{ color: "#95a5a6", marginBottom: "2rem" }}>{session.user?.email}</p>
        
        {/* StreakCounter expects 'currentStreak' */}
        <div style={{ marginBottom: "2rem" }}>
          <StreakCounter currentStreak={streakResult} />
        </div>

        <div style={{ marginTop: "2rem", borderTop: "1px solid #eee", paddingTop: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#bdc3c7", textTransform: "uppercase", letterSpacing: "1px" }}>
            Account Verified via GitHub
          </p>
        </div>
      </div>
    </main>
  );
}