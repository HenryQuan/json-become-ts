/// https://stackoverflow.com/a/60528001
extension StringExtension on String {
  /// Make the first char uppercase
  String upperFirst() {
    return '${this[0].toUpperCase()}${this.substring(1)}';
  }

  /// Make the first char lowercase
  String lowerFirst() {
    return '${this[0].toLowerCase()}${this.substring(1)}';
  }

  /// Remove illegal characters
  String normalise() {
    final temp = this.split(r'[^a-zA-Z0-9$]');
    return temp.first.lowerFirst() + temp.map((s) => s.upperFirst()).join('');
  }
}