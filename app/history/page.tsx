/**
 * =========================================================
 * PAGE: History Page (app/history/page.tsx)
 * DESCRIPTION: Displays a filtered list of resolved bets (Won/Lost).
 * This page ensures only authenticated users can view their betting history,
 * and only shows bets that belong to the logged-in user.
 * =========================================================
 */

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import BetCard from "@/components/BetCard";
import clientPromise from "@/lib/mongodb";

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

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#1a1a1a" }}>Betting History</h1>
        <Link 
          href="/" 
          style={{ 
            color: "#6366f1", 
            textDecoration: "none", 
            fontWeight: "500",
            fontSize: "0.9rem"
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>

      {historyBets.length === 0 ? (
        <div style={{ 
          textAlign: "center", 
          padding: "3rem", 
          backgroundColor: "#f9fafb", 
          borderRadius: "12px",
          border: "2px dashed #e5e7eb"
        }}>
          <p style={{ color: "#6b7280" }}>No resolved bets found yet. Keep playing!</p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {historyBets.map((bet: any) => (
            <BetCard key={bet._id.toString()} bet={{ ...bet, _id: bet._id.toString() }} />
          ))}
        </div>
      )}

      <footer style={{ marginTop: "4rem", textAlign: "center", color: "#9ca3af", fontSize: "0.8rem" }}>
        <p> Betcha </p>
      </footer>
    </main>
  );
}