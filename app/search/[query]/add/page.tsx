"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ScreenContainer from "../../../components/ScreenContainer";
import EmojiIcon from "../../../components/EmojiIcon";
import BackButton from "../../../components/BackButton";
import FormInput from "../../../components/FormInput";
import FormLabel from "../../../components/FormLabel";

export default function AddPage() {
  const params = useParams();
  const router = useRouter();
  const query = params.query as string;
  const [acronym, setAcronym] = useState(query);
  const [definition, setDefinition] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acronym.trim() || !definition.trim()) return;

    setIsSaving(true);
    try {
      const response = await fetch("/api/acronyms/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acronym: acronym.trim(),
          definition: definition.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to add acronym");
      }

      router.push(`/search/${encodeURIComponent(acronym.trim())}/success`);
    } catch (error) {
      console.error("Error adding acronym:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ScreenContainer>
      <BackButton href="/" />

      <div className="mb-8 text-center">
        <EmojiIcon emoji="➕" />
        <h2 className="text-2xl font-semibold text-[#333333] dark:text-[#ededed] mb-2">
          Add Acronym
        </h2>
        <p className="text-[#666666] dark:text-[#999999]">
          Help us grow our database
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <FormLabel htmlFor="acronym">Acronym</FormLabel>
          <FormInput
            id="acronym"
            type="text"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            placeholder="Enter acronym"
            disabled={isSaving}
            maxLength={10}
          />
        </div>

        <div className="mb-6">
          <FormLabel htmlFor="definition">Meaning</FormLabel>
          <FormInput
            id="definition"
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter the meaning"
            disabled={isSaving}
          />
        </div>

        <button
          type="submit"
          disabled={isSaving || !acronym.trim() || !definition.trim()}
          className="w-full px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 bg-[#406825] text-white hover:bg-[#355420] active:bg-[#2D471B] disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {isSaving ? "Adding..." : "Add acronym"}
        </button>
      </form>
    </ScreenContainer>
  );
}
