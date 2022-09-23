var path = require("path");
var http = require("http");
var qs = require("querystring");
// #### Path
// Q. Suppose we have 3 files inside a directory on desktop
// The structure is
//   - node(folder)
//     - app.js
//     - server.js
//     - index.html
// You are currently inside server.js

// Write code to
// - capture absolute path of `server.js`(itself)
// - get absolute path of `app.js`
// - get realtive path of `index.html`
// - get absolute path of `index.html` using `path module`

let absPath = __filename;
console.log(absPath);

let absPathApp = __dirname + "/app.js";
console.log(absPathApp);

let relativePath = "./index.html";
console.log(relativePath);

let absPathIndex = path.join(__dirname, "index.html");
console.log(absPathIndex);

// #### Capture data on server

// Q. Create a server using http
// - handle post method on '/' route
// - send json data on it from postman

// ```js
// // data format is
// {
//   team: 'kxip',
//   players: 18,
//   captain: 'KL Rahul'
// }
// ```
// - capture data from request on server side using data and end event on request object
// - when end event fires, send entire captured data in response with status code 201.

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let data = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (
      data === "application/json" &&
      req.method === "POST" &&
      req.url === "/"
    ) {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(store);
    }
  });
}
server.listen(9999, () => {
  console.log(`Server listening on port 9999`);
});

// Q. Follow above steps with form data from postman instead of json data.
// - once data has been captured, send only captain's name in response.

let server1 = http.createServer(handleRequest);

function handleRequest(req, res) {
  let data = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (
      data === "application/x-www-form-urlencoded" &&
      req.method === "POST" &&
      req.url === "/"
    ) {
      res.writeHead(201, { "Content-Type": "text/plain" });
      let parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData.captain));
    }
  });
}
server1.listen(9998, () => {
  console.log(`Server listening on port 9998`);
});

// Q. Create server which can handle both json/form data without specifying which format of data is being received.
// - add listener on port 9000
// - use `data/end` event to capture json/form data
// - use `req.headers['Content-Type']` to check data format
// - parse respective data format i.e. json/form
// - send entire data in response
// - data sent from postman should have fields:
//   - city
//   - state
//   - country
//   - pin

let server2 = http.createServer(handleRequest);

function handleRequest(req, res) {
  let data = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (data === "application/x-www-form-urlencoded") {
      res.writeHead(200, { "Content-Type": "application/json" });
      let parsedData = qs.parse(store);
      res.end(JSON.stringify(parsedData));
    }
    if (data === "application/json") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(store);
    }
  });
}
server2.listen(9000, () => {
  console.log(`Server listening on port 9000`);
});
// Q. create server, send json data in request from postman, parse in on the server and send html response with entire parsed data information.
// - format of json data is {name: your name, email: "", }
// - Html response format is <h1>Name</h1><h2>email</h2>

let server3 = http.createServer(handleRequest);

function handleRequest(req, res) {
  let data = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (data === "application/json") {
      res.writeHead(200, { "Content-Type": "text/html" });
      let parsedData = JSON.parse(store);
      res.end(`<h1>${parsedData.name}</h1><h2>${parsedData.email}</h2>`);
    }
  });
}
server3.listen(8888, () => {
  console.log(`Server listening on port 8888`);
});
// Q. Follow above question with form data containing fields i.e name and email.
// - Parse form-data using `querystring` module
// - respond with HTML page containing only email from data in H2 tag.

let server4 = http.createServer(handleRequest);

function handleRequest(req, res) {
  let data = req.headers["content-type"];
  let store = "";
  req.on("data", (chunk) => {
    store += chunk;
  });
  req.on("end", () => {
    if (data === "application/x-www-form-urlencoded") {
      res.writeHead(200, { "Content-Type": "text/html" });
      let parsedData = qs.parse(store);
      res.end(`<h2>${parsedData.email}</h2>`);
    }
  });
}
server4.listen(7777, () => {
  console.log(`Server listening on port 7777`);
});
// #### Note:-
// Make sure to convert objects into strings using `JSON.stringify` before passing the data through response.
