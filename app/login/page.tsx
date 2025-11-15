"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "../../lib/useAuth";

type TLoginMode = "signin" | "signup";

interface ISignFormProps {
  defaultMode?: TLoginMode;
}

function SignForm({ defaultMode = "signin" }: ISignFormProps) {
  const { signIn, signUp, loading } = useAuth();

  const [form, setForm] = useState<{
    email: string;
    password: string;
    mode: TLoginMode;
    message: string | null;
  }>({ email: "", password: "", mode: defaultMode, message: null });

  const updateField = (
    field: "email" | "password" | "mode" | "message",
    value: string | TLoginMode | null
  ) => {
    setForm((prev) => ({ ...prev, [field]: value } as typeof prev));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    updateField("message", null);

    if (form.mode === "signin") {
      const res = await signIn(form.email, form.password);
      if (res.error) {
        updateField("message", res.error.message);
        return;
      }
      updateField(
        "message",
        "Signed in (or check your email if using magic links)"
      );
      return;
    }

    const res = await signUp(form.email, form.password);
    if (res.error) {
      updateField("message", res.error.message);
      return;
    }
    updateField(
      "message",
      "Sign-up complete. Check your email to confirm (if required)."
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
      aria-labelledby="login-heading"
    >
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Email
        </label>
        <input
          id="email"
          aria-label="email"
          className="mt-1 block w-full rounded border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 dark:bg-[#111] dark:border-[#222] dark:text-zinc-50"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          type="text"
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
          aria-label="password"
          className="mt-1 block w-full rounded border-gray-200 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-zinc-400 dark:bg-[#111] dark:border-[#222] dark:text-zinc-50"
          value={form.password}
          onChange={(e) => updateField("password", e.target.value)}
          type="password"
          required
          minLength={4}
        />
      </div>

      <fieldset className="flex items-center justify-between p-0 border-0">
        <legend className="sr-only">Authentication mode</legend>
        <div
          className="flex items-center gap-3"
          role="radiogroup"
          aria-label="auth mode"
        >
          <label
            htmlFor="mode-signin"
            className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <input
              id="mode-signin"
              type="radio"
              name="mode"
              checked={form.mode === "signin"}
              onChange={() => updateField("mode", "signin")}
            />
            Sign in
          </label>

          <label
            htmlFor="mode-signup"
            className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <input
              id="mode-signup"
              type="radio"
              name="mode"
              checked={form.mode === "signup"}
              onChange={() => updateField("mode", "signup")}
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
            : form.mode === "signin"
            ? "Sign in"
            : "Create account"}
        </button>
      </fieldset>

      {form.message && (
        <p className="text-sm text-zinc-700 dark:text-zinc-300">
          {form.message}
        </p>
      )}
    </form>
  );
}

export default function LoginPage() {
  const { user, isAdmin, signOut } = useAuth();

  if (user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
        <article className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-lg shadow p-8">
          <h1
            id="account-heading"
            className="text-2xl font-semibold mb-4 text-center text-black dark:text-zinc-50"
          >
            Account
          </h1>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            Signed in as <strong>{user.email}</strong>
          </p>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">
            isAdmin: {String(isAdmin)}
          </p>
          <div className="mt-2">
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center justify-center rounded bg-foreground px-4 py-2 text-background"
            >
              Sign out
            </button>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black">
      <section className="w-full max-w-md bg-white dark:bg-[#0b0b0b] rounded-lg shadow p-8">
        <h1
          id="login-heading"
          className="text-2xl font-semibold mb-4 text-center text-black dark:text-zinc-50"
        >
          Login
        </h1>
        <SignForm />
      </section>
    </main>
  );
}
