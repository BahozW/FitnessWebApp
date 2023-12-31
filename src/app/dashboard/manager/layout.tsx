import { ReactNode } from "react";
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex">
      {children}
    </main>
  );
}
