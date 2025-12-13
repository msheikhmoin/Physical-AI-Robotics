# Data Model for Physical AI Book Content

This document outlines the conceptual data model for the content of the Physical AI and Humanoid Robotics book, as it will be organized and managed within the Docusaurus framework. The model focuses on the hierarchical structure and key attributes of the book's components.

## Entities

### 1. Book

The overarching entity representing the entire publication.

*   **Attributes**:
    *   `Title`: "Physical AI and Humanoid Robotics"
    *   `Author(s)`: [To be determined]
    *   `Version`: [e.g., 1.0.0]
    *   `Publication_Date`: [To be determined]
    *   `Total_Word_Count`: 5,000-7,000 words (validation rule)
    *   `Total_Sources`: At least 15 academic sources (validation rule)

### 2. Module

A major division of the book, grouping related chapters. The Constitution specifies 4 modules.

*   **Attributes**:
    *   `Module_Number`: Integer (1-4)
    *   `Title`: Descriptive title of the module (e.g., "Foundations of Physical AI")
    *   `Description`: Brief overview of the module's scope.
    *   `Chapters`: Collection of Chapter entities (composed of 3 chapters each, validation rule).

### 3. Chapter

A subdivision within a module, focusing on a specific topic. Each module contains 3 chapters.

*   **Attributes**:
    *   `Chapter_Number`: Integer (1-3 within a module)
    *   `Title`: Descriptive title of the chapter
    *   `Flesch_Kincaid_Grade_Level`: 10-12 (validation rule)
    *   `Content`: Markdown text, including sections, figures, and citations.
    *   `Sections`: Collection of Section entities.
    *   `Word_Count`: Integer (validation rule: contributes to total book word count).
    *   `Sources`: List of Source entities cited within the chapter.

### 4. Section

A subsection within a chapter, detailing a particular aspect of the chapter's topic.

*   **Attributes**:
    *   `Title`: Heading for the section.
    *   `Content`: Markdown text.
    *   `Word_Count`: Integer.

### 5. Source

A reference cited within the book, adhering to APA style.

*   **Attributes**:
    *   `APA_Citation`: Formatted string (validation rule: strict APA 7th edition).
    *   `Type`: (e.g., Journal Article, Book, Conference Paper, Website)
    *   `Peer_Reviewed`: Boolean (validation rule: at least 50% of total sources).
    *   `URL`/`DOI`: Link to the source.

## Relationships

*   `Book` **contains** `Modules` (1:N)
*   `Module` **contains** `Chapters` (1:N)
*   `Chapter` **contains** `Sections` (1:N)
*   `Chapter` **cites** `Sources` (1:N)
*   `Section` **cites** `Sources` (1:N) - implicitly through chapter.

## Implementation within Docusaurus

*   **Modules & Chapters**: Will be mapped to directories and Markdown files within the `my-website/docs/` folder (e.g., `my-website/docs/module1/chapter1.md`).
*   **Navigation**: `sidebars.ts` will define the hierarchical navigation based on Modules and Chapters.
*   **Metadata**: Frontmatter in Markdown files can be used for chapter-specific metadata (e.g., `title`, `description`).
*   **Citations**: Managed either manually within Markdown following APA style or using a Docusaurus plugin for bibliography if available and suitable.
