import type React from "react";

interface IScreenContainerProps {
  children: React.ReactNode;
}

export default function ScreenContainer({ children }: IScreenContainerProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-[375px]">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
