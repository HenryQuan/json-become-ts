import 'ModelClass.dart';

import 'StringExtension.dart';
import 'dart:convert';
import 'dart:math';

import 'package:flutter/material.dart';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;
  /// There are different classes all in one place
  final Map<String, ModelClass> _classes = {};

  // These two handles error
  String _errorMessage;
  String get errorMessage => _errorMessage;
  String _errorLine;

  Writter(String jsonString, String jsonName) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
      if (isValid() && _isObjectOrArray(json)) {
        _convert(json, jsonName);
      }
    } catch (e) {
      // JSON is not valid but the reason is unknown
      this._errorMessage = e.toString().split(':').removeLast().trim();
      // On web, it has different error code
      final temp = _errorMessage.split('\n');
      if (temp.length > 2) this._errorLine = temp[1];
      print('JSON is not valid');
    }
  }

  /// This return a `TextSelection` that selects the line which has an error
  TextSelection errorSelection(String input) {
    int offsetStart;
    int offsetEnd;
    String error = _errorLine;

    if (_errorLine == null) {
      // We only have posistion
      int position = int.tryParse(this._errorMessage.split(' ').last.trim());
      print('Position is $position');
      if (position != null) {
        error = input.split('\n')[position - 1];
      } else {
        // Don't show selection
        return null;
      }
    }

    // Calculate offset here
    // TODO: this won't work if there are multiple line with same content
    offsetStart = input.indexOf(error);
    offsetEnd = offsetStart + error.length;

    // Select the line of error
    return TextSelection(
      baseOffset: offsetStart,
      extentOffset: offsetEnd,
    );
  }

  /// Check whether json is valid
  bool isValid() => json != null;

  /// Merge all files into one
  String toString() {
    if (!isValid() || !_isObjectOrArray(json)) return 'null';
    // Join all lists first in the map and join again in the list
    return _classes.keys.map((e) => e + '\n' + _classes[e].toString()).toList().join('\n\n');
  }

  /// Convert json into any language
  _convert(dynamic object, String className) {
    if (object is Map) {
      // This is an object, the key must be a string
      final map = object as Map<String, dynamic>;
      // Loop through this map
      map.keys.forEach((k) {
        final element = map[k];
        final goodType = k.normaliseType();
        if (element is Map) {
          _addToMap(className, k, newEntry(k, goodType));
          // Another object so we need to loop through it again
          _convert(element, goodType);
        } else if (element is List) {
          // Make sure it is not an empty list
          if (element.length > 0 && element[0] != null) {
            // Check if it has plain type
            if (_isObjectOrArray(element[0])) {
              _addToMap(className, k, newListEntry(k, goodType));
              // We need another class if it is either map or list
              _convert(element, goodType);
            } else {
              _addToMap(className, k, newListEntry(k, element[0].runtimeType.toString()));
              // Not needed
              _convert(element, className);
            }
          }
        } else {
          _addToMap(className, k, newEntry(k, element.runtimeType.toString()));
        }
      });
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
    }
  }

  /// This does a check if the key is already used
  _addToMap(String className, String key, String entry) {
    final value = this._classes[className];
    // Init if value is null
    if (value == null) this._classes[className] = ModelClass(key, entry);
    else value.add(key, entry);
  }

  /// We only need to go deeper if it is an object or array. 
  /// In Dart, it is `Map` or `List` 
  bool _isObjectOrArray(dynamic anything) {
    if (anything == null) return false;
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

