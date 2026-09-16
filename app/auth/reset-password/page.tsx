"use client";

import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setMessage(
          "This password reset link is invalid or has expired. Please request a new one."
        );
        return;
      }

      setReady(true);
    };

    checkSession();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password.length < 6) {
      setMessage("Your password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      setMessage("Your password has been updated successfully.");

      setTimeout(() => {
        router.replace("/auth");
      }, 1500);
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
              Create a new password.
            </h1>

            <p className="mt-4 leading-7 text-gray-500">
              Choose a new password for your CSTN account.
            </p>
          </div>

          {!ready && !message && (
            <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm text-gray-600">
              Checking your reset link...
            </div>
          )}

          {ready && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  New password
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

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm new password
                </label>

                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  placeholder="Enter your password again"
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
                {loading ? "Updating password..." : "Update password"}
              </button>
            </form>
          )}

          {!ready && message && (
            <div className="rounded-2xl bg-gray-50 p-4 text-center text-sm leading-6 text-gray-600">
              {message}
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-500">
            <button
              type="button"
              onClick={() => router.replace("/auth")}
              className="font-semibold text-black hover:underline"
            >
              Back to log in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
