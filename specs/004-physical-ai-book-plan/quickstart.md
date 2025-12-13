# Quickstart Guide: Physical AI Book Project

This guide provides a quick overview of how to set up and run the Docusaurus-based Physical AI book project locally, and how to start contributing content.

## 1. Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18.0 or higher.
*   **npm** (Node Package Manager): Usually comes with Node.js.

## 2. Project Setup

1.  **Clone the Repository**:
    If you haven't already, clone the project repository to your local machine:
    ```bash
    git clone [repository-url]
    cd Robotics/my-website
    ```
    (Note: The Docusaurus project is located in the `my-website` subdirectory.)

2.  **Install Dependencies**:
    Navigate to the `my-website` directory and install the project's dependencies:
    ```bash
    cd my-website
    npm install
    ```

## 3. Running the Docusaurus Site Locally

To start the local development server:

```bash
npm run start
```
This command will open a new browser window to `http://localhost:3000`. As you make changes to the Markdown files or other Docusaurus configurations, the site will automatically reload.

## 4. Contributing Content

Book content is primarily written in Markdown and organized within the `my-website/docs/` directory.

*   **Create New Chapters/Sections**:
    *   Navigate to `my-website/docs/`.
    *   Create new directories for modules (e.g., `module1`, `module2`) and place Markdown files (e.g., `chapter1.md`, `chapter2.md`) within them.
    *   Ensure to update `my-website/sidebars.ts` to include your new content in the navigation.

*   **Markdown Features**: Docusaurus supports standard Markdown, MDX, and additional features like admonitions, tabs, and more. Refer to the [Docusaurus Markdown Features](https://docusaurus.io/docs/markdown-features) for detailed syntax.

*   **APA Citations**: All academic citations must follow APA style. Use appropriate citation managers or manual formatting to ensure correctness.

## 5. Building the Site for Deployment

To generate a static build of the site (for deployment to platforms like GitHub Pages):

```bash
npm run build
```
The generated static files will be placed in the `build` directory.

## 6. Deployment (e.g., GitHub Pages)

Refer to the Docusaurus deployment documentation for specific instructions based on your hosting provider. For GitHub Pages, typical steps involve configuring the `docusaurus.config.ts` and pushing the `build` output to a `gh-pages` branch.
