"use client";

import type { TAcronym } from "@/lib/supabase/types/TAcronym";
import { useState } from "react";
import AcronymEditor from "./AcronymEditor";

interface IAcronymListProps {
  acronyms: TAcronym[];
  onRefresh: () => Promise<void>;
}

export default function AcronymList({
  acronyms,
  onRefresh,
}: IAcronymListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      const response = await fetch("/api/acronyms/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete acronym");
      }

      await onRefresh();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (acronyms.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
        <p className="text-zinc-600 dark:text-zinc-400">
          No acronyms yet. Add one to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {acronyms.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-12 items-center gap-4 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800"
        >
          {editingId === item.id ? (
            <div className="col-span-12">
              <AcronymEditor
                acronym={item}
                onCancel={() => setEditingId(null)}
                onSave={async () => {
                  setEditingId(null);
                  await onRefresh();
                }}
              />
            </div>
          ) : (
            <>
              <div className="col-span-12 md:col-span-9">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {item.acronym}
                </h3>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.definition}
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingId(item.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-50 dark:hover:bg-zinc-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 20h9"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z"
                    />
                  </svg>
                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting === item.id}
                  className="inline-flex items-center rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-50 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900"
                  aria-label="Delete acronym"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    focusable="false"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 6h18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 6v14a2 2 0 002 2h4a2 2 0 002-2V6M10 11v6M14 11v6"
                    />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
