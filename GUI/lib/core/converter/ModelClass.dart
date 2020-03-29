/// It stores a class converted from JSON
/// - entry with type
/// - more helper functions
class ModelClass {
  /// This includes complete entries, int number
  List<String> entries = [];
  /// This only includes the key, number
  List<String> keys = [];
  void add(String key, String entry) {
    entries.add(entry);
    keys.add(key);
  }

  ModelClass(String key, String entry) {
    add(key, entry);
  }

  @override
  String toString() {
    return entries.join('\n');    
  }
}