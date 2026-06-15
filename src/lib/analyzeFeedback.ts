export type FeedbackCategory =
  | "Bug"
  | "Feature Request"
  | "Usability"
  | "Pricing"
  | "Other";

export type CategoryCounts = Record<FeedbackCategory, number>;

export type KeywordCount = {
  keyword: string;
  count: number;
};

export type FeedbackAnalysis = {
  total: number;
  counts: CategoryCounts;
  keywords: KeywordCount[];
  priorityAdvice: string;
};

const categoryOrder: FeedbackCategory[] = [
  "Bug",
  "Feature Request",
  "Usability",
  "Pricing",
  "Other"
];

const categoryRules: Array<{
  category: FeedbackCategory;
  keywords: string[];
}> = [
  {
    category: "Bug",
    keywords: ["error", "bug", "crash", "broken", "报错", "崩溃", "无法使用"]
  },
  {
    category: "Feature Request",
    keywords: ["feature", "add", "support", "希望", "能不能", "增加", "功能"]
  },
  {
    category: "Usability",
    keywords: ["confusing", "hard", "difficult", "不好用", "复杂", "看不懂"]
  },
  {
    category: "Pricing",
    keywords: ["price", "expensive", "cost", "太贵", "价格", "收费"]
  }
];

const stopWords = new Set([
  "the",
  "and",
  "for",
  "that",
  "this",
  "with",
  "too",
  "very",
  "can",
  "not",
  "use",
  "using",
  "have",
  "has",
  "when",
  "from",
  "your",
  "our",
  "app",
  "product"
]);

const trackedChineseKeywords = [
  "报错",
  "崩溃",
  "无法使用",
  "希望",
  "能不能",
  "增加",
  "功能",
  "不好用",
  "复杂",
  "看不懂",
  "太贵",
  "价格",
  "收费"
];

export function analyzeFeedback(input: string): FeedbackAnalysis {
  const feedbackItems = input
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

  const counts = createEmptyCounts();

  feedbackItems.forEach((item) => {
    const category = categorizeFeedback(item);
    counts[category] += 1;
  });

  return {
    total: feedbackItems.length,
    counts,
    keywords: getTopKeywords(feedbackItems),
    priorityAdvice: createPriorityAdvice(counts, feedbackItems.length)
  };
}

function createEmptyCounts(): CategoryCounts {
  return {
    Bug: 0,
    "Feature Request": 0,
    Usability: 0,
    Pricing: 0,
    Other: 0
  };
}

function categorizeFeedback(feedback: string): FeedbackCategory {
  const normalized = feedback.toLowerCase();

  for (const rule of categoryRules) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase()))) {
      return rule.category;
    }
  }

  return "Other";
}

function getTopKeywords(feedbackItems: string[]): KeywordCount[] {
  const counts = new Map<string, number>();

  feedbackItems.forEach((item) => {
    const normalized = item.toLowerCase();
    const englishWords = normalized.match(/[a-z0-9]+/g) ?? [];

    englishWords.forEach((word) => {
      if (word.length > 2 && !stopWords.has(word)) {
        counts.set(word, (counts.get(word) ?? 0) + 1);
      }
    });

    trackedChineseKeywords.forEach((keyword) => {
      if (item.includes(keyword)) {
        counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
      }
    });
  });

  return Array.from(counts.entries())
    .map(([keyword, count]) => ({ keyword, count }))
    .sort((a, b) => b.count - a.count || a.keyword.localeCompare(b.keyword))
    .slice(0, 8);
}

function createPriorityAdvice(
  counts: CategoryCounts,
  total: number
): string {
  if (total === 0) {
    return "Paste feedback first, then run the analysis to get a priority suggestion.";
  }

  const topCategory = categoryOrder.reduce((currentTop, category) => {
    return counts[category] > counts[currentTop] ? category : currentTop;
  }, "Bug");

  if (topCategory === "Bug") {
    return "Prioritize Bug fixes first. Stability issues block user trust and should be triaged before adding new scope.";
  }

  if (topCategory === "Feature Request") {
    return "Prioritize the most repeated Feature Requests. Group similar requests into one small release candidate before building.";
  }

  if (topCategory === "Usability") {
    return "Prioritize Usability improvements. Clarify the workflow, simplify confusing steps, and improve empty states or copy.";
  }

  if (topCategory === "Pricing") {
    return "Prioritize Pricing research. Review whether users are reacting to absolute price, unclear value, or confusing plan limits.";
  }

  return "Keep collecting feedback before committing roadmap work. The current signals are broad, so look for repeated patterns next.";
}
