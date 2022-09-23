const http = require("http");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    res.write(store);
    res.end();
  });
}
server.listen(3456);
