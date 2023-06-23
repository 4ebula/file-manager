import fsPromises from 'node:fs/promises';
import os from 'node:os';
import process from 'node:process';
import { MESSAGES } from './messages.js';
import { isFile } from './file-handler.js';

export function changeDirectory(line) {
  const path = line.substr(3);
  navigate(path);
}

export function goHome() {
  navigate(os.homedir());
}

export async function listDir() {
  const content = await fsPromises.readdir(process.cwd());
  Promise.all(content
    .map(async (name) => {
      const type = await isFile(name) ? 'file' : 'directory';
      return { name, type }
    })
  ).then(res => {
    return res.sort((a, b) => {
      if (a.type === 'directory' && b.type === 'directory') return 0;
      if (a.type === 'directory' && b.type === 'file') return -1;
      if (a.type === 'file' && b.type === 'directory') return 1;
    })
  }).then(console.table);
}

export const goUp = navigate.bind(null, '../');

function showCurrentDir() {
  console.log((`You are currently in ${process.cwd()}`));
}

function navigate(path) {
  try {
    process.chdir(path);
    showCurrentDir();
  } catch {
    console.log(MESSAGES.operationFailed);
  }
}