const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const FOLDER_AMOUNT = 4;

class FolderUtils {
  #folder;

  constructor(folderName) {
    this.#folder = folderName;
  }

  static getFolderName(index) {
    return `${index >= 3 ? "m" : ""}js-0${index}`;
  }

  removeFolder() {
    rmSync(this.#folder, { recursive: true });

    return this;
  }

  makeFolder() {
    if (existsSync(this.#folder)) this.removeFolder();

    mkdirSync(this.#folder);

    return this;
  }

  initPackage() {
    execSync(`npm init -y --scope=@antony-gp --silent`, {
      cwd: `./${this.#folder}`,
    });

    return this;
  }

  printPackageInfo() {
    const { name, version } = require(`./${this.#folder}/package.json`);

    console.log({ n: name, v: version });

    return this;
  }
}

for (let i = 1; i <= FOLDER_AMOUNT; i++) {
  const folder = FolderUtils.getFolderName(i);

  new FolderUtils(folder)
    .makeFolder()
    .initPackage()
    .printPackageInfo()
    .removeFolder();
}
