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

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var results = [];
  var responseBody = {
    results: []
  };

  var statusCode = 200;
  var headers = defaultCorsHeaders;

  headers['Content-Type'] = 'text/plain';

  // if (request.method === 'GET') {
    
  // }

  if (request.method === 'POST') {
    statusCode = 201;
    request.on('data', chunk => {
      results.push(chunk);
    }).on('end', () => {
      results = Buffer.concat(results).toString();
    });
    response.end(JSON.stringify(results));
    // responseBody.results.push(request._postData);
  }


  response.writeHead(statusCode, headers);

  response.end(JSON.stringify(responseBody));
};


exports.requestHandler = requestHandler;

