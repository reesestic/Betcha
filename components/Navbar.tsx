"use client";
// =========================================================
// COMPONENT: Navbar
// AUTHOR: Anay Sharma
// LOGIC/REASONING: This component handles navigation and 
// authentication UI.
// =========================================================

import styled from "styled-components";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

// Styled Components
const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  align-items: center;
`;

const NavGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #3498db;
  }
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AuthButton = styled.button`
  padding: 8px 16px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

export default function Navbar({ session }: { session: any }) {
  return (
    <NavContainer>
      {/* Clicking the logo returns user to the dashboard */}
      <Logo href="/">Betcha 🎲</Logo>
      
      <NavGroup>
        {/* These links only appear when a user is logged in */}
        {session && (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/history">History</NavLink>
            <NavLink href="/profile">Profile</NavLink>
            <span style={{ 
              color: "#bdc3c7", 
              fontSize: "0.85rem", 
              marginLeft: "10px",
              borderLeft: "1px solid #555",
              paddingLeft: "15px"
            }}>
              Hi, {session.user?.name}
            </span>
          </>
        )}

        <div>
          {session ? (
            <AuthButton onClick={() => signOut()}>Sign Out</AuthButton>
          ) : (
            <AuthButton onClick={() => signIn("github")}>
              Sign In with GitHub
            </AuthButton>
          )}
        </div>
      </NavGroup>
    </NavContainer>
  );
}