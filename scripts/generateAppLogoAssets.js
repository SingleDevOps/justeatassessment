#!/usr/bin/env node
/* Generates app icon + splash PNGs for iOS and Android from the official PIE logos:
 *   ~/Documents/pie-logos/Brand/Light/light-justeat-primary-vertical.svg    (app icon: spoon mark + wordmark on white)
 *   ~/Documents/pie-logos/Brand/Light/light-justeat-primary-horizontal.svg  (splash: in-app logo on white)
 * Rasterises at full size via macOS Quick Look (qlmanage), then crops and
 * downscales with sips (QuickLook renders small thumbnails unreliably).
 * Outputs are committed; re-run to refresh from the official sources.
 * Does not touch the asset-catalog JSONs, storyboard or Android XMLs — only the PNGs.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const LOGOS_DIR = path.join(process.env.HOME, 'Documents', 'pie-logos', 'Brand', 'Light');
const ROOT = path.join(__dirname, '..');
const IOS_ICON_DIR = path.join(ROOT, 'ios', 'justeatassessment', 'Images.xcassets', 'AppIcon.appiconset');
const IOS_SPLASH_DIR = path.join(ROOT, 'ios', 'justeatassessment', 'Images.xcassets', 'SplashLogo.imageset');
const ANDROID_MIPMAPS = path.join(ROOT, 'android', 'app', 'src', 'main', 'res', 'mipmap-%s');
const ANDROID_DRAWABLE = path.join(ROOT, 'android', 'app', 'src', 'main', 'res', 'drawable');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'justeat-logo-'));

const WHITE = '#FFFFFF';
const ICON_LOGO_FRACTION = 0.72; // logo spans 72% of the square canvas width
const SPLASH_LOGO_FRACTION = 0.6;

const read = (p) => fs.readFileSync(p, 'utf8').trim();
const inner = (svg) => svg.replace(/<svg[^>]*>/i, '').replace(/<\/svg>/i, '').trim();
const fail = (msg) => {
    console.error(`[generateAppLogoAssets] ${msg}`);
    process.exit(1);
};

/* Build a square SVG: white background + logo centred at `fraction` of the canvas width. */
function buildSquareSvg(size, logoInner, viewBoxWidth, viewBoxHeight, fraction) {
    const scale = (size * fraction) / viewBoxWidth;
    return [
        `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`,
        `<rect width="${size}" height="${size}" fill="${WHITE}"/>`,
        `<g transform="translate(${size / 2} ${size / 2}) scale(${scale}) translate(${-viewBoxWidth / 2} ${-viewBoxHeight / 2})">${logoInner}</g>`,
        `</svg>`,
    ].join('\n');
}

/* qlmanage/sips can return before the output file is flushed; poll until it appears. */
function waitFor(file, timeoutMs = 15000) {
    const start = Date.now();
    while (!fs.existsSync(file)) {
        if (Date.now() - start > timeoutMs) fail(`timed out waiting for ${file}`);
        execFileSync('sleep', ['0.1'], { stdio: 'ignore' });
    }
}

function rasterizeSquare(svgPath, size) {
    execFileSync('qlmanage', ['-t', '-s', String(size), '-o', TMP, svgPath], { stdio: 'ignore' });
    const out = `${svgPath}.png`;
    waitFor(out);
    return out;
}

/* Crop a square PNG down to (w x h) from its centre. */
function cropCenter(pngPath, w, h) {
    const out = path.join(TMP, `${path.basename(pngPath, '.png')}-${w}x${h}.png`);
    execFileSync('sips', ['-c', String(h), String(w), pngPath, '--out', out], { stdio: 'ignore' });
    waitFor(out);
    return out;
}

/* Downscale a PNG to an exact square size (sips resample). */
function downscaleSquare(pngPath, size) {
    const out = path.join(TMP, `${path.basename(pngPath, '.png')}-${size}.png`);
    execFileSync('sips', ['-z', String(size), String(size), pngPath, '--out', out], { stdio: 'ignore' });
    waitFor(out);
    return out;
}

