// ## BLOCK-writeCode

// #### path

// Q. Suppose on desktop, inside projects we have 2 folder each with a file
// Structure is:-
// Desktop

// - projects
//   - client(dir)
//     - index.js
//   - server(dir)
//     - app.js

// You are currently in app.js

// Write code to

// - get relative path of `index.js`
// - get absolute path of `index.js`

const path = require("path");
const relativePath = "../client/index.js";
const absolutePath = path.join(__dirname, "..", "client/index.js");
console.log(relativePath, absolutePath);
