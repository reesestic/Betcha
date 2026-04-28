"use client";
// =========================================================
// COMPONENT: HomeView
// AUTHOR: Anay Sharma
// LOGIC/REASONING: Client component that renders the styled UI
// for the home page. Receives session info and active bets as
// props from the server page component.
// =========================================================

import styled from "styled-components";
import CreateBetForm from "@/components/CreateBetForm";
import BetCard from "@/components/BetCard";

const PageWrapper = styled.main`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const SignInPrompt = styled.div`
  text-align: center;
  padding: 20px;
  background: #e8ecf1;
  border-radius: 8px;
`;

const SignInText = styled.p`
  margin: 0;
  color: #2c3e50;
  font-weight: bold;
`;

const BetList = styled.div`
  margin-top: 2rem;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #95a5a6;
  margin-top: 3rem;
`;

const PageFooter = styled.footer`
  margin-top: 5rem;
  text-align: center;
  color: #bdc3c7;
  font-size: 0.8rem;
`;

export default function HomeView({ userName, isLoggedIn, activeBets }: {
  userName: string | null;
  isLoggedIn: boolean;
  activeBets: any[];
}) {
  return (
    <PageWrapper>
      <PageTitle>Active Betting Feed</PageTitle>
      <PageSubtitle>Current commitments and open challenges.</PageSubtitle>

      {/* Only show the bet creation form if the user is authenticated */}
      {isLoggedIn ? (
        <CreateBetForm userName={userName || "Anonymous"} />
      ) : (
        <SignInPrompt>
          <SignInText>Ready to join? Please sign in to place a bet.</SignInText>
        </SignInPrompt>
      )}

      {/* Map through the filtered array and render a component for each pending bet */}
      <BetList>
        {activeBets.length === 0 ? (
          <EmptyText>No active bets found. Start one above!</EmptyText>
        ) : (
          activeBets.map((bet: any) => (
            <BetCard key={bet._id} bet={bet} />
          ))
        )}
      </BetList>

      <PageFooter>
        <p>Betcha</p>
      </PageFooter>
    </PageWrapper>
  );
}