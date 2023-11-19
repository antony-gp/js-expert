exports.Tax = class {
  static get fromAges() {
    return [
      { from: 18, to: 25, tax: 1.1 },
      { from: 26, to: 30, tax: 1.3 },
      { from: 31, to: 100, tax: 1.5 },
    ];
  }
};
