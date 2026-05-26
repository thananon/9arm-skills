/**
 * 9arm-skills plugin for OpenCode.ai
 *
 * Registers 9arm-skills directory as a skills path so OpenCode discovers
 * all skills (engineering/, productivity/, misc/) automatically.
 *
 * Injects using-9arm-skills bootstrap into the first user message so agents
 * know what skills are available. Works standalone and alongside superpowers.
 */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const skillsDir = path.resolve(__dirname, '../../skills');

// Cache bootstrap content to avoid repeated disk I/O
let _bootstrapCache = undefined;

const getBootstrapContent = () => {
  if (_bootstrapCache !== undefined) return _bootstrapCache;

  const skillPath = path.join(skillsDir, 'using-9arm-skills', 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    _bootstrapCache = null;
    return null;
  }

  const fullContent = fs.readFileSync(skillPath, 'utf8');
  // Strip frontmatter
  const match = fullContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const content = match ? match[2] : fullContent;

  _bootstrapCache = `<EXTREMELY_IMPORTANT>
You have 9arm-skills loaded.

**IMPORTANT: The using-9arm-skills skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the skill tool to load "using-9arm-skills" again - that would be redundant.**

${content}
</EXTREMELY_IMPORTANT>`;

  return _bootstrapCache;
};

export const NineArmSkillsPlugin = async ({ client, directory }) => {
  return {
    // Inject skills path into live config so OpenCode discovers 9arm-skills
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }
    },

    // Inject bootstrap into the first user message of each session
    'experimental.chat.messages.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (!bootstrap || !output.messages.length) return;
      const firstUser = output.messages.find(m => m.info.role === 'user');
      if (!firstUser || !firstUser.parts.length) return;

      // Guard: skip if already contains bootstrap
      if (firstUser.parts.some(p => p.type === 'text' && p.text.includes('EXTREMELY_IMPORTANT'))) return;

      const ref = firstUser.parts[0];
      firstUser.parts.unshift({ ...ref, type: 'text', text: bootstrap });
    }
  };
};
