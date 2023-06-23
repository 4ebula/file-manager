import { createInterface } from 'node:readline';
import { greetUser, farewellUser } from './user.js';
import { handleOS } from './os-handler.js';
import { changeDirectory, goHome, goUp, listDir } from './navigation.js';
import { MESSAGES } from './messages.js';

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

  rl.on('line', async (line) => {
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
      default: console.log(MESSAGES.invalidCommand);
    }
  });

}

main();
