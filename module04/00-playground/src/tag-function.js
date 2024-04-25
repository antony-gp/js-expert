function tagFn(templateArr, ...replacements) {
  return templateArr
    .map((value, index) => `${value}${replacements[index] ?? ""}`)
    .join("");
}

const person = {
  name: "Antony",
  age: 23,
  job: "Software Developer",
};

console.log(
  // args will be sent as:
  // [0]: [ "My name is ", ", I'm ", " years old and I'm a ", "" ]
  // [1]: "Antony"
  // [2]: 23
  // [3]: "Software Developer"
  tagFn`My name is ${person.name} and I am ${person.age} years old, currently I'm a ${person.job}`
);

console.log(
  // args will be sent as:
  // [0]: [ 'Hello ', '!' ]
  // [1]: "Antony"
  tagFn`Hello ${person.name}!`
);
