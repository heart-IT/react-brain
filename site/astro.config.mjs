import { defineConfig } from 'astro/config';

// Static site generated from the corpus (../skills/react-brain-mentor). No
// framework islands — the doctor widget is vanilla JS with build-time data.
// Base path comes from the environment (Pages deploys under /react-brain/);
// `npm run build -- --base …` does NOT work — the extra args land on the
// pagefind half of the build script, not on astro.
export default defineConfig({
  base: process.env.ASTRO_BASE || '/',
});
