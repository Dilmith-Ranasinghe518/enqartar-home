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

for (const file of files) {
  const filePath = path.join("/Volumes/Pavindu SE/Final Projects/alphamind-main-platform", file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add import
  if (!content.includes('MobileContentsDropdown')) {
    content = content.replace(
      "import Footer from '@/components/layout/Footer';",
      "import Footer from '@/components/layout/Footer';\nimport MobileContentsDropdown from '@/components/MobileContentsDropdown';"
    );
  }
  
  // Find course variable
  const courseMatch = content.match(/<ContentsSidebar[\s\S]*?course={([^}]+)}/);
  const courseVar = courseMatch ? courseMatch[1] : 'course';

  const componentStr = `<MobileContentsDropdown
                course={${courseVar}}
                currentLessonId={currentLessonId as any}
                setCurrentLessonId={setCurrentLessonId as any}
                isDark={isDark}
              />`;
  
  // 2. Add component
  if (!content.includes('<MobileContentsDropdown')) {
      if (content.includes('<WeeklySpecialsCarousel />')) {
        content = content.replace(
          "<WeeklySpecialsCarousel />",
          "<WeeklySpecialsCarousel />\n\n              " + componentStr
        );
      } else {
        const buttonEndRegex = /Open contents.*?<\/button>/s;
        const match = content.match(buttonEndRegex);
        if (match) {
          content = content.replace(
            match[0],
            match[0] + "\n\n              " + componentStr
          );
        }
      }
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Updated", file);
}
