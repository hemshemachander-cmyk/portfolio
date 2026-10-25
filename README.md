# Cyberpunk Game HUD — Developer Portfolio

A responsive, cyberpunk-inspired portfolio for **hemachander k**, built with HTML5, CSS3, and vanilla JavaScript. It uses a dark interface with electric-orange accents, a game-launcher start screen, top navigation, a compact HUD rail, project details, and accessible form validation.

## Files

- `index.html` — page structure and portfolio content
- `style.css` — theme, responsive layout, visual effects, and reduced-motion rules
- `script.js` — start screen, navigation state, project details, contact configuration, and validation

## Run locally

1. Download and extract the ZIP.
2. Keep all four files in the same folder.
3. Open `index.html` in a modern browser.

No build step, package installation, backend, or paid API is required. The Google Fonts link is optional; if offline, the CSS fallback fonts are used.

## Personalize the portfolio

### Update the About section

Open `index.html` and edit the text inside `#about`. Keep the name and college as provided, and only add biography details that are accurate for you.

### Change colors

At the top of `style.css`, update the CSS custom properties in `:root`:

```css
--bg: #08090d;
--bg2: #10131a;
--card: #141922;
--orange: #ff6a00;
--orange2: #ff8c32;
--text: #f4f5f7;
--muted: #9ca3af;
```

### Add skills

In `index.html`, duplicate one `<article class="skill-card panel reveal">...</article>` inside `.skills-grid`. Update the number, symbol, name, short description, and category label. Avoid adding proficiency percentages unless you choose and can substantiate them.

### Add projects

Duplicate the `<article class="project-card panel reveal">` project layout in the Projects section and update the title, description, problem, features, technologies, and status. Add only technologies and project status you can verify. Repository and demo buttons are controlled by the configuration below.

### Update education

Edit the college/course fields inside `#education`. The college name is already set to Sri Manakula Vinayagar Engineering College. Replace bracketed course, department, study-period, and coursework placeholders with your confirmed details.

### Add contact links and project URLs

At the top of `script.js`, edit `PORTFOLIO_CONFIG`:

```js
const PORTFOLIO_CONFIG = {
  email: "your-real-email@example.com",
  githubUrl: "https://github.com/your-username",
  linkedinUrl: "https://www.linkedin.com/in/your-profile/",
  projectRepositoryUrl: "https://github.com/your-username/your-project",
  projectDemoUrl: "https://your-live-demo.example"
};
```

Replace these examples with your actual details. Leave a value as an empty string (`""`) if it is not available. Invalid or empty URLs do not produce project buttons. External links open with `rel="noopener noreferrer"`.

### Configure a working contact form

By default, the form validates required fields and email format but does **not** transmit or store messages. If you enter a valid real address in `PORTFOLIO_CONFIG.email`, a valid submission opens the visitor's email application with a prefilled `mailto:` draft. The visitor must press Send in that application.

For direct website delivery, connect a trusted form provider or your own backend. Configure the endpoint/server-side validation on the server, keep private API keys on the server, and update the submit handler to post to that endpoint. Do not put secrets in `script.js`. Test delivery and spam protections before publishing.

## Accessibility and responsive behavior

- Semantic landmarks, a skip link, labels, focus indicators, and keyboard-operable controls are included.
- The start screen can be activated with Enter or Space when the screen itself has focus; the Start button is directly keyboard accessible.
- The page respects `prefers-reduced-motion`.
- Layout breakpoints adapt to mobile, tablet, laptop, and desktop widths.
- The contact form provides inline validation and an accessible status message.

## Deploy online

You can deploy these static files using GitHub Pages, Netlify, Cloudflare Pages, or another static-hosting provider:

1. Create a repository or site project.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the publish directory.
3. Set the publish directory to the folder containing `index.html` (the repository root for a simple GitHub Pages setup).
4. Deploy and test the published URL on desktop and mobile.
5. Add only real public URLs and verified personal information before sharing.

## Notes

- `Smart Campus Assistant` is included as a project entry, but its implementation details, technologies, status, repository, and demo are intentionally left unconfirmed.
- No degree, graduation date, experience, achievements, proficiency scores, or contact details have been invented.
- The loading/progress line is decorative and does not simulate actual loading.


## Neon Dimension visual update

The theme now uses a cyan / violet / magenta neon palette. The hero includes a lightweight CSS 3D holographic cube, and the Smart Campus Assistant illustration includes extra animated campus towers and a floating cube. Hero, project, and skill panels have subtle pointer-driven 3D tilt on mouse devices. These are CSS-rendered 3D-style models, so there are no external model downloads or WebGL dependencies. Animations respect `prefers-reduced-motion` and pointer tilt is only enabled for hover-capable devices.

To adjust the neon colors, edit the variables at the beginning of the **NEON DIMENSION UPDATE** block near the end of `style.css` (`--orange`, `--orange2`, `--neon-blue`, and `--neon-violet`). The names `--orange` and `--orange2` are retained to keep the existing component styles compatible, but their colors are now cyan and pink.

## Neon world-entry experience
- Pressing **START** now opens a full-screen animated globe sequence, locks onto India, and transitions into the portfolio after a short progress sequence.
- The globe, starfield, orbital rings, India target marker, and scan line are CSS animations, so no external video download is required.
- Small synthesized arcade-style navigation tones play on hover/focus/click after browser audio is allowed. These are original generated tones, not ripped GTA San Andreas audio.
- Portfolio sections now use additional neon ambient gradients and subtle star-grid texture. Motion respects the system's reduced-motion preference.

## Loading sequence update
- Pressing **START** now opens a dedicated loading transition before the portfolio appears.
- The CSS globe rotates with orbital effects and a highlighted India marker.
- Fictional game/player IDs are displayed; `HMK-01` is selected as Hemachander K.'s profile node.
- A staged progress bar advances through global map scan, player-node scan, India targeting, and profile connection.
- Lightweight synthesized menu tones are generated by the browser for menu hover/focus/click and player-node hover. Browser audio begins after a user gesture; sounds can be blocked by browser settings.
- The loader and portfolio remain local files; no external video or media download is required.
