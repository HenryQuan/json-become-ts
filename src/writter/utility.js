class Utility {
  /**
   * Make the first char uppercase
   * - from https://stackoverflow.com/a/1026087
   * @param {string} name 
   */
  static upperFirst(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  static _lowerFirst(name) {
    return name.charAt(0).toLowerCase() + name.slice(1);
  }

  /**
   * Remove illegal characters
   * @param {string} name 
   */
  static normalise(name) {
    const temp = name.split(/[^a-zA-Z0-9$]/);
    const first = temp.shift();
    return this._lowerFirst(first) + temp.map(s => this.upperFirst(s)).join('');
  }
}

export { Utility };
