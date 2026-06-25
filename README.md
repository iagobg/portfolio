# Iago Bussoletti Portfolio

Production-ready personal portfolio for Iago Bussoletti, built with Next.js App Router, JavaScript, Tailwind CSS, and MDX. The interface is inspired by a developer workspace: projects behave like files, pages appear as editor tabs, project tags power the archive filters, and the command palette provides fast navigation.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Docker quickstart

Build the production container from the project root:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=http://localhost:3000 \
  -t iago-portfolio .
```

Run it locally:

```bash
docker run --rm -p 3000:3000 iago-portfolio
```

Then open `http://localhost:3000`.

For deployment, replace `NEXT_PUBLIC_SITE_URL` with the public domain so canonical URLs, sitemap entries, and structured data use the correct host:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://example.com \
  -t iago-portfolio .
```

## Project content

Each project lives in `content/projects/*.mdx`. The frontmatter drives the explorer, project archive, tag filters, command palette, project pages, metadata, and sitemap.

To add a project:

1. Add a new MDX file in `content/projects`.
2. Include the required frontmatter fields: `slug`, `fileName`, `title`, `shortDescription`, `year`, `status`, `tags`, and `summary`.
3. Add screenshots under `public/projects/<slug>/`.
4. Point `coverImage` and `screenshots` to those public paths.

No page component, route file, database schema, migration, or hardcoded project list needs to change.

## Tags and filters

Tags are free-form strings in project frontmatter. They are normalized internally for URLs, while display labels are preserved from the MDX files. New tags automatically appear in:

- project cards
- project pages
- `/projects` filters
- command-palette results

Multiple selected tags use intersection behavior. For example, `/projects?tags=go,llm` only shows projects containing both tags.

## Screenshots and links

Screenshots are optional. When present, they render through `next/image` with fixed dimensions and captions. Repository and deployment URLs are also optional; missing URLs do not render broken buttons or `#` links. Add `repositoryUrl` or `liveUrl` later and the UI will expose the matching actions automatically.

## Routes and tabs

The real routes are:

- `/`
- `/projects`
- `/projects/[slug]`
- `/pt-BR`
- `/pt-BR/projects`
- `/pt-BR/projects/[slug]`

Editor tabs map to these routes and never trap content in client-only state. Direct project URLs, refresh, and browser back/forward navigation work normally.

## Command palette

Open the command palette from the title bar search button or with `Ctrl+K` / `Cmd+K`. It supports home, all projects, individual projects, tag filters, and GitHub.

## Responsive shell

Desktop uses a title bar, activity bar, explorer sidebar, editor tabs, main content, outline where useful, and status bar. On smaller screens the permanent activity bar is hidden, the explorer opens as a drawer, tabs scroll horizontally, and content uses the full viewport width.

## Deployment without Docker

The project is designed for Vercel:

```bash
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, sitemap entries, and structured data point at the deployed domain.
