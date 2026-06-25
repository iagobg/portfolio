Build a production-ready personal web-development portfolio for **Iago Bussoletti** using Next.js.

The portfolio should use an original interface inspired by the structure and interaction patterns of Visual Studio Code. It should resemble a developer workspace without becoming a literal screenshot, an unusable fake editor, or a direct copy of Microsoft branding.

The interface should make visitors feel as though they are exploring my projects inside a code editor:

* Projects behave like files in a workspace
* Project categories and tags can appear in an explorer panel
* Open project pages appear as editor tabs
* Project content appears in the main editor area
* Important actions can be exposed through a command palette
* Navigation and project status can appear in a status bar
* A small activity bar can switch between portfolio sections

Despite this visual metaphor, the website must remain:

* Easy to understand for visitors unfamiliar with VS Code
* Fully responsive
* Accessible
* SEO-friendly
* Fast
* Navigable through normal URLs
* Practical to extend using MDX
* Clearly recognizable as a portfolio rather than an actual code editor

## Primary objective

Create a modern portfolio that serves as an expandable hub for my software projects.

I currently have three projects, but the portfolio must be structured so I can add new projects without:

* Editing page components
* Updating a hardcoded project list
* Changing a database schema
* Performing migrations
* Manually creating routes
* Redesigning the interface

The portfolio should emphasize:

* The problem each project solves
* Architecture and implementation decisions
* Technical challenges
* Real-time and backend engineering
* Technologies used
* Lessons learned
* Screenshots
* Live deployments
* Source code, when available

## Technology

Use:

* Next.js with the App Router
* JavaScript rather than TypeScript
* Tailwind CSS
* MDX for project content
* Server Components by default
* Client Components only where interactivity is required
* Static generation wherever practical
* Next.js Metadata APIs
* `next/image`
* A restrained icon set suitable for an editor interface

Do not add:

* A database for the portfolio itself
* Authentication
* A CMS
* An admin panel
* An unnecessary API layer
* A complex state-management library
* A full browser-based code editor such as Monaco
* Large animation libraries without a clear requirement

The portfolio should be straightforward to deploy to Vercel.

## Public identity

Use the public name:

**Iago Bussoletti**

The only external profile currently displayed should be:

**GitHub — https://github.com/iagobg**

Do not invent links for:

* LinkedIn
* Email
* Résumé
* Twitter
* Other social networks

The content architecture may support adding them later, but they should not appear in the current interface.

## Design concept

Create an original portfolio interface inspired by Visual Studio Code’s workspace layout.

Use the conceptual structure of:

1. Top title bar
2. Left activity bar
3. Expandable explorer sidebar
4. Editor tab bar
5. Main content area
6. Optional secondary panel
7. Bottom status bar

Do not reproduce VS Code pixel-for-pixel.

Do not use:

* The official VS Code logo as the portfolio logo
* Microsoft branding
* Exact proprietary icons where a generic alternative is appropriate
* The exact default color theme without customization
* Fake operating-system window controls unless they serve a real function
* Editor features that do not help visitors navigate the portfolio

The interface should feel inspired by a code editor while still having its own visual identity.

## General application shell

The website should use a persistent editor-style shell around the main content.

A possible desktop structure is:

```text
┌──────────────────────────────────────────────────────────┐
│ Title bar                                                │
├────┬──────────────────┬──────────────────────────────────┤
│    │                  │ Editor tabs                      │
│ A  │ Explorer         ├──────────────────────────────────┤
│ c  │                  │                                  │
│ t  │                  │ Main page or project content     │
│ i  │                  │                                  │
│ v  │                  │                                  │
│ i  │                  │                                  │
│ t  │                  │                                  │
│ y  │                  │                                  │
├────┴──────────────────┴──────────────────────────────────┤
│ Status bar                                               │
└──────────────────────────────────────────────────────────┘
```

The shell must adapt appropriately to smaller screens rather than simply shrinking all panels.

## Title bar

Create a restrained top title bar.

It may display contextual text such as:

```text
Iago Bussoletti — Portfolio
```

or:

```text
live-trivia.mdx — Iago Bussoletti
```

depending on the current route.

It may also contain:

* A compact search or command trigger
* A breadcrumb-style path
* A GitHub action
* A sidebar toggle on smaller screens

Do not add decorative fake menus such as “File”, “Edit”, and “Selection” unless they perform meaningful navigation.

Do not include fake minimize, maximize, or close buttons unless the entire portfolio is intentionally framed as a desktop window. Prefer omitting them.

