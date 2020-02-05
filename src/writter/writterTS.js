import fs from 'fs';
import { Utility } from './utility';

class writterTS {
  constructor(argv) {
    if (argv[1]) {
      this.useMap = true;
    }
  }

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
    // Check if the root object is atually an array
    if (Array.isArray(object)) {
      fileContent.push(`  ${name}: ${className}[],`);
      // If it is an array, only check if its first child (they are all the same)
      if (object[0]) {
        // Check if it has anything inside, might be an empty array
        this.convertR(object[0], this.getNewPath(path, name), name);
      }
    } else {
      // Only loop through keys if the root is not an array
      for (const key in object) {
        // Get value and its type
        const value = object[key];
        const type = typeof value;
        console.log(key, value, type);
        const keyClassName = Utility.upperFirst(key);

        if (Array.isArray(value)) {
          const element = value[0];
          const elementType = typeof element;
          // If it is an array, only check if its first child
          if (element) {
            // Go deep if it has another object inside
            if (elementType === 'object') {
              // added new type array and its import
              fileContent.push(`  ${key}: ${keyClassName}[],`);
              fileContent.unshift(`import { ${keyClassName} } from './${key}/${key}';`)
              // Go deeper
              this.convertR(element, this.getNewPath(path, key), key);
            } else {
              // Just write the type array
              fileContent.push(`  ${key}: ${elementType}[],`);
            }
          }
        } else if (type === 'object') {
          if (this.useMap) {
            // loop through object and check if all properties have the same type
            let currType = '';
            let isMap = true;
            for (const key in value) {
              const type = typeof value[key];
              if (currType === '') currType = type;
              else if (currType !== type) {
                isMap = false; break;
              }
            } 
    
            if (isMap) {
              // Add the map
              fileContent.push(`  ${key}: Map<string, ${currType}>,`);
            }
          } else {
            // added new type array and its import
            fileContent.push(`  ${key}: ${keyClassName},`);
            fileContent.unshift(`import { ${keyClassName} } from './${key}/${key}';`)
            
            // Go deeper
            this.convertR(value, this.getNewPath(path, key), key);
          }
        } else {
          // create new files
          fileContent.push(`  ${key}: ${type}`);
        }
      }
    }

    fileContent.push('}\n');
    // Join all lines and write it to a file
    fs.writeFileSync(`${path}/${className}.ts`, fileContent.join('\n'));
  }

  /**
   * Split path and join with new name
   * @param {string} path current path
   * @param {string} name className that will be used as a new path
   */
  getNewPath(path, name) {
    const newPath = path.split('/');
    newPath.push(name);
    return newPath.join('/');
  }
}

export { writterTS };
