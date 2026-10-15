const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf-8');
const classRegex = /class=["']([^"']+)["']/g;
const classes = new Set();
let match;
while ((match = classRegex.exec(html)) !== null) {
  match[1].split(/\s+/).forEach(c => {
    if (c.includes('card') || c.includes('bar') || c.includes('panel') || c.includes('box') || c.includes('modal') || c.includes('list') || c.includes('grid')) {
      classes.add(c);
    }
  });
}

const css = fs.readFileSync('style.css', 'utf-8');
console.log('Classes found in HTML:');
for (const c of Array.from(classes).sort()) {
  const re = new RegExp('\\.' + c + '\\b[^{]*\\{([^}]+)\\}', 'g');
  let m;
  let hasBg = false;
  let bgValue = '';
  while ((m = re.exec(css)) !== null) {
    if (m[1].includes('background')) {
      hasBg = true;
      const bgMatch = m[1].match(/background(?:-color)?\s*:\s*([^;]+)/);
      if (bgMatch) bgValue = bgMatch[1].trim();
    }
  }
  if (hasBg) {
    console.log(`${c} -> ${bgValue}`);
  }
}