## Activity bar

Create a narrow vertical activity bar on desktop.

Use it to switch between meaningful portfolio sections.

Suggested items:

* Home
* Projects
* Search
* GitHub

The active section should be visually clear through:

* A blue indicator
* Icon emphasis
* Accessible label
* Visible focus state

Every icon must have:

* A tooltip
* An accessible name
* A non-color active indicator

Do not fill the activity bar with nonfunctional editor icons.

## Explorer sidebar

The explorer is one of the primary navigation mechanisms.

It should display a workspace structure such as:

```text
IAGO-BUSSOLETTI
├── README.md
├── projects
│   ├── live-trivia.mdx
│   ├── go-application.mdx
│   └── laptop-recommendation-engine.mdx
├── technologies
│   ├── real-time
│   ├── backend
│   ├── llm
│   └── semantic-search
└── github
```

Map these items to real portfolio destinations:

* `README.md` opens the homepage introduction
* Files inside `projects` open individual project pages
* Technology or tag items open a filtered projects archive
* `github` opens the GitHub profile

Use familiar explorer behaviors such as:

* Expandable folders
* Current-file highlighting
* Keyboard navigation
* Clear hover and focus states

Do not require visitors to understand file-system conventions in order to navigate. Use readable names and tooltips where necessary.

The explorer must be generated from project metadata rather than manually maintained.

Adding a new project MDX file should automatically add a corresponding explorer entry.

## Editor tabs

Use a tab bar above the main content.

Possible tabs include:

* `README.md`
* `projects`
* `live-trivia.mdx`
* `go-application.mdx`
* `laptop-recommendation-engine.mdx`

Tabs should correspond to real routes or recently visited sections.

Important requirements:

* Tabs must enhance navigation rather than trap content in client-side state
* Refreshing a page must preserve the current route
* Direct project URLs must work without first opening the homepage
* Browser back and forward controls must work normally
* Closing a visual tab must not delete content or break navigation
* A closed tab may simply return the user to the previous valid route

Do not recreate the full complexity of editor tab management.

A practical implementation may display:

* The current page tab
* One or two recently visited project tabs
* A homepage tab

Avoid allowing dozens of tabs to accumulate.

## Breadcrumbs

Add an editor-style breadcrumb above project content where useful.

For example:

```text
portfolio > projects > live-trivia.mdx
```

Each meaningful segment should be clickable.

Breadcrumbs should supplement normal headings, not replace them.

## Main content area

The main editor region contains actual semantic webpage content.

It should not render all content as code.

Use:

* Proper headings
* Paragraphs
* Lists
* Images
* Tables
* Links
* Code blocks
* Screenshot galleries
* Architecture diagrams

The editor metaphor should come primarily from the surrounding shell, tabs, sidebar, spacing, and visual hierarchy.

Do not prepend fake line numbers to every paragraph.

Line numbers may be used selectively for:

* Code examples
* Small metadata panels
* A short introductory block
* Decorative section numbering

Do not make long-form project case studies look like raw source files.

## Command palette

Include an optional command palette inspired by editor command search.

Open it through:

* A clearly visible button
* `Ctrl+K` or `Cmd+K`
* Another accessible keyboard shortcut that does not interfere with browser behavior

The command palette may support:

* Go to Home
* View all projects
* Open a project
* Filter by tag
* Search projects
* Open GitHub
* Toggle the explorer
* Copy current page link

The command palette must:

* Be keyboard accessible
* Trap focus correctly while open
* Close with Escape
* Clearly indicate the selected result
* Work on mobile through a visible trigger
* Avoid exposing nonfunctional commands

Do not make the command palette the only way to access important pages.

## Status bar

Create a thin blue-accented status bar at the bottom of the application shell.

It may display useful contextual information such as:

* Current section
* Number of projects
* Selected filters
* Current project status
* Current project year
* GitHub username
* A link to the live deployment when available

Examples:

```text
main*   3 projects   MDX   Next.js
```

or:

```text
Live Trivia   Finishing touches   Elixir   LiveView
```

Do not fill the status bar with meaningless editor statistics such as fake cursor positions, encoding, indentation, or language mode unless they are intentionally mapped to real portfolio information.

On mobile, simplify or hide lower-priority status information.

## Mobile adaptation

Do not attempt to preserve the full desktop editor layout on mobile.

Use a responsive interpretation.

Suggested mobile behavior:

