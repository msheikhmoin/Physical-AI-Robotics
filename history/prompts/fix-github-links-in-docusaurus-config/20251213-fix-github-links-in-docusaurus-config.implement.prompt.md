---
id: 20251213-fix-github-links-in-docusaurus-config
title: fix-github-links-in-docusaurus-config
stage: implement
date: 2025-12-13
surface: CLI
model: Gemini
feature: physical-ai-robotics-capstone
branch: N/A
user: User
command: /sp.implement
labels: [implement, docusaurus, config, github, links]
links:
  spec: N/A
  ticket: N/A
  adr: N/A
  pr: N/A
files:
- path: my-website/docusaurus.config.ts
  status: modified
tests: N/A
---

## Prompt

/sp.implement GitHub link error ko theek karo: 1. docusaurus.config.js mein jahan bhi GitHub ka link (href) hai, usay badal kar https://github.com/ kar do. 2. Jab main apni repository bana loon ga, tab hum exact link wahan daal denge.

## Response snapshot

Modified `my-website/docusaurus.config.ts` to change all occurrences of GitHub links (href) from `https://github.com/your-github-username/Robotics` to `https://github.com/`. Noted the manual deletion of `tutorial-basics` and `tutorial-extras` is still required.

## Outcome

- ✅ Impact: Corrected GitHub links in Docusaurus configuration for placeholder purposes.
- 🧪 Tests: N/A
- 📁 Files: Modified my-website/docusaurus.config.ts.
- 🔁 Next prompts: User needs to manually delete folders. User may review updated site or provide exact GitHub repository link later.
- 🧠 Reflection: Successfully updated GitHub links as requested. The persistent issue of shell command failures for directory deletion remains a point of user intervention.

## Evaluation notes (flywheel)

- Failure modes observed: run_shell_command for directory deletion.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
