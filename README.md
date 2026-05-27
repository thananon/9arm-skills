# 9arm-skills

<p><strong>Agent skills you can actually load — clone, customize, ship.</strong><br/>
Engineering · Productivity · Debugging · Post-mortems · Code Review · Management Talk</p>

<p>
<strong>Works with Claude Code · Claude Desktop · Any SKILL.md-compatible agent</strong>
</p>

<p>
<a href="https://github.com/thananon/9arm-skills/stargazers"><img src="https://img.shields.io/github/stars/thananon/9arm-skills?style=flat-square&color=FFD700" alt="Stars"></a>
<a href="https://github.com/thananon/9arm-skills/network/members"><img src="https://img.shields.io/github/forks/thananon/9arm-skills?style=flat-square&color=4FC3F7" alt="Forks"></a>
<a href="https://github.com/thananon/9arm-skills/graphs/contributors"><img src="https://img.shields.io/github/contributors/thananon/9arm-skills?style=flat-square&color=22C55E" alt="Contributors"></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/thananon/9arm-skills?style=flat-square&color=8B5CF6" alt="License"></a>
<img src="https://img.shields.io/github/last-commit/thananon/9arm-skills?style=flat-square&color=F97316" alt="Last Commit">
</p>

---

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

### With `npx skills` (Recommended — works for every agent)

```bash
npx skills add thananon/9arm-skills
```

### Alternative — Bash script

For my own dev loop — symlink every shippable skill into `~/.claude/skills/`:

```bash
./scripts/link-skills.sh
```

List every `SKILL.md` in the repo:

```bash
./scripts/list-skills.sh
```

## Reference

### Engineering

- **[debug-mantra](./skills/engineering/debug-mantra/SKILL.md)** — Four-mantra debugging discipline: reproduce → trace the fail path → falsify the hypothesis → cross-reference every breadcrumb. Recites verbatim at session start, then applies in order before any fix.
- **[post-mortem](./skills/engineering/post-mortem/SKILL.md)** — Write the canonical engineering record of a fixed bug — root cause, mechanism, fix, validation, how it slipped through. Engineer-audience; refuses to draft without a reliable repro, known cause, and validated fix.
- **[scrutinize](./skills/engineering/scrutinize/SKILL.md)** — Outsider-perspective end-to-end review of a plan, PR, or code change. Questions intent (is there a simpler way?), traces the actual code path, and verifies the change does what it claims. Output is concise, actionable, with rationale.

### Productivity

- **[management-talk](./skills/productivity/management-talk/SKILL.md)** — Rewrite engineer-to-engineer content for engineering-org leadership and shape it for the channel it's going to (JIRA, Slack, async standup, email, meeting talking-points).

### Misc

_(none yet)_
