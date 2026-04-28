"use client";
// =========================================================
// COMPONENT: CreateBetForm
// AUTHOR: Pranati Sunil
// LOGIC/REASONING: This component provides the form UI for users 
// to create a new bet. Stripped of the "Amount" field to focus 
// purely on the bet title/goal. It triggers a POST request 
// to initialize a "pending" bet in the database.
// =========================================================

import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const FormCard = styled.form`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline-color: #27ae60;
`;

const SubmitBtn = styled.button`
  padding: 12px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background-color: #2ecc71;
  }
`;

export default function CreateBetForm({ userName }: { userName: string }) {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // API call to the backend.
    // We send status: "pending" so it shows up on the dashboard active list.
    await fetch("/api/bets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        title, 
        creatorName: userName,
        status: "pending", 
        createdAt: new Date() 
      }),
    });
    
    setTitle("");
    router.refresh(); // Tells Next.js to re-fetch the data for the server components
  };

  return (
    <FormCard onSubmit={handleSubmit}>
      <h3 style={{ margin: "0 0 5px 0" }}>Create a New Bet</h3>
      <p style={{ fontSize: "0.85rem", color: "#666", margin: "0 0 10px 0" }}>
        What are you committing to today?
      </p>
      <Input 
        type="text" 
        placeholder="e.g., I will run 5 miles today" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <SubmitBtn type="submit">Place Bet</SubmitBtn>
    </FormCard>
  );
}