* Hide the permanent activity bar
* Replace it with a compact top navigation or bottom action row
* Open the explorer as a drawer
* Keep the current file or page name visible
* Allow horizontal scrolling for a small number of tabs
* Collapse breadcrumbs when necessary
* Simplify the status bar
* Keep the main content full width
* Preserve clear access to Home, Projects, Search, and GitHub

Do not allow the explorer and editor content to remain side by side on narrow screens.

Do not create horizontal page overflow.

## Visual direction

The design should be:

* Dark
* Modern
* Technical
* Precise
* Slightly flashy
* Professional
* Familiar to developers
* Understandable to non-developers

Use a custom editor-inspired theme rather than copying an existing VS Code theme exactly.

## Color system

Use:

* Near-black main background
* Dark charcoal sidebar
* Slightly lighter editor surface
* Soft gray dividers
* Off-white primary text
* Muted gray secondary text
* Blue as the primary accent

Suggested visual hierarchy:

* Title bar: darkest surface
* Activity bar: dark neutral
* Explorer: slightly lighter dark surface
* Editor: clear reading surface
* Tab bar: distinct but subtle
* Status bar: controlled blue accent

Use blue for:

* Active icons
* Selected files
* Focus rings
* Links
* Active tags
* Important metadata
* Status bar
* Restrained borders
* Hover states

Do not combine blue with purple gradients.

Do not use strong glow effects throughout the interface.

## Explicitly avoid

Do not use:

* Purple-blue gradients
* Large blurred gradient blobs
* Excessive glassmorphism
* Neon outlines around all panels
* Fake editor panels that do nothing
* Dozens of tiny toolbar icons
* Fake compiler errors
* Fake source-control notifications
* Fake terminal output
* Fake code used only as decoration
* Unreadable low-contrast text
* Tiny text copied from desktop IDE interfaces
* Complex window management
* Draggable panels unless genuinely necessary
* Monaco Editor or another full editor dependency
* A loading sequence that pretends to compile the website
* Artificial typing animations for important content
* A design that requires visitors to “figure out” how the site works

## Typography

Use a clean sans-serif typeface for:

* Project titles
* Headings
* Body text
* Descriptions
* Long-form MDX content

Use a restrained monospace typeface for:

* File names
* Explorer entries
* Tabs
* Tags
* Status bar content
* Metadata
* Code examples
* Small labels

Do not use monospace for all body text.

The interface may resemble a code editor, but the case studies must remain comfortable to read.

## Content architecture

Store every project as a separate MDX file.

Use a structure similar to:

```text
content/
  projects/
    live-trivia.mdx
    go-application.mdx
    laptop-recommendation-engine.mdx
```

Each MDX file should contain:

* Structured frontmatter
* Long-form project content
* Two or three screenshots
* Optional reusable MDX components

Adding a project should require only:

1. Adding an MDX file
2. Adding its images

The new project should then automatically appear in:

* The explorer
* The projects archive
* Search results
* Tag filters
* Project navigation
* Sitemap generation

## MDX frontmatter

Support frontmatter similar to:

```yaml
---
slug: "live-trivia"
fileName: "live-trivia.mdx"
title: "Live Trivia"
shortDescription: "A synchronized multiplayer trivia application built around real-time interactions."
year: 2026
status: "Finishing touches"
featured: true

repositoryUrl: ""
liveUrl: ""

coverImage: "/projects/live-trivia/cover.webp"

screenshots:
  - src: "/projects/live-trivia/screenshot-01.webp"
    alt: "Administrator view of an active trivia round"
    caption: "The administrator controls questions, hints, and round state."
  - src: "/projects/live-trivia/screenshot-02.webp"
    alt: "Mobile player interface during a trivia round"
    caption: "Players submit answers and see synchronized activity."
  - src: "/projects/live-trivia/screenshot-03.webp"
    alt: "Live results screen"
    caption: "Results and scores are propagated to all connected players."

tags:
  - "Elixir"
  - "Phoenix"
  - "Phoenix LiveView"
  - "WebSockets"
  - "Real-time"
  - "Multi-user"
  - "High-frequency events"

summary:
  problem: "Short explanation of the problem."
  solution: "Short explanation of the solution."
  role: "Full-stack development"
---
```

Validate required frontmatter during development.

Do not require optional links or screenshots to exist.

## Project links and status

All three projects are expected to have live deployments, but they are currently receiving finishing touches.

Support statuses such as:

* In development
* Finishing touches
* Live
* Archived

Repository and deployment URLs may initially be empty.

When a URL is missing:

