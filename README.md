# Multimodal Depression Detection — Frontend

A clean, research-grade **frontend-only** Next.js app (App Router + TypeScript + Tailwind CSS) for a Multimodal Depression Detection System.

> Demo UI only. No backend. Uses static demo data.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Pages

- `/` — Home: hero, features, CTA
- `/predict` — Audio/video upload, simulated 2s inference, result card
- `/about` — Project overview, LMVD dataset, model & tech stack

## Structure

```
src/
├── app/            # Next.js App Router pages
├── components/     # common / home / predict
├── data/           # demo data (demoData.ts)
├── types/          # TS types (prediction.ts)
└── utils/          # constants
```

## Stack

Next.js 14 · TypeScript · Tailwind CSS
