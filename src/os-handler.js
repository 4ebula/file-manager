import os from 'node:os';
import { MESSAGES } from './messages.js';

export function handleOS(line) {
  const command = line.substr(3).replace('--', '');

  switch (command) {
    case 'EOL': console.log('System EOL: ', JSON.stringify(os.EOL));
      break;
    case 'cpus': showCpus();
      break;
    case 'homedir': console.log(`Home directory: ${os.homedir()}`);
      break;
    case 'username': console.log(`Username: ${os.userInfo().username}`);
      break;
    case 'architecture': console.log(`Architecture: ${os.arch()}`);
      break;
    default: console.log(MESSAGES.invalidCommand);
  }
}

function showCpus() {
  console.log('Overall amount: ', os.cpus().length);
  os.cpus().forEach(({ model, speed }) => {
    console.log(`Model: ${ model }`);
    console.log(`Clock rate: ${speed / 1000} GHz`);
  });
}
