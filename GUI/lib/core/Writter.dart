import 'dart:collection';
import 'dart:convert';

import 'dart:math';

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
      if (json != null && _isObjectOrArray(json)) {
        _convert(json);
      }
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

    if (object is Map) {
      // This is an object, the key must be a string
      final map = object as Map<String, dynamic>;
      // Loop through this map
      map.keys.forEach((element) => _convert(map[element]));
    } else if (object is List) {
      // This is an array
      if (object.length > 0) {
        // Make sure it has at least one element inside
        final random = Random();
        // -1 to get the index
        int index = random.nextInt(object.length - 1);
        _convert(object[index]);
      }
    } else {
      // This is a normal type
      print(object.runtimeType.toString());
    }
  }

  /// We only need to go deeper if it is an object or array. 
  /// In Dart, it is `Map` or `List` 
  _isObjectOrArray(dynamic anything) {
    final valid = anything is Map || anything is List;
    print(valid);
    return valid;
  }

  /// Convert dart types to types in other languages
  /// - Map (object)
  /// - List (array)
  /// - int
  /// - double
  /// - bool
  String typeConverter(String type);
  /// Usually it is just 
  String newEntry(String key, String type);
}

