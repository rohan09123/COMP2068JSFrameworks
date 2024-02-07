const http = require('http');
const url = require('url');

function calculate(method, x, y) {
    switch(method) {
        case 'add':
            return `${x} + ${y} = ${x + y}`;
        case 'subtract':
            return `${x} - ${y} = ${x - y}`;
        case 'multiply':
            return `${x} * ${y} = ${x * y}`;
        case 'divide':
            if (y === 0) {
                return "Error: Division by zero";
            }
            return `${x} / ${y} = ${x / y}`;
        default:
            return "Error: Invalid method";
    }
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    if (!method || isNaN(x) || isNaN(y)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Error: Invalid parameters');
        return;
    }

    const result = calculate(method, x, y);
    
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(result);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
