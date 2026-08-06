#!/usr/bin/env node
/* Generates src/assets/svg/*.ts from the downloaded PIE repos:
 *   ~/Documents/pie-iconography, pie-illustrations, pie-logos
 * Output files are committed; re-run to refresh from the official sources.
 */
const fs = require('fs');
const path = require('path');

const REPOS = path.join(process.env.HOME, 'Documents');
const OUT_DIR = path.join(__dirname, '..', 'src', 'assets', 'svg');

const read = (p) => fs.readFileSync(p, 'utf8').trim();
const header = (source) =>
  `/** Generated from ${source} (official PIE repo). Do not edit manually. */`;

function quote(str) {
  return JSON.stringify(str);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

/* ---------- Icons: path data only (components apply theme colours) ---------- */
const iconPath = (folder, name) =>
  read(path.join(REPOS, 'pie-iconography', 'All', folder, `${name}.svg`));

function extractIcon(file) {
  const viewBox = file.match(/viewBox="([^"]+)"/)[1];
  const paths = [...file.matchAll(/<path[^>]*d="([^"]+)"[^>]*\/?>/g)].map((m) => m[1]);
  return { viewBox, paths };
}

const search = extractIcon(iconPath('Functionality', 'search'));
const star = extractIcon(iconPath('Reaction', 'star-filled'));
const pin = extractIcon(iconPath('Location', 'location-pin'));
const settings = extractIcon(iconPath('Functionality', 'settings'));

const icons = `export type PieIconSource = {
    viewBox: string;
    paths: string[];
};

export type PieIconName = 'search' | 'star' | 'locationPin' | 'settings';

/** Official PIE icons (pie-iconography). Path data only; components apply theme colours. */
export const pieIcons: Record<PieIconName, PieIconSource> = {
    search: ${JSON.stringify(search)},
    star: ${JSON.stringify(star)},
    locationPin: ${JSON.stringify(pin)},
    settings: ${JSON.stringify(settings)},
};
`;

fs.writeFileSync(path.join(OUT_DIR, 'pieIcons.ts'), header('pie-iconography') + '\n\n' + icons);

/* ------------------------------- Logo ------------------------------------ */
const logo = read(
  path.join(REPOS, 'pie-logos', 'Brand', 'Light', 'light-justeat-primary-horizontal.svg')
);
const logoFile = `${header('pie-logos (Brand/Light/light-justeat-primary-horizontal.svg)')}

/** Just Eat primary horizontal logo, monochrome orange brand mark (works on light & dark). */
export const pieLogo = ${quote(logo)};
`;
fs.writeFileSync(path.join(OUT_DIR, 'pieLogo.ts'), logoFile);

/* --------------------------- Illustrations -------------------------------- */
const illo = (name) =>
  read(path.join(REPOS, 'pie-illustrations', 'Small', `${name}.svg`));

const illustrations = `${header('pie-illustrations (Small)')}

export type PieIllustrationKey = 'emptyResults' | 'apiError' | 'noConnection' | 'invalidPostcode';

/** Official PIE illustrations used for empty and error states. */
export const pieIllustrations: Record<PieIllustrationKey, string> = {
    emptyResults: ${quote(illo('looking-1-small'))},
    apiError: ${quote(illo('app-down-1-small'))},
    noConnection: ${quote(illo('error-sorry-1-small'))},
    invalidPostcode: ${quote(illo('compulsory-fields-small'))},
};
`;
fs.writeFileSync(path.join(OUT_DIR, 'pieIllustrations.ts'), illustrations);

console.log(`Generated SVG asset modules in ${OUT_DIR}`);
