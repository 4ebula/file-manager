import { createReadStream, createWriteStream } from 'node:fs';
import fsPromises from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import { pipeline } from 'node:stream/promises';
import { splitNames } from './utils.js';
import { MESSAGES } from './messages.js';

export async function isFile(fileName) {
  const path = join(process.cwd(), fileName);
  const stat = await fsPromises.stat(path);
  return stat.isFile();
}

export async function openFile(fileName) {
  try {
    const res = await readFile(fileName);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}

export async function readFile(fileName) {
  const filePath = join(process.cwd(), fileName);
  const rs = createReadStream(filePath);

  return new Promise((res, rej) => {
    let data = '';
    rs.on('data', chunk => data += chunk);

    rs.on('error', () => {
      rej(MESSAGES.operationFailed);
    });

    rs.on('end', () => {
      res(data);
    });
  });
}

export async function createFile(fileName) {
  const filePath = join(process.cwd(), fileName);
  try {
    await fsPromises.writeFile(fileName, '', { flags: 'wx+' });
  } catch {
    console.log(MESSAGES.operationFailed);
  }
}

export async function renameFile(names) {
  const splitedNames = splitNames(names);

  if (!splitedNames) {
    console.log(MESSAGES.operationFailed);
    return;
  }

  const [oldName, newName] = splitedNames;

  try {
    await fsPromises.rename(oldName, newName);
  } catch {
    console.log(MESSAGES.operationFailed);
  }
}

export async function deleteFile(fileName) {
  try {
    await fsPromises.unlink(fileName);
  } catch {
    console.log(MESSAGES.operationFailed);
  }
}

export async function copyFile(names, deleteOld = false) {
  const splitedNames = splitNames(names);
  let isFileCopied = false;
  let isDestExist = false;

  if (!splitedNames) {
    console.log(MESSAGES.operationFailed);
    return;
  }

  const [source, dest] = splitedNames;

  try {
    await readFile(dest);
    isDestExist = true;
  } catch {
    isDestExist = false;
  }

  const rs = createReadStream(source);
  const ws = createWriteStream(dest);

  try {
    await pipeline(rs, ws);
    isFileCopied = true;
  } catch {
    isFileCopied = false;
    console.log(MESSAGES.operationFailed);
    if (!isDestExist) {
      deleteFile(dest);
    }
  }

  if (deleteOld && isFileCopied) {
    deleteFile(source);
  }
}
