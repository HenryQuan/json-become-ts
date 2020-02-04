const fs = require('fs');

const argv = process.argv.slice(2);
if (argv.length === 0) {
  showUsage();
} else {
  const jsonPath = argv[0];

  const file = fs.readFileSync(jsonPath);
  const jsonObject = JSON.parse(file);
  for (const key in jsonObject) {
    console.log(key, typeof jsonObject[key]);
  }
}

/**
 * Show usage and exit the process
 */
function showUsage() {
  console.log('Usage: node json2ts.js [json_path] [folder_name]');
  process.exit();
}
