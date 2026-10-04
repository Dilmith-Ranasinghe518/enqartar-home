const fs = require('fs');
const path = require('path');

const files = [
  "app/research/page.tsx",
  "app/revision/page.tsx",
  "app/short-note/page.tsx",
  "app/live/page.tsx",
  "app/home/page.tsx",
  "app/ai-agent/page.tsx",
  "app/chatting/page.tsx",
  "app/browser/page.tsx",
  "app/book/page.tsx",
  "app/audio/page.tsx"
];

const TARGET_STR = '<div className="flex min-h-0 flex-1 overflow-hidden transition-[padding] duration-300 lg:pl-[var(--main-sidebar-width)]">';
const REPLACE_STR = '<div className="flex flex-col lg:flex-row min-h-0 flex-1 overflow-hidden transition-[padding] duration-300 lg:pl-[var(--main-sidebar-width)]">';

for (const file of files) {
  const filePath = path.join("/Volumes/Pavindu SE/Final Projects/alphamind-main-platform", file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(TARGET_STR)) {
    content = content.replace(TARGET_STR, REPLACE_STR);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed", file);
  } else {
    console.log("Skipped or already fixed", file);
  }
}
