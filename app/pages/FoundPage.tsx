"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAcronym } from "../context/AcronymContext";
import ScreenContainer from "../components/ScreenContainer";
import EmojiIcon from "../components/EmojiIcon";
import BackButton from "../components/BackButton";
import type { TAcronym } from "@/lib/supabase/types/TAcronym";
import LoadingCenter from "../components/LoadingCenter";

export default function FoundPage() {
  const params = useParams();
  const query: string = params.query as string;
  const [acronym, setAcronym] = useState<TAcronym | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setCurrent } = useAcronym();

  useEffect(() => {
    const fetchAcronym = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/acronyms/fetch");
        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        const found = data.find(
          (item: TAcronym) =>
            item.acronym?.toLowerCase() === query.toLowerCase()
        );

        if (found) {
          setAcronym(found);
        } else {
          window.location.href = `/search/${encodeURIComponent(
            query
          )}/not-found`;
        }
      } catch (error) {
        console.error("Error fetching acronym:", error);
        window.location.href = `/search/${encodeURIComponent(query)}/not-found`;
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcronym();
  }, [query]);

  if (isLoading) {
    return (
      <ScreenContainer>
        <LoadingCenter />
      </ScreenContainer>
    );
  }

  if (!acronym) {
    return null;
  }

  return (
    <ScreenContainer>
      <BackButton href="/" />

      <div className="mb-8 text-center">
        <EmojiIcon emoji="✅" />
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ededed]">
          Acronym Found
        </h2>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-[#333333] dark:text-[#ededed] mb-2">
          Acronym
        </p>
        <div className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 bg-[#F9F9F9] text-[#333333] dark:border-zinc-600 dark:bg-zinc-800 dark:text-[#ededed]">
          {acronym.acronym}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-[#333333] dark:text-[#ededed] mb-2">
          Meaning
        </p>
        <div className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 bg-[#F9F9F9] text-[#333333] dark:border-zinc-600 dark:bg-zinc-800 dark:text-[#ededed]">
          {acronym.definition}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setCurrent(acronym);
          router.push(`/search/${encodeURIComponent(query)}/edit`);
        }}
        className="w-full px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] font-semibold"
      >
        Edit acronym
      </button>
    </ScreenContainer>
  );
}
