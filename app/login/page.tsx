"use client";

// Login route removed: keep a simple, non-auth static page so the route no longer
// depends on client authentication code.

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <section className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-lg shadow p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center text-black dark:text-zinc-50">
          Login removed
        </h1>
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          Authentication UI has been removed; fetching will use
          `lib/supabase.ts` directly when implemented.
        </p>
      </section>
    </main>
  );
}
