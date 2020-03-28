import 'ModelEntry.dart';

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
    return entries.map((e) => '${e.getType()} ${e.key}').toList().join('\n');
  }
}