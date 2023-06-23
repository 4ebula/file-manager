import fsPromises from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';

export async function isFile(fileName) {
  const path = join(process.cwd(), fileName);
  const stat =  await fsPromises.stat(path);
  return stat.isFile();
}