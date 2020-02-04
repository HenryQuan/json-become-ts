const fs = require('fs');

const argv = process.argv.slice(2);
if (argv.length === 0) {
  showUsage();
} else {
  const jsonPath = argv[0];

  const file = fs.readFileSync(jsonPath);
  const jsonObject = JSON.parse(file);
  
  const rootName = getJsonFileName(jsonPath);
  convertR(jsonObject, rootName, rootName);
}

/**
 * Convert recursively
 * @param {any} object any json object
 * @param {string} path current path
 * @param {string} name used for class name
 */
function convertR(object, path, name) {
  // Create a folder if doesn't exist to start conversion
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  const className = upperFirst(name);
  const fileContent = ['', `export interface ${className} {`];

  // Loop through object recursively and create new files and folders
  if (object.constructor === Array) {
    // If it is an array, only check if its first child
    fileContent.push(`  ${name}: ${upperFirst(name)}[],`);
    if (object[0]) {
      // Check if it has anything inside, might be an empty array
      const newPath = path.split('/');
      newPath.push(name);
      const finalPath = newPath.join('/');

      convertR(object[0], finalPath, name);
    }
  } else {
    for (const key in object) {
      const type = typeof object[key];
      console.log(type, key);
      if (type === 'object') {
        const typeName = upperFirst(key);
        // add new line
        fileContent.push(`  ${key}: ${typeName},`);
        // add import
        fileContent.unshift(`import { ${typeName} } from './${key}/${typeName}';`)
  
        const newPath = path.split('/');
        newPath.push(key);
        const finalPath = newPath.join('/');
        // Go deeper
        convertR(object[key], finalPath, key);
      } else {
        // create new files
        fileContent.push(`  ${key}: ${type}`);
      }
    }
  }

  fileContent.push('}\n');
  fs.writeFileSync(path + '/' + name + '.ts', fileContent.join('\n'));
}

/**
 * Get the filename from path
 * @param {string} jsonPath 
 */
function getJsonFileName(jsonPath) {
  const temp = jsonPath.split('/');
  return temp[temp.length - 1].replace('.json', '');
}

/**
 * Make the first char uppercase
 * - from https://stackoverflow.com/a/1026087
 * @param {string} name 
 */
function upperFirst(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Show usage and exit the process
 */
function showUsage() {
  console.log(`Usage:
node json2ts.js <file_path> [flat]`);
  process.exit();
}
