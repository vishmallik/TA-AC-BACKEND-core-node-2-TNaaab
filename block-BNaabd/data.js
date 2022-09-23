const http = require("http");
const qs = require("querystring");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  const dataType = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (dataType === "application/json" && req.url === "/json") {
      res.write(store);
      res.end();
    }
    if (
      dataType === "application/x-www-form-urlencoded" &&
      req.url === "/form"
    ) {
      let parsedData = qs.parse(store);
      res.write(JSON.stringify(parsedData));
      res.end();
    }
  });
}
server.listen(7000, () => {
  console.log(`server listening on port 7000`);
});
