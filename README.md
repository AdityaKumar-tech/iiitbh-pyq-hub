# Adhyaay: IIIT Bhagalpur Study Hub

Adhyaay is a website where IIIT Bhagalpur students can find notes and previous-year question papers.

## Current Status

**Status:** Work in progress  
**Last updated:** 20 August 2026

The main website is ready to use. Some content and features still need to be completed.

## What Is Done

- Home page with navigation, semesters, recent resources, and footer.
- Pages for resources, semesters, subjects, mentors, About, and missing pages.
- Branch filters for CSE, ECE, MNC, and MAE.
- Subject pages with separate tabs for PYQs and Notes.
- Loading, error, and “no files” messages on resource pages.
- Google Drive connection for showing files and links.
- Semester, branch, subject, PYQ, and Notes data in `src/data/pyq-data.json`.
- Scripts for reading the Google Drive folders and updating the data file.
- About page with the project vision and contributor information.
- Mentor page and mentor data.
- Responsive design, animations, and reusable components.
- Build and lint commands in `Frontend/package.json`.

## What Is Still In Progress

### Important

- **Protect the Google Drive key:** The Drive scripts currently contain an API key directly in the code. Move it to an environment file, replace the exposed key, and restrict the new key before publishing the project.
- **Add more study material:** Some subjects do not have PYQ or Notes folder IDs yet. More files also need to be checked and organized.
- **Make search work:** The search box is visible, but it does not search subjects or resources yet.
- **Add assignments:** Assignment data still uses placeholder folder IDs, and assignments do not have their own page yet.

### Other improvements

- Add a way for students to report broken links or missing files.
- Add filters or page-by-page loading for folders with many files.
- Make Google Drive errors and limits easier to handle.
- Add tests for pages, filters, loading, empty results, and errors.
- Improve keyboard and screen-reader support.
- Add instructions for putting the website online.

## Tools Used

- React and Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide icons
- Google Drive API
- Oxlint

## Main Folders

```text
Frontend/
  src/components/   Reusable website parts
  src/data/         Subject, mentor, and assignment data
  src/lib/          Google Drive code
  src/pages/        Website pages
  src/App.jsx       Website routes
  crawl-drive.js    Reads the Google Drive folder structure
  update_folders.cjs Updates PYQ and Notes folder IDs
```

## Run the Project

Open a terminal in the `Frontend` folder and run:

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build    # Build the website
npm run lint     # Check the code
npm run preview  # Preview the built website
```

## Google Drive Setup

Create a file named `Frontend/.env`:

```env
VITE_GOOGLE_DRIVE_API_KEY=your_api_key_here
```

Never commit this file or share the key. The key used by the website should be restricted in Google Cloud.

## Update the Resource Data

From the `Frontend` folder:

1. Check that the Google Drive folders and permissions are correct.
2. Set the API key in `.env`.
3. Run `node crawl-drive.js` to rebuild `src/data/pyq-data.json`.
4. Run `node update_folders.cjs` to update PYQ and Notes folder IDs.
5. Check the changed data before committing it.
6. Run `npm run build` and `npm run lint`.

## Known Problems

- Files are loaded from Google Drive, so they depend on folder IDs, permissions, API limits, and the API key.
- The website uses the Drive API directly in the browser, so the key must be restricted. It cannot be treated as a private password.
- Some subject codes are empty, and subjects with the same name may have similar URLs.
- Assignment data is not connected to a page yet.
