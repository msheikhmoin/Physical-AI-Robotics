1. Overview

This capstone focuses on enabling a humanoid robot to execute a user’s voice command through perception, planning, navigation, and manipulation. Students will build an embodied AI pipeline that works across ROS 2, simulation (Gazebo or Isaac Sim), and optional real hardware.

2. Learning Outcomes

Students completing this capstone will be able to:

Build a full Physical AI stack integrating sensing, planning, and control.

Implement voice-to-task translation using cloud/on-device LLMs.

Perform navigation and object identification in simulation.

Execute manipulation tasks using humanoid/legged robots.

Work with Jetson (Orin Nano/NX) and NVIDIA GPU systems (RTX 4070 Ti+).

Compare on-prem vs cloud robotics deployment.

3. Project Scenario

The robot must:

Receive a voice command.

Convert it into a structured task plan.

Navigate the environment using SLAM or Nav2.

Identify relevant objects with perception models.

Manipulate or interact with the objects as required.

4. Hardware Assumptions

NVIDIA RTX 4070 Ti or higher

NVIDIA Jetson Orin Nano or Orin NX

Humanoid or legged robot system (e.g., Unitree G1, Unitree Go2)

Optional: RealSense depth camera, microphones

5. Timeline (12–13 Weeks)

Weeks 1–2: Foundations (ROS2, Isaac Sim, task pipelines)

Weeks 3–6: Voice → Plan → Skill execution

Weeks 7–10: Navigation + perception + manipulation

Weeks 11–13: Final integration, testing, and demo

6. Constraints

❌ No full code samples

❌ No complete lesson plans

✔️ Deliverable must be a hackathon-ready specification

✔️ Clear acceptance criteria and testing strategy

✔️ Hardware-agnostic as much as possible

7. Clarification Decisions (User Chose: B)

Humanoid Robot Model:
Chosen model: Generic medium-sized humanoid model (not brand-specific).

Voice Command Source & Processing:
Chosen setup: Cloud-based voice → LLM pipeline (OpenAI / Gemini / Groq etc.).

8. Deliverable

A complete capstone project spec ready for planning (/sp.plan) including:

Architecture

Task pipeline

Perception + navigation design

Manipulation design

Risk & quality controls