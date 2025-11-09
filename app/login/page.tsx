"use client";

import type React from "react";
import { useState } from "react";
import { useAuth } from "../../lib/useAuth";

export default function LoginPage() {
  const { user, isAdmin, loading, error, signIn, signUp, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      if (mode === "signin") {
        const res = await signIn(email, password);
        if (res.error) setMessage(res.error.message);
        else setMessage("Signed in (or check your email if using magic links)");
      } else {
        const res = await signUp(email, password);
        if (res.error) setMessage(res.error.message);
        else
          setMessage(
            "Sign-up complete. Check your email to confirm (if required)."
          );
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err?.message ?? String(err));
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-lg shadow p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center text-black dark:text-zinc-50">
          Login
        </h1>

        {user ? (
          <div className="space-y-3">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              Signed in as <strong>{user.email}</strong>
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              isAdmin: {String(isAdmin)}
            </p>
            <button
              className="mt-2 inline-flex items-center justify-center rounded bg-foreground px-4 py-2 text-background"
              onClick={() => signOut()}
              type="button"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email
              </label>
              <input
                id="email"
                className="mt-1 block w-full rounded border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 dark:bg-[#111] dark:border-[#222] dark:text-zinc-50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <input
                id="password"
                className="mt-1 block w-full rounded border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 dark:bg-[#111] dark:border-[#222] dark:text-zinc-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={6}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "signin"}
                    onChange={() => setMode("signin")}
                  />
                  Sign in
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input
                    type="radio"
                    name="mode"
                    checked={mode === "signup"}
                    onChange={() => setMode("signup")}
                  />
                  Sign up
                </label>
              </div>
              <button
                type="submit"
                className="rounded bg-foreground px-4 py-2 text-background text-sm"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : mode === "signin"
                  ? "Sign in"
                  : "Create account"}
              </button>
            </div>

            {message && (
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                {message}
              </p>
            )}
            {error && <p className="text-sm text-red-600">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
