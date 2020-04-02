import 'Writter.dart';
import 'StringExtension.dart';

class WritterKotlin extends Writter {
  WritterKotlin(String jsonString, String jsonName, int mapThreshold) : super(jsonString, jsonName, mapThreshold);

  @override
  String typeConverter(String type) {
    // So usually type is the key name and we just need to upper first letter
    String kotlin = type.upperFirst();
    switch (type) {
      case 'Map':
        kotlin = 'Map';
        break;
      case 'int':
        kotlin = 'Int';
        break;
      case 'double':
        kotlin = 'Double';
        break;
      case 'String':
        // Same name
        break;
      case 'bool':
        kotlin = 'Boolean';
        break;
      case 'dynamic':
        kotlin = 'Any';
        break;
      default:
        break;
    }

    return kotlin;
  }

  @override
  String newEntry(String key, String type) {
    return '${spaces}val ${key.normaliseVariable()}: ${typeConverter(type)}';
  }

  @override
  String newListEntry(String key, String type) {
    return '${spaces}val ${key.normaliseVariable()}: List<${typeConverter(type)}>';
  }

  @override
  String newMapEntry(String key, String type) {
    return '${spaces}val ${key.normaliseVariable()}: Map<String, ${typeConverter(type)}>';
  }

  @override
  String writeClass(String className, String variables, Set<String> keys) {
    // TODO: save type as well (so that we can create new objects)
    final goodClass = className.normaliseType();
    return '/** This is the `$goodClass` class */\n' +
      'data class $goodClass (\n' +
      variables.split('\n').join(',\n') + 
      '\n)';
  }
}