import 'ModelEntry.dart';

/// It stores a class converted from JSON
/// - entry with type
/// - more helper functions
class ModelClass {
  List<ModelEntry> entries;
  addEntry(ModelEntry entry) => entries.add(entry);

  @override
  String toString() {
    return entries.map((e) => '${e.getType()} ${e.key}').toList().join('\n');
  }
}