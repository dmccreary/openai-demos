# Repository Guidelines

## Project Structure & Module Organization
This repository is an MkDocs-based documentation site.
- `docs/` contains all site content in Markdown, plus assets like `docs/img/` and styles in `docs/css/`.
- `mkdocs.yml` defines navigation, theme, and plugins for the site.
- `site/` is the generated build output from MkDocs.
- `src/api-tests/` contains small OpenAI API connectivity scripts.

## Build, Test, and Development Commands
Use these commands from the repo root:
- `mkdocs serve` runs a local dev server at `http://localhost:8000` for previewing docs.
- `mkdocs build` renders the static site into `site/`.
- `mkdocs gh-deploy` publishes the site to GitHub Pages (does not commit changes).
Setup example:
- `pip install mkdocs "mkdocs-material[imaging]"` installs MkDocs and the Material theme.

## Coding Style & Naming Conventions
- Markdown: keep headings descriptive, use blank lines between sections, and prefer short paragraphs.
- Filenames in `docs/` use lowercase and hyphens (example: `how-we-built-this-site.md`).
- Python scripts use 4-space indentation and standard library imports first.
- Keep assets organized by type (images in `docs/img/`, CSS in `docs/css/`).

## Testing Guidelines
There is no formal test suite. Validate changes with:
- `mkdocs build` to catch broken links or config issues.
- API sanity checks in `src/api-tests/`:
  - `python3 src/api-tests/hello.py`
  - `python3 src/api-tests/test-openai-key.py`
  - `bash src/api-tests/curl-test.sh`
Set `OPENAI_API_KEY` in your shell before running API scripts.

## Commit & Pull Request Guidelines
No strict commit format is enforced; use clear, descriptive messages that explain what and why.
For pull requests, include:
- A short summary of changes and rationale.
- Links to related issues (if any).
- Screenshots or a brief screencast for visual or theme changes.

## Security & Configuration Tips
- Never commit secrets; use environment variables for API keys (example: `OPENAI_API_KEY`).
- If you enable social card generation, you may need system libraries (see `docs/how-we-built-this-site.md`).
