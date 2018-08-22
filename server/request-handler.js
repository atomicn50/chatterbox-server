/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

var responseBody = {
  results: []
};

var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (!request.url.includes('/classes/messages')) {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('failed');
  }
  
  if (request.method === 'POST') {
    statusCode = 201;
    request.on('data', chunk => {
      responseBody.results.push(JSON.parse(chunk));
    });
    request.on('end', () => {
      response.writeHead(statusCode, headers);
      response.end('message posted');
    });
  } else if (request.method === 'GET') {
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(responseBody));
  } else if (request.method === 'OPTIONS') {
    response.writeHead(statusCode, headers);
    response.end(defaultCorsHeaders['access-control-allow-methods']); 
  } else {
    statusCode = 501;
    response.writeHead(statusCode, headers);
    response.end('invalid method');
  }
  
};


module.exports.requestHandler = requestHandler;

