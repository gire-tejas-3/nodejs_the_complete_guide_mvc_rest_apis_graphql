const http = require("http");
const fs = require("fs");

const server = http.createServer(function requestListenerFn(req, res) {
	const url = req.url;
	const method = req.method;
	/**
	* console.log(res);  this  http.ServerResponse return response object 
	
	* addTrailers()- Adds HTTP trailers (headers but at the end of the message) to the message.
	
	* end()-	This method signals to the server that all of the response headers and body have been sent; 
			that server should consider this message complete. The method, response.end(), 
			MUST be called on each response.

	* finished- (Depricated) Returns true if the response is complete, otherwise false

	* getHeader()- Reads out a header that's already been queued but not sent to the client. 
			The name is case-insensitive. The type of the return value depends on the 
			arguments provided to response.setHeader().

	* headersSent- Boolean (read-only). True if headers were sent, false otherwise.

	* removeHeader()- Removes a header that's queued for implicit sending.

	* sendDate-	Set to false if the Date header should not be sent in the response. Default true

	* setHeader()- Sets the specified header

	* setTimeout-	Sets the timeout value of the socket to the specified number of milliseconds

	* statusCode-	Sets the status code that will be sent to the client

	* statusMessage- Sets the status message that will be sent to the client

	* write()- Sends text, or a text stream, to the client

	* writeContinue()- Sends a HTTP Continue message to the client

	* writeHead()- Sends status and response headers to the client

	*/

	// Routing with checking req.url with path
	if (url === "/") {
		// res.write use to send chunks of response
		res.write("<html>");
		res.write("<head>");
		res.write("<title>Home</title>");
		res.write("</head>");
		res.write("<body>");
		res.write('<form action="/message" method="POST">');
		res.write('<input type="text" name="email"><br><br>');
		res.write('<input type="text" name="password"><br><br>');
		res.write('<button type="submit">Submit</button>');
		res.write("</form>");
		res.write("</body>");
		res.write("</html>");
		return res.end();
	}

	// Routing to /message 
	if (url === "/message" && method === "POST") {
		const reqData = [];

		req.on("data", (_chunk) => {
			// console.log(_chunk);
			reqData.push(_chunk);
		});

		req.on("end", () => {
			const parsedReqData = Buffer.concat(reqData).toString("utf-8");
			console.log(parsedReqData);
			// write file Asynchronous way
			fs.writeFile(
				`${__dirname}/message.txt`,
				parsedReqData.split("=")[1],
				(err) => {
					if (err) {
						console.error(err);
						res.statusCode = 500;
						res.setHeader("Content-Type", "text/html");
						res.write("<html>");
						res.write("<head>");
						res.write("<title>Error</title>");
						res.write("</head>");
						res.write("<body>");
						res.write("<h1>Internal Server Error</h1>");
						res.write("</body>");
						res.write("</html>");
						return res.end();
					}

					res.statusCode = 302;

					// redirecting to HomePage
					res.setHeader("Location", "/");
					return res.end();
				}
			);
		});

		return; // added return here to avoid execution of the code below for this case
	}

	// set Header Content type
	res.setHeader("Content-Type", "text/html");
	res.write("<html>");
	res.write("<head>");
	res.write("<title>Home</title>");
	res.write("</head>");
	res.write("<body>");
	res.write("<h1>My First Page</h1>");
	res.write("</body>");
	res.write("</html>");
	res.end();
});

server.listen(3000, "localhost", () => {
	console.log("Server is listening on port 3000");
});
