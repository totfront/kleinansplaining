"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScreenContainer from "../components/ScreenContainer";
import EmojiIcon from "../components/EmojiIcon";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <ScreenContainer>
      <div className="mb-8 text-center">
        <EmojiIcon emoji="🔍" variant="success" />
        <h1 className="text-3xl font-bold text-[#333333] dark:text-[#ededed] mb-2">
          Kleinansplaining
        </h1>
        <p className="text-[#666666] dark:text-[#999999]">
          Search for any acronym to find its meaning
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <FormLabel htmlFor="acronym">Enter acronym</FormLabel>
        <FormInput
          id="acronym"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. KA, RE"
        />

        <button
          type="submit"
          disabled={!query.trim()}
          className="w-full mt-6 px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          Search acronym
        </button>
      </form>

      <hr className="my-6 border-[#E5E5E5] dark:border-zinc-700" />

      <p className="text-center text-[#666666] dark:text-[#999999]">
        Try searching for:{" "}
        <span className="text-[#333333] dark:text-[#ededed] font-medium">
          KA, RE, HTML
        </span>
      </p>
    </ScreenContainer>
  );
}
