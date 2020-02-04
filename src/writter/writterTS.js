import fs from 'fs';
import { Utility } from './utility';

class writterTS {
  /**
   * Convert recursively
   * @param {any} object any json object
   * @param {string} path current path
   * @param {string} name used for class name
   */
  convertR(object, path, name) {
    // Create a folder if doesn't exist to start conversion
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    const className = Utility.upperFirst(name);
    const fileContent = ['', `export interface ${className} {`];

    // Loop through object recursively and create new files and folders
    if (object.constructor === Array) {
      // If it is an array, only check if its first child
      fileContent.push(`  ${name}: ${Utility.upperFirst(name)}[],`);
      if (object[0]) {
        // Check if it has anything inside, might be an empty array
        const newPath = path.split('/');
        newPath.push(name);
        const finalPath = newPath.join('/');

        this.convertR(object[0], finalPath, name);
      }
    } else {
      for (const key in object) {
        const type = typeof object[key];
        console.log(type, key);
        const value = object[key];
        if (value.constructor === Array) {
          // If it is an array, only check if its first child
          if (value[0]) {
            if (typeof value[0] === 'object') {
              fileContent.push(`  ${key}: ${Utility.upperFirst(key)}[],`);
              // Check if it has anything inside, might be an empty array
              const newPath = path.split('/');
              newPath.push(key);
              const finalPath = newPath.join('/');
      
              this.convertR(value[0], finalPath, key);
              fileContent.unshift(`import { ${Utility.upperFirst(key)} } from './${key}/${key}';`)
            } else {
              // Just write the type
              fileContent.push(`  ${key}: ${typeof value[0]}[],`);
            }
          }
        } else if (type === 'object') {
          const typeName = Utility.upperFirst(key);
          // add new line
          fileContent.push(`  ${key}: ${typeName},`);
          // add import
          fileContent.unshift(`import { ${typeName} } from './${key}/${typeName}';`)
    
          const newPath = path.split('/');
          newPath.push(key);
          const finalPath = newPath.join('/');
          // Go deeper
          this.convertR(object[key], finalPath, key);
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
   * Check for array and continue with recursion
   * @param {any} object any json object
   * @param {string} path current path
   * @param {string} name used for class name
   */
  checkArray(object, path, name) {
    if (object.constructor === Array) {
      // If it is an array, only check if its first child
      fileContent.push(`  ${name}: ${Utility.upperFirst(name)}[],`);
      if (object[0]) {
        // Check if it has anything inside, might be an empty array
        const newPath = path.split('/');
        newPath.push(name);
        const finalPath = newPath.join('/');

        this.convertR(object[0], finalPath, name);
      }
    } 
  }
}

export { writterTS };
