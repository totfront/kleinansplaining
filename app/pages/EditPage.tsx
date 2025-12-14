"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ScreenContainer from "../components/ScreenContainer";
import EmojiIcon from "../components/EmojiIcon";
import BackButton from "../components/BackButton";
import FormInput from "../components/FormInput";
import FormLabel from "../components/FormLabel";
import LoadingCenter from "../components/LoadingCenter";
import { useAcronym } from "../context/AcronymContext";
import type { TAcronym } from "@/lib/supabase/types/TAcronym";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const query = params.query as string;
  const [acronym, setAcronym] = useState<TAcronym | null>(null);
  const [definition, setDefinition] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { current } = useAcronym();

  useEffect(() => {
    // Prefer context value when available (navigating from Found -> Edit)
    if (current && current.acronym?.toLowerCase() === query.toLowerCase()) {
      setAcronym(current);
      setDefinition(current.definition || "");
      setIsLoading(false);
      return;
    }

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
          setDefinition(found.definition || "");
        }
      } catch (error) {
        console.error("Error fetching acronym:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAcronym();
  }, [query, current]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acronym || !definition.trim()) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/acronyms/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: acronym.id, definition: definition.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update");
      }

      router.push(`/search/${encodeURIComponent(query)}/success`);
    } catch (error) {
      console.error("Error updating acronym:", error);
    }
  };

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
      <BackButton href={`/search/${encodeURIComponent(query)}`} label="Back" />

      <div className="mb-8 text-center">
        <EmojiIcon emoji="✏️" />
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ededed] mb-2">
          Edit Acronym
        </h2>
      </div>

      <form onSubmit={handleSave}>
        <div className="mb-6">
          <FormLabel htmlFor="acronym">Acronym</FormLabel>
          <div className="w-full rounded-lg border border-[#E5E5E5] px-4 py-3 bg-[#F9F9F9] text-[#333333] dark:border-zinc-600 dark:bg-zinc-800 dark:text-[#ededed]">
            {acronym.acronym}
          </div>
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="definition">Meaning</FormLabel>
          <FormInput
            id="definition"
            type="text"
            maxLength={150}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter the meaning"
            disabled={isSaving}
          />
        </div>

        <button
          type="submit"
          disabled={
            isSaving ||
            !definition.trim() ||
            (acronym?.definition || "").trim() === definition.trim()
          }
          className="w-full px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </ScreenContainer>
  );
}
