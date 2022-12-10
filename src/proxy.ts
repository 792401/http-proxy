import * as http from "http";
import * as https from "https";
import * as url from "url";

const PORT = 3000;
const server = http.createServer(function (request, response) {
    console.log(request.method, request.url, request.headers);

    var incomingUrl = url.parse(request.url);

    var options = {
        hostname: incomingUrl.hostname,
        path: incomingUrl.path,
        method: request.method,
        headers: request.headers
    };

    var outgoingRequest = (incomingUrl.protocol === "https:" ? https : http).request(options, function (outgoingResponse) {
        response.writeHead(outgoingResponse.statusCode, outgoingResponse.headers);
        outgoingResponse.pipe(response);
    });

    request.pipe(outgoingRequest);
});

server.listen(3000, function () {
    console.log(`Server listening on port ${PORT}`);
});
