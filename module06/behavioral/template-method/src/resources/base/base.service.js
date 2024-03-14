import {
  NotImplementedException,
  UnprocessableContentException,
} from "../../utils/exceptions.js";

export default class BaseService {
  _validate(data) {
    throw new NotImplementedException(this._validate.name);
  }

  _create(data) {
    throw new NotImplementedException(this._create.name);
  }

  create(data) {
    const isValid = this._validate(data);

    if (!isValid) throw new UnprocessableContentException("Invalid fields.");

    return this._create(data);
  }
}