* Do not render a broken action
* Do not use `#`
* Do not show an inactive fake button
* A subtle “Deployment coming soon” message may be shown

When a URL is later added to frontmatter, the corresponding action should appear automatically.

## Tag system

Tags must remain free-form strings.

Adding a tag to any MDX file should automatically make it available in:

* Project cards
* Project pages
* Explorer technology groups
* Project filters
* Search
* Command-palette results

Do not use:

* A database migration
* A hardcoded tag registry
* A manually updated filter list
* A central schema that must be edited for every new tag

Normalize tags internally for filtering while preserving a consistent display version.

## Current projects

Create initial MDX entries for the following projects.

### 1. Live Trivia

A multiplayer trivia application built with Elixir and Phoenix LiveView.

Core characteristics:

* Multiple users participate in the same room
* An administrator controls the session
* Players join from their own devices
* Questions, hints, timers, answers, presence, and scores update in real time
* Users can see live activity from other participants
* The application handles frequent multi-user events
* The server maintains the authoritative game state
* The interface works on mobile devices

Suggested tags:

* Elixir
* Phoenix
* Phoenix LiveView
* WebSockets
* Real-time
* Multi-user
* High-frequency events
* Server-side state
* Responsive UI

Leave room to discuss:

* Why Phoenix LiveView was selected
* Elixir processes and GenServers
* A single source of truth
* Client synchronization
* Simultaneous answers
* Payload reduction
* Presence
* Mobile interaction

### 2. Go real-time application

A server-rendered Go application using Go, Templ, LLM embeddings, and live interactions.

Suggested tags:

* Go
* Templ
* HTMX
* LLM
* Embeddings
* Semantic search
* Server-rendered UI
* Live events

Leave room to describe:

* The problem addressed
* Why Go was selected
* Templ components
* Embedding generation and querying
* Semantic similarity
* Live or synchronous events
* Backend architecture
* Data flow
* Performance considerations

Mark incomplete project information clearly rather than inventing details.

### 3. Interactive laptop recommendation engine

An interactive LLM-based product recommendation engine backed by a database of real laptop products.

The current version is a vertical slice focused exclusively on laptops.

Core characteristics:

* Database of real products
* Natural-language user requirements
* LLM-based intent interpretation
* Structured extraction of budget and intended use
* Deterministic or grounded product ranking
* Explanations for recommendations
* No invented products
* Current support limited to laptops
* Architecture intended to support more categories later

Suggested tags:

* LLM
* Recommendation engine
* Product database
* Natural language
* Structured extraction
* Ranking
* Semantic search
* Laptops
* Vertical slice

Leave room to discuss:

* Separating LLM interpretation from ranking
* Grounding recommendations in real products
* Converting language into filters
* Budget handling
* Performance, battery life, and portability
* Recommendation explanations
* Vertical-slice design
* Future category expansion

Do not present the current application as already supporting categories beyond laptops.

## Routes

Create the following real routes:

```text
/
/projects
/projects/[slug]
```

Do not create a separate About page.

Editor tabs, explorer items, breadcrumbs, and command-palette actions must resolve to these real routes.

Do not implement the site as a single page with simulated files and no meaningful URLs.

## Homepage as README.md

Present the homepage as an open `README.md` file.

The visual tab may be labeled:

```text
README.md
```

The homepage should still contain a normal semantic page structure.

Include:

* Iago Bussoletti
* A concise professional heading
* Short introduction
* View Projects action
* GitHub action
* Three featured projects
* Compact technical-focus section
* Final call to action

Suggested introduction:

> Software developer building real-time applications, backend systems, and practical AI-assisted products.

Avoid generic phrases such as:

* Crafting digital experiences
* Building the future
* Turning ideas into reality
* Passionate developer
* Innovative solutions

The README metaphor may influence:

* File name
* Small metadata labels
* Section separators
* Monospace accents
* Heading numbering

Do not render the entire homepage as literal Markdown source code.

## Featured projects

Display all three current projects.

Each project presentation should include:

* File or project name
* Title
* Short description
* Status
* Year
* Main tags
* Cover image
* Case-study link
* Live link when available
* GitHub link when available

Project cards may resemble editor file previews or structured source entries, but must remain visually clear.

Do not display every project as an identical glowing card.

## Projects archive

The `/projects` page may appear as a `projects` workspace tab.

Include:

* Project count
* Search field
* Multiple-tag filtering
* Selected-filter summary
* Reset action
* Search results
* Empty-results state

