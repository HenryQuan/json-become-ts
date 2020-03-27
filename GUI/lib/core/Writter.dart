import 'dart:convert';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;
  /// There are different files all in one place
  List<List<String>> _classes = [[]];

  Writter(String jsonString) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
      if (json != null && _isObjectOrArray(json)) _convert(json);
    } catch (e) {
      // JSON is not valid
      print('JSON is not valid');
    }
  }

  /// Merge all files into one
  String toString() {
    if (json == null || !_isObjectOrArray(json)) return 'null';
    // Map each list into files and join files into the final output
    return _classes.map((c) => c.join('\n')).join('\n\n');
  }

  /// Convert json into any language
  _convert(dynamic object) {
    if (object == null) return;
  }

  /// We only need to go deeper if it is an object or array. 
  /// In Dart, it is `Map` or `List` 
  _isObjectOrArray(dynamic anything) {
    return anything.runtimeType == Map || anything.runtimeType == List;
  }

  /// Convert dart types to other types
  String typeConverter(String type); 
}

