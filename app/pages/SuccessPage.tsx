"use client";

import Link from "next/link";
import ScreenContainer from "../components/ScreenContainer";
import EmojiIcon from "../components/EmojiIcon";

export default function SuccessPage() {
  return (
    <ScreenContainer>
      <div className="min-h-[27.25rem] text-center flex flex-col items-center justify-center">
        <EmojiIcon emoji="🎉" />
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ededed] mb-2">
          Acronym Updated Successfully!
        </h2>
        <p className="text-[#666666] dark:text-[#999999] mb-8">
          Your changes have been saved
        </p>

        <Link
          href="/"
          className="w-full px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] font-semibold"
        >
          Back to search
        </Link>
      </div>
    </ScreenContainer>
  );
}
