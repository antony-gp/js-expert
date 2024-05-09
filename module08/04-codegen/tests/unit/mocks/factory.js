export default `import TestEnvService from "./test-env.service.js";
import TestEnvRepository from "./test-env.repository.js";

export default class TestEnvFactory {
  static createService() {
    return new TestEnvService({
      repository: new TestEnvRepository(),
    });
  }
}
`;
