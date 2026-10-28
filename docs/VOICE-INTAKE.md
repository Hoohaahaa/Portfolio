# Voice intake / next increment / not implemented

A primary product requirement, not a decorative microphone icon. Preserve the accepted layout and extend each text field with the same reusable voice control.

- Persian and English dictation; selectable language and an automatic option where the chosen transcription service supports it. Other languages depend on actual model support.
- Record, pause/resume, stop, cancel, playback and explicit Insert controls. Never submit a design operation when recording stops.
- Keep the existing field value until the user reviews and inserts the transcript. Offer append or replace, and allow editing before insertion.
- Explicit browser microphone permission after user action. No background recording. Show a persistent recording indicator and elapsed duration.
- Retain a local audio preview until insertion or cancellation. Cancel discards the recording; never retain recordings server-side by default.
- Accessible keyboard controls, announced recording states and a text/file-upload fallback for unsupported browsers.
- Enforce duration/file-size limits server-side, authorize transcription requests, and disclose actual provider data retention and transcription cost before use.
- Use real multilingual transcription, not a simulated transcript. Matching ChatGPT voice quality is an evaluation target, not a verified promise.

Acceptance: test Persian/English, permission denial, device disconnect, pause/resume, cancel, network failure, editable transcript insertion and prevention of accidental operation launch on desktop and mobile. No implementation or audio test is claimed in the Gateway fix.
