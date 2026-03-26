# page-starter
> if.eugeneyip.com

A lightweight template repository for publishing LLM generated JSX pages with minimal setup.

The idea is simple.  
Once your JSX file is generated, you only need to replace the `src/App.jsx` file, update a few deployment details, and publish.

## What this template is for

This repository is built for users who want a clean and repeatable workflow for turning LLM generated JSX into a live website.

In most cases, the main content update is only one file:

`src/App.jsx`

That keeps the process fast, simple, and easy to maintain.

## Core workflow

### 1. Replace the page content

After generating your JSX with an LLM, copy and paste the final content into:

`src/App.jsx`

That is the main page file you are expected to update.

## 2. Update the custom domain

If you are using a custom URL, update the `CNAME` file in all three locations:

- `/CNAME`
- `/public/CNAME`
- `/docs/CNAME`

Use the same domain value in each file.

## 3. Update the website name

Update the page name or title in these files:

- `/index.html`
- `/docs/index.html`
- `/docs/404.html`

This ensures the site name is consistent across the main page and fallback page.

## 4. Configure GitHub Pages

In your repository, go to:

`Settings` → `Pages`

Then:

- Set **Source** to **GitHub Actions**
- Paste your **Custom domain**

## 5. Verify the domain

In the repository settings, also update:

`Settings` → `Verified domains`

Add and verify the same custom domain there.

## File map

### Main content
- `src/App.jsx`

### Custom domain
- `CNAME`
- `public/CNAME`
- `docs/CNAME`

### Website title or page name
- `index.html`
- `docs/index.html`
- `docs/404.html`

## Recommended publishing sequence

1. Generate the final JSX with your LLM
2. Replace `src/App.jsx`
3. Update all `CNAME` files
4. Update the website title in the required HTML files
5. Set GitHub Pages to `GitHub Actions`
6. Add the custom domain
7. Verify the domain in repository settings
8. Push changes and deploy

## Notes

- Keep the domain text identical in all `CNAME` files
- Keep the website name consistent across all HTML files
- If the deployed site does not reflect the new domain or title, double check every location above before troubleshooting anything else

## Summary

This template is designed to reduce the process to a few predictable actions:

- replace `src/App.jsx`
- update domain files
- update page titles
- configure Pages
- verify the domain

That is the full intended workflow.
