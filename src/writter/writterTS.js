import { writter } from './writter';

class writterTS extends writter {
  /**
   * This is first line of the file
   */
  defaultContent = (className) => ['', `export interface ${className} {`];

  arrayEntry = (goodName, className) => `  ${goodName}: ${className}[];`;
  importEntry = (keyClassName, goodKey) => `import { ${keyClassName} } from './${goodKey}/${keyClassName}';`;
  objectEntry = (goodKey) => this.anyEntry(goodKey, 'object');
  anyEntry = (goodKey, type) => `  ${goodKey}: ${type};`;
  mapEntry = (goodKey, keyClassName) => `  ${goodKey}: Map<string, ${keyClassName}>;`;
  filePath = (path, className) => `${path}/${className}.ts`;
}

export { writterTS };
