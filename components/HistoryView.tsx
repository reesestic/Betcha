"use client";
// =========================================================
// COMPONENT: HistoryView
// AUTHOR: Pranati Sunil
// LOGIC/REASONING: Client component that renders the styled UI
// for the history page. Receives resolved bets as props from
// the server page component.
// =========================================================

import styled from "styled-components";
import Link from "next/link";
import BetCard from "@/components/BetCard";

const PageWrapper = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1a1a1a;
  margin: 0;
`;

const BackLink = styled(Link)`
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: #f9fafb;
  border-radius: 12px;
  border: 2px dashed #e5e7eb;
`;

const EmptyStateText = styled.p`
  color: #6b7280;
  margin: 0;
`;

const BetGrid = styled.div`
  display: grid;
  gap: 1.5rem;
`;

const PageFooter = styled.footer`
  margin-top: 4rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.8rem;
`;

export default function HistoryView({ historyBets }: { historyBets: any[] }) {
  return (
    <PageWrapper>
      <PageHeader>
        <PageTitle>Betting History</PageTitle>
        <BackLink href="/">← Back to Dashboard</BackLink>
      </PageHeader>

      {historyBets.length === 0 ? (
        <EmptyState>
          <EmptyStateText>No resolved bets found yet. Keep playing!</EmptyStateText>
        </EmptyState>
      ) : (
        <BetGrid>
          {historyBets.map((bet: any) => (
            <BetCard key={bet._id} bet={bet} />
          ))}
        </BetGrid>
      )}

      <PageFooter>
        <p>Betcha</p>
      </PageFooter>
    </PageWrapper>
  );
}