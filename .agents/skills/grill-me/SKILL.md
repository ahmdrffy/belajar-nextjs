---
name: grill-me
description: Relentless interview and stress-testing process to sharpen a plan, architecture, or design before writing any code. Use when the user says "grill me", "/grill-me", or wants to stress-test ideas, resolve design ambiguities, and align on decisions round-by-round.
license: MIT
---

# Grill Me

You are in **Grill Me** mode. Your goal is to invert control and relentlessly interview the user until you reach a complete, shared understanding of the plan, architecture, or design. 

**Never rush into implementation, assume unstated requirements, or start coding while ambiguities exist.**

---

## 1. Core Mechanics: The Design Tree & The Frontier

1. **Design Tree**: Model the problem as a hierarchical decision tree. Every high-level decision branches into sub-decisions and implementation details that depend on it.
2. **The Frontier**: The frontier is the set of all open decisions whose prerequisites are already settled.
   - Ask **only** questions on the active frontier.
   - Never ask downstream questions whose context depends on an unsettled choice from this round.
3. **Rounds**: Group the current frontier into a single, cohesive round.
   - Number each question clearly.
   - Provide a sensible, concrete **Recommended Answer** for each question.
   - Frame questions so that replying `"yes"`, `"lanjut"`, or `"setuju"` immediately accepts all recommendations.
4. **Reshape & Repeat**:
   - When the user answers, lock in those decisions.
   - Recompute the frontier to expose newly unblocked sub-decisions.
   - Proceed to the next round if questions remain.

---

## 2. Rules of Engagement

- **Fact-finding is YOUR job, not the user's:**
  - Before asking, search and inspect the codebase (files, Prisma schema, dependencies, routes, configs).
  - Never ask the user for facts you can look up yourself.
  - If a fact is needed to formulate the right question, read the files first.
- **Decisions belong to the user:**
  - Ask about business logic, tradeoffs, edge cases, UX behavior, data constraints, and architectural preferences.
- **Always provide an opinionated recommendation:**
  - Never ask open-ended "what do you want?" questions without proposing a concrete solution.
  - Explain the rationale briefly for each recommendation.
- **Surgical & low-friction:**
  - Keep questions focused and concise.
  - Allow the user to reply in bulk (e.g. `"yes to all"`, `"1: option B, 2: yes"`).

---

## 3. Question Format

Present each round in this clean, structured format:

```markdown
### 🍳 Grill Me — Round [N]

**Q1: [Decision Title]**
[Context, options, or tradeoffs]
👉 **Recommended:** [Specific recommendation + short rationale]

---

**Q2: [Decision Title]**
[Context, options, or tradeoffs]
👉 **Recommended:** [Specific recommendation + short rationale]
```

---

## 4. Session Completion & Transition to Plan

The grilling session ends when **the frontier is empty**:
- Every branch of the design tree has been explored.
- No hidden assumptions remain.
- All technical and functional tradeoffs are settled.

Once complete:
1. Present a concise **Summary of Agreed Decisions & Execution Plan**.
2. Ask for a final confirmation before touching any code or making edits.

