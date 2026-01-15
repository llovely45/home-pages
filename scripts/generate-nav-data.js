
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const INPUT_FILE = path.join(ROOT_DIR, 'data.md');
const OUTPUT_FILE = path.join(ROOT_DIR, 'docs/nav/data.ts');

function generateNavData() {
    try {
        const content = fs.readFileSync(INPUT_FILE, 'utf-8');
        const lines = content.split('\n');
        const navData = [];
        let currentSection = null;
        let currentItem = null;

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            if (line.startsWith('# ')) {
                // Section Title
                if (currentSection) {
                    if (currentItem) {
                        currentSection.items.push(currentItem);
                        currentItem = null;
                    }
                    navData.push(currentSection);
                }
                currentSection = {
                    title: line.substring(2).trim(),
                    items: []
                };
            } else if (line.startsWith('## ')) {
                // Item Title
                if (currentItem && currentSection) {
                    currentSection.items.push(currentItem);
                }
                currentItem = {
                    title: line.substring(3).trim(),
                    desc: line.substring(3).trim() // Default desc to title
                };
            } else if (line.startsWith('link:')) {
                if (currentItem) {
                    currentItem.link = line.substring(5).trim();
                }
            } else if (line.startsWith('icon:')) {
                if (currentItem) {
                    currentItem.icon = line.substring(5).trim();
                }
            } else if (line.startsWith('desc:')) {
                // Optional explicit desc support
                if (currentItem) {
                    currentItem.desc = line.substring(5).trim();
                }
            }
        }

        // Push last item and section
        if (currentItem && currentSection) {
            currentSection.items.push(currentItem);
        }
        if (currentSection) {
            navData.push(currentSection);
        }

        const fileContent = `import type { NavLink } from '../.vitepress/theme/types'

type NavData = {
  title: string
  items: NavLink[]
}

export const NAV_DATA: NavData[] = ${JSON.stringify(navData, null, 2)}
`;

        fs.writeFileSync(OUTPUT_FILE, fileContent);
        console.log('Successfully generated docs/nav/data.ts from data.md');

    } catch (error) {
        console.error('Error generating nav data:', error);
        process.exit(1);
    }
}

generateNavData();
