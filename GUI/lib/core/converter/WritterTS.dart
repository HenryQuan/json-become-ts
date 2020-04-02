import 'Writter.dart';
import 'StringExtension.dart';

class WritterTS extends Writter {
  WritterTS(String jsonString, String jsonName, int mapThreshold) : super(jsonString, jsonName, mapThreshold);

  @override
  String typeConverter(String type) {
    // So usually type is the key name and we just need to upper first letter
    String ts = type.upperFirst();
    switch (type) {
      case 'Map':
        ts = 'Map';
        break;
      case 'int':
      case 'double':
        ts = 'number';
        break;
      case 'String':
        ts = 'string';
        break;
      case 'bool':
        ts = 'boolean';
        break;
      case 'dynamic':
        ts = 'any';
        break;
      default:
        break;
    }

    return ts;
  }

  @override
  String newEntry(String key, String type) {
    return '$spaces${key.normaliseVariable()}: ${typeConverter(type)};';
  }

  @override
  String newListEntry(String key, String type) {
    return '$spaces${key.normaliseVariable()}: ${typeConverter(type)}[];';
  }

  @override
  String newMapEntry(String key, String type) {
    return '$spaces${key.normaliseVariable()}: Map<string, ${typeConverter(type)}>;';
  }

  @override
  String writeClass(String className, String variables, Set<String> keys) {
    // TODO: save type as well (so that we can create new objects)
    final goodClass = className.normaliseType();
    return '/** This is the `$goodClass` class */\n' +
      'class $goodClass {\n' +
      variables + 
      '\n\n${spaces}constructor(json) {\n' +
      keys.map((e) => '$spaces${spaces}this.${e.normaliseVariable()} = json["$e"];').join('\n') +
      '\n$spaces}' +
      '\n}';
  }
}