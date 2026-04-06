const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

const IMG_DIR = path.join(__dirname, "..", "docs", "assets", "images");

// Ensure output directory exists
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// Image definitions: [filename, width, height, label, bgColors, icon]
const images = [
  // Hero / Profile
  ["hero-banner.png", 1200, 480, "Dare Badejo", ["#0f0c29", "#302b63", "#24243e"], "◆"],
  ["profile-photo.png", 400, 400, "DB", ["#1a237e", "#3949ab"], "●"],

  // Work project thumbnails
  ["project-supply-chain.png", 800, 400, "Supply Chain\nOptimization", ["#1b5e20", "#388e3c"], "⛓"],
  ["project-agent-matching.png", 800, 400, "Agent-Based\nMatching", ["#4a148c", "#7b1fa2"], "◎"],
  ["project-lca-tea.png", 800, 400, "LCA / TEA\nSustainability", ["#00695c", "#00897b"], "♻"],
  ["project-dow.png", 800, 400, "Dow Process\nOptimization", ["#bf360c", "#e64a19"], "⚙"],

  // Research visuals
  ["research-optimization.png", 800, 360, "Optimization Under\nUncertainty", ["#0d47a1", "#1565c0"], "∑"],
  ["research-systems.png", 800, 360, "Integrated Systems\nModeling", ["#311b92", "#512da8"], "⊞"],
  ["research-sustainability.png", 800, 360, "Sustainability &\nDecision Support", ["#1b5e20", "#2e7d32"], "♻"],

  // About
  ["about-banner.png", 1000, 300, "Applied Scientist | AI & Decision Systems", ["#1a237e", "#283593"], "◆"],

  // Insights
  ["insight-disruption.png", 800, 320, "Disruption\nModeling", ["#b71c1c", "#d32f2f"], "⚡"],
  ["insight-sustainability.png", 800, 320, "Cost vs.\nSustainability", ["#1b5e20", "#388e3c"], "⚖"],
  ["insight-optimization.png", 800, 320, "From Model\nto Impact", ["#e65100", "#ef6c00"], "→"],
  ["insight-ai.png", 800, 320, "AI-Driven\nDecisions", ["#0d47a1", "#1976d2"], "◈"],

  // Impact
  ["impact-banner.png", 1000, 300, "Measurable Impact", ["#ff6d00", "#ff9100"], "▲"],

  // Contact
  ["contact-banner.png", 1000, 280, "Let's Connect", ["#1a237e", "#3949ab"], "✉"],

  // Favicon
  ["favicon.png", 128, 128, "DB", ["#ff6d00", "#ff9100"], "●"],
];

function generateImage(filename, w, h, label, colors, icon) {
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  // Gradient background
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(1, colors[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle grid pattern
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }

  // Decorative circles
  ctx.fillStyle = "rgba(255,255,255,0.03)";
  ctx.beginPath();
  ctx.arc(w * 0.8, h * 0.2, Math.min(w, h) * 0.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.15, h * 0.85, Math.min(w, h) * 0.25, 0, Math.PI * 2);
  ctx.fill();

  // Large icon
  const iconSize = Math.min(w, h) * 0.18;
  ctx.font = `${iconSize}px serif`;
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(icon, w * 0.85, h * 0.25);

  // Label text
  const lines = label.split("\n");
  const fontSize = Math.min(w, h) * (lines.length > 1 ? 0.1 : 0.08);
  ctx.font = `bold ${fontSize}px Inter, Helvetica, Arial, sans-serif`;
  ctx.fillStyle = "rgba(255,255,255,0.92)";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const lineHeight = fontSize * 1.3;
  const startY = h / 2 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, startY + i * lineHeight);
  });

  // Subtle bottom accent line
  const accentGrad = ctx.createLinearGradient(w * 0.2, 0, w * 0.8, 0);
  accentGrad.addColorStop(0, "rgba(255,109,0,0)");
  accentGrad.addColorStop(0.5, "rgba(255,109,0,0.6)");
  accentGrad.addColorStop(1, "rgba(255,109,0,0)");
  ctx.fillStyle = accentGrad;
  ctx.fillRect(w * 0.2, h - 4, w * 0.6, 4);

  // Save
  const buffer = canvas.toBuffer("image/png");
  const filepath = path.join(IMG_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`  ✓ ${filename} (${w}x${h})`);
}

console.log("\n🎨 Generating placeholder images...\n");
images.forEach(([fn, w, h, label, colors, icon]) => {
  generateImage(fn, w, h, label, colors, icon);
});
console.log(`\n✅ Done! ${images.length} images saved to docs/assets/images/\n`);
