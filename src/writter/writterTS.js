import { writter } from './writter';

class writterTS extends writter {
  /**
   * This is first line of the file
   */
  defaultContent(className) {
    return ['', `export interface ${className} {`];
  }

  arrayEntry(goodName, className) {
    return `  ${goodName}: ${className}[];`;
  }

  importEntry(keyClassName, goodKey) {
    return `import { ${keyClassName} } from './${goodKey}/${keyClassName}';`;;
  }

  objectEntry(goodKey) {
    return this.anyEntry(goodKey, 'object');
  }

  anyEntry(goodKey, type) {
    return `  ${goodKey}: ${type};`;
  }

  mapEntry(goodKey, keyClassName) {
    return `  ${goodKey}: Map<string, ${keyClassName}>;`;
  }
  
  filePath(path, className) {
    return `${path}/${className}.ts`;
  }
}

export { writterTS };
