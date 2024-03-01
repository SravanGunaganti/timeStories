const http = require("http");
const port = 3000;
const scrapeWebsite = require("./scraping")
async function server() {
    let data = await scrapeWebsite();
    const server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        const { method, url } = req;
        if (method === "GET" && url === "/getTimeStories") {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("Not Fond");
        }
    })

    server.listen(port, () => {
        console.log('http://localhost:' + port);
    })
}
server();
