# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Git Guidelines

Do not mention Claude Code in git commit messages or PR descriptions. Keep commit messages focused on what changed, not how it was written.

## Commands

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests (interactive watch mode)
- `npm test -- --watchAll=false` - Run tests once without watch mode
- `netlify dev` - Run locally with Netlify functions

## Architecture

This is a Create React App (TypeScript) personal website deployed to Netlify.

**Tech Stack:**
- React 18 with TypeScript
- HashRouter for client-side routing
- Plain CSS and inline styles (no UI framework)
- OpenAI API via Netlify Functions for chatbot

**Key Components:**
- `App.tsx` - Main layout with flexbox, composes all page components
- `ChatBot.tsx` - Custom chat UI that calls `/.netlify/functions/chat`
- `FlyingTurtle.tsx` - Animated background element with CSS keyframes
- `IntroductionText.tsx` - Main content with hover-toggle greeting (Spanish/English)
- `Socials.tsx` - Social media links
- `BackgroundFloor.tsx` - Background visual element

**Netlify Function:**
- `netlify/functions/chat.ts` - OpenAI-powered chatbot API endpoint

**Deployment:**
- Netlify handles builds via `netlify.toml`
- Uses `npm install && npm run build` for production
- Requires `OPENAI_API_KEY` environment variable in Netlify dashboard
- SPA routing configured with catch-all redirect to `/index.html`
