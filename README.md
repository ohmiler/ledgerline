# Ledgerline

[Live documentation](https://ohmiler.github.io/ledgerline/) Â· [Experiment prompt](experiment/prompt.md) Â· [Rubric](experiment/rubric.md) Â· [Gridgeist](https://github.com/ohmiler/gridgeist)

Ledgerline is a fictional payment API documentation site and the second public Gridgeist case study. It tests whether the skill generalizes beyond a dashboard to dense navigation, executable examples, parameters, states, errors, and responsive reading flows.

> Ledgerline is an interface-evaluation artifact. Its API, credentials, signatures, retries, and payment behavior are illustrative and must not be used as production payment guidance.

## Experiment

The repository preserves three comparable surfaces:

- `baseline/` â€” a conventional documentation template using the same product requirements and core content.
- `experiment/prompt.md` â€” the exact Gridgeist prompt, model/surface record, skill commit, and baseline commit.
- `src/` â€” the final â€œexecutable ledgerâ€ interface produced from that prompt.

The six-part rubric scores information hierarchy, product specificity, navigation and findability, responsive recomposition, accessibility, and implementation quality. In this documented run, the baseline scored **12/30** and the final interface scored **28/30**. Read the evidence in [`experiment/rubric.md`](experiment/rubric.md); the result is not a statistical claim.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`. To inspect the generic baseline, serve the repository root and open `/baseline/`:

```powershell
npx serve . -l 4174
```

## Verify

```powershell
npm run verify
```

This runs ESLint, six Vitest assertions, a production static export, and four Playwright projects at 360, 768, 1280, and 1600 px. Browser checks cover anchors, language switching, copy feedback, mobile navigation, Escape/focus return, console errors, and document-level horizontal overflow.

## Repository map

```text
baseline/                Generic comparison implementation
experiment/prompt.md     Exact prompt and run metadata
experiment/rubric.md     Baseline/final evidence and scores
src/content/             Typed deterministic documentation
src/components/          Navigation, endpoint, parameter, and code UI
src/app/                 Page composition and responsive visual system
tests/                   Unit and browser verification
```

## Deployment

The application uses Next.js static export. Pushes to `main` run verification, build `out/` with the `/ledgerline` base path, and deploy it through GitHub Pages.

## Limitations

- Ledgerline is fictional and does not model a production payment processor.
- The case study records one model run rather than repeated controlled trials.
- No external developer usability study or assistive-technology study was conducted.
- Scores depend on the model, prompt, Gridgeist release, repository context, and evaluator judgment.
- Automated checks complement rather than replace visual inspection. The environment used for this run generated screenshots, but its local image viewer was unavailable because of a Windows sandbox-helper failure.
- As of 2026-07-13, npm reports [GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93) in the PostCSS version bundled by the latest Next.js release. Ledgerline accepts no user-authored CSS and is statically built; npm offers no non-breaking Next.js upgrade, so the project records the advisory instead of forcing an unsupported override or downgrade.

## License

[MIT](LICENSE)
