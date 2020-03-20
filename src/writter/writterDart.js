import { writter } from './writter';

class writterDart extends writter {
  /**
   * This is first line of the file
   */
  defaultContent(className) {
    return ['', `class ${className} {`];
  }

  arrayEntry(goodName, className) {
    return `  List<${className}> _${goodName};`;
  }

  importEntry(keyClassName, goodKey) {
    return `import '${goodKey}/${keyClassName}.dart';`;;
  }

  objectEntry(goodKey) {
    return this.anyEntry(goodKey, 'dynamic');
  }

  anyEntry(goodKey, type) {
    // Dart has different naming
    var dartType = type;
    if (type === 'number') dartType = 'int';
    else if (type == 'boolean') dartType = 'bool';
    else if (type == 'string') dartType = 'String';

    return `  ${dartType} _${goodKey};`;
  }

  mapEntry(goodKey, keyClassName) {
    return `  Map<String, ${keyClassName}> _${goodKey};`;
  }
  
  filePath(path, className) {
    return `${path}/${className}.dart`;
  }

  _upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

export { writterDart };
