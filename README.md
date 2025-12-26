🚀 Task Flow

Task Flow is a high-performance project management platform built for speed and reliability. Leveraging a modern tech stack and a strict architectural approach, it provides a seamless experience for managing complex workflows with real-time feedback.

✨ Key Features

⚡ Modern UI: Crafted with Tailwind v4 and DaisyUI for a sleek, futuristic look and feel.

🛡️ Strictly Typed: 100% TypeScript coverage with moduleResolution: "Bundler" for maximum type safety.

🔐 Advanced Auth: Support for JWT-based authentication.

🔄 Smart Data Sync: State-of-the-art data fetching with TanStack Query and global state via Redux Toolkit.

📡 Live Notifications: Real-time system monitoring and event-driven user alerts.

🧪 E2E Tested: Mission-critical flows are fully covered by Playwright automation.

🛠️ Technical Stack

Frontend

Engine: React 18 (Vite-powered)

Languages: TypeScript (Strict Mode)

State Management: Redux Toolkit (Slices & Async Thunks)

Server State: TanStack Query v5

Styling: Tailwind CSS v4 & DaisyUI

Validation: Zod

Architecture

The project follows a Separation of Concerns (SoC) principle:

ApiRequest Classes: All backend communication is encapsulated in static classes.

Custom Hooks: Business logic and mutations are extracted into reusable hooks (e.g., useAuthForm, useProjectOperations).

Atomic Components: UI is built using modular React components styled with utility-first CSS.

🚀 Getting Started

Prerequisites
Node.js (v18+)

npm or pnpm

Installation
Clone the repository:

Bash

git clone https://github.com/your-username/task-flow.git
cd task-flow
Install dependencies:

Bash:
npm install
Environment Setup: Create a .env file in the root directory:

Code snippet

VITE_API_URL=https://your-api-base-url.com
VITE_GOOGLE_CLIENT_ID=your-google-oauth-id
Run Development Server:

Bash:
npm run dev

🧪 Testing Suite
We take reliability seriously. The project includes unit, integration, and E2E tests.

Unit Tests: npm run test (Jest / Vitest)

E2E Tests: npx playwright test

UI Mode: npx playwright test --ui
