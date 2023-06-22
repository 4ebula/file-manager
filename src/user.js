import { MESSAGES } from './messages.js';

let user;
const prefix = '--username=';

export function greetUser() {
  if (!user) { setUser(); }
  console.log(MESSAGES.greet(user));
}

export function farewellUser() {
  if (!user) { setUser(); }
  console.log(MESSAGES.farewell(user));
}

function setUser() {
  const userName = process.argv.slice(2).find(arg => !!arg.match(prefix));
  user = userName ? userName.replace(prefix, '') : 'guest';
}
