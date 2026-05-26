# 9arm-skills

Agent skills for Claude Code and OpenCode.

## Layout

Skills live under `skills/`, grouped into buckets:

- `engineering/` — daily code work
- `productivity/` — daily non-code workflow tools
- `misc/` — kept around but rarely used
- `personal/` — tied to my own setup, not promoted
- `in-progress/` — drafts not yet ready to ship
- `deprecated/` — no longer used

Each skill is its own directory containing a `SKILL.md` (with YAML frontmatter — `name` and `description`) and any bundled scripts or reference files.

## Install

For my own dev loop — symlink every shippable skill into `~/.claude/skills/`:

```bash
./scripts/link-skills.sh
```

List every `SKILL.md` in the repo:

```bash
./scripts/list-skills.sh
```

## OpenCode

Tell OpenCode:

```
Fetch and follow instructions from https://raw.githubusercontent.com/thananon/9arm-skills/refs/heads/main/.opencode/INSTALL.md
```

Or add to `opencode.json`:

```json
{
  "plugin": ["9arm-skills@git+https://github.com/thananon/9arm-skills.git"]
}
```

### Using alongside Superpowers (Recommended)

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "9arm-skills@git+https://github.com/thananon/9arm-skills.git"
  ]
}
```

Superpowers provides the workflow (brainstorming → planning → TDD), while 9arm-skills provides domain-specific skills that agents can call during execution.

## Reference

### Engineering

- **[debug-mantra](./skills/engineering/debug-mantra/SKILL.md)** — Four-mantra debugging discipline: reproduce → trace the fail path → falsify the hypothesis → cross-reference every breadcrumb. Recites verbatim at session start, then applies in order before any fix.
- **[post-mortem](./skills/engineering/post-mortem/SKILL.md)** — Write the canonical engineering record of a fixed bug — root cause, mechanism, fix, validation, how it slipped through. Engineer-audience; refuses to draft without a reliable repro, known cause, and validated fix.
- **[scrutinize](./skills/engineering/scrutinize/SKILL.md)** — Outsider-perspective end-to-end review of a plan, PR, or code change. Questions intent (is there a simpler way?), traces the actual code path, and verifies the change does what it claims. Output is concise, actionable, with rationale.

### Productivity

- **[management-talk](./skills/productivity/management-talk/SKILL.md)** — Rewrite engineer-to-engineer content for engineering-org leadership and shape it for the channel it's going to (JIRA, Slack, async standup, email, meeting talking-points).

### Misc

_(none yet)_
