import { createInterface } from 'node:readline';
import { greetUser, farewellUser } from './user.js';
import { handleOS, showHomeDir } from './os-handler.js';
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
  showHomeDir();

  rl.on('line', line => {
    switch (true) {
      case /^\.exit$/.test(line): process.exit();
        break;
      case /^os\s/.test(line): handleOS(line);
        break;
      default: console.log(MESSAGES.invalidCommand);
    }
  });

}

main();
