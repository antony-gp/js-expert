import Http from "node:http";

export function InjectHttpInterceptor({ header }) {
  const emit = Http.Server.prototype.emit;

  Http.Server.prototype.emit = function (...args) {
    const [type, request, response] = args;

    if (type === "request") {
      response.setHeader(...header);
    }

    return emit.apply(this, args);
  };
}
