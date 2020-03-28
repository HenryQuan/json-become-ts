import 'ModelEntry.dart';
import 'StringExtension.dart';

/// It stores a class converted from JSON
/// - entry with type
/// - more helper functions
class ModelClass {
  List<ModelEntry> entries = [];
  void addEntry(ModelEntry entry) => entries.add(entry);

  ModelClass(ModelEntry entry) {
    addEntry(entry);
  }

  @override
  String toString() {
    return entries.map((e) {
      if (e.type is Map) {
        return '${e.key.normaliseType()} ${e.key.normaliseVariable()}';
      } else if (e.type is List) {
        return 'List<> ${e.key}';
      } else {
        return '${e.getType()} ${e.key}';
      }
    }).toList().join('\n');
  }
}