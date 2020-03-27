import 'dart:convert';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;

  Writter(String jsonString) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
    } catch (e) {
      // JSON is not valid
      print('JSON is not valid');
    }
  }

  /// Convert dart types to other types
  String typeConverter(String type); 
}

