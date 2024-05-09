import { StringUtils } from "../utils.js";

export default class RepositoryTemplate {
  #component;

  constructor(component) {
    this.#component = component;
  }

  #generateClass() {
    const className = StringUtils.toPascalCase(this.#component);

    return `export default class ${className}Repository {
  create(data) {
    return Promise.reject("Not Implemented.");
  }

  read(query) {
    return Promise.reject("Not Implemented.");
  }

  update(id, data) {
    return Promise.reject("Not Implemented.");
  }

  delete(id) {
    return Promise.reject("Not Implemented.");
  }
}
`;
  }

  #getFileName() {
    return `${StringUtils.toKebabCase(this.#component)}.repository.js`;
  }

  build() {
    return {
      fileName: this.#getFileName(),
      template: this.#generateClass(),
    };
  }
}
