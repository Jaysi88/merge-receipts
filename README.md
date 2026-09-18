# Merge Receipts

**“Tests pass” is not a receipt if you did not run them on this branch.**

An [Agent Skill](https://agentskills.io/specification) that blocks merge/done until this change has command output: test, build, and (if it has a UI) a preview URL.

```bash
npx skills add Jaysi88/merge-receipts
```

Then say **merge receipts**, **ready to merge**, or **prove this PR**.

Pairs with [ghost-check](https://github.com/Jaysi88/ghost-check) (claims) and [agent-skills](https://github.com/Jaysi88/agent-skills) `ship-check` (build). This one is the merge gate.

## Try it

```bash
git clone https://github.com/Jaysi88/merge-receipts.git
cd merge-receipts
node skills/merge-receipts/scripts/gate.mjs examples/bare
```

A repo with no test script and no CI should fail.

## License

[MIT](./LICENSE) © Jay Si Thu Tun ([Jaysi88](https://github.com/Jaysi88))
