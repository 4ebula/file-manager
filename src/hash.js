import { createHash } from 'node:crypto';
import { readFileContent } from './file-handler.js';

export async function calculateHash(filename) {
  try {
    const fileContent = await readFileContent(filename);
    const hash = createHash('sha256')
      .update(fileContent)
      .digest('hex');

    console.log(hash);
  } catch (err) {
    console.log(err);
  }
}