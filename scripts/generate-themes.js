const fs = require("fs");
const path = require("path");

const CSS_DIR = path.join(__dirname, "..", "docs", "assets", "css");
const THEMES_DIR = path.join(CSS_DIR, "themes");

if (!fs.existsSync(THEMES_DIR)) {
  fs.mkdirSync(THEMES_DIR, { recursive: true });
}

// Theme definitions
const themes = {
  "midnight-indigo": {
    desc: "Deep indigo + orange accents (default)",
    heroStart: "#0f0c29",
    heroMid: "#302b63",
    heroEnd: "#24243e",
    accent: "#ff6d00",
    accentLight: "#ff9100",
    primary: "indigo",
    scheme: "default",
  },
  "ocean-teal": {
    desc: "Teal + cyan ocean vibes",
    heroStart: "#0a2e36",
    heroMid: "#134e5e",
    heroEnd: "#0c3547",
    accent: "#00bcd4",
    accentLight: "#26c6da",
    primary: "teal",
    scheme: "default",
  },
  "forest-green": {
    desc: "Deep forest greens + lime accents",
    heroStart: "#0b1a0f",
    heroMid: "#1b5e20",
    heroEnd: "#0d2818",
    accent: "#76ff03",
    accentLight: "#b2ff59",
    primary: "green",
    scheme: "default",
  },
  "royal-purple": {
    desc: "Rich purple + pink accents",
    heroStart: "#1a0033",
    heroMid: "#4a148c",
    heroEnd: "#12002b",
    accent: "#e040fb",
    accentLight: "#ea80fc",
    primary: "deep purple",
    scheme: "default",
  },
  "ember-dark": {
    desc: "Dark charcoal + ember red accents",
    heroStart: "#0a0a0a",
    heroMid: "#1a1a2e",
    heroEnd: "#16213e",
    accent: "#ff1744",
    accentLight: "#ff5252",
    primary: "red",
    scheme: "slate",
  },
  "golden-sand": {
    desc: "Warm earth tones + gold accents",
    heroStart: "#1a1510",
    heroMid: "#3e2723",
    heroEnd: "#2c1e14",
    accent: "#ffc107",
    accentLight: "#ffd54f",
    primary: "brown",
    scheme: "default",
  },
  "arctic-blue": {
    desc: "Cool ice blue + white accents",
    heroStart: "#0a1628",
    heroMid: "#0d47a1",
    heroEnd: "#071330",
    accent: "#42a5f5",
    accentLight: "#90caf9",
    primary: "blue",
    scheme: "default",
  },
  "monochrome": {
    desc: "Clean black & white + subtle gray",
    heroStart: "#0a0a0a",
    heroMid: "#1a1a1a",
    heroEnd: "#111111",
    accent: "#ffffff",
    accentLight: "#e0e0e0",
    primary: "grey",
    scheme: "slate",
  },
};

function generateThemeCSS(name, t) {
  return `/* Theme: ${name} — ${t.desc} */
:root {
  --color-hero-start: ${t.heroStart};
  --color-hero-mid: ${t.heroMid};
  --color-hero-end: ${t.heroEnd};
  --color-accent: ${t.accent};
  --color-accent-light: ${t.accentLight};
  --color-accent-glow: ${t.accent}33;
}
.hero-section {
  background: linear-gradient(160deg, ${t.heroStart}, ${t.heroMid} 50%, ${t.heroEnd}) !important;
}
.hero-section .md-button--primary,
.md-typeset .md-button--primary {
  background: linear-gradient(135deg, ${t.accent}, ${t.accentLight}) !important;
  box-shadow: 0 4px 20px ${t.accent}33 !important;
}
.home-card::after,
.impact-card::after {
  background: linear-gradient(90deg, ${t.accent}, ${t.accentLight}) !important;
}
.md-typeset .admonition.info,
.md-typeset details.info {
  border-left-color: ${t.accent} !important;
}
.md-typeset .admonition.quote {
  border-left-color: ${t.accent} !important;
}
.md-typeset hr {
  background: linear-gradient(90deg, transparent 5%, ${t.accent}22 50%, transparent 95%) !important;
}
`;
}

function generateMkdocsSnippet(name, t) {
  return `# In mkdocs.yml, change palette to:
#   primary: "${t.primary}"
#   scheme: "${t.scheme}"
# And add to extra_css:
#   - assets/css/themes/${name}.css
`;
}

console.log("\n🎨 Generating theme CSS files...\n");
console.log("Available themes:\n");

Object.entries(themes).forEach(([name, t]) => {
  const css = generateThemeCSS(name, t);
  const filepath = path.join(THEMES_DIR, `${name}.css`);
  fs.writeFileSync(filepath, css);

  const snippet = generateMkdocsSnippet(name, t);
  console.log(`  ✓ ${name}.css — ${t.desc}`);
  console.log(`    ${snippet.split("\n").join("\n    ")}`);
});

// Generate a switcher README
const readme = `# Theme Switcher

Generated themes for the Dare Badejo Portfolio.

## How to Use

1. Pick a theme from below
2. Add the theme CSS file to your \`mkdocs.yml\`:

\`\`\`yaml
extra_css:
  - assets/css/custom.css
  - assets/css/themes/<theme-name>.css
\`\`\`

3. Update the \`primary\` color in \`mkdocs.yml\` palette to match.
4. Rebuild: \`mkdocs build\` or let the dev server auto-reload.

## Available Themes

${Object.entries(themes)
  .map(
    ([name, t]) =>
      `### ${name}\n${t.desc}\n- Primary: \`${t.primary}\`\n- Scheme: \`${t.scheme}\`\n- Accent: \`${t.accent}\`\n`
  )
  .join("\n")}

## Preview All

To quickly preview, swap the theme CSS in \`mkdocs.yml\` and reload.
`;

fs.writeFileSync(path.join(THEMES_DIR, "README.md"), readme);
console.log("  ✓ README.md (usage instructions)\n");
console.log("✅ Done! Theme files saved to docs/assets/css/themes/\n");
console.log("To apply a theme, add it to extra_css in mkdocs.yml:");
console.log('  - assets/css/themes/<theme-name>.css\n');
