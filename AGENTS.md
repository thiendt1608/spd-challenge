# Repository Guidelines

## Project Overview
This repository hosts the solution for the **SPD Challenge 2026** (Team-Matching MVP). The goal is to build a full multi-page product (Marketing Landing Page + Manager Portal) capable of forming optimal teams based on complex constraints using mock data within a 6-hour hackathon timeframe. The repository is heavily constrained by an automated structure grader (`spd-public-structure-prompt.md`) which strictly enforces specific files at the root level.

## Architecture & Data Flow
- **Architecture:** Next.js App Router structured as a complete SaaS product. 
  - `/`: Public-facing Marketing Landing Page.
  - `/dashboard`: Authenticated-style Manager Portal for the actual team matching tool.
  - No real backend or database is required; logic runs client-side.
- **Data Flow:** 
  - Mock candidate data is loaded from `source/src/data/candidates.json`.
  - User constraints are input via the UI in the Dashboard.
  - A Two-Stage Algorithm (Pre-processing + Combinatorial Scoring) processes constraints against the JSON data.
  - The UI updates dynamically to display matched teams, explicit error handling, and AI-generated reasoning text.
- **AI Focus:** Do not architect complex backend abstractions. Focus purely on static data ingestion, deep client-side business logic, and strict adherence to design tokens.

## Design System (Adyen Constraints)
The UI strictly follows Adyen's marketing design language (`adyen.design.md`):
- **Colors:** 
  - Primary Accent (Mint Voltage): `#00d16a` (used sparingly for primary CTAs and indicator dots).
  - Dark Canvas: `#001222` (navy-leaning black, used for hero bands and dark sections).
- **Typography:** 
  - Default Sans: `Inter` (used as a fallback for Adyen Sans).
  - Eyebrows & Labels: `JetBrains Mono` (12px, uppercase, +0 tracking).
- **Shapes:** Strictly `6px` border-radius (`0.375rem`) for EVERYTHING (buttons, cards, inputs). No exceptions.
- **Rhythm:** Alternating dark (`#001222`) and light (`#f4f5f6` or `#ffffff`) full-bleed section bands. Flat design (no heavy drop shadows).

## Key Directories
- `source/`: **[REQUIRED]** The main directory for all application source code. It must exist and contain at least one real file (not just `.gitkeep`).
- `skills/`: Contains Oh My Pi agent capability guidelines. (Do not modify during standard app development).

## Development Commands
*(Note: Project is currently pending initialization. Assuming standard Node/Bun setup):*
- **Dev Server:** `npm run dev` or `bun dev`
- **Build:** `npm run build` or `bun run build`
- **Run Mock Grader:** Ensure you can visually verify the root structure matches the strict 5-item requirement before submission.

## Code Conventions & Common Patterns
- **State Management:** Use simple component state (e.g., React `useState`/`useEffect`). The UI must dynamically react to constraint changes (Checkpoint 4 requirement).
- **Error Handling Pattern:** **CRITICAL.** If no team can be matched, the matching engine MUST throw/return a specific error payload detailing exactly which constraint failed (e.g., "Missing skill X"). The UI must catch this and display a clear red alert, avoiding white screens or infinite loops.
- **Algorithm Pattern (Two-Stage Architecture):** 
  1. **Pre-processing:** Filter out candidates with zero matching skills to reduce the search space.
  2. **Backtracking & Scoring:** Generate all valid combinations, then score them based on *Multi-tasking* (rewarding smaller teams covering more skills) and *Redundancy Penalty* (punishing unnecessary skills). Output must include a generated `reasoning` string explaining the business value of the selection.
- **Mock Data Strategy ("Cheat Code"):** Ensure `candidates.json` has a mix of "Supermen" (candidates with 4-5 skills) and "Specialists" (1 skill) to visually prove the algorithm's intelligence in optimizing headcount.
- **Naming:** Keep paths explicit. Use lowercase for structure-required files (e.g., `submission.json`, `chatlog.md`).

## Important Files
The automated grader checks strictly for these exact paths at `REPOSITORY_ROOT`. They are non-negotiable for a 20/20 structure score:
1. `README.md`: Must contain human-readable text.
2. `chatlog.md`: Stores prompt history.
3. `submission.json`: Must parse as valid JSON (Top-level object).
4. `.gitignore`: Must exist (content can be empty).
5. `source/`: Must be a directory containing at least one file.
- `SPD-Challenge-2026-Official-Problem.md`: The core requirements document.

## Runtime/Tooling Preferences
- **Runtime:** Bun is recommended for speed during the hackathon, but Node.js is perfectly acceptable.
- **Package Manager:** `bun`, `pnpm`, or `npm`.
- **UI Libraries:** Shadcn UI, Tailwind CSS, or Bootstrap are strongly recommended to meet the UI/UX scoring criteria rapidly without writing raw CSS.

## AI Workflow Rules
- **Mandatory Chat Logging:** After every single interaction, the AI assistant MUST automatically append the timestamp, the user's exact prompt, and a brief summary of the response to `chatlog.md`. Do not wait for the user to explicitly ask for this log update.
- **Automatic Git Commit & Push:** Upon completing a distinct task or significant milestone, the AI MUST automatically commit the changes with a clear conventional commit message and push the branch to the remote repository (e.g., `git add . && git commit -m "..." && git push`).

## Testing & QA
- **Testing Frameworks:** No formal testing framework (Jest/Vitest) is strictly required by the prompt. Time is better spent on the demo.
- **QA Strategy:** QA is entirely visual and script-based for a 3-minute video.
- **Checkpoints to Test Manually:**
  1. Input goals and constraints.
  2. Browse candidate pool.
  3. Trigger team suggestion and view the explanation report.
  4. Change a constraint dynamically (watch the result invalidate).
  5. Trigger a "no solution" state (ensure proper error message appears).