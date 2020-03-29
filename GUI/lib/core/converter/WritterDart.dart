import 'Writter.dart';
import 'StringExtension.dart';

class WritterDart extends Writter {
  WritterDart(String jsonString, String jsonName) : super(jsonString, jsonName);

  @override
  String typeConverter(String type) {
    // Dart has the same type name
    return type;
  }

  @override
  String newEntry(String key, String type) {
    return '$spaces${typeConverter(type)} ${key.normaliseVariable()};';
  }

  @override
  String newListEntry(String key, String type) {
    return '${spaces}List<${typeConverter(type)}> ${key.normaliseVariable()};';
  }

  @override
  String newMapEntry(String key, String type) {
    return '${spaces}Map<String, ${typeConverter(type)}> ${key.normaliseVariable()};';
  }

  @override
  String writeClass(String className, String variables, List<String> keys) {
    final goodClass = className.normaliseType();
    return '/// This is the `$goodClass` class\n' +
      'class $goodClass {\n' +
      variables + 
      '\n\n$spaces$goodClass(json) {\n' +
      keys.map((e) => '$spaces${spaces}this.${e.normaliseVariable()} = json["$e"];').join('\n') +
      '\n$spaces}' +
      '\n}';
  }
}