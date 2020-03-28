import 'dart:convert';

import 'dart:math';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;
  /// There are different classes all in one place
  Map<String, List<String>> _classes = Map();
  String errorMessage;

  Writter(String jsonString, String jsonName) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
      if (isValid() && _isObjectOrArray(json)) {
        _convert(json, jsonName);
      }
    } catch (e) {
      // JSON is not valid but the reason is unknown
      this.errorMessage = e.toString().split(':').removeLast().trim();
      print('JSON is not valid');
    }
  }

  /// Check whether json is valid
  bool isValid() => json != null;

  /// Merge all files into one
  String toString() {
    if (!isValid() || !_isObjectOrArray(json)) return 'null';
    // Join all lists first in the map and join again in the list
    return _classes.keys.map((e) => _classes[e].join('\n')).toList().join('\n\n');
  }

  /// Convert json into any language
  _convert(dynamic object, String className) {
    if (object == null) return;

    if (object is Map) {
      // This is an object, the key must be a string
      final map = object as Map<String, dynamic>;
      // Loop through this map
      map.keys.forEach((element) => _convert(map[element], element));
    } else if (object is List) {
      // This is an array
      if (object.length > 0) {
        // Make sure it has at least one element inside
        final random = Random();
        // -1 to get the index
        int index = random.nextInt(object.length - 1);
        print('Lucky index is $index');
        _convert(object[index], className);
      }
    } else {
      // This is a normal type
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
  /// Usually it is `int`, `double` but it must not be `Map` or `List` 
  String newEntry(String key, String type);
  /// This is used only for `Map` 
  String newMapEntry(String key, String type);
  /// Only for `List`
  String newListEntry(String key, String type);
}

