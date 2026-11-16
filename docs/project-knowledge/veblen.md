# Veblen — Parametric Garment System

Last updated: 2026-11-16

## Confirmed project facts
- Independent concept project, 2025–2026.
- Not a production-deployed product.
- The designer ran multiple calibration tests on one pattern.
- Two pattern makers were involved and informed during the exploration.
- The system generated a DXF file intended for use in CLO 3D; the user confirmed the output was produced and suitable for that workflow.
- The project documentation records seven body-measurement reference points.
- Documentation records a maximum deviation of 0.03% for the size-M reference avatar geometry.
- Documentation records zero structural errors in the documented DXF/SVG validation.
- A Knife Pleat export example and exact-length technique are documented.

## Problem and design reasoning
The challenge was to connect body measurements and adjustable garment parameters to usable pattern geometry, not merely to create an attractive 3D visual. Calibration and downstream export mattered as part of the workflow.

## Decisions and validation
- Work through calibration tests on one pattern.
- Involve two pattern makers to ground the exploration in pattern-making knowledge.
- Generate DXF output for the intended CLO 3D workflow.
- Keep technical validation claims specific to the documented reference geometry and export checks.

## Evidence and caveats
- The 0.03% deviation applies to the size-M reference avatar geometry only. It must not be described as universal fit accuracy or accuracy across body types.
- Zero structural errors applies to the documented DXF/SVG validation, not to all possible exports or garment patterns.
- The project is a concept exploration, not a commercially deployed system or evidence of adoption.

## Public/source material
- Master documentation: https://github.com/Hoohaahaa/VEBLEN/blob/main/VEBLEN-MASTER.md
- Validation material: https://github.com/Hoohaahaa/VEBLEN/tree/main/validation
- Knife Pleat export: https://github.com/Hoohaahaa/VEBLEN/tree/main/exports/KNIFE-PLEAT-01

## Open questions
- Was the generated DXF imported and inspected inside CLO 3D, or was compatibility assessed from the exported file?
- Which exact calibration changes were made after feedback from the pattern makers?
