import fsPromises from "fs/promises";
import fs from "fs";
import { StringUtils } from "./utils.js";
import templates from "./templates/index.js";

const { FactoryTemplate, RepositoryTemplate, ServiceTemplate } = templates;

export default class Layer {
  #component;
  #path;
  #templates;

  constructor(component, path = "", defaultFolder = "") {
    this.#component = component;
    this.#path = `${path || "."}/${defaultFolder || "src"}`;

    this.#templates = {
      factory: new FactoryTemplate(component).build(),
      service: new ServiceTemplate(component).build(),
      repository: new RepositoryTemplate(component).build(),
    };
  }

  #getLayers(layerOption) {
    const layers = Object.keys(this.#templates);

    if (!layers.includes(layerOption))
      throw new Error(
        "Layer option must be 'factory', 'service' or 'repository'"
      );

    switch (layerOption) {
      case "repository":
        return layers.slice(2);
      case "service":
        return layers.slice(1);
      default:
        return layers;
    }
  }

  async create(layerOption = "factory") {
    const folderName = StringUtils.toKebabCase(this.#component);
    const dirName = `${this.#path}/${folderName}`;

    const layers = this.#getLayers(layerOption);

    if (!fs.existsSync(dirName))
      await fsPromises.mkdir(dirName, { recursive: true });

    await Promise.all(
      layers.map(async (layer) => {
        const { fileName, template } = this.#templates[layer];

        const path = `${dirName}/${fileName}`;

        if (!fs.existsSync(path)) await fsPromises.writeFile(path, template);
      })
    );
  }
}
