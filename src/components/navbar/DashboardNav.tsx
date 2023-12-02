"use client";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function DashboardNav({
  route,
  title,
  bgColor,
}: {
  route: string;
  title: string;
  bgColor?: string;
}) {
  const { data: session } = useSession();
  const bgClass = bgColor ? `bgColor-${bgColor}` : ''; 

  return (
    <div className={`navItem ${bgClass}`}>
      <Link href={`/dashboard/${session?.user?.role?.toLowerCase()}/${route}`}>
        <span className="dashboard-link">{title}</span>
      </Link>
    </div>
  );
}


