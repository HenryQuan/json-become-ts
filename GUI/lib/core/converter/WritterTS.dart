import 'Writter.dart';
import 'StringExtension.dart';

class WritterTS extends Writter {
  WritterTS(String jsonString, String jsonName) : super(jsonString, jsonName);

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
      default:
        break;
    }

    return ts;
  }

  @override
  String newEntry(String key, String type) {
    return '   ${key.normaliseVariable()}: ${typeConverter(type)}';
  }

  @override
  String newListEntry(String key, String type) {
    return '   ${key.normaliseVariable()}: ${typeConverter(type)}[]';
  }

  @override
  String newMapEntry(String key, String type) {
    return '   ${key.normaliseVariable()}: Map<string, ${typeConverter(type)}>';
  }
}