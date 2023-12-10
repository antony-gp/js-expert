"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

// watch(__filename, async (_, filename) => {
//   console.log((await readFile(filename)).toString());
// });

class File {
  async watch(_, filename) {
    await this.printText(filename);
  }

  async printText(filename) {
    console.log((await readFile(filename)).toString());
  }
}

const file = new File();

// throws | Picks this from watch (fs)
// watch(__filename, file.watch);

// works | Autmatically binds this context using arrow function
// watch(__filename, (_, filename) => file.watch(_, filename));

// works | Manually bind this context
// watch(__filename, file.watch.bind(file));

const getThisContext = (context) => ({
  printText(filename) {
    // arguments return an 'indexed object'
    // for clarity, an array conversion would make it easier to read
    console.log(arguments, Array.prototype.slice.call(arguments));
    console.log(`overwritten by ${context}`, filename);
  },
});

// call and apply produce the same result
// - call uses rest params for arguments
// - apply uses array for arguments
file.watch.call(getThisContext("call"), null, __filename);
file.watch.apply(getThisContext("apply"), [null, __filename]);
