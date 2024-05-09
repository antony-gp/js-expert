import { StringUtils } from "../utils.js";

export default class ServiceTemplate {
  #component;

  constructor(component) {
    this.#component = component;
  }

  #generateClass() {
    const className = StringUtils.toPascalCase(this.#component);
    const variableName = StringUtils.toCamelCase(this.#component);

    return `export default class ${className}Service {
  #${variableName}Repository;

  constructor({ repository: ${variableName}Repository }) {
    this.#${variableName}Repository = ${variableName}Repository;
  }

  create(data) {
    return this.#${variableName}Repository.create(data);
  }

  read(query) {
    return this.#${variableName}Repository.read(query);
  }

  update(id, data) {
    return this.#${variableName}Repository.update(id, data);
  }

  delete(id) {
    return this.#${variableName}Repository.delete(id);
  }
}
`;
  }

  #getFileName() {
    return `${StringUtils.toKebabCase(this.#component)}.service.js`;
  }

  build() {
    return {
      fileName: this.#getFileName(),
      template: this.#generateClass(),
    };
  }
}
