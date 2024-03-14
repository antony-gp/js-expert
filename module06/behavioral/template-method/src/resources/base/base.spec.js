import { describe, beforeEach, it, expect, jest } from "@jest/globals";
import BaseService from "./base.service.js";
import {
  NotImplementedException,
  UnprocessableContentException,
} from "../../utils/exceptions.js";

describe("BaseService", () => {
  const data = { name: "abc" };

  class Service extends BaseService {}

  beforeEach(jest.restoreAllMocks.bind(jest));

  it("should throw NotImplementedException when child class doesn't implement _validate", () => {
    const service = new Service();

    const throwable = () => service.create(data);
    const expected = new NotImplementedException(service._validate.name);

    expect(throwable).toThrowError(expected);
  });

  it("should throw UnprocessableContentException when _validate returns false", () => {
    Service.prototype._validate = jest.fn().mockReturnValue(false);

    const service = new Service();

    const throwable = () => service.create(data);
    const expected = new UnprocessableContentException("Invalid fields.");

    expect(throwable).toThrowError(expected);
  });

  it("should throw NotImplementedException when child class doesn't implement _create", () => {
    Service.prototype._validate = jest.fn().mockReturnValue(true);

    const service = new Service();

    const throwable = () => service.create(data);
    const expected = new NotImplementedException(service._create.name);

    expect(throwable).toThrowError(expected);
  });

  it("should succesfully call _validate and _create on create", () => {
    Service.prototype._create = jest.fn().mockReturnValue(true);

    const service = new Service();
    const spy = jest.spyOn(
      BaseService.prototype,
      BaseService.prototype.create.name
    );

    const result = service.create(data);

    expect(result).toBeTruthy();
    expect(spy).toBeCalledTimes(1);
    expect(service._create).toBeCalledTimes(1);
    expect(service._validate).toBeCalledTimes(1);
  });
});
