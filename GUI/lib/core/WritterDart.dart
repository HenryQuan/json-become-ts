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
    return '   ${typeConverter(type)} ${key.normalise()};';
  }

  @override
  String newListEntry(String key, String type) {
    return '   List<${typeConverter(type)}> ${key.normalise()};';
  }

  @override
  String newMapEntry(String key, String type) {
    return '   Map<String, ${typeConverter(type)}> ${key.normalise()};';
  }
}