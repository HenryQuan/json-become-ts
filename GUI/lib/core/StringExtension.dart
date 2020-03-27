/// https://stackoverflow.com/a/60528001
extension StringExtension on String {
  /// Make the first char uppercase
  String upperFirst(String name) {
    return '${name[0].toUpperCase()}${name.substring(1)}';
  }

  /// Make the first char lowercase
  String lowerFirst(String name) {
    return '${name[0].toLowerCase()}${name.substring(1)}';
  }

  /// Remove illegal characters
  String normalise(String name) {
    final temp = name.split(r'[^a-zA-Z0-9$]');
    return lowerFirst(temp.first) + temp.map((s) => this.upperFirst(s)).join('');
  }
}