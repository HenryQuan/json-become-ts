extension MapExtension<T, K> on Map<T, K> {
  // Merge all children into one single map with everything in it
  Map<T, K> mergeChildren() {
    // Only merge if all children have the same type
    if (this.sameChildrenType() && this.values.first is Map) {
      return this.values.fold(
        {},
        (prev, curr) => merge(prev, curr as Map<T, K>),
      );
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
      if (!merged.containsKey(key)) {
        // Add new keys
        merged[key] = value;
      } else {
        // The key exists but still some checks need to be done
        if (merged[key] == null) {
          // If first has a null value, use second value
          merged[key] = value;
        } else if (value is Map) {
          // Even if we have the same key, Map should still be checked
          merged[key] = merge(
            first[key] as Map<T, K>,
            second[key] as Map<T, K>,
          ) as K;
        }
      }
    });

    return merged;
  }

  /// Check if all children have the same runtime type
  bool sameChildrenType() {
    if (this.isEmpty) return false;

    Type? type;
    return this.values.every((k) {
      // If type is null, set it to the first entry value
      type = type ?? k.runtimeType;
      return k.runtimeType == type;
    });
  }
}
