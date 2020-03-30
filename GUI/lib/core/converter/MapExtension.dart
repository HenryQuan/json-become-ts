extension MapExtension<T, K> on Map<T, K> {
  // Merge all children into one single map with everything in it
  Map<T, K> mergeChildren() {
    // Only merge if all children have the same type
    if (this.sameChildrenType() && this.values.first is Map) {
      final Map<T, K> mergedMap = this.values.fold({}, (prev, curr) => merge(prev, curr as Map));
      this.keys.forEach((k) => this[k] = mergedMap as K);
    }

    // This is already merged
    return this;
  }

  /// Merge other map with this
  Map<T, K> merge(Map<T, K> first, Map<T, K> second) {
    if (first.isEmpty) return Map.of(second);
    if (second.isEmpty) return Map.of(second);

    Map<T, K> merged = Map.of(first);
    second.forEach((key, value) {
      // Add new keys
      if (!merged.containsKey(key)) {
        merged[key] = value;
      } else {
        // Even if we have the same key, Map should still be checked
        if (value is Map) {
          merged[key] = merge(first[key] as Map<T, K>, second[key] as Map<T, K>) as K;
        }
      }
    });

    return merged;
  }

  /// Check if all children have the same runtime type
  bool sameChildrenType() {
    if (this.isEmpty) return false;

    Type type;
    return this.values.every((k) {
      // If type is null, set it to the first entry value
      type = type ?? k.runtimeType;
      return k.runtimeType == type;
    });
  }
}