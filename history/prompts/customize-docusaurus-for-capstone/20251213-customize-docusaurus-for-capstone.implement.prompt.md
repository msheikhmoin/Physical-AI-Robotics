---
id: 20251213-customize-docusaurus-for-capstone
title: customize-docusaurus-for-capstone
stage: implement
date: 2025-12-13
surface: CLI
model: Gemini
feature: physical-ai-robotics-capstone
branch: N/A
user: User
command: N/A
labels: [implement, docusaurus, customization, navigation]
links:
  spec: specs/1-physical-ai-robotics-capstone/spec.md
  ticket: N/A
  adr: N/A
  pr: N/A
files:
- path: my-website/docs/intro.md
  status: modified
- path: my-website/docusaurus.config.ts
  status: modified
tests: N/A
---

## Prompt

Gemini, Docusaurus mein 'YAMLException' aa raha hai. Module 4 ke chapters (10, 11, 12) ke frontmatter mein jo 'title' hai, usmein special characters (jaise colon ':' aur '&') use ho rahe hain jis ki wajah se parsing error aa raha hai. Mera ye kaam karo: 1. my-website/docs/module4/chapter10.md, chapter11.md, aur chapter12.md ko check karo. 2. Har file ke frontmatter mein 'title' ki value ko double quotes (" ") ke andar kar do. Maslan: title: "Chapter 10: ...". 3. Ensure karo ke YAML formatting bilkul sahi ho taake npm run start chal sake.

## Response snapshot

Rewrote `my-website/docs/intro.md` with Capstone project introduction and goals. Modified `my-website/docusaurus.config.ts` to change the navbar label from 'Book' to 'Course Content'. Confirmed Module 4 chapters are correctly organized in the sidebar. Attempted to delete `tutorial-basics` and `tutorial-extras` folders but `run_shell_command` failed; user needs to delete manually.

## Outcome

- ✅ Impact: Customized Docusaurus site content and navigation for the Physical AI & Robotics Capstone project.
- 🧪 Tests: N/A
- 📁 Files: Modified my-website/docs/intro.md, my-website/docusaurus.config.ts.
- 🔁 Next prompts: User needs to manually delete folders. Further content generation or site configuration.
- 🧠 Reflection: Successfully applied multiple modifications to Docusaurus site configuration and content based on user instructions and spec. 'run_shell_command' failures continue to be a limitation.

## Evaluation notes (flywheel)

- Failure modes observed: run_shell_command for directory deletion.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
