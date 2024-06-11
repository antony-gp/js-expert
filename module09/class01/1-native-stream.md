### To read input and log as output

```javascript
process.stdin.pipe(process.stdout);
```

### To run a TCP server

Receiver: will print out whatever it receives on stdout

```javascript
require("net")
  .createServer((socket) => socket.pipe(process.stdout))
  .listen(3000);
```

Sender: will send whatever you write on stdin to the receiver

```javascript
process.stdin.pipe(require("net").connect(3000));
```

### To write a big file

```bash
node -e 'process.stdout.write(crypto.randomBytes(1e9))' > big-file.txt
```

### To read and output big files

```javascript
import http from "node:http";
import { createReadStream } from "node:fs";

http
  .createServer((_, res) => createReadStream("big-file.txt").pipe(res))
  .listen(3000, () => console.log("Listening on port 3000"));
```
