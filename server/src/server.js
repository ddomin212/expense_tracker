// nemusíme rekonfigujrovat server file pokud se něco posere
// require http
require("express-async-errors");
const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 4000;
// create server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); // 4000
