# 9arm-skills

Agent skills packaged for Codex.

## Layout

Skills live as direct children of `skills/` so Codex plugin validation and discovery can load them:

- `debug-mantra/`
- `post-mortem/`
- `scrutinize/`
- `management-talk/`

Each skill is its own directory containing a `SKILL.md` (with YAML frontmatter — `name` and `description`) and any bundled scripts or reference files.

## Install

As a Codex plugin, use the metadata in `.codex-plugin/plugin.json`.

For local development — symlink every shippable skill into `~/.agents/skills/`:

```bash
./scripts/link-codex-skills.sh
```

For Claude Code compatibility — symlink every shippable skill into `~/.claude/skills/`:

```bash
./scripts/link-skills.sh
```

List every `SKILL.md` in the repo:

```bash
./scripts/list-skills.sh
```

## Reference

### Engineering

- **[debug-mantra](./skills/debug-mantra/SKILL.md)** — Four-mantra debugging discipline: reproduce → trace the fail path → falsify the hypothesis → cross-reference every breadcrumb. Recites verbatim at session start, then applies in order before any fix.
- **[post-mortem](./skills/post-mortem/SKILL.md)** — Write the canonical engineering record of a fixed bug — root cause, mechanism, fix, validation, how it slipped through. Engineer-audience; refuses to draft without a reliable repro, known cause, and validated fix.
- **[scrutinize](./skills/scrutinize/SKILL.md)** — Outsider-perspective end-to-end review of a plan, PR, or code change. Questions intent (is there a simpler way?), traces the actual code path, and verifies the change does what it claims. Output is concise, actionable, with rationale.

### Productivity

- **[management-talk](./skills/management-talk/SKILL.md)** — Rewrite engineer-to-engineer content for engineering-org leadership and shape it for the channel it's going to (JIRA, Slack, async standup, email, meeting talking-points).

### Misc

_(none yet)_
