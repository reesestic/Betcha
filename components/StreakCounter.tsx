"use client";
// =========================================================
// COMPONENT: StreakCounter
// AUTHOR: Jaia Neal
// LOGIC/REASONING: Displays the user's current winning streak.
// It receives a number as a prop and uses conditional styling 
// in styled-components to make "hot" streaks visually pop out.
// =========================================================

import styled from "styled-components";

// We can pass props into styled-components to conditionally change CSS!
const StreakBadge = styled.div<{ $isHot: boolean }>`
  background: ${(props) => (props.$isHot ? "linear-gradient(45deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" : "#ecf0f1")};
  color: ${(props) => (props.$isHot ? "#d35400" : "#7f8c8d")};
  padding: 15px 25px;
  border-radius: 12px;
  display: inline-block;
  font-weight: bold;
  font-size: 1.2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 2px solid ${(props) => (props.$isHot ? "#e74c3c" : "transparent")};
`;

const FlameIcon = styled.span`
  margin-right: 8px;
`;

export default function StreakCounter({ currentStreak }: { currentStreak: number }) {
  const isHot = currentStreak >= 3;

  return (
    <StreakBadge $isHot={isHot}>
      {isHot && <FlameIcon>🔥</FlameIcon>}
      Current Winning Streak: {currentStreak}
    </StreakBadge>
  );
}