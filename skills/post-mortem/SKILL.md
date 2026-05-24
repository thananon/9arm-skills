---
name: post-mortem
description: Write the canonical engineering record of a fixed bug — root cause, mechanism, fix, validation, and how it slipped through. Engineer-audience, code identifiers welcome. Use after a debug session lands a fix, before closing the ticket. Trigger on /post-mortem, when the user says "write the post-mortem / postmortem / RCA / root cause analysis", "document this fix", "write up the root cause", "close out this bug with a writeup", or hands you a fixed-and-validated bug and asks for the writeup.
---

# Post-mortem

The canonical engineering record of a bug fix. Written **after** debugging lands a real fix, **for** other engineers (and future-you, who will have forgotten everything in 6 months). Code identifiers are welcome here — this is the artifact that lets the next person recover the mental model fast.

For the up-the-org version of this same content, hand the finished post-mortem to [`management-talk`](../management-talk/SKILL.md). They compose: post-mortem owns the engineering truth, management-talk reframes it for leadership.

## When to invoke

- "/post-mortem"
- "write the post-mortem / postmortem / RCA / root-cause analysis"
- "document this fix" / "write up the root cause" / "close out this bug with a writeup"
- After a debug session has clearly landed a fix, proactively offer to draft one.

## When NOT to use

- **Bug not fixed yet, or fix not validated.** A post-mortem of a hypothesis is misleading. Refuse and tell the user what's missing.
- **Customer-visible outage / incident.** Those need a separate incident report (timeline, blast radius, paging history, comms). This skill is bug-fix scope. Flag and confirm before producing one.
- **Trivial fix** (typo, obvious one-liner). The PR description is the record. Don't manufacture ceremony.

## Required inputs — refuse to draft without these

Before writing a single line, confirm all four. If any are missing, list what's missing and stop:

- [ ] **Reliable repro** exists (not "happens sometimes" — a deterministic or high-rate-flake repro the next person can run).
- [ ] **Root cause is known** (the mechanism is identified, not a hypothesis).
- [ ] **Fix is identified** (PR / commit / branch pointer).
- [ ] **Fix is validated** (the original repro now passes; the customer workload / failing test now succeeds).

These map directly to `debug-mantra` steps 1–4. If you came in via `debug-mantra`, the breadcrumb ledger from step 4 is your raw material — pull from it.

## Structure

Use these blocks in this order. **Summary, Root cause, Fix, and Validation are mandatory.** The rest are conditional but usually present.

### 1. Summary _(mandatory)_
One paragraph. What broke, in user/workload terms. What fixed it, in one sentence. JIRA key, PR number, owner. A reader who stops here should have the right answer.

### 2. Symptom
What was actually observed. Test output, error message, log line, perf number, customer report. Concrete identifiers — don't paraphrase the failure mode.

### 3. Root cause _(mandatory)_
The actual bug mechanism. **Code identifiers welcome and expected** — function names, file paths, struct fields, branch conditions, commit SHAs of the offending change. Walk the cause chain end-to-end. This is the most expensive section and the reason the post-mortem exists at all. Future-you will live or die by how clearly you write this.

### 4. Why it produced the symptom
Link the root cause to the symptom. Often non-obvious — the bug is in `tadaLaunchPrepare` but the visible failure is a customer training run hanging hours later. Walk the chain so a reader who only knows the symptom can connect it back to the cause without re-deriving it.

### 5. Fix _(mandatory)_
What changed and **why this change addresses the root cause** rather than hiding the symptom. Link to PR / commit. If a previous fix attempt papered over the symptom, name it and explain what was wrong with it — that history is part of the cause.

### 6. How it was found
Short. The debugging path:
- What repro made it deterministic.
- What tools cracked it (debugger, source tracing, knob enumeration, in-code instrumentation — the `debug-mantra` step 2 cascade).
- Hypotheses tried and rejected, with the one-line reason each was rejected. (Pull from the breadcrumb ledger.)
- The single experiment that confirmed the cause.

This section is for the next debugger — make it learnable.

