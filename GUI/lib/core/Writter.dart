import 'dart:convert';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;
  /// There are different files all in one place
  List<List<String>> _classes;

  Writter(String jsonString) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
      _convert(json);
    } catch (e) {
      // JSON is not valid
      print('JSON is not valid');
    }
  }

  /// Merge all files into one
  String toString() {
    // Map each list into files and join files into the final output
    return _classes.map((c) => c.join('\n')).join('\n\n');
  }

  /// Convert json into any language
  _convert(dynamic object) {

  }

  /// Convert dart types to other types
  String typeConverter(String type); 
}

