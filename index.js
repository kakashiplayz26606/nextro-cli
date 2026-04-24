#!/usr/bin/env node

const inquirer = require("inquirer");
const { execSync, spawn } = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

let downloadPath = "./downloads";

if (!fs.existsSync(downloadPath)) {
fs.mkdirSync(downloadPath);
}

// 🔵 ASCII LOGO
function showLogo() {
console.log(
chalk.blue(`███╗   ██╗███████╗██╗  ██╗████████╗██████╗  ██████╗ 
████╗  ██║██╔════╝╚██╗██╔╝╚══██╔══╝██╔══██╗██╔═══██╗
██╔██╗ ██║█████╗   ╚███╔╝    ██║   ██████╔╝██║   ██║
██║╚██╗██║██╔══╝   ██╔██╗    ██║   ██╔══██╗██║   ██║
██║ ╚████║███████╗██╔╝ ██╗   ██║   ██║  ██║╚██████╔╝
╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝
        NEXTRO CLI - by KAKASHI神`)
);
}

// pause
function pause() {
console.log(chalk.gray("\nPress Enter to continue..."));
process.stdin.resume();
process.stdin.once("data", () => {
process.stdin.pause();
mainMenu();
});
}

// 🔥 INSTALL ALL
function installAll() {
console.clear();
showLogo();

console.log(chalk.cyan("⚡ Installing dependencies...\n"));

try {
execSync("pip install -U yt-dlp", { stdio: "inherit" });
} catch {
console.log(chalk.red("Python not found. Install it first."));
}

try {
execSync("ffmpeg -version", { stdio: "ignore" });
console.log(chalk.green("✅ ffmpeg installed"));
} catch {
console.log(chalk.yellow("⚠️ Install ffmpeg manually: https://ffmpeg.org/download.html"));
}

console.log(chalk.green("\n✅ Setup Complete!"));
pause();
}

// 📁 DIRECTORY
async function setupDirectory() {
const { path } = await inquirer.prompt([
{ type: "input", name: "path", message: "Download folder:" },
]);

downloadPath = path;

if (!fs.existsSync(downloadPath)) {
fs.mkdirSync(downloadPath, { recursive: true });
}

console.log(chalk.green("✅ Directory set"));
pause();
}

// 🎬 DOWNLOAD
async function downloadMenu() {
const { type } = await inquirer.prompt([
{
type: "list",
name: "type",
message: "Format:",
choices: ["MP4 (Best Video)", "MP3 (Audio)", "M4A (Audio)"],
},
]);

const { url } = await inquirer.prompt([
{ type: "input", name: "url", message: "Video URL:" },
]);

console.clear();
showLogo();

console.log(chalk.blue("🔎 Fetching video info..."));

let args = [];

if (type.includes("MP4")) {
args = ["-f", "best", "-o", `${downloadPath}/%(title)s.%(ext)s`, url];
} else if (type.includes("MP3")) {
args = ["-x", "--audio-format", "mp3", "-o", `${downloadPath}/%(title)s.%(ext)s`, url];
} else {
args = ["-x", "--audio-format", "m4a", "-o", `${downloadPath}/%(title)s.%(ext)s`, url];
}

console.log(chalk.cyan("⚡ Downloading in high quality...\n"));

const processDl = spawn("yt-dlp", args, { stdio: "inherit" });

processDl.on("close", () => {
console.log(chalk.green("\n✅ Installed successfully!"));
pause();
});
}

// 🧠 MENU
async function mainMenu() {
console.clear();
showLogo();

const { option } = await inquirer.prompt([
{
type: "list",
name: "option",
message: "Select option:",
choices: [
"1. Install Everything",
"2. Setup Directory",
"3. Download",
"4. Exit",
],
},
]);

if (option.startsWith("1")) return installAll();
if (option.startsWith("2")) return setupDirectory();
if (option.startsWith("3")) return downloadMenu();
if (option.startsWith("4")) process.exit();
}

mainMenu();
