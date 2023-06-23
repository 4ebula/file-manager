import { createInterface } from 'node:readline';
import { greetUser, farewellUser } from './user.js';
import { handleOS } from './os-handler.js';
import { changeDirectory, goHome, goUp, listDir } from './navigation.js';
import { MESSAGES } from './messages.js';
import {
  openFile,
  createFile,
  renameFile,
  deleteFile,
  copyFile,
} from './file-handler.js';

function main() {
  const rl = createInterface({
    input: process.stdin,
  });

  process.on('SIGINT', () => {
    rl.close();
  });

  process.on('exit', () => {
    rl.close();
    farewellUser();
  });

  greetUser();
  goHome();

  rl.on('line', async (input) => {
    const line = input.trim();
    switch (true) {
      case /^\.exit$/.test(line): process.exit();
        break;
      case /^os\s/.test(line): handleOS(line);
        break;
      case /^up$/.test(line): goUp();
        break;
      case /^cd\s/.test(line): changeDirectory(line);
        break;
      case /^ls$/.test(line): await listDir();
        break;
      case /^cat\s/.test(line): await openFile(line.substring(4));
        break;
      case /^add\s/.test(line): await createFile(line.substring(4));
        break;
      case /^rn\s/.test(line): await renameFile(line.substring(3));
        break;
      case /^rm\s/.test(line): await deleteFile(line.substring(3));
        break;
      case /^cp\s/.test(line): await copyFile(line.substring(3));
        break;
      case /^mv\s/.test(line): await copyFile(line.substring(3), true);
        break;
      default: console.log(MESSAGES.invalidCommand);
    }
  });

}

main();
