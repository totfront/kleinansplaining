"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";

type SignInResponse = Awaited<
  ReturnType<typeof supabase.auth.signInWithPassword>
>;
type SignUpResponse = Awaited<ReturnType<typeof supabase.auth.signUp>>;

type SignInFn = (email: string, password: string) => Promise<SignInResponse>;
type SignUpFn = (email: string, password: string) => Promise<SignUpResponse>;

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  signIn: SignInFn;
  signUp: SignUpFn;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setError(error.message);
      } else if (mounted) {
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    })();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      // unsubscribe listener if available
      try {
        // `data` may have a subscription object with unsubscribe
        // use optional chaining to avoid casting
        // @ts-ignore -- subscription property is not always modeled in types
        data?.subscription?.unsubscribe?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const isAdmin = !!(
    user && adminEmails.includes((user.email || "").toLowerCase())
  );

  const signIn: SignInFn = async (email, password) => {
    setLoading(true);
    setError(null);
    const res = await supabase.auth.signInWithPassword({ email, password });
    if (res.error) setError(res.error.message);
    setLoading(false);
    return res as SignInResponse;
  };

  const signUp: SignUpFn = async (email, password) => {
    setLoading(true);
    setError(null);
    const res = await supabase.auth.signUp({ email, password });
    if (res.error) setError(res.error.message);
    setLoading(false);
    return res as SignUpResponse;
  };

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, error, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export default AuthContext;
