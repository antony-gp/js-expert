// Comparison between getting the intersection of two lists
// Podium
// 1 - arr1.filter(Array.prototype.includes.bind(arr2))
// 2 - Tie on second place, since they run faster than each other randomly
//   * [...set1].filter(Set.prototype.has.bind(set2))
//   * [...set1].filter((v) => set2.has(v))
//   * arr1.filter((v) => arr2.includes(v))
// 3 - arr1.filter((v) => arr2.filter((v2) => v2 === v))

const arr1 = [1, 2, 3];
const arr2 = [3, 4, 5];

const set1 = new Set(arr1);
const set2 = new Set(arr2);

const format = (str = "") => str.slice(6).padEnd(50);

const tests = [
  "() => [...set1].filter(Set.prototype.has.bind(set2))",
  "() => [...set1].filter((v) => set2.has(v))",
  "() => arr1.filter(Array.prototype.includes.bind(arr2))",
  "() => arr1.filter((v) => arr2.includes(v))",
  "() => arr1.filter((v) => arr2.filter((v2) => v2 === v))",
];

tests.forEach((test) => {
  const fn = eval(test);
  console.time(format(test));
  for (let i = 0; i < 10000; i++) fn();
  console.timeEnd(format(test));
});
