import 'Writter.dart';

class WritterDart extends Writter {
  WritterDart(String jsonString) : super(jsonString);

  @override
  String typeConverter(String type) {
    // Dart has the same type name
    return type;
  }

  @override
  String newEntry(String key, String type) {
    // TODO: implement newEntry
    throw UnimplementedError();
  }
}