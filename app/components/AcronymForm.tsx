"use client";

import { useState } from "react";

interface IAcronymFormProps {
  onSubmit: (acronym: string, definition: string) => Promise<void>;
  isLoading?: boolean;
}

export default function AcronymForm({
  onSubmit,
  isLoading = false,
}: IAcronymFormProps) {
  const [acronym, setAcronym] = useState<string>("");
  const [definition, setDefinition] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!acronym.trim()) return setError("Acronym is required");
    if (!definition.trim()) return setError("Definition is required");
    try {
      await onSubmit(acronym.trim(), definition.trim());
      setAcronym("");
      setDefinition("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add acronym");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <div className="grid grid-cols-9 gap-3 items-center">
        <div className="col-span-9">
          <label
            htmlFor="acronym"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Acronym
          </label>
          <input
            id="acronym"
            value={acronym}
            onChange={(e) => setAcronym(e.target.value)}
            disabled={isLoading}
            placeholder="e.g., RE"
            className="w-full mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 bg-white text-zinc-900 placeholder-zinc-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
          />
        </div>

        <div className="col-span-9">
          <label
            htmlFor="definition"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Definition
          </label>
          <input
            id="definition"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            disabled={isLoading}
            placeholder="Describe what does the acronym stand for"
            type="text"
            className="w-full mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 bg-white text-zinc-900 placeholder-zinc-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
          />
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="rounded-md bg-[var(--ka-dark-green)] mt-2 px-4 py-2 font-bold text-white hover:bg-[var(--ka-dark-green-hover)] disabled:opacity-60"
        disabled={isLoading}
      >
        {isLoading ? "Adding..." : "Add Acronym"}
      </button>
    </form>
  );
}
