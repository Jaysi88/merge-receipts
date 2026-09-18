---
name: merge-receipts
description: Block merge or “done” until this change has test, build, and preview receipts. Use before merging a PR, when an agent says tests pass or ready to merge, or the user says merge receipts, prove this PR, or receipts.
license: MIT
metadata:
  author: Jaysi88
  version: "1.0.0"
  repo: https://github.com/Jaysi88/merge-receipts
---

# Merge receipts

Previous-session memory is not a receipt. Only commands run **on this change**.

## Required receipts

| Kind | Passes when |
| --- | --- |
| test | exact command + exit 0 + tail pasted from this turn |
| build | exact command + exit 0 from this turn |
| preview | URL that loads the change, or N/A with a one-line why (library, CLI) |
| ask | diff covers what the user asked |

Missing any of the first two → **BLOCK**.

## Procedure

1. `node skills/merge-receipts/scripts/gate.mjs .` — structural holes (no test script, no CI).
2. Run the real test and build commands. Paste tails.
3. Report:

```
## Merge receipts
- Status: PASS | BLOCK
- Test: command → exit → one-line tail
- Build: command → exit → one-line tail
- Preview: URL | N/A — reason
- Ask covered: yes | no
```

## Do not

- Cite CI from `main` as proof of this branch
- Skip tests because “it’s a one-line change”
