// =========================================================
// PAGE: Home Page (/)
// DESCRIPTION: This is the main feed. It fetches active bets 
// from the API, filtering for "pending" status. It allows 
// authenticated users to create new bets and resolve current ones.
// =========================================================

import { auth } from "@/auth";
import CreateBetForm from "@/components/CreateBetForm";
import BetCard from "@/components/BetCard";

// Helper function to hit our custom Next.js API
async function getBets() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/bets`, { 
      cache: 'no-store' // Ensures we always see fresh data
    });
    
    if (!res.ok) return [];
    
    const allBets = await res.json();
    
    // LOGIC: Only display bets that are still "pending" on the home feed
    return allBets.filter((bet: any) => bet.status === "pending");
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const session = await auth();
  const activeBets = await getBets();

  return (
    <main style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "0.5rem" }}>Active Betting Feed</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "2rem" }}>
        Current commitments and open challenges.
      </p>
      
      {/* Only show the bet creation form if the user is authenticated */}
      {session ? (
        <CreateBetForm userName={session.user?.name || "Anonymous"} />
      ) : (
        <div style={{ textAlign: "center", padding: "20px", background: "#e8ecf1", borderRadius: "8px" }}>
          <p style={{ margin: 0, color: "#2c3e50", fontWeight: "bold" }}>
            Ready to join? Please sign in to place a bet.
          </p>
        </div>
      )}

      {/* Map through the filtered array and render a component for each pending bet */}
      <div style={{ marginTop: "2rem" }}>
        {activeBets.length === 0 ? (
          <p style={{ textAlign: "center", color: "#95a5a6", marginTop: "3rem" }}>
            No active bets found. Start one above!
          </p>
        ) : (
          activeBets.map((bet: any) => (
            <BetCard key={bet._id} bet={bet} />
          ))
        )}
      </div>

      <footer style={{ marginTop: "5rem", textAlign: "center", color: "#bdc3c7", fontSize: "0.8rem" }}>
        <p>Betcha</p>
      </footer>
    </main>
  );
}