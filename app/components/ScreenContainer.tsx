import type React from "react";

interface IScreenContainerProps {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: IScreenContainerProps) {
  return (
    <main className="min-h-10 w-full max-w-[375px] mx-auto p-8 grid place-items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-sm">
      {children}
    </main>
  );
}
