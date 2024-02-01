// require http(core) module , it will return http Object
const http = require("http");

/**
 * http.createServer is function for creating (instance of Server)server and
 * executes this function for each time when request is made
 *
 *
 * It recieves requestListener function(callback) which contains
 * http.IncomingMessage Object i.e. request and  http.ServerResponse Object i.e. response
 * this function returns server
 *
 */

const server = http.createServer(function requestListnerFn(req, res) {
    console.log(req);
    console.log(res);
});

// this server.listen method use for listen server for connection
// server.listen(port, hostname, callback)
server.listen(3000, "localhost");