Search should cover:

* Title
* Description
* Tags
* Relevant summary metadata

Keep search and filter state in URL parameters where practical.

Example:

```text
/projects?tags=go,llm&query=server
```

Use intersection behavior for multiple tags.

Selecting `Go` and `LLM` should show only projects containing both.

## Filter presentation

Use editor-inspired controls without sacrificing clarity.

Possible patterns:

* A collapsible “FILTERS” group in the explorer
* A compact filter panel above results
* Search input styled similarly to an editor quick-search field
* Selected tags presented as active filter tokens
* Technology folders that navigate to filtered views

Do not rely solely on the explorer for filtering.

The main projects page must also expose clear filter controls.

Avoid an uncontrolled wall of tag pills.

## Project cards

Project cards may visually resemble:

* File previews
* Editor search results
* Structured file rows
* Source-control change entries
* Compact document panels

However, they must include enough visual information to communicate:

* Cover image
* Project title
* Description
* Status
* Year
* Main tags
* Navigation action

Use a reasonable subset of tags and a `+N` indicator for additional tags.

Hover effects should remain subtle.

Appropriate effects include:

* Selected-row background
* Thin blue left border
* Small arrow motion
* Slight image emphasis
* Border contrast change

Do not use dramatic 3D effects.

## Project case-study pages

Each project page should appear as an open MDX document in the editor region.

The visual tab may use its file name:

```text
live-trivia.mdx
```

The visible project title must still be:

```text
Live Trivia
```

Include:

* Back link or breadcrumb
* Project title
* Short description
* Year
* Status
* Full tag list
* Live link when available
* GitHub link when available
* Cover image
* Flexible MDX case study
* Two or three screenshots
* Previous and next project navigation

Suggested content sections:

* Overview
* The problem
* Goals and constraints
* Architecture
* Technical decisions
* Implementation
* Challenges
* Current state
* Lessons learned
* Future improvements

Do not require identical headings for every project.

## Project page table of contents

For longer case studies, use an editor-inspired outline panel.

It may appear:

* In the explorer as an `OUTLINE` section
* As a small sticky right sidebar
* As a compact dropdown on mobile

The outline should list real document headings.

Highlight the current section as the user scrolls.

Do not make the outline consume excessive horizontal space.

## Screenshot galleries

Each project should support two or three screenshots.

Present screenshots as project documentation rather than decorative backgrounds.

Desktop options:

* One main screenshot with two supporting screenshots
* Two-column layout
* One larger screenshot beside two stacked screenshots

Mobile:

* One screenshot per row
* Full available width
* Caption below each image

Requirements:

* Use `next/image`
* Define dimensions or aspect ratios
* Include alt text
* Support captions
* Prevent layout shifts
* Keep interfaces readable

A lightbox may be included if it is accessible and does not add excessive complexity.

## MDX components

Create consistent editor-compatible styles for:

* Headings
* Paragraphs
* Links
* Lists
* Code blocks
* Tables
* Blockquotes
* Screenshots
* Screenshot galleries
* Architecture callouts
* Decision callouts
* Limitation notes
* Future-work notes

Callouts may resemble restrained editor diagnostics or information panels.

Do not make normal project limitations look like alarming errors.

## Code blocks

Code blocks may resemble actual editor regions more strongly than normal content.

Include:

* Syntax highlighting
* Optional file name
* Copy action
* Horizontal scrolling
* Clear contrast
* Optional line numbers

Do not add unnecessary fake window controls.

Do not initialize a complete interactive editor for static code samples.

## SEO

Implement:

* Unique title and description metadata
* Dynamic project metadata
* Open Graph metadata
* Twitter card metadata
* Canonical URLs
* Semantic HTML
* Sitemap generation
* `robots.txt`
* Useful image alt text
* Structured data

Use:

* `Person` for Iago Bussoletti
* `WebSite` for the portfolio
* `SoftwareSourceCode` or `CreativeWork` for project pages

The editor-style interface must not replace semantic page structure.

Project headings must remain actual HTML headings.

Navigation must remain discoverable to search engines.

Do not hide primary content behind client-only interactions.

## Accessibility

Ensure:

* Keyboard-accessible activity bar
* Keyboard-accessible explorer
* Keyboard-accessible tabs
* Accessible command palette
* Visible focus states
* Logical heading hierarchy
* Proper search labels
* Semantic buttons and links
* Selected states that do not rely only on color
* Sufficient contrast
* Reduced-motion support
* Appropriate tooltips
* Escape-key handling for overlays
* No interaction that requires hover

