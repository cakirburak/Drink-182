const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	let filePath = '.' + req.url;
	if (filePath === './') {
		filePath = './home.html'; // Default to home.html if no specific file requested
	}

	const extname = path.extname(filePath);
	let contentType = 'text/html';

	// Set content type based on file extension
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
	}

	fs.readFile(filePath, (err, data) => {
		if (err) {
			if (err.code === 'ENOENT') {
				// File not found
				res.writeHead(404);
				res.end('404 Not Found');
			} else {
				// Server error
				res.writeHead(500);
				res.end('Server Error: ' + err.code);
			}
		} else {
			// Successful response
			res.writeHead(200, { 'Content-Type': contentType });
			res.end(data, 'utf-8');
		}
	});
});

const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
