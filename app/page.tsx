"use client";

import AcronymForm from "./components/AcronymForm";
import AcronymList from "./components/AcronymList";
import { useCallback, useEffect, useState } from "react";
import type { TAcronym } from "@/lib/supabase/types/TAcronym";

export default function Home() {
  const [acronyms, setAcronyms] = useState<TAcronym[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formIsLoading, setFormIsLoading] = useState(false);

  const fetchAcronyms = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/acronyms/fetch");
      if (!response.ok) {
        throw new Error("Failed to fetch acronyms");
      }
      const data = await response.json();
      setAcronyms(data || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAcronyms();
  }, [fetchAcronyms]);

  const handleAddAcronym = async (acronym: string, definition: string) => {
    setFormIsLoading(true);
    try {
      const response = await fetch("/api/acronyms/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acronym, definition }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to add acronym");
      }

      // refresh list after successful add
      await fetchAcronyms();
    } finally {
      setFormIsLoading(false);
    }
  };

  return (
    <main className="animated-bg mx-auto px-6 py-12">
      <section className="max-w-3xl">
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Corporate Acronyms
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your company&apos;s acronym dictionary
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Add New Acronym
          </h2>
          <AcronymForm onSubmit={handleAddAcronym} isLoading={formIsLoading} />
        </div>

        <div>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Acronyms ({acronyms.length})
          </h2>
          {isLoading ? (
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
              <p className="text-zinc-600 dark:text-zinc-400">
                Loading acronyms...
              </p>
            </div>
          ) : (
            <AcronymList acronyms={acronyms} onRefresh={fetchAcronyms} />
          )}
        </div>
      </section>
    </main>
  );
}