Use appropriate semantics such as:

* `aria-current`
* `aria-expanded`
* `aria-selected`
* `aria-pressed`

Do not misuse ARIA roles to imitate a complex desktop application unnecessarily.

The website remains a document-oriented website, not a real IDE.

## Performance

Prioritize:

* Static rendering
* Minimal client-side JavaScript
* Lightweight project metadata for filtering
* No full editor runtime
* Optimized images
* Font optimization
* Stable dimensions
* No unnecessary third-party scripts
* Small dependency footprint
* Good Core Web Vitals

Do not load full MDX bodies into the browser merely to implement project search.

Do not turn every shell component into a Client Component.

## Suggested component structure

Create reusable components similar to:

```text
PortfolioShell
TitleBar
ActivityBar
Explorer
ExplorerGroup
ExplorerFile
EditorTabs
EditorTab
Breadcrumbs
StatusBar
CommandPalette
MobileExplorerDrawer
ProjectCard
ProjectGrid
ProjectFilters
ProjectStatus
Tag
ScreenshotGallery
MDXComponents
ProjectOutline
ProjectNavigation
EmptyResults
```

Only add abstractions where they provide clear value.

## Suggested file organization

Use a structure similar to:

```text
app/
  layout.js
  page.js
  projects/
    page.js
    [slug]/
      page.js
  sitemap.js
  robots.js
  not-found.js

components/
  shell/
    portfolio-shell.jsx
    title-bar.jsx
    activity-bar.jsx
    explorer.jsx
    editor-tabs.jsx
    breadcrumbs.jsx
    status-bar.jsx
    command-palette.jsx
  projects/
    project-card.jsx
    project-grid.jsx
    project-filters.jsx
    project-status.jsx
    project-navigation.jsx
  content/
    tag.jsx
    screenshot-gallery.jsx
    project-outline.jsx
    mdx-components.jsx

content/
  projects/
    live-trivia.mdx
    go-application.mdx
    laptop-recommendation-engine.mdx

lib/
  projects.js
  tags.js
  navigation.js
  metadata.js

public/
  projects/
    live-trivia/
    go-application/
    laptop-recommendation-engine/
```

This is a suggested organization rather than a rigid requirement.

## Error handling

Implement:

* General 404 page
* Project-specific not-found state
* Malformed MDX validation
* Graceful missing-image handling
* Graceful missing-link handling

A project not-found page may visually resemble an unresolved file, but it should use clear language such as:

```text
Project not found
```

Do not use a fake compiler stack trace as the primary error message.

## README

Create a useful README explaining:

1. How to run the project
2. How the MDX structure works
3. How to add a project
4. How projects populate the explorer
5. How tags populate filters
6. How tags populate technology groups
7. How to add screenshots
8. How to add deployment and repository links
9. How editor tabs map to routes
10. How the command palette is configured
11. How the responsive shell behaves
12. How to deploy to Vercel

## Expected result

Deliver a complete initial implementation rather than only a mockup.

The result should feel like an original portfolio presented through a familiar developer workspace.

It should borrow the useful structure of a code editor:

* Explorer navigation
* Tabs
* Command search
* Contextual status
* File-oriented project organization

It must avoid becoming:

* A pixel-perfect VS Code clone
* A fake editor with no practical purpose
* A novelty interface that hides the projects
* A single-page application with broken browser navigation
* A desktop-only layout
* A collection of decorative fake controls

Before considering the implementation complete, verify:

* Every route works directly
* Browser back and forward controls work
* The homepage appears as `README.md`
* All project pages are generated from MDX
* New MDX files automatically appear in the explorer
* New tags automatically appear in filtering
* New tags can appear in explorer technology groups
* Search works
* Multiple tag filters use the documented intersection behavior
* Filter state survives refresh through URL parameters
* Explorer navigation works with a keyboard
* Editor tabs correspond to real routes
* Command palette is accessible
* Command palette is not required for primary navigation
* Mobile explorer opens as a drawer
* Mobile content does not preserve an unusable desktop layout
* Missing deployment links do not create broken actions
* Two or three screenshots render correctly
* Project metadata is generated correctly
* The GitHub link points to `https://github.com/iagobg`
* No About page exists
* No unprovided social links appear
* The UI does not use Microsoft or VS Code branding
* The project does not include Monaco Editor
* There is no horizontal overflow
* Reduced-motion settings are respected
* Unused components and dependencies have been removed
