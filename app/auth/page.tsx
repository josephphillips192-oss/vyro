"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/");
      }
    });
  }, [router]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          router.replace("/");
        } else {
          setMessage(
            "Account created. Check your email to confirm your account."
          );
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.session) {
          router.replace("/");
          return;
        }
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
        <div className="w-full">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold tracking-[0.3em]">
              CSTN
            </p>

            <h1 className="mt-8 text-4xl font-bold tracking-tight">
              {mode === "login"
                ? "Welcome back."
                : "Create your account."}
            </h1>

            <p className="mt-4 leading-7 text-gray-500">
              {mode === "login"
                ? "Sign in to continue building your opportunity."
                : "Save your opportunities, progress and CSTN dashboard."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 outline-none transition focus:border-black focus:bg-white"
              />
            </div>

            {message && (
              <div className="rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Log in"
                : "Create account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500">
            {mode === "login"
              ? "Don't have a CSTN account?"
              : "Already have a CSTN account?"}

            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setMessage("");
              }}
              className="ml-2 font-semibold text-black hover:underline"
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
