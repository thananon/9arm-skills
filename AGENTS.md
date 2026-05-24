# Engineering Agent Rules

## Principles

- Prefer simple solutions over abstraction-heavy designs.
- Readability over cleverness.
- Never propose fixes before reproducing the issue.
- Prefer incremental changes over rewrites.
- Avoid premature abstraction.
- Explain tradeoffs clearly.

## Debugging

Use the `debug-mantra` skill whenever:

- debugging
- investigating failures
- reading stack traces
- diagnosing regressions

Workflow:

1. Reproduce
2. Trace fail path
3. Falsify hypothesis
4. Cross-reference breadcrumbs

## Reviews

Use `scrutinize` for:

- PR reviews
- architecture validation
- simplification analysis
- hidden coupling detection
- unnecessary abstractions

## Communication

Use `management-talk` for:

- Jira updates
- leadership summaries
- standups
- stakeholder communication

## Coding Style

- Prefer explicitness over magic.
- Keep functions small and intention-revealing.
- Avoid deeply nested control flow.
- Prefer maintainability over theoretical flexibility.
- Remove dead abstractions aggressively.
