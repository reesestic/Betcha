"use client";
// =========================================================
// COMPONENT: ProfileView
// AUTHOR: Jaia Neal
// LOGIC/REASONING: Client component that renders the styled UI
// for the profile page. Receives user info and streak count
// as props from the server page component.
// =========================================================

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import StreakCounter from "@/components/StreakCounter";

const PageWrapper = styled.main`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const BackLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ProfileCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 4px solid #f0f2f5;
`;

const UserName = styled.h1`
  color: #2c3e50;
  margin: 0;
  font-size: 1.75rem;
`;

const UserEmail = styled.p`
  color: #95a5a6;
  margin-bottom: 2rem;
`;

const StreakWrapper = styled.div`
  margin-bottom: 2rem;
`;

const VerifiedBadge = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
`;

const VerifiedText = styled.p`
  font-size: 0.8rem;
  color: #bdc3c7;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

export default function ProfileView({ name, email, image, streak }: {
  name: string;
  email: string;
  image: string;
  streak: number;
}) {
  return (
    <PageWrapper>
      {/* Home Navigation */}
      <BackLink href="/">← Back to Dashboard</BackLink>

      <ProfileCard>
        {/* User Info Header */}
        <Avatar
          src={image}
          alt="Profile"
          width={90}
          height={90}
        />
        <UserName>{name}</UserName>
        <UserEmail>{email}</UserEmail>

        {/* StreakCounter expects 'currentStreak' */}
        <StreakWrapper>
          <StreakCounter currentStreak={streak} />
        </StreakWrapper>

        <VerifiedBadge>
          <VerifiedText>Account Verified via GitHub</VerifiedText>
        </VerifiedBadge>
      </ProfileCard>
    </PageWrapper>
  );
}