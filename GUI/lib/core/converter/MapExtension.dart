extension MapExtension on Map {
  // Merge all children into one single map with everything in it
  Map mergeChildren() {
    Map merged = {};
    dynamic key;
    this.keys.forEach((k) {
      key = key ?? k;
      final element = this[k];
      // Recursively merge all children
      if (element is Map) merged[key] = element.mergeChildren();
      else merged[key] = element;
    });
    return merged;
  }

  /// Check if all children have the same runtime type
  bool sameChildrenType() {
    Type type;
    return this.values.every((k) {
      // If type is null, set it to the first entry value
      type = type ?? k.runtimeType;
      return k.runtimeType == type;
    });
  }
}