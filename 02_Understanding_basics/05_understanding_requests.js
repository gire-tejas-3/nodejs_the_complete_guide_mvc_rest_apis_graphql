const http = require('http');
// File System Module
const fs = require('fs');

const server = http.createServer(function requestListnerFn(req, res) {
	/**	 console.log(req);   this req Object is http.IncommingMessage Object 
    
	* headers- Returns Key-value pairs of header names and values. Header names are lower-cased.
    
	* headersDistinct- Returns Similar to message.headers, but there is no join logic and the values are always 
		   arrays of strings, even for headers received just once.
    
	* httpVersion- Returns In case of server request, the HTTP version sent by the client. 
		   In the case of client response, the HTTP version of the connected-to server. 
		   Probably either '1.1' or '1.0'.
    
	* method- Returns the request method as a string. Read only
    
	* rawHeaders- Returns an array of the request headers. 
		   even-numbered offsets are key values, and the odd-numbered offsets are the associated values.
    
	* rawTrailers- Returns an array of the raw request trailer keys and values exactly 
		   as they were received. Only populated at the 'end' event.
    
	* setTimeout()- Calls a specified function after a specified number of milliseconds 
		   (message.socket.setTimeout(msecs, callback)).
    
	* statusCode- Returns The 3-digit HTTP response status code. E.G. 404
    
	* socket- Returns the Socket object for the connection
    
	* trailers- Returns an object containing the trailers
    
	* url- Return Request URL string. This contains only the URL that is present in the actual HTTP request
	*/

	const url = req.url;
	const method = req.method;

	// Routing 
	if (url === '/' && method === 'post') {
		const reqData = [];
		req.on('data', (_chunk) => {
			// request data or body or formData can access by req.on listner on data event
			// this data is the Buffer data recieved in chunks
			reqData.push(_chunk);
		});

		req.on('end', () => {
			// on end of request this event listern call this  callback
			// Parsed this BufferData and concat and convert to utf-8 string
			const parsedReqData = Buffer.concat(reqData).toString('utf-8');
			console.log(parsedReqData);
			// write data in .txt file synchronous Way
			fs.writeFileSync(`${__dirname}/reqData_or_reqBody.txt`);
			// 
		})
	}
});

server.listen(3000, 'localhost');