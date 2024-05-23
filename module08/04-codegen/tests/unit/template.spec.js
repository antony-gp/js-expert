import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import templates from "../../src/templates/index.js";
import mocks from "./mocks";
import { StringUtils } from "../../src/utils.js";

const { FactoryTemplate, RepositoryTemplate, ServiceTemplate } = templates;
const { factoryTemplateMock, repositoryTemplateMock, serviceTemplateMock } =
  mocks;

describe("Codegen 3-layers", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  const component = "test env";

  const layers = [
    {
      name: "repository",
      mock: repositoryTemplateMock,
      builder: RepositoryTemplate,
    },
    {
      name: "service",
      mock: serviceTemplateMock,
      builder: ServiceTemplate,
    },
    {
      name: "factory",
      mock: factoryTemplateMock,
      builder: FactoryTemplate,
    },
  ];

  test.each(layers)(
    "should generate $name template",
    ({ name, mock, builder }) => {
      const expected = {
        fileName: `${StringUtils.toKebabCase(component)}.${name}.js`,
        template: mock,
      };

      const result = new builder(component).build();

      expect(result).toMatchObject(expected);
    }
  );
});
