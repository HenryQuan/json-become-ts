import 'dart:convert';

/// The base of all writter
abstract class Writter {
  Map<String, dynamic> json;

  Writter(String jsonString) {
    // Decode it into a map
    json = jsonDecode(jsonString);
  }
}

