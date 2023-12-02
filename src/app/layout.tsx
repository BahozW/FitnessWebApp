import React, { ReactNode } from 'react';
import Link from 'next/link';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import Provider from '@/providers/provider';
import '../styles/styles.css';

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <nav className="navigation">
            <Link href={"/"}>Home</Link>
            <Link href={"/api/auth/signout"}>Logout</Link>
          </nav>
        </header>

        <main className="content">
          <Provider session={session}>{children}</Provider>
        </main>
      </body>
    </html>
  );
}
