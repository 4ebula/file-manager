import { createInterface } from 'node:readline';
import { greetUser, farewellUser } from './user.js';


process.on('SIGINT', farewellUser);
process.on('exit', farewellUser);

function main() {
  greetUser();
  const rl = createInterface({
    input: process.stdin,

  });

  rl.on('line', line => {
    if (/^\.exit$/.test(line)) {
      process.exit();
    }
    else {
      console.log(line);
    }
  });

}

main();
