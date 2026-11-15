# MONO. — Asset import guide

## One-time folder structure

Upload one prepared ZIP with this exact structure. Keep each image inside the project it belongs to; this is more reliable than trying to infer project ownership from filenames.

```
mono-assets/
  manifest.json
  pinket/
    cover.webp
    thumbs/
      cover.webp
      01.webp
      02.webp
    gallery/
      01-dashboard-overview.webp
      02-order-management.webp
      03-mobile-shopper-flow.webp
    thumbs/
      01.webp
      02.webp
      03.webp
  mirana/
    cover.webp
    gallery/
      01-executive-search.webp
  jobvis/
    cover.webp
    gallery/
      01-recruitment-dashboard.webp
  ats/
    cover.webp
    gallery/
      01-talent-pipeline.webp
  pulse/
    cover.webp
    gallery/
      01-feedback-dashboard.webp
  veblen/
    cover.webp
    gallery/
      01-parametric-editor.webp
  field/
    cover.webp
    gallery/
      01-instrument-interface.webp
  humaani/
    cover.webp
    gallery/
      01-workspace.webp
  maani/
    cover.webp
    gallery/
      01-content-studio.webp
  iran/
    cover.webp
    gallery/
      01-atlas.webp
  entity/
    cover.webp
    gallery/
      01-instrument.webp
  concepts/
    cover.webp
    gallery/
      01-concept-name.webp
  originals/
    pinket-originals.zip
    jobvis-originals.zip
```

Only include folders for projects that actually have images. Do not mix Mirana, JobVision and ATS in one folder. Do not put text briefs, PDFs, README screenshots or exported copy in image galleries.

## File naming

- Exactly one `cover.webp` per project. Choose the strongest representative image yourself; for Pinket choose a desktop seller/operations dashboard, not a mobile flow.
- Gallery files use zero-padded order: `01-`, `02-`, `03-`. The order is the display order.
- Use short, descriptive English names. Example: `03-candidate-pipeline.webp`.
- Keep dark/light variants only when they demonstrate a meaningful design decision. Do not include duplicate language variants or repeated screens.
- Keep the untouched originals in the `originals/` backup folder or in a separate backup ZIP. Never overwrite originals.

## Image export targets

| Asset | Export size | Target weight |
|---|---:|---:|
| Landing thumbnail | 480–640 px wide | 25–70 KB |
| Project cover | 1400–1600 px wide | 120–300 KB |
| Gallery screenshot | 1600–2000 px wide (or original if smaller) | usually 250–900 KB |
| Very long mobile flow | 1080–1440 px wide, original aspect ratio | as needed |

- Prefer WebP at quality 90–94 for interface screenshots. If tiny text becomes soft, use WebP lossless or retain PNG for that specific file.
- Do not upscale images smaller than the target.
- Do not crop, stretch, or force all screenshots into one aspect ratio.
- For long screens, preserve the full height. They will be displayed as individual full-height frames with manual scrolling/zoom rather than as a tiny contact sheet.
- The landing page should load the small thumbnails for all projects immediately; it should not download every full-resolution gallery image.
- The full-size gallery image should load only when its project is opened, and ideally only the selected image plus its immediate neighbours.

## Passport metadata

The layout supports: year/period, client, role, discipline, team, platform and engagement.
The Appendix supports: overview/context, challenge, approach, scope, contribution, deliverables and outcome.
Leave unknown facts blank. Do not invent dates, client names, team sizes, metrics or results. These can be completed later from the resume and project notes.

## Upload workflow

1. Prepare the folders and images once.
2. Zip the `mono-assets/` folder as `mono-assets.zip`.
3. Upload that single ZIP to the Portfolio repository (or attach it here if repository upload is inconvenient).
4. Tell ChatGPT: "Import mono-assets.zip using ASSET-IMPORT-GUIDE.md. Preserve originals and update the manifest."
5. After the import, image ownership, cover choice and ordering are explicit; no repeated AI guessing should be needed.
