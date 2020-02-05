import fs from 'fs';
import { writterTS } from './writter/writterTS';

const argv = process.argv.slice(2);
if (argv.length === 0) {
  showUsage();
} else {
  const jsonPath = argv[0];

  const file = fs.readFileSync(jsonPath);
  const jsonObject = JSON.parse(file);
  
  const rootName = getJsonFileName(jsonPath);
  const ts = new writterTS();
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
 * Show usage and exit the process
 */
function showUsage() {
  console.log(`Usage:\nnode json2ts.js <file_path>`);
  process.exit();
}
