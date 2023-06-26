export function splitNames(names) {
  const spaces = names.match(/\s/g);
  if (!spaces) {
    return;
  }

  let oldName, newName;
  let spaceIndex;
  let isFirstWithQuotes = false;
  const namesArr = names.split('');

  if (names.at(0) === '"') {
    oldName = names.match(/".*?"/)[0].replace(/"/g, '');
    spaceIndex = oldName.length + 2;
    isFirstWithQuotes = true;
  } else {
    oldName = names.split(' ')[0];
    spaceIndex = oldName.length;
  }

  if (names.at(spaceIndex + 1) === '"') {
    newName = isFirstWithQuotes ? names.match(/".*?"/g)[1] : names.match(/".*?"/)[0];
    newName = newName.replace(/"/g, '');
  } else {
    newName = names.substring(spaceIndex + 1);
  }

  return [oldName, newName];
}
