const fs = require("fs");
const http = require("http");
const url = require("url");
const PORT = 5000;

//   /////////////////////////////////////////////////////////////////////////////////////////////////

// Blocking, synchronous
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `this is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written!... ");

// Non-blocking, async
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   if (err) return console.log(err);
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);

//       fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("file written.");
//       });
//     });
//   });
// });
// console.log("will read file!");

/////////////////////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathName === "/api") {
    fs.readFile(`${__dirname}/dev-data/data.json`, "utf-8", (err, data) => {
      const productData = JSON.parse(data);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(data);
    });
  } else {
    res.writeHead(404, {
      "Content-Type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`server started on PORT ${PORT}`);
});
