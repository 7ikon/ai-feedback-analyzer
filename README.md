# 003 Feedback Analyzer

A lightweight MVP that helps product managers organize raw user feedback, classify issues, count categories, surface repeated keywords, and generate a simple priority suggestion.

这是一个面向 AI 产品经理学习者、独立开发者和早期创业团队的反馈分析工具 MVP。用户可以粘贴多条反馈，系统会用本地规则进行分类和统计，不依赖数据库，也不调用真实 AI API。

## Features

- Paste multiple feedback items, one item per line
- Classify feedback into:
  - Bug
  - Feature Request
  - Usability
  - Pricing
  - Other
- Count feedback volume by category
- Extract high-frequency keywords
- Generate a simple product priority suggestion
- Runs fully in the browser with local rule-based logic

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

On Windows, if PowerShell blocks `npm`, use:

```powershell
npm.cmd run dev
```

## Build

```bash
npm run build
```

## Classification Rules

The MVP uses simple keyword matching:

| Category | Keywords |
| --- | --- |
| Bug | `error`, `bug`, `crash`, `broken`, `报错`, `崩溃`, `无法使用` |
| Feature Request | `feature`, `add`, `support`, `希望`, `能不能`, `增加`, `功能` |
| Usability | `confusing`, `hard`, `difficult`, `不好用`, `复杂`, `看不懂` |
| Pricing | `price`, `expensive`, `cost`, `太贵`, `价格`, `收费` |
| Other | Feedback that does not match the rules above |

## Example Feedback

Paste this into the app to test the MVP:

```text
The app crashes when I upload a large CSV
希望增加 Slack integration 功能
The onboarding is confusing and hard to follow
价格太贵了，个人用户负担不起
Search feels slow on mobile
I got an error after clicking Save
能不能 support team permissions
```

Expected result:

- Total feedback: 7
- Bug: 2
- Feature Request: 2
- Usability: 1
- Pricing: 1
- Other: 1

## Project Structure

```text
003-feedback-analyzer/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── lib/
│       └── analyzeFeedback.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## MVP Scope

Included:

- Feedback input
- Rule-based classification
- Category counts
- Keyword frequency
- Priority suggestion

Not included yet:

- Login
- Database
- Real AI API
- Payment
- Team collaboration
- PDF export

## Roadmap

- Show each feedback item with its detected category
- Allow users to edit or confirm categories manually
- Add CSV import
- Add export to Markdown or CSV
- Improve keyword extraction for Chinese feedback
- Add AI-powered summarization in a future version

## License

This project is for learning and MVP practice. Add a license before using it in production.
