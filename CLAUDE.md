Skills are direct children of `skills/` so Codex plugin validation and discovery can load them:

- `debug-mantra/`
- `post-mortem/`
- `scrutinize/`
- `management-talk/`

Every skill under `skills/` must have a reference in the top-level `README.md`. The Codex plugin manifest lives at `.codex-plugin/plugin.json` and points at `./skills/`.

Each skill entry in the top-level `README.md` must link the skill name to its `SKILL.md`.
