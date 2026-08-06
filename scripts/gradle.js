const path = require('path');
const { spawnSync } = require('child_process');

const androidDir = path.join(__dirname, '..', 'android');
const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

const VERSION_NAME_RE = /^\d+\.\d+(?:\.\d+)?$/;
const VERSION_CODE_RE = /^\d+$/;

const args = process.argv.slice(2);

let gradleArgs;
if (args.every(arg => VERSION_NAME_RE.test(arg) || VERSION_CODE_RE.test(arg))) {
  gradleArgs = ['clean', 'assembleRelease'];
  args.forEach(arg => {
    if (VERSION_NAME_RE.test(arg)) {
      gradleArgs.push(`-PversionName=${arg}`);
    } else {
      gradleArgs.push(`-PversionCode=${arg}`);
    }
  });
} else if (args.length === 0) {
  gradleArgs = ['clean', 'assembleRelease'];
} else {
  gradleArgs = args;
}

const result = spawnSync(gradlew, gradleArgs, {
  cwd: androidDir,
  stdio: 'inherit',
  shell: process.platform === 'win32',
});

process.exit(result.status === null ? 1 : result.status);