### 7. Why it slipped through
What allowed this bug to reach the branch / release / customer. Pick the real reason:
- CI gap (no test exercises this path / configuration).
- Latent code (correct when written, broken by a later change in a different file).
- Workload gap (no real workload reached this code path until now).
- Incomplete prior fix (defensive check hid the symptom; root cause untouched).
- Review miss (the change was reviewable; the implication wasn't).

If the honest answer is "no good reason — we should have caught this," say so. **Blameless** — describe the gap, not the person.

### 8. Validation _(mandatory)_
How we know the fix works. Concrete:
- Original failing test now passes (test name, link).
- Customer workload now completes (workload identifier, run link).
- Perf regression resolved (number before, number after).
- Stress / soak / fuzz run completed clean (duration, scale).
- Other affected configurations / workloads also tested.

If you only validated one configuration, say so explicitly — *"validated on Llama-2-70B / 8 GPUs / DeepSpeed; not retested on other workloads."* Don't imply broader coverage than you actually have.

### 9. Action items / follow-ups
Concrete next-steps that aren't in the fix PR itself. Each item: what + owner + tracking artifact.

- Regression test added at \<seam\>. (Owner, test name.)
- Refactor to prevent class of bug. (Owner, ticket.)
- CI gap closed: \<new check\>. (Owner, PR.)
- Doc / runbook updated. (Owner, link.)
- Related ticket filed for \<adjacent issue you noticed\>. (Owner, key.)

If there are no action items, write *"None — the fix is sufficient and no class-of-bug follow-up is warranted."* Don't manufacture action items to look thorough.

## Tone

This is engineer-to-engineer. Different from `management-talk`:

- **Code identifiers are first-class.** `tadaLaunchPrepare`, `tada/prim.h::syncWaitPeer`, `scratchBuf`, commit SHAs, line numbers — keep them. The whole point is that future engineers can grep their way back to the change.
- **Mechanism over narrative.** Walk the actual cause chain. Don't soften it into "a synchronization issue" — say which function skipped which event under which gate.
- **Active voice, concrete subjects, short paragraphs.** Same rule as everywhere else.
- **No hedging.** "We believe" / "appears to" / "may have" — drop. State it or don't write it.
- **Blameless.** Describe the bug, the gap, and the fix. Never "X should have caught this." The CI gap is the failure mode, not the person.
- **No advocacy.** A post-mortem records what happened and what's next. If you want to argue for a refactor, that's a separate proposal — link to it from the action items.

## Output flow

1. **Confirm all four required inputs are satisfied.** If any are missing, list them and stop. Do not draft.
2. **Confirm where it goes** (default: JIRA comment on the source ticket). Other valid destinations: PR description, `docs/postmortems/<ticket>.md`, internal wiki page. The shape is the same — only the wrapping changes.
3. **Produce the draft** as a single chat block.
4. **Sign-off before posting.** If posting back to JIRA, show the exact ADF payload, wait for explicit *"post it"* / *"go ahead"* / *"yes,"* then `POST /rest/api/3/issue/<KEY>/comment`. Print-only output needs no approval.
5. **Offer the management-talk handoff:** *"Want a leadership-flavored version? I can hand this to `management-talk`."* Don't do it automatically.

## Worked example — Tada hang in dumbModel (JIRA-12345)

> **Summary.** Tada's single-stream fast-path skipped a required cross-stream synchronization, causing kernels to launch before scratch-buffer writes were visible. Triggered reliably by dumbModel on LLM-7B fine-tuning, hanging the workload at every eval step. Fixed by removing the unsafe fast-path and tightening a device-side check. JIRA-12345, PR org/platform#5751, owner Alex (Tada team).
>
> **Symptom.** 8-GPU LLM-7B fine-tuning under dumbModel hung indefinitely at the first eval step. No error, no timeout — busy-spin in `tadaKernel_AllReduce_f32_RING`. Reproduced on every run.
>
> **Root cause.** The single-stream fast-path in `tadaLaunchPrepare` / `tadaLaunchKernel` / `tadaLaunchFinish` (gated on `scheduler->numStreams == 1 && !plan->persistent`) skipped the cross-stream event between `launchStream` and `handle->shared->deviceStream`. dumbModel hits this gate exactly. The kernel was launched before the IPC publish / scratch-buffer writes on `deviceStream` (which populate `scratchBuf`) were visible to `launchStream`. In the kernel: `scratchBuf == NULL` → stray pointer dereference → ring ready-flag read from garbage memory → thread spins forever waiting for a ready signal that will never arrive.
>
> **Why it produced the symptom.** The hang lives in the all-reduce ring waitloop, which is the last visible thing in the call stack — but the actual bug is at launch-prep, several frames earlier. The skipped sync is silent until a workload triggers the exact gate (single-stream, non-persistent), and dumbModel's reduce-scatter pattern hits it at every eval step.
>
> **Fix.** PR #5751 removes the single-stream fast-path entirely (the saving was negligible vs. the safety it bypassed) and adds a device-side null check on `scratchBuf` before dereference, so the same class of bug fails loudly instead of silently spinning. A previous attempt (PR #5612) added a host-side defensive check after IPC publish that hid the symptom in some paths but left the underlying race in place — that change is also reverted.
>
> **How it was found.** Reproducer narrowed from "8-GPU LLM-7B hangs sometimes" to a deterministic 30s repro by pinning to a single eval step on a 2-GPU subset. Initial hypothesis: kernel launch ordering on `launchStream`. Disproved by the debugger — the kernel was correctly enqueued. Second hypothesis: scratch-buffer init race. Confirmed by adding `[DBG-7af3]` instrumentation in `tadaLaunchPrepare` printing `scratchBuf` and a `deviceStream` event-record timestamp; the launch happened before the publish completed. Single experiment that nailed it: forcing `numStreams = 2` made the bug disappear, isolating the gate.
>
> **Why it slipped through.** Latent code path. The single-stream fast-path was added in March under the assumption that dumbModel paths always took the multi-stream route. That assumption was true at the time. A May change to dumbModel's launcher began collapsing eval steps to a single stream — at which point the gate flipped. Tada's CI did not exercise the single-stream + IPC + scratch-buffer combination; the customer workload was the first to hit it.
>
> **Validation.** Original LLM-7B / 8-GPU / dumbModel workload now completes a full eval pass cleanly (3 consecutive 2-hour runs). `tada-tests` `all_reduce_perf` regression suite green. Soak run: 6 hours on 8 GPUs, no hang. Not retested on other model sizes or non-dumbModel workloads — both go through the multi-stream path and were never affected.
>
> **Action items.**
> - Regression test added: `tests/single_stream_ipc_publish_test.cpp` exercising the previously-uncovered gate. (Alex, merged in PR #5751.)
> - CI gap: add a single-stream + IPC matrix entry to nightly. (Alex, JIRA-12346.)
> - Doc update: Tada launch-fast-path invariants documented in `docs/launch_synchronization.md`. (Alex, PR #5752.)
> - Related: audit other `numStreams == 1` fast-paths for the same class of bug. (Filed as JIRA-12347.)

What this post-mortem does that the management-talk version didn't:

- Names every code identifier (`tadaLaunchPrepare`, `scratchBuf`, `numStreams`, `handle->shared->deviceStream`).
- Walks the cause chain end-to-end so the reader can grep their way to the offending lines.
- Names the *prior fix attempt* (PR #5612) and what was wrong with it.
- Documents the *exact experiment* that nailed the cause (`numStreams = 2` made it disappear).
- States validation coverage honestly — "not retested on other model sizes" is information, not a hole.
- Action items have owners and tracking artifacts.

## Rules

- **Refuse to draft without all four required inputs.** A post-mortem of a hypothesis is worse than no post-mortem.
- **Never invent root cause, owner, validation runs, or action items.** If a section's facts aren't there, ask. Don't fill the gap with plausible prose.
- **Never strip code identifiers** in the engineering record. They are the index. The leadership reframe is `management-talk`'s job, not yours.
- **Blameless.** Describe gaps and bugs, never people.
- **State validation coverage honestly.** If you only tested one config, say so. Implying broader coverage is the failure mode that breeds repeat regressions.
- **Get sign-off before posting to JIRA.** Print-only output needs no approval. Never post to non-JIRA destinations from this skill.
- **One iteration is normal, three is a smell.** If the user is still revising on the third pass, ask what specific section is wrong — don't keep tweaking blindly.
