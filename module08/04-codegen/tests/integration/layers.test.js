import {
  expect,
  describe,
  it,
  jest,
  beforeEach,
  beforeAll,
  afterAll,
} from "@jest/globals";
import fsPromises from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

import Layer from "../../src/layers.js";
import { StringUtils } from "../../src/utils.js";

describe("Layers", () => {
  const config = {
    component: "test env",
    path: "",
    defaultFolder: "main",
    fullPath: "",
    layers: ["factory", "service", "repository"],
  };

  beforeAll(async () => {
    config.path = await fsPromises.mkdtemp(join(tmpdir(), "codegen-"));

    await fsPromises.copyFile(
      "./tests/integration/mocks/package.json",
      join(config.path, "package.json")
    );

    const component = StringUtils.toKebabCase(config.component);

    config.fullPath = join(config.path, config.defaultFolder, component);

    config.layers = config.layers.map((layer) => `${component}.${layer}.js`);
  });

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await fsPromises.rm(config.fullPath, { recursive: true });
  });

  afterAll(async () => {
    await fsPromises.rm(config.path, { recursive: true });
  });

  const layerFactory = () => new Layer(...Object.values(config));

  describe("create", () => {
    it("should create folder and then file if folder doesn't exist", async () => {
      jest.spyOn(fsPromises, fsPromises.mkdir.name);

      const beforeRun = await fsPromises.readdir(config.path);

      await layerFactory().create();

      const afterRun = await fsPromises.readdir(config.path);
      const component = await fsPromises.readdir(config.fullPath);

      expect(fsPromises.mkdir).toHaveBeenCalledTimes(1);
      expect(beforeRun).not.toStrictEqual(afterRun);
      expect(component).toStrictEqual(config.layers.toSorted());
    });

    it("should create file only if folder already exists", async () => {
      await fsPromises.mkdir(config.fullPath, { recursive: true });

      jest.spyOn(fsPromises, fsPromises.mkdir.name);

      const beforeRun = await fsPromises.readdir(config.fullPath);

      await layerFactory().create();

      const afterRun = await fsPromises.readdir(config.fullPath);

      expect(fsPromises.mkdir).not.toHaveBeenCalled();
      expect(beforeRun).not.toStrictEqual(afterRun);
      expect(afterRun).toStrictEqual(config.layers.toSorted());
    });

    it("should not create file if it already exists", async () => {
      await fsPromises.mkdir(config.fullPath, { recursive: true });

      await fsPromises.writeFile(`${config.fullPath}/${config.layers[2]}`, "");

      jest.spyOn(fsPromises, fsPromises.mkdir.name);
      jest.spyOn(fsPromises, fsPromises.writeFile.name);

      const beforeRun = await fsPromises.readdir(config.fullPath);

      await layerFactory().create("repository");

      const afterRun = await fsPromises.readdir(config.fullPath);

      expect(fsPromises.mkdir).not.toHaveBeenCalled();
      expect(fsPromises.writeFile).not.toHaveBeenCalled();
      expect(beforeRun).toStrictEqual(afterRun);
    });

    it("should create only respository layer and validate its methods", async () => {
      await layerFactory().create("repository");

      const component = await fsPromises.readdir(config.fullPath);

      const filePath = join(config.fullPath, config.layers[2]);

      const { default: Repository } = await import(filePath);

      expect(component).toStrictEqual(config.layers.slice(2).toSorted());
      expect(typeof Repository.prototype.create).toStrictEqual("function");
      expect(typeof Repository.prototype.read).toStrictEqual("function");
      expect(typeof Repository.prototype.update).toStrictEqual("function");
      expect(typeof Repository.prototype.delete).toStrictEqual("function");
      expect(Repository.name).toStrictEqual(
        `${StringUtils.toPascalCase(config.component)}Repository`
      );
    });

    it("should create service layer with respository as dependency and validate its methods", async () => {
      await layerFactory().create("service");

      const component = await fsPromises.readdir(config.fullPath);

      const filePath = join(config.fullPath, config.layers[1]);

      const { default: Service } = await import(filePath);

      expect(component).toStrictEqual(config.layers.slice(1).toSorted());
      expect(typeof Service.prototype.create).toStrictEqual("function");
      expect(typeof Service.prototype.read).toStrictEqual("function");
      expect(typeof Service.prototype.update).toStrictEqual("function");
      expect(typeof Service.prototype.delete).toStrictEqual("function");
      expect(Service.name).toStrictEqual(
        `${StringUtils.toPascalCase(config.component)}Service`
      );
    });

    it("should create factory layer with service and respository as dependencies and validate its methods", async () => {
      await layerFactory().create("factory");

      const component = await fsPromises.readdir(config.fullPath);

      const filePath = join(config.fullPath, config.layers[0]);

      const { default: Factory } = await import(filePath);

      expect(component).toStrictEqual(config.layers.toSorted());
      expect(typeof Factory.createService).toStrictEqual("function");
      expect(Factory.name).toStrictEqual(
        `${StringUtils.toPascalCase(config.component)}Factory`
      );
    });
  });
});
