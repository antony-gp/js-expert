// curl "localhost:3000?salary=3000&discount=15"

import http from "node:http";

function netSalary({ discount, salary }) {
  return salary - salary * (discount / 100);
}

function handler(req, res) {
  const params = new URLSearchParams(req.url.slice(1));
  const data = Object.fromEntries(params);

  debugger; // instead of setting a breakpoint

  const result = netSalary(data);

  res.end(`Your net salary is ${result}`);
}

http.createServer(handler).listen(3000, () => console.log("Running at 3000"));

// Docs for debugger (node inspect)
// https://nodejs.org/api/debugger.html

// If vscode is not an option, you can use node --inspect or --inspect-brk,
// then open a chrome based browser, go to dev tools and click on node icon.
// This will bring a debugger attatched to your project
