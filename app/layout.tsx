// =========================================================
// PAGE: Root Layout
// DESCRIPTION: This file acts as the global wrapper for the Next.js app.
// It applies our single global CSS rule (removing body margins) and 
// injects the Navbar at the top of every page.
// AUTHOR: Anay Sharma
// =========================================================

import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch session here so the Navbar can render appropriately on server load
  const session = await auth();

  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}