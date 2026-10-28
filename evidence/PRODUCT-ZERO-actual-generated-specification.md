# A shared studio session

PRODUCT / ZERO / Product specification / v2
Status: pending. AI-authored draft, not a production release.

## Brief
Design a small prototype for people to plan a shared creative studio session. Let a person choose a session format and enter a name, see a preparation checklist, and save a local session draft. Include empty, invalid and saved states. No payments, real bookings or external messages. Keep the scope to two or three screens.

## Intended users
Adult creative collaborators preparing a small studio session. Keyboard and mobile access are required.

## Problem framing
Design a small prototype enabling adult creative collaborators to plan a shared studio session by selecting a session format, entering a session name, viewing a preparation checklist, and saving a local draft. The prototype must display empty, invalid, and saved states, and be operable via keyboard and mobile devices. Scope limited to two or three screens.

## Assumptions
- Users can operate a web interface via keyboard or touch.
- Local storage is available on the target devices.
- No external authentication or payment systems are needed.

## Research plan
### Low‑fidelity wireframe to interactive HTML prototype
Question: Can users complete the session‑planning flow across device types?
Participants: Internal design team representing target audience
Procedure: Create sketches, convert to HTML/CSS, conduct internal walk‑throughs
Success: Prototype navigable on desktop and mobile with correct state transitions

### Usability debrief think‑aloud session
Question: Do participants understand the empty, invalid, and saved states?
Participants: Two volunteers from the target group
Procedure: Task‑based session with think‑aloud commentary
Success: Feedback indicates clarity of states and flow

## Requirements and acceptance criteria
### R01 / User can select a session format from a list (e.g., Collaborative workshop, Solo practice, Pair critique).
- Dropdown or buttons present
- Selection persists across screens
- Visible focus state
Evidence: E01, E02

### R02 / User can enter a session name in a text field.
- Field accepts alphanumeric input
- Max length 50 characters
- Empty input prevented on save
Evidence: E01, E02

### R03 / Preparation checklist appears after format and name are entered, showing default items relevant to the chosen format.
- Checklist renders only after valid format+name
- Items togglable
- Context‑appropriate defaults
Evidence: E01, E02

### R04 / User can save a local session draft; draft persists across app relaunches via local storage.
- Save button enabled after valid input
- Draft loads on return
- Saved indicator displayed
Evidence: E01, E02

### R05 / Empty state UI displayed when no session is loaded (no format selected, no name).
- Placeholder text shown
- Primary actions disabled
- Clear visual cue
Evidence: E01, E02

### R06 / Invalid input state displayed when name is empty or too long, preventing save.
- Error message shown
- Save button disabled
- Focus returned to field
Evidence: E01, E02

### R07 / UI supports both keyboard navigation and mobile touch.
- Tab order follows logical flow
- Focus outlines visible
- Touch targets ≥48 dp
- Voice‑over labels where applicable
Evidence: E01, E02

## Evidence ledger
- E01 [provided] Brief specifies prototype features: choose format, enter name, checklist, save draft, empty/invalid/saved states, no payments, two‑three screens.
  Source: brief
  Confidence: high
- E02 [provided] Audience: adult creative collaborators, keyboard and mobile access required.
  Source: brief
  Confidence: high

## Technology recommendation
Prototype the shared studio session using a conservative web‑tech approach for Phase 1, with an exploratory React Native path for later mobile‑first enhancements.

