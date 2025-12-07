"use client";

import type { TAcronym } from "@/lib/supabase/types/TAcronym";
import { useState } from "react";

interface IAcronymEditorProps {
  acronym: TAcronym;
  onCancel: () => void;
  onSave: () => Promise<void>;
}

export default function AcronymEditor({
  acronym,
  onCancel,
  onSave,
}: IAcronymEditorProps) {
  const [definition, setDefinition] = useState(acronym.definition || "");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setError(null);

    if (!definition.trim()) return setError("Definition is required");

    setIsSaving(true);
    try {
      const response = await fetch("/api/acronyms/edit", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: acronym.id, definition: definition.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update acronym");
      }

      await onSave();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update acronym");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="rounded-md border border-zinc-200 bg-white p-3 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="grid gap-3">
        <div>
          <label
            htmlFor={`definition-${acronym.id}`}
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Definition
          </label>
          <textarea
            id={`definition-${acronym.id}`}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            disabled={isSaving}
            rows={3}
            className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 bg-white text-zinc-900 placeholder-zinc-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-50"
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="w-full rounded-md border border-zinc-300 bg-transparent px-4 py-2 hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
