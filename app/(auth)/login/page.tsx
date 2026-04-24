"use client";
// =========================================================
// PAGE: Custom Login Page (/login)
// DESCRIPTION: A dedicated, styled login page instead of the 
// default NextAuth screen.
// =========================================================

import styled from "styled-components";
import { signIn } from "next-auth/react";

const LoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #333;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #000;
  }
`;

export default function LoginPage() {
  return (
    <LoginContainer>
      <LoginBox>
        <Title>Welcome to Betcha </Title>
        <p>Sign in to start placing bets with your friends.</p>
        <LoginButton onClick={() => signIn("github", { callbackUrl: "/" })}>
          Sign in with GitHub
        </LoginButton>
      </LoginBox>
    </LoginContainer>
  );
}