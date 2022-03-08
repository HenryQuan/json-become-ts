import 'ModelClass.dart';

import 'StringExtension.dart';
import 'MapExtension.dart';
import 'dart:convert';

import 'package:flutter/material.dart';

/// The base of all writter
abstract class Writter {
  /// It can either be a `list` or a `map` or null
  dynamic json;

  /// There are different classes all in one place
  final Map<String, ModelClass> _classes = {};

  /// How many spaces here
  final spaces = List.filled(2, ' ').join();

  /// Check when to use `Map`
  int mapThreshold;

  /// Whether map should be merged
  bool shouldMerge = true;

  // These two handles error
  String _errorMessage = '';
  String get errorMessage => _errorMessage;
  String _errorLine = '';

  /// By default, the threshold to use map is `10`
  Writter(String jsonString, String jsonName, this.mapThreshold) {
    // Decode it into a map
    try {
      json = jsonDecode(jsonString);
      if (isValid() && _isObjectOrArray(json)) {
        _convert(json, jsonName);
      }
    } catch (e, s) {
      // JSON is not valid but the reason is unknown
      this._errorMessage = e.toString().split(':').removeLast().trim();
      // On web, it has different error code
      final temp = _errorMessage.split('\n');
      if (temp.length > 2) this._errorLine = temp[1];
      print(s);
    }
  }

  /// This return a `TextSelection` that selects the line which has an error
  TextSelection? errorSelection(String input) {
    int offsetStart;
    int offsetEnd;
    String error = _errorLine;

    if (_errorLine == '') {
      // We only have posistion
      final position = int.tryParse(this._errorMessage.split(' ').last.trim());
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
    // Join all lists first in the map and join again in the list, add extra new line to the entire string
    return _classes.keys
            .map((e) => writeClass(
                e, _classes[e].toString(), _classes[e]?.keys ?? Set()))
            .toList()
            .join('\n\n') +
        '\n';
  }

  /// Convert json into any language
  _convert(dynamic object, String className) {
    final key = className.normaliseVariable();
    final type = className.normaliseType();
    // object can either be array or object, if not returns null
    if (object is List) {
      if (object.length == 0) {
        // Empty map
        _addToMap(className, key, newEntry(key, 'dynamic'));
      } else if (object[0] != null) {
        _convert(object[0], className);
      }
    } else if (object is Map) {
      if (object.length == 0) {
        // Empty map
        _addToMap(className, key, newEntry(key, 'dynamic'));
      } else {
        // The key must be a string because it is JSON
        final Map map = object;
        if (map.length > mapThreshold && map.sameChildrenType()) {
          // This is a Map
          final firstElement = object.values.first;
          if (firstElement is Map) {
            // Keep getting everything
            _convert(map.mergeChildren(), type);
          } else {
            // Plain type set and stop
            _addToMap(
                className, key, newMapEntry(key, _typeString(firstElement)));
          }
        } else {
          // Not a map so loop through everything
          map.keys.forEach((k) {
            if (k == "modules_tree") {
              print("a");
            }
            final element = map[k];
            final goodType = k.runtimeType.toString();
            if (element is Map) {
              if (element.length > mapThreshold && element.sameChildrenType()) {
                // This is a Map
                final firstElement = element.values.first;
                if (_isObjectOrArray(firstElement)) {
                  _addToMap(className, k, newMapEntry(k, goodType));
                  // Keep getting everything
                  _convert(element, goodType);
                } else {
                  // Plain type set and stop
                  _addToMap(
                      className, k, newMapEntry(k, _typeString(firstElement)));
                }
              } else {
                _addToMap(className, k, newEntry(k, goodType));
                _convert(element, goodType);
              }
            } else if (element is List) {
              // Make sure it is not empty
              if (element.isNotEmpty) {
                // Check if the first entry is map or not
                final firstElement = element.first;
                if (_isObjectOrArray(firstElement)) {
                  // More inside so go deeper
                  _addToMap(className, k, newListEntry(k, goodType));
                  _convert(element, goodType);
                } else {
                  // Plain type set and stop
                  _addToMap(
                      className, k, newListEntry(k, _typeString(firstElement)));
                }
              } else {
                _addToMap(className, k, newListEntry(k, 'dynamic'));
              }
            } else {
              // Just use element's type
              _addToMap(className, k, newEntry(k, _typeString(element)));
            }
          });
        }
      }
    }
  }

  /// Returns the type string of anything
  String _typeString(dynamic object) {
    final type = object.runtimeType.toString();
    // Null means we don't know so can be anything
    if (type == 'Null') return 'dynamic';
    return type;
  }

  /// This does a check if the key is already used
  _addToMap(String className, String key, String entry) {
    final value = this._classes[className];
    // Init if value is null
    if (value == null)
      this._classes[className] = ModelClass(key, entry);
    else
      value.add(key, entry);
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
  /// - int
  /// - double
  /// - bool
  /// - dynamic
  String typeConverter(String type);

  /// This check if the writter needs to construct this type
  bool shouldConstruct(String type) {
    switch (type) {
      case 'Map':
      case 'int':
      case 'double':
      case 'String':
      case 'bool':
      case 'dynamic':
        return true;
      default:
        return false;
    }
  }

  /// Usually it is `int`, `double` but it must not be `Map` or `List`
  String newEntry(String key, String type);

  /// This is used only for `Map`
  String newMapEntry(String key, String type);

  /// Only for `List`
  String newListEntry(String key, String type);

  /// Write entire class out
  String writeClass(String className, String variables, Set<String> keys);
}
