exports.RequestService = class {
  static async get(url) {
    return (await fetch(url)).json();
  }
};