/* ------------------------------- Sources -------------------------------- */
const verticalSvg = read(path.join(LOGOS_DIR, 'light-justeat-primary-vertical.svg'));
const horizontalSvg = read(path.join(LOGOS_DIR, 'light-justeat-primary-horizontal.svg'));
const [verticalViewBox, horizontalViewBox] = [verticalSvg, horizontalSvg].map((s) => {
    const [w, h] = s.match(/viewBox="0 0 (\d+) (\d+)"/).slice(1).map(Number);
    return { width: w, height: h };
});
const verticalInner = inner(verticalSvg); // 44x42: spoon mark above 'just eat' wordmark
const horizontalInner = inner(horizontalSvg); // 156x38: in-app header logo

/* ------------------------------ iOS icons ------------------------------- */
/* QuickLook only renders reliably at full size, so render once at 1024px and
 * downscale with sips for every slot (small-size qlmanage renders come out
 * misplaced and squashed). */
const iosIcons = [
    ['Icon-20@2x.png', 40],
    ['Icon-20@3x.png', 60],
    ['Icon-29@2x.png', 58],
    ['Icon-29@3x.png', 87],
    ['Icon-40@2x.png', 80],
    ['Icon-40@3x.png', 120],
    ['Icon-60@2x.png', 120],
    ['Icon-60@3x.png', 180],
    ['Icon-1024.png', 1024],
];

{
    const svg = path.join(TMP, 'ios-icon.svg');
    fs.writeFileSync(svg, buildSquareSvg(1024, verticalInner, verticalViewBox.width, verticalViewBox.height, ICON_LOGO_FRACTION));
    const master = rasterizeSquare(svg, 1024);
    fs.mkdirSync(IOS_ICON_DIR, { recursive: true });
    for (const [name, size] of iosIcons) {
        fs.copyFileSync(size === 1024 ? master : downscaleSquare(master, size), path.join(IOS_ICON_DIR, name));
    }
}

/* ------------------------------ iOS splash ------------------------------ */
/* 1560x380 @10x of the 156x38 logo: rendered square then centre-cropped. */
{
    fs.mkdirSync(IOS_SPLASH_DIR, { recursive: true });
    const svg = path.join(TMP, 'ios-splash.svg');
    fs.writeFileSync(svg, buildSquareSvg(1560, horizontalInner, horizontalViewBox.width, horizontalViewBox.height, SPLASH_LOGO_FRACTION));
    const square = rasterizeSquare(svg, 1560);
    fs.copyFileSync(cropCenter(square, 1560, 380), path.join(IOS_SPLASH_DIR, 'splash-logo.png'));
}

/* --------------------------- Android app icons -------------------------- */
const androidDensities = [
    ['mdpi', 48],
    ['hdpi', 72],
    ['xhdpi', 96],
    ['xxhdpi', 144],
    ['xxxhdpi', 192],
];

{
    const svg = path.join(TMP, 'android-icon.svg');
    fs.writeFileSync(svg, buildSquareSvg(1024, verticalInner, verticalViewBox.width, verticalViewBox.height, ICON_LOGO_FRACTION));
    const master = rasterizeSquare(svg, 1024);
    for (const [density, size] of androidDensities) {
        const png = size === 1024 ? master : downscaleSquare(master, size);
        const dir = ANDROID_MIPMAPS.replace('%s', density);
        fs.mkdirSync(dir, { recursive: true });
        fs.copyFileSync(png, path.join(dir, 'ic_launcher.png'));
        fs.copyFileSync(png, path.join(dir, 'ic_launcher_round.png'));
    }
}

/* --------------------------- Android splash ----------------------------- */
{
    const svg = path.join(TMP, 'android-splash.svg');
    fs.writeFileSync(svg, buildSquareSvg(1560, horizontalInner, horizontalViewBox.width, horizontalViewBox.height, SPLASH_LOGO_FRACTION));
    const square = rasterizeSquare(svg, 1560);
    fs.mkdirSync(ANDROID_DRAWABLE, { recursive: true });
    fs.copyFileSync(cropCenter(square, 1560, 380), path.join(ANDROID_DRAWABLE, 'launch_logo.png'));
}

console.log(
    `Generated app icon (${iosIcons.length} iOS + ${androidDensities.length} Android sizes) and splash PNGs (iOS + Android).`
);
