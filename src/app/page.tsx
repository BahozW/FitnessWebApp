import React from 'react';
import Link from 'next/link';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/options';
import '../styles/styles.css';

interface HomeProps {
}

export default async function Home(props: HomeProps) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <main className="home-container">
      <div className="welcome-section">
        <h2 className="welcome-title">
          Hello {session?.user?.name || 'Guest'}
        </h2>
        <span className="user-role">
          Your Role: {session?.user?.role || 'Undefined'}
        </span>
        <p className="welcome-message">
          Explore your dashboard to manage your activities.
        </p>
        <Link href={`/dashboard/${session?.user?.role?.toLowerCase()}`}>
        <span className="dashboard-link">Access Dashboard</span>
        </Link>
      </div>
    </main>
  );
}
