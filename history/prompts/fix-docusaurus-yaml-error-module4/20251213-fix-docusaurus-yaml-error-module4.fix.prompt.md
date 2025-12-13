---
id: 20251213-fix-docusaurus-yaml-error-module4
title: fix-docusaurus-yaml-error-module4
stage: fix
date: 2025-12-13
surface: CLI
model: Gemini
feature: N/A
branch: N/A
user: User
command: N/A
labels: [fix, docusaurus, yaml, frontmatter]
links:
  spec: N/A
  ticket: N/A
  adr: N/A
  pr: N/A
files:
- path: my-website/docs/module4/chapter10.md
  status: modified
- path: my-website/docs/module4/chapter11.md
  status: modified
- path: my-website/docs/module4/chapter12.md
  status: modified
tests: N/A
---

## Prompt

Gemini, Docusaurus mein 'YAMLException' aa raha hai. Module 4 ke chapters (10, 11, 12) ke frontmatter mein jo 'title' hai, usmein special characters (jaise colon ':' aur '&') use ho rahe hain jis ki wajah se parsing error aa raha hai. Mera ye kaam karo: 1. my-website/docs/module4/chapter10.md, chapter11.md, aur chapter12.md ko check karo. 2. Har file ke frontmatter mein 'title' ki value ko double quotes (" ") ke andar kar do. Maslan: title: "Chapter 10: ...". 3. Ensure karo ke YAML formatting bilkul sahi ho taake npm run start chal sake.

## Response snapshot

Successfully enclosed the 'title' values in double quotes within the frontmatter of `my-website/docs/module4/chapter10.md`, `chapter11.md`, and `chapter12.md` to resolve `YAMLException` caused by special characters. The YAML formatting has been corrected.

## Outcome

- ✅ Impact: Resolved YAML parsing error in Docusaurus frontmatter, enabling proper site build.
- 🧪 Tests: N/A
- 📁 Files: Modified my-website/docs/module4/chapter10.md, chapter11.md, chapter12.md.
- 🔁 Next prompts: User can now proceed with running Docusaurus.
- 🧠 Reflection: Directly addressed the user's error report and applied a precise fix. This highlights the importance of YAML syntax adherence with special characters.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
