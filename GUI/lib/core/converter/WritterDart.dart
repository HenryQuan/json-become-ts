import 'Writter.dart';
import 'StringExtension.dart';

class WritterDart extends Writter {
  WritterDart(
    String jsonString,
    String jsonName,
    int mapThreshold,
  ) : super(jsonString, jsonName, mapThreshold);

  @override
  String typeConverter(String type) {
    // Dart has the same type name
    return type;
  }

  @override
  String newEntry(String key, String type) {
    return '$spaces${typeConverter(type)}? ${key.normaliseVariable()};';
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
  String writeClass(String className, String variables, Set<String> keys) {
    final goodClass = className.normaliseType();
    return '/// This is the `$goodClass` class\n' +
        'class $goodClass {\n' +
        variables +
        '\n\n$spaces$goodClass.fromJson(Map<String, dynamic> json) {\n' +
        // fromJson method
        keys
            .map((e) =>
                '$spaces${spaces}this.${e.normaliseVariable()} = json["$e"];')
            .join('\n') +
        '\n$spaces}\n\n' +
        // toJson method
        '${spaces}Map<String, dynamic> toJson() {\n' +
        '$spaces${spaces}return {\n' +
        keys
            .map((e) =>
                '$spaces$spaces$spaces"$e": this.${e.normaliseVariable()},')
            .join('\n') +
        '\n$spaces$spaces};\n' +
        '$spaces}\n' +
        '}';
  }
}
