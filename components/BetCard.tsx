"use client";
// =========================================================
// COMPONENT: BetCard
// AUTHOR: Reese Stichter
// LOGIC/REASONING: Renders individual bet data. Updated to 
// remove amount and add interactive controls to resolve 
// bets as Succeeded or Failed.
// =========================================================

import styled from "styled-components";
import { useRouter } from "next/navigation";

const Card = styled.div<{ $status: string }>`
  border-left: 5px solid ${props => 
    props.$status === "won" ? "#27ae60" : 
    props.$status === "lost" ? "#e74c3c" : "#3498db"};
  padding: 15px;
  margin-bottom: 15px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-radius: 4px;
`;

const BetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CreatorName = styled.h4`
  margin: 0;
  color: #2c3e50;
`;

const BetTitle = styled.p`
  margin: 0 0 15px 0;
  color: #34495e;
  font-size: 1.1rem;
  font-style: italic;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ActionButton = styled.button<{ $type: 'success' | 'fail' }>`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background-color: ${props => props.$type === 'success' ? '#27ae60' : '#e74c3c'};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const StatusBadge = styled.span<{ $status: string }>`
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
  padding: 4px 8px;
  border-radius: 3px;
  background: #f1f2f6;
  color: ${props => 
    props.$status === "won" ? "#27ae60" : 
    props.$status === "lost" ? "#e74c3c" : "#7f8c8d"};
`;

export default function BetCard({ bet }: { bet: any }) {
  const router = useRouter();

  const handleUpdate = async (newStatus: "won" | "lost") => {
    // Calling our API to update the document in MongoDB
    const res = await fetch(`/api/bets/${bet._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      router.refresh(); // Refresh the Server Component data instantly
    }
  };

  return (
    <Card $status={bet.status}>
      <BetHeader>
        <CreatorName>{bet.creatorName}</CreatorName>
        <StatusBadge $status={bet.status}>{bet.status}</StatusBadge>
      </BetHeader>
      
      <BetTitle>"{bet.title}"</BetTitle>

      {/* Only show action buttons if the bet is still pending */}
      {bet.status === "pending" && (
        <ButtonGroup>
          <ActionButton $type="success" onClick={() => handleUpdate("won")}>
            Succeeded
          </ActionButton>
          <ActionButton $type="fail" onClick={() => handleUpdate("lost")}>
            Failed
          </ActionButton>
        </ButtonGroup>
      )}
    </Card>
  );
}