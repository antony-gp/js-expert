import { StringUtils } from "../utils.js";

export default class FactoryTemplate {
  #component;

  constructor(component) {
    this.#component = component;
  }

  #generateClass() {
    const className = StringUtils.toPascalCase(this.#component);
    const fileName = StringUtils.toKebabCase(this.#component);

    return `import ${className}Service from "./${fileName}.service.js";
import ${className}Repository from "./${fileName}.repository.js";

export default class ${className}Factory {
  static createService() {
    return new ${className}Service({
      repository: new ${className}Repository(),
    });
  }
}
`;
  }

  #getFileName() {
    return `${StringUtils.toKebabCase(this.#component)}.factory.js`;
  }

  build() {
    return {
      fileName: this.#getFileName(),
      template: this.#generateClass(),
    };
  }
}
