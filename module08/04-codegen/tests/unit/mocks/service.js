export default `export default class TestEnvService {
  #testEnvRepository;

  constructor({ repository: testEnvRepository }) {
    this.#testEnvRepository = testEnvRepository;
  }

  create(data) {
    return this.#testEnvRepository.create(data);
  }

  read(query) {
    return this.#testEnvRepository.read(query);
  }

  update(id, data) {
    return this.#testEnvRepository.update(id, data);
  }

  delete(id) {
    return this.#testEnvRepository.delete(id);
  }
}
`;
