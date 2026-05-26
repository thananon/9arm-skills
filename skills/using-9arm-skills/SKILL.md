---
name: using-9arm-skills
description: Use when starting any conversation — introduces 9arm-skills available to agents
---

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a 9arm-skill might apply to what you are doing, you ABSOLUTELY MUST invoke it.
</EXTREMELY-IMPORTANT>

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

## How to Access Skills

**In OpenCode:** Use the native `skill` tool. When you invoke a skill, its content is loaded and presented to you—follow it directly.

## Tool Mapping for OpenCode

When skills reference tools you don't have, substitute OpenCode equivalents:
- `TodoWrite` → `todowrite`
- `Task` tool with subagents → Use OpenCode's subagent system (@mention)
- `Skill` tool → OpenCode's native `skill` tool
- `Read`, `Write`, `Edit`, `Bash` → Your native tools

Use OpenCode's native `skill` tool to list and load skills.
