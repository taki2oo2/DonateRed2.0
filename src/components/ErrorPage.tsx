"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import MyButton from "@/components/MyButton";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
}

export default function ErrorPage({ error, reset, title }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-[#FB2C36]" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {title || "Something went wrong"}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm mx-auto">
            {error.message ||
              "An unexpected error occurred. Please try again or return to the home page."}
          </p>
          {error.digest && (
            <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-600 mt-2">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <MyButton
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[#FB2C36] hover:bg-[#e02630] text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-md shadow-red-950/30 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </MyButton>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-semibold px-5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
