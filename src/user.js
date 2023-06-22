let user;
const prefix = '--username=';

export function greetUser() {
  if (!user) { setUser(); }
  console.log(`Welcome to the File Manager, ${user}!`);
}

export function farewellUser() {
  if (!user) { setUser(); }
  console.log(`Thank you for using File Manager, ${user}, goodbye!`);
}

function setUser() {
  const userName = process.argv.slice(2).find(arg => !!arg.match(prefix));
  user = userName ? userName.replace(prefix, '') : 'guest';
}
