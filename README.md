# Adyen Emergency Squad (AES) - IT Rescue Team Matcher
**SPD Challenge 2026 - Hackathon Solution**

## 🚀 Project Overview
**Adyen Emergency Squad (AES)** is an intelligent, Agentic AI-powered team-matching platform designed for high-stakes IT project rescues. Born out of the 6-hour **SPD Challenge 2026 Hackathon**, this MVP bypasses traditional dropdown filters and replaces them with a cutting-edge **"Text-to-Team" NLP pipeline**.

By leveraging advanced combinatorial algorithms and large language models (LLMs), AES automatically forms the most cost-efficient, culture-fit squad from an available talent pool based on natural language constraints.

## ✨ Killer Features

### 1. 🗣️ Text-to-Team (Natural Language Parsing)
No more rigid forms. Users simply type what they need in plain text: 
> *"Cần 1 team tối đa 3 người, rảnh rỗi vào Ca Sáng, chuyên môn là Python và giỏi Tiếng Anh"*

Our **Gemini-powered NLP API** (with a secure Regex client-side fallback) extracts this text into strict JSON constraints (`maxMembers`, `reqSkills`, `reqLangs`, `reqAvail`).

### 2. 🧠 AI Semantic Routing & Ontology Mapping
When a user asks for generic terms like "AI" or "Web", the system doesn't rely on dumb string matching. The AI Semantically Routes the intent, mapping it to exact database tags (e.g., `["RAG", "Machine Learning"]` or `["React", "Svelte"]`).

### 3. ⚙️ Generalized Set Cover Algorithm (The Brains)
Our custom two-stage matching engine powers the selection process:
- **Stage 1 (Pre-processing):** Drops unavailable candidates and enforces **Intersection Constraints** (e.g., if "Ca Sáng" is required, every member must have "Ca Sáng" availability).
- **Stage 2 (Backtracking & Scoring):** Executes a Generalized Set Cover search. It doesn't force one candidate to have every skill. Instead, it ensures the *team as a whole* covers **at least one skill from every semantic group**.
- **Optimization:** Teams are scored to reward *Multi-tasking* (fewer people, lower cost) and *Culture Fit* ("Team player" bonuses), while penalizing redundancy.

### 4. 📊 Agentic Pipeline UI & Data Viz
We don't just spit out results. AES simulates an **Agentic Workflow Terminal** right in the UI, showing the steps the AI takes to reason about the team. The final `ResultBoard` displays gorgeous **Progress Bars** detailing:
- **Tech & Domain Coverage (100%)**
- **Cost Efficiency / Budget Saved**
- **Culture Fit Score**

Finally, Gemini LLM synthesizes a professional business report explaining *why* this specific squad was chosen over others.

## 🛠 Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI components
- **AI/LLM:** Google Gemini API (via Next.js Route Handlers)
- **Data:** 100% Client-side JSON Mock Data (40 Multi-variable Candidate Profiles)
- **Design System:** Strictly adheres to Adyen Constraints (`#001222` Dark Canvas, `#00d16a` Mint Voltage, `6px` border radius, JetBrains Mono labels).

## 📦 Getting Started
1. Clone the repository.
2. Navigate to `source/`: `cd source`
3. Install dependencies: `npm install` (or `bun install`)
4. Run the development server: `npm run dev`
5. Open `http://localhost:3000` to access the Landing Page and Manager Portal.

## 🏆 Definition of Done (Checklist Achieved)
- [x] 40 Rich JSON Mock Profiles (Supermen & Specialists).
- [x] Text-to-Team Natural Language UI.
- [x] 100% Skill Coverage & Max Members Enforcement.
- [x] Explicit Error Handling (Missing skills/size limits clearly displayed).
- [x] Real-time State Invalidation.
- [x] Fully responsive, professional Adyen UI.