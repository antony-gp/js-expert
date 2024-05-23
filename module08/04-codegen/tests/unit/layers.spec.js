import { expect, describe, it, jest, beforeEach } from "@jest/globals";
import fsPromises from "fs/promises";
import fs from "fs";

import Layer from "../../src/layers.js";

describe("Layers", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const defaultLayersCount = 3; // repository, service, factory
  const layer = new Layer("test env");

  describe("create", () => {
    it("should create folder and then file if folder doesn't exist", async () => {
      jest.spyOn(fsPromises, fsPromises.mkdir.name).mockResolvedValue();
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest.spyOn(fs, fs.existsSync.name).mockReturnValue(false);

      await layer.create();

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.mkdir).toHaveBeenCalled();
      expect(fsPromises.writeFile).toHaveBeenCalledTimes(defaultLayersCount);
    });

    it("should create file only if folder already exists", async () => {
      jest.spyOn(fsPromises, fsPromises.mkdir.name);
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest
        .spyOn(fs, fs.existsSync.name)
        .mockReturnValue(false)
        .mockReturnValueOnce(true);

      await layer.create();

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.mkdir).not.toHaveBeenCalled();
      expect(fsPromises.writeFile).toHaveBeenCalledTimes(defaultLayersCount);
    });

    it("should not create file if it already exists", async () => {
      jest.spyOn(fsPromises, fsPromises.mkdir.name);
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest.spyOn(fs, fs.existsSync.name).mockReturnValue(true);

      await layer.create();

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.mkdir).not.toHaveBeenCalled();
      expect(fsPromises.writeFile).not.toHaveBeenCalled();
    });

    it("should not create invalid layers", async () => {
      const throwable = () => layer.create("invalid");
      const error = new Error(
        "Layer option must be 'factory', 'service' or 'repository'"
      );

      expect(throwable).rejects.toThrowError(error);
    });

    it("should create only respository layer", async () => {
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest
        .spyOn(fs, fs.existsSync.name)
        .mockReturnValue(false)
        .mockReturnValueOnce(true);

      const layerCount = 1;

      await layer.create("repository");

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.writeFile).toHaveBeenCalledTimes(layerCount);
    });

    it("should create service layer with respository as dependency", async () => {
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest
        .spyOn(fs, fs.existsSync.name)
        .mockReturnValue(false)
        .mockReturnValueOnce(true);

      const layerCount = 2;

      await layer.create("service");

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.writeFile).toHaveBeenCalledTimes(layerCount);
    });

    it("should create factory layer with service and respository as dependencies", async () => {
      jest.spyOn(fsPromises, fsPromises.writeFile.name).mockResolvedValue();
      jest
        .spyOn(fs, fs.existsSync.name)
        .mockReturnValue(false)
        .mockReturnValueOnce(true);

      const layerCount = 3;

      await layer.create("factory");

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fsPromises.writeFile).toHaveBeenCalledTimes(layerCount);
    });
  });
});
