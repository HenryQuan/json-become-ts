extension MapExtension on Map {
  // Merge all children into one single map with everything in it
  Map mergeChildren() {

  }

  /// Check if all children have the same runtime type
  bool sameChildrenType() {
    Type childrenType;
    return this.keys.every((k) {
      if (childrenType == null) {
        childrenType = this[k].runtimeType;
        return true;
      } else return this[k].runtimeType == childrenType;
    });
  }
}