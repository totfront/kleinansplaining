"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ScreenContainer from "../components/ScreenContainer";
import EmojiIcon from "../components/EmojiIcon";
import BackButton from "../components/BackButton";

export default function NotFoundPage() {
  const params = useParams();
  const query = params.query as string;

  return (
    <ScreenContainer>
      <BackButton href="/" />

      <div className="mb-8 text-center">
        <EmojiIcon emoji="ℹ️" variant="not-found" />
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ededed] mb-2">
          Acronym Not Found
        </h2>
        <p className="text-[#666666] dark:text-[#999999]">
          We couldn&apos;t find a match for{" "}
          <span className="text-[#333333] dark:text-[#ededed] font-medium">
            &quot;{query}&quot;
          </span>
        </p>
      </div>

      <div className="bg-[#F9F9F9] dark:bg-zinc-800 rounded-xl p-6 mb-6 border-2 border-dashed border-[#E5E5E5] dark:border-zinc-700">
        <p className="text-[#666666] dark:text-[#999999] text-center mb-4">
          Help us grow our database by adding this acronym
        </p>
        <Link
          href={`/search/${encodeURIComponent(query)}/add`}
          className="px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] w-full font-semibold"
        >
          Add acronym
        </Link>
      </div>

      <p className="text-[#999999] dark:text-[#666666] text-center">
        or try searching for another acronym
      </p>
    </ScreenContainer>
  );
}
