import fs from 'fs';
import { Utility } from './utility';

const mapThreshold = 10;

class writter {
  /**
   * Convert recursively
   * @param {any} object any json object
   * @param {string} path current path
   * @param {string} name used for class name
   */
  convertR(object, path, name) {
    // Create a folder if doesn't exist to start conversion
    if (!fs.existsSync(path)) fs.mkdirSync(path);

    const goodName = Utility.normalise(name);
    const className = Utility.upperFirst(goodName);
    const fileContent = this.defaultContent(className);
    // Check if the root object is atually an array
    if (Array.isArray(object)) {
      fileContent.push(this.arrayEntry(goodName, className));
      // If it is an array, only check if its first child (they are all the same)
      if (object[0]) {
        // Check if it has anything inside, might be an empty array
        this.convertR(object[0], this.getNewPath(path, goodName), goodName);
      }
    } else {
      // Only loop through keys if the root is not an array
      for (const key in object) {
        // Get value and its type
        const value = object[key];
        const type = typeof value;
        // console.log(key, value, type);
        const goodKey = Utility.normalise(key);
        const keyClassName = Utility.upperFirst(goodKey);

        if (Array.isArray(value)) {
          const element = value[0];
          const elementType = typeof element;
          // If it is an array, only check if its first child
          if (element) {
            // Go deep if it has another object inside
            if (elementType === 'object') {
              // added new type array and its import
              fileContent.push(this.arrayEntry(goodKey, keyClassName));
              fileContent.unshift(this.importEntry(keyClassName, goodKey));
              // Go deeper
              this.convertR(element, this.getNewPath(path, goodKey), goodKey);
            } else {
              // Just write the type array
              fileContent.push(this.arrayEntry(goodKey, elementType));
            }
          }
        } else if (type === 'object') {
          if (value == null) {
            // Write object if it is null
            fileContent.push(this.objectEntry(goodKey));
          } else {
            let isMap = false;
            // At least 10 objects inside
            if (Object.keys(value).length > mapThreshold) {
              // loop through object and check if all properties have the same type
              let currType = '';
              let mapValue = null;
              isMap = true;
              for (const key in value) {
                // Quit immediately if it contains another type
                const type = typeof value[key];
                if (currType === '') {
                  currType = type;
                  mapValue = value[key];
                } else if (currType !== type) {
                  isMap = false;
                  break;
                }
              }
  
              // It is map and make sure there are something inside
              if (mapValue != null && isMap) {
                // Do not add anything if it is just an empty object
                if (currType === 'object') {
                  // added new type array and its import
                  fileContent.push(this.mapEntry(goodKey, keyClassName));
                  fileContent.unshift(this.importEntry(keyClassName, goodKey));
  
                  // Go even deeper
                  this.convertR(mapValue, this.getNewPath(path, goodKey), goodKey);
                } else {
                  // Just add the map
                  fileContent.push(this.mapEntry(goodKey, currType));
                }
              }
            }
  
            // Only go deeper if it is not a map
            if (!isMap) {
              // added new type array and its import
              fileContent.push(this.anyEntry(goodKey, keyClassName));
              fileContent.unshift(this.importEntry(keyClassName, goodKey));
  
              // Go deeper
              this.convertR(value, this.getNewPath(path, goodKey), goodKey);
            }
          }
        } else {
          // create new files
          fileContent.push(this.anyEntry(goodKey, type));
        }
      }
    }

    fileContent.push('}\n');
    // Join all lines and write it to a file
    fs.writeFileSync(this.filePath(path, className), fileContent.join('\n'));
  }

  function 

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

export { writter };
