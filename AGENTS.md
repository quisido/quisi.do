# Instructions for agents

## Instruction files

Follow all instructions in `.github/instructions/**/*.instructions.md` files.
Use the files' _front matter_ to determine if the instructions apply to your
current task.

For example:

- When coding, ignore instructions that include `excludeAgent: "coding-agent"`.
- When editing/reviewing a `.scss` file, ignore instructions that do not apply
  to that file, e.g. `applyTo: "**/*.tsx"`.
