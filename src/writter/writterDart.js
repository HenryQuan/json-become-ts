import { writter } from './writter';

class writterDart extends writter {
  /**
   * This is first line of the file
   */
  defaultContent(className) {
    return ['', `class ${className} {`];
  }

  arrayEntry(goodName, className) {
    return `  List<${this._convert2Dart(className)}> _${goodName};`;
  }

  importEntry(keyClassName, goodKey) {
    return `import '${goodKey}/${keyClassName}.dart';`;;
  }

  objectEntry(goodKey) {
    return this.anyEntry(goodKey, 'dynamic');
  }

  anyEntry(goodKey, type) {
    return `  ${this._convert2Dart(type)} _${goodKey};`;
  }

  mapEntry(goodKey, keyClassName) {
    return `  Map<String, ${this._convert2Dart(keyClassName)}> _${goodKey};`;
  }
  
  filePath(path, className) {
    return `${path}/${className}.dart`;
  }

  _upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  _convert2Dart(type) {
    // Dart has different naming
    var dartType = type;
    if (type === 'number') dartType = 'int';
    else if (type == 'boolean') dartType = 'bool';
    else if (type == 'string') dartType = 'String';
    return dartType;
  }
}

export { writterDart };
