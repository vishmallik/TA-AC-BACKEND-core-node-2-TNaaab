const fs = require("fs");
const http = require("http");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  fs.createReadStream("./readme.txt").pipe(res);
}
server.listen(3333);
