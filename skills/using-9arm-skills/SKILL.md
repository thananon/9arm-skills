---
name: using-9arm-skills
description: Use when starting any conversation — establishes how to find and use 9arm-skills, requiring skill tool invocation before ANY response including clarifying questions
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a 9arm-skill might apply to what you are doing, you ABSOLUTELY MUST invoke it.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Instruction Priority

9arm-skills supplement your core workflows. User instructions always take precedence:

1. **User's explicit instructions** — highest priority
2. **Active skills** — override default behavior where they conflict
3. **Default system prompt** — lowest priority

## How to Access Skills

**In OpenCode:** Use the native `skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly. Never use the Read tool on skill files.

## Using Skills

### The Rule

**Invoke relevant or requested skills BEFORE any response or action.** Even a 1% chance a skill might apply means that you should invoke the skill to check. If an invoked skill turns out to be wrong for the situation, you don't need to use it.

### Red Flags

These thoughts mean STOP—you're rationalizing:

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |

### Skill Priority

When multiple skills could apply, use this order:

1. **Process skills first** (debugging, review) — these determine HOW to approach the task
2. **Domain skills second** (debug-mantra, scrutinize, management-talk) — these provide specific techniques

"Debug this issue" → debug-mantra first, then post-mortem after fix.
"Review this PR" → scrutinize first.

### Skill Types

**Rigid** (debug-mantra, post-mortem): Follow exactly. Don't adapt away discipline.

**Flexible** (scrutinize, management-talk): Adapt principles to context.

The skill itself tells you which.

### User Instructions

Instructions say WHAT, not HOW. "Debug this" or "Review this PR" doesn't mean skip workflows.

## Available Skills

### Engineering

- **[debug-mantra](../engineering/debug-mantra/SKILL.md)** — Four-mantra debugging: reproduce → trace the fail path → falsify the hypothesis → cross-reference every breadcrumb. Use before any fix.
- **[post-mortem](../engineering/post-mortem/SKILL.md)** — Write the canonical engineering record of a fixed bug — root cause, mechanism, fix, validation, how it slipped through.
- **[scrutinize](../engineering/scrutinize/SKILL.md)** — Outsider-perspective end-to-end review of a plan, PR, or code change. Questions intent, traces the actual code path, verifies the change does what it claims.

### Productivity

- **[management-talk](../productivity/management-talk/SKILL.md)** — Rewrite engineer-to-engineer content for engineering-org leadership. Shapes content for the channel (JIRA, Slack, async standup, email, meeting talking-points).

## When to Use

Check these skills when your task matches their domain:

| Situation | Skill |
|---|---|
| Debugging any issue | debug-mantra |
| Bug is fixed, need record | post-mortem |
| Reviewing a plan or PR | scrutinize |
| Writing for management | management-talk |

These skills supplement your core workflows — use them in addition to, not instead of, your standard skills.

## Tool Mapping for OpenCode

When skills reference tools you don't have, substitute OpenCode equivalents:
- `TodoWrite` → `todowrite`
- `Task` tool with subagents → Use OpenCode's subagent system (@mention)
- `Skill` tool → OpenCode's native `skill` tool
- `Read`, `Write`, `Edit`, `Bash` → Your native tools

Use OpenCode's native `skill` tool to list and load skills.
