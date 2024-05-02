const [nodePath, filePath, ...args] = process.argv;

const AVAILABLE_OPTIONS = [
  { name: "--name", alias: "-n" },
  { name: "--age", alias: "-a" },
];

function getOptionsAndIndexes(args) {
  const options = [];

  return {
    options,
    indexes: args.reduce((indexes, current, index) => {
      if (current.startsWith("-")) {
        const option = AVAILABLE_OPTIONS.find(({ alias, name }) =>
          [alias, name].includes(current)
        );

        if (!option) throw new TypeError(`Option ${current} is not available.`);

        options.push([option.name.replace(/-/g, ""), []]);

        indexes.push(index);
      }

      return indexes;
    }, []),
  };
}

function setValuesForOptions(options, indexes) {
  let current = 0;

  while (indexes.length) {
    const start = indexes.shift() + 1;
    const end = indexes[0];

    const values = args.slice(start, end);

    options[current++][1] = !values.length
      ? true
      : values.length === 1
      ? values.pop()
      : values;
  }
}

function parseArgs(args) {
  if (args.length && !args[0].startsWith("-"))
    throw new TypeError(`First argument must be a valid option.`);

  const { options, indexes } = getOptionsAndIndexes(args);

  setValuesForOptions(options, indexes);

  return Object.fromEntries(options);
}

console.log(parseArgs(args));
