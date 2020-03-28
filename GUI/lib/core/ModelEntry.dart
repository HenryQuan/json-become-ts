/// It stores 
abstract class ModelEntry {
  String _key;
  dynamic _value;

  ModelEntry(this._key, this._value);

  /// 
  String write();
}