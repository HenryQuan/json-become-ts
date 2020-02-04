import fs from 'fs';
import { tsWritter } from './writter/tsWritter';

const argv = process.argv.slice(2);
if (argv.length === 0) {
  showUsage();
} else {
  const jsonPath = argv[0];

  const file = fs.readFileSync(jsonPath);
  const jsonObject = JSON.parse(file);
  
  const rootName = getJsonFileName(jsonPath);
  const ts = new tsWritter();
  ts.convertR(jsonObject, rootName, rootName);
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
  console.log(`Usage:\nnode json2ts.js <file_path> [flat]`);
  process.exit();
}
