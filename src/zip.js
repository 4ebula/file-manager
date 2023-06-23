import zlib from 'node:zlib';
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { splitNames } from './utils.js';
import { MESSAGES } from './messages.js';
import { deleteFile, readFile } from './file-handler.js';

export async function compress(names, decompress = false) {
  let isDestExist = false;
  const splitedNames = splitNames(names);

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
  const brotli = decompress
    ? zlib.createBrotliDecompress()
    : zlib.createBrotliCompress();

  try {
    await pipeline(rs, brotli, ws);
  } catch {
    if (!isDestExist) {
      deleteFile(dest);
    }
    console.log(MESSAGES.operationFailed);
  }
}

