"use client";

import { useMemo, useState } from "react";
import {
  analyzeFeedback,
  type FeedbackAnalysis,
  type FeedbackCategory
} from "@/lib/analyzeFeedback";

const sampleFeedback = `The app crashes when I upload a large CSV
希望增加 Slack integration 功能
The onboarding is confusing and hard to follow
价格太贵了，个人用户负担不起
Search feels slow on mobile
I got an error after clicking Save
能不能 support team permissions`;

const categories: FeedbackCategory[] = [
  "Bug",
  "Feature Request",
  "Usability",
  "Pricing",
  "Other"
];

const categoryStyles: Record<FeedbackCategory, string> = {
  Bug: "border-coral/30 bg-coral/10 text-coral",
  "Feature Request": "border-moss/30 bg-moss/10 text-moss",
  Usability: "border-steel/30 bg-steel/10 text-steel",
  Pricing: "border-gold/30 bg-gold/10 text-gold",
  Other: "border-ink/15 bg-white/50 text-ink"
};

export default function Home() {
  const [feedback, setFeedback] = useState(sampleFeedback);
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null);

  const lineCount = useMemo(() => {
    return feedback
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean).length;
  }, [feedback]);

  const handleAnalyze = () => {
    setAnalysis(analyzeFeedback(feedback));
  };

  const displayedAnalysis = analysis ?? analyzeFeedback("");

  return (
    <main className="min-h-screen px-5 py-8 text-ink sm:px-8 lg:px-12">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3 border-b border-ink/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-coral">
              MVP Workspace
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              003 Feedback Analyzer
            </h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-ink/70">
            Paste raw user feedback and turn it into categories, counts,
            keywords, and a first-pass product priority.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-lg border border-ink/10 bg-white/70 p-4 shadow-panel backdrop-blur sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">Feedback Input</h2>
              <span className="rounded-full border border-ink/10 px-3 py-1 text-sm text-ink/60">
                {lineCount} lines
              </span>
            </div>

            <textarea
              className="min-h-[360px] w-full resize-y rounded-lg border border-ink/15 bg-paper/70 p-4 text-base leading-7 outline-none transition focus:border-steel focus:bg-white focus:ring-4 focus:ring-steel/10"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Paste one feedback item per line"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink/55">
                One feedback item per line. Empty lines are ignored.
              </p>
              <button
                className="rounded-lg bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-paper transition hover:-translate-y-0.5 hover:bg-coral focus:outline-none focus:ring-4 focus:ring-coral/20"
                onClick={handleAnalyze}
                type="button"
              >
                Analyze Feedback
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-5">
            <div className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-panel backdrop-blur">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Analysis Summary</h2>
                  <p className="mt-1 text-sm text-ink/55">
                    {analysis
                      ? "Generated from the latest analysis."
                      : "Run analysis to populate the MVP output."}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-semibold">
                    {displayedAnalysis.total}
                  </p>
                  <p className="text-sm uppercase tracking-[0.16em] text-ink/50">
                    Total
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categories.map((category) => (
                  <div
                    className={`rounded-lg border p-3 ${categoryStyles[category]}`}
                    key={category}
                  >
                    <p className="text-2xl font-semibold">
                      {displayedAnalysis.counts[category]}
                    </p>
                    <p className="mt-1 text-sm font-medium">{category}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-ink/10 bg-white/75 p-5 shadow-panel backdrop-blur">
              <h2 className="text-lg font-semibold">High-Frequency Keywords</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {displayedAnalysis.keywords.length > 0 ? (
                  displayedAnalysis.keywords.map((item) => (
                    <span
                      className="rounded-full border border-steel/20 bg-steel/10 px-3 py-1.5 text-sm font-medium text-steel"
                      key={item.keyword}
                    >
                      {item.keyword} · {item.count}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-ink/55">
                    Keywords will appear after feedback is analyzed.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-ink/10 bg-ink p-5 text-paper shadow-panel">
              <h2 className="text-lg font-semibold">Priority Suggestion</h2>
              <p className="mt-3 leading-7 text-paper/80">
                {displayedAnalysis.priorityAdvice}
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
