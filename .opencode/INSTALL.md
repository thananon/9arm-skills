# Installing 9arm-skills for OpenCode

## Prerequisites

- [OpenCode.ai](https://opencode.ai) installed

## Installation

Add 9arm-skills to the `plugin` array in your `opencode.json` (global or project-level):

```json
{
  "plugin": ["9arm-skills@git+https://github.com/thananon/9arm-skills.git"]
}
```

Restart OpenCode. The plugin installs through OpenCode's plugin manager and registers all skills.

### Using alongside Superpowers (Recommended)

If you also use Superpowers, list both plugins:

```json
{
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "9arm-skills@git+https://github.com/thananon/9arm-skills.git"
  ]
}
```

Superpowers provides the workflow (brainstorming → planning → TDD), while 9arm-skills provides domain-specific skills (debug-mantra, scrutinize, management-talk) that agents can call during execution.

## Usage

Use OpenCode's native `skill` tool:

```
use skill tool to list skills
use skill tool to load 9arm-skills:debug-mantra
```

## Verify

Ask OpenCode: "What 9arm-skills do you have available?"

Expected: It should list debug-mantra, post-mortem, scrutinize, and management-talk.

## Updating

OpenCode installs 9arm-skills through a git-backed package spec. If updates don't appear after a restart, clear OpenCode's package cache or reinstall the plugin.

To pin a specific version:

```json
{
  "plugin": ["9arm-skills@git+https://github.com/thananon/9arm-skills.git#v0.1.0"]
}
```

## Troubleshooting

### Plugin not loading

1. Check logs: `opencode run --print-logs "hello" 2>&1 | grep -i 9arm`
2. Verify the plugin line in your `opencode.json`
3. Make sure you're running a recent version of OpenCode

### Skills not found

1. Use `skill` tool to list what's discovered
2. Check that the plugin is loading (see above)

### Tool mapping

When skills reference Claude Code tools:
- `TodoWrite` → `todowrite`
- `Task` tool with subagents → Use OpenCode's subagent system (@mention)
- `Skill` tool → OpenCode's native `skill` tool
- `Read`, `Write`, `Edit`, `Bash` → Your native tools

## Getting Help

- Report issues: https://github.com/thananon/9arm-skills/issues