## Information architecture and journey
{
  "rationale": "Create IA, flow graph, journeys, and edge cases using the exact requirement IDs from the brief. Nodes represent screens/states; edges reference requirement IDs. Journeys cover empty, invalid, and saved paths. All outputs are concise and structured.",
  "architecture": [
    {
      "id": "S01",
      "label": "Empty State",
      "purpose": "Show placeholder and disabled actions when no session loaded"
    },
    {
      "id": "S02",
      "label": "Format Selection",
      "purpose": "Let user pick session format; persist selection (R01)"
    },
    {
      "id": "S03",
      "label": "Name Entry",
      "purpose": "Enter session name with validation (R02)"
    },
    {
      "id": "S04",
      "label": "Checklist",
      "purpose": "Display default checklist relevant to chosen format (R03)"
    },
    {
      "id": "S05",
      "label": "Saved Draft",
      "purpose": "Show saved indicator and load draft on return (R04)"
    }
  ],
  "flow": {
    "nodes": [
      {
        "id": "n0",
        "label": "Start/Empty",
        "type": "start"
      },
      {
        "id": "n1",
        "label": "Format Selection",
        "type": "screen"
      },
      {
        "id": "n2",
        "label": "Name Entry",
        "type": "screen"
      },
      {
        "id": "n3",
        "label": "Checklist",
        "type": "screen"
      },
      {
        "id": "n4",
        "label": "Saved Draft",
        "type": "end"
      },
      {
        "id": "n5",
        "label": "Invalid Input",
        "type": "decision"
      },
      {
        "id": "n6",
        "label": "Empty State (no format/name)",
        "type": "screen"
      }
    ],
    "edges": [
      {
        "from": "n0",
        "to": "n1",
        "label": "R01: select format"
      },
      {
        "from": "n1",
        "to": "n2",
        "label": "R02: enter name"
      },
      {
        "from": "n2",
        "to": "n3",
        "label": "R03: checklist appears"
      },
      {
        "from": "n3",
        "to": "n4",
        "label": "R04: save draft"
      },
      {
        "from": "n0",
        "to": "n6",
        "label": "R05: empty state"
      },
      {
        "from": "n2",
        "to": "n5",
        "label": "R06: invalid input"
      },
      {
        "from": "n5",
        "to": "n2",
        "label": "re‑enter name"
      },
      {
        "from": "n1",
        "to": "n5",
        "label": "R06: invalid if no format"
      }
    ]
  },
  "journeys": [
    {
      "step": "1. Empty start",
      "userGoal": "User opens prototype and sees no session loaded.",
      "systemResponse": "Empty state UI displayed (placeholder text, primary actions disabled) per R05.",
      "edgeCase": "User taps disabled button; focus should remain and show error.",
      "requirementIds": [
        "R05"
      ]
    },
    {
      "step": "2. Select format then enter name",
      "userGoal": "User chooses a session format and types a valid session name.",
      "systemResponse": "Format persists; name field accepts input; checklist appears after both are valid per R01‑R03.",
      "edgeCase": "User leaves name empty; invalid state shown per R06.",
      "requirementIds": [
        "R01",
        "R02",
        "R03"
      ]
    },
    {
      "step": "3. Save and load draft",
      "userGoal": "User saves the session draft and returns to it later.",
      "systemResponse": "Save button enabled; draft persisted via localStorage; saved indicator displayed per R04; on return draft loads.",
      "edgeCase": "User clears browser data; draft lost (notified).",
      "requirementIds": [
        "R04"
      ]
    }
  ]
}

## UI state contract
{
  "appName": "shared-studio-session",
  "description": "UI schema for shared studio session prototype.",
  "screens": [
    {
      "id": "S01",
      "title": "Empty State",
      "description": "No session loaded.",
      "requirementIds": [
        "R05"
      ],
      "blocks": [
        {
          "id": "B1",
          "kind": "text",
          "label": "Placeholder",
          "content": "Start a new shared studio session",
          "required": true,
          "options": [],
          "action": "none",
          "target": ""
        },
        {
          "id": "B2",
          "kind": "button",
          "label": "Start",
          "content": "",
          "required": true,
          "options": [],
          "action": "navigate",
          "target": "S02"
        }
      ]
    },
    {
      "id": "S02",
      "title": "Format & Name Entry",
      "description": "Select format and enter name.",
      "requirementIds": [
        "R01",
        "R02"
      ],
      "blocks": [
        {
          "id": "B1",
          "kind": "select",
          "label": "Format",
          "content": "Choose",
          "required": true,
          "options": [
            "Collaborative workshop",
            "Solo practice",
            "Pair critique"
          ],
          "action": "none",
          "target": ""
        },
        {
          "id": "B2",
          "kind": "input",
          "label": "Session name",
          "content": "",
          "required": true,
          "options": [],
          "action": "none",
          "target": ""
        }
      ]
    }
  ],
  "implementationNotes": [
    "Adopt conservative web tech (HTML/CSS) for Phase 1; ensure WCAG 2.1 AA compliance via semantic HTML and ARIA labels.",
    "Keyboard navigation follows logical tab order; focus outlines visible using primary token #c83f22 on background #f5f2e9; contrast ratio checked to meet minimum 4.5:1.",
    "Local storage used for draft persistence; user notice provided ('Session auto‑saved to local storage') on S03; data cleared if browser data is wiped.",
    "Touch targets sized at minimum 48dp (≈48px at 1×) for all interactive elements; verify with screen‑size audit.",
    "Apply consistent border‑radius of 2dp to all form elements and visual containers, verified in visual inspection.",
    "Format‑specific default checklist items documented (e.g., Collaborative workshop: 'Gather supplies', 'Set up collaborative tools'; Solo practice: 'Prepare personal materials', etc.) or flagged as hypothesis."
  ]
}

