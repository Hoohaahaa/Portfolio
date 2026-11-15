# MONO project asset archive

This folder is the permanent home for original project exports and optimized website derivatives.

## Structure
- `projects/<project-slug>/originals/` — untouched source exports (PNG/JPG/Figma exports)
- `projects/<project-slug>/web/` — optimized WebP files referenced by the site
- `source-originals/` — source archive grouped by the original client/project folders
- `manifest.json` — source-to-web asset mapping

## Asset rules
- Keep the original export unchanged.
- Do not crop or distort source exports.
- Generate WebP derivatives only for delivery/performance; preserve the original aspect ratio.
- Keep product screenshots inside their own project folder. In particular, Humaani / Arzhang and MaaniJect are separate Rastar products.
- Never substitute a screenshot from another project to fill a missing visual.

The original image archive supplied in the working conversation has not yet been uploaded into this repository. This guide reserves the permanent structure; it does not claim that the binary originals are already present.
