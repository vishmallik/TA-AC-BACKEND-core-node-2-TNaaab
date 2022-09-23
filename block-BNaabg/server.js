const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let parsedUrl = url.parse(req.url, true);
  let store = "";
  const userDir = path.join(__dirname, "users/");

  req.on("data", (chunk) => {
    store += chunk;
  });

  req.on("end", () => {
    if (req.method === "POST" && parsedUrl.pathname === "/users") {
      let username = JSON.parse(store).username;

      fs.open(userDir + username + ".json", "wx", (err, fd) => {
        if (err) {
          res.end(err);
        }

        fs.writeFile(fd, store, (err) => {
          if (err) {
            res.end(err);
          }

          fs.close(fd, (err) => {
            if (err) {
              res.end(err);
            }

            res.setHeader("Content-Type", "text/html");
            res.end(`${username} successfully created`);
          });
        });
      });
    } else if (req.method === "GET" && parsedUrl.pathname === "/users") {
      let queryUsername = parsedUrl.query.username;
      fs.readFile(userDir + `${queryUsername}.json`, (err, user) => {
        if (err) {
          res.end(err);
        }
        res.end(user);
      });
    } else if (req.method === "DELETE" && parsedUrl.pathname === "/users") {
      let queryUsername = parsedUrl.query.username;
      fs.unlink(userDir + `${queryUsername}.json`, (err) => {
        if (err) {
          res.end(err);
        }
        res.end(`user ${queryUsername} deleted`);
      });
    } else if (req.method === "PUT" && parsedUrl.pathname === "/users") {
      let queryUsername = parsedUrl.query.username;
      fs.open(userDir + `${queryUsername}.json`, "r+", (err, fd) => {
        if (err) {
          res.end(err);
        }
        fs.ftruncate(fd, (err) => {
          if (err) {
            res.end(err);
          }

          fs.writeFile(fd, store, (err) => {
            if (err) {
              res.end(err);
            }
            fs.close(fd, (err) => {
              if (err) {
                res.end(err);
              }

              res.setHeader("Content-Type", "text/html");
              res.end(`${queryUsername} successfully updated`);
            });
          });
        });
      });
    } else {
      res.statusCode = 404;
      res.end("Page Not Found");
    }
  });
}
server.listen(5555, () => {
  console.log(`Server listening on port 5555`);
});