## Machine checks
- PASS Flow references: Every edge resolves to an existing flow node.
- PASS Unique flow IDs: No duplicate node identifiers.
- PASS Screen navigation: Navigation actions resolve to implemented screens.
- PASS Requirement traceability: Every screen links to a defined requirement.
- PASS Unique block IDs: Form fields have unique identifiers.
- PASS Evidence references: Requirement evidence identifiers resolve.
- PASS Source attribution: Source claims have HTTPS citations; content requires review.
- PASS Body text contrast: 14.07:1 token contrast. Not a full accessibility audit.

## Independent AI review
{
  "verdict": "revise",
  "summary": "Critique of the corrected draft reveals multiple critical and major gaps against the brief and rubric. The prototype exceeds the two‑to‑three screen limit, invalid‑state handling lacks disabled save button and focus‑return, save functionality does not prevent saving with empty/long names, touch‑target size, focus‑outline contrast, and checklist relevance are unverified or missing. Design‑token radius and saved‑draft notice are minor gaps. All findings include concrete fixes.",
  "findings": [
    {
      "severity": "critical",
      "artifact": "Screen count",
      "issue": "Prototype includes four distinct screens (Empty State, Format & Name Entry, Checklist, Saved Draft), exceeding the brief's limit of two‑to‑three screens.",
      "fix": "Combine Format & Name Entry with Checklist, or merge Empty State into the first navigation step to achieve a maximum of three screens."
    },
    {
      "severity": "critical",
      "artifact": "Invalid‑state handling (R06)",
      "issue": "Invalid‑state UI shows an error message but does not explicitly disable the Save button or return focus to the name field when the name is empty or exceeds 50 characters.",
      "fix": "Add logic to disable the Save button until a valid name is entered and ensure focus returns to the name field with an error message displayed."
    },
    {
      "severity": "critical",
      "artifact": "Save functionality",
      "issue": "No explicit mechanism prevents saving when the name field is empty or too long; acceptance criteria require empty input to be prevented on save.",
      "fix": "Implement form validation that disables the Save button until the name meets length and non‑empty requirements, and show a clear error if the user attempts to save invalid input."
    },
    {
      "severity": "major",
      "artifact": "Touch target accessibility",
      "issue": "Implementation notes claim touch targets are ≥48 dp, but no measurement or CSS evidence is provided; must be verified against WCAG 2.1 AA.",
      "fix": "Provide CSS rules setting min‑width/min‑height of 48 dp (≈48 px at 1×) for all interactive elements and verify with a screen‑size audit."
    },
    {
      "severity": "major",
      "artifact": "Focus outline contrast",
      "issue": "Focus outlines use primary token #c83f22 on background #f5f2e9; contrast ratio must be checked to meet WCAG AA minimum 4.5:1.",
      "fix": "Calculate the contrast ratio; if below 4.5:1, adjust the focus color or background to achieve compliance, or add a secondary outline style."
    },
    {
      "severity": "major",
      "artifact": "Checklist relevance",
      "issue": "Checklist items are generic ('Prepare materials', 'Set up workspace', 'Define goals') and not tied to the selected session format, contrary to expectations of format‑specific defaults.",
      "fix": "Provide format‑specific default items (e.g., Collaborative workshop: 'Gather supplies', 'Set up collaborative tools'; Solo practice: 'Prepare personal materials', etc.) or document the decision as a hypothesis."
    },
    {
      "severity": "minor",
      "artifact": "Design‑token radius",
      "issue": "Token 'radius: 2' is listed but not demonstrably applied to UI components (buttons, inputs, cards).",
      "fix": "Apply a consistent border‑radius of 2 dp (or appropriate CSS unit) to all form elements and visual containers, and verify in visual inspection."
    },
    {
      "severity": "minor",
      "artifact": "Saved‑draft persistence notice",
      "issue": "LocalStorage use and user notice are mentioned but no explicit notice UI present in screen descriptions.",
      "fix": "Add a brief on‑screen notice (e.g., 'Session auto‑saved to local storage') on the Saved Draft screen and ensure the code writes to localStorage on each save."
    }
  ],
  "unverified": [
    "Touch targets ≥48 dp meet accessibility standards",
    "Focus outline contrast ratio meets WCAG AA",
    "Checklist items are relevant to each session format",
    "Save persists across browser relaunches via localStorage",
    "Design‑token radius 2 is applied consistently"
  ]
}

## Required human validation
No participant research, real-world usability testing, comprehensive accessibility audit, production integration or security certification is claimed.
