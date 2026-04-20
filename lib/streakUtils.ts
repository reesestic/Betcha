// =========================================================
// LOGIC: Streak Utilities
// DESCRIPTION: Helper function isolated from components to test 
// and calculate consecutive wins based on an array of bet objects.
// =========================================================

export function calculateStreak(bets: any[]): number {
  let streak = 0;
  for (const bet of bets) {
    if (bet.status === "won") {
      streak++;
    } else if (bet.status === "lost") {
      // Break the streak as soon as we hit a loss
      break;
    }
    // We ignore "pending" bets entirely
  }
  
  return streak;
}