/// https://stackoverflow.com/a/60528001
extension StringExtension on String {
  /// Make the first char uppercase
  String upperFirst() {
    if (this.length <= 0) return this;
    else if (this.length == 1) return this.toUpperCase();
    else return '${this[0].toUpperCase()}${this.substring(1)}';
  }

  /// Make the first char lowercase
  String lowerFirst() {
    if (this.length <= 0) return this;
    else if (this.length == 1) return this.toUpperCase();
    else return '${this[0].toLowerCase()}${this.substring(1)}';
  }

  /// Remove illegal characters
  String normaliseType() {
    final temp = this.split(RegExp(r"[^a-zA-Z0-9]"));
    String type = temp.map((s) => s.upperFirst()).join('');
    // Make sure it doesn't end with `s` or 'es'
    if (type.endsWith('s')) type = type.substring(0, type.length - 1);
    else if (type.endsWith('es')) type = type.substring(0, type.length - 2);
    // Add something if the type starts with a number, 123 -> J123
    if (type[0].isNumeric()) type = 'K' + type;
    return type;
  }

  /// Add a letter if the variable starts when numbers
  String normaliseVariable() {
    return this.normaliseType().lowerFirst();
  }

  /// Check if a string is numeric
  bool isNumeric() {
    if (this == null) return false;
    return double.tryParse(this) != null;
  }
}