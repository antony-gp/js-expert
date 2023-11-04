switch (process.argv[2]) {
  case "--cep":
    return require("./src/cep/cep.spec");
  case "--request":
    return require("./src/request/request.spec");
  default:
    throw new Error("First argument needs to be --cep or --request");
}
