class Utility {
  /**
   * Make the first char uppercase
   * - from https://stackoverflow.com/a/1026087
   * @param {string} name 
   */
  static upperFirst(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

export { Utility };
