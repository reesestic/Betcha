// =========================================================
// PAGE: Root Layout
// DESCRIPTION: This file acts as the global wrapper for the Next.js app.
// It applies our single global CSS rule (removing body margins) and 
// injects the Navbar at the top of every page.
// =========================================================

import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch session here so the Navbar can render appropriately on server load
  const session = await auth();

  return (
    <html lang="en">
      {/* We use an inline style here or a single global.css file as per the one-external-css rule */}
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", backgroundColor: "#f4f6f8" }}>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}