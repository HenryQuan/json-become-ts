/// It stores the key and its value type
class ModelEntry {
  String key;
  Type type;

  ModelEntry(this.key, dynamic value) {
    this.type = value.runtimeType;
  }

  String getType() => type.toString();
}