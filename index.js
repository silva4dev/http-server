import http from 'http';

const PORT = 3000;
const server = http.createServer();

const friends = [
  {
    id: 1,
    name: 'Nikola Tesla',
  },
  {
    id: 2,
    name: 'Sir Isaac Newton',
  },
  {
    id: 3,
    name: 'Albert Einstein',
  },
];

server.on('request', (request, response) => {
  const items = request.url.split('/'); // /friends/2 => ['', 'friends', '2']
  if (request.method === 'POST' && items[1] === 'friends') {
    request.on('data', (data) => {
      const friend = data.toString();
      console.log('Request: ', friend);
      friends.push(JSON.parse(friend));
    });
    request.pipe(response);
  } else if (request.method === 'GET' && items[1] === 'friends') {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      response.end(
        JSON.stringify(friends.filter((friend) => friend.id === friendIndex))
      );
    } else {
      response.end(JSON.stringify(friends));
    }
  } else if (request.method === 'GET' && items[1] === 'messages') {
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<body>');
    response.write('<ul>');
    response.write('<li>Hello Isaac!</li>');
    response.write('<li>What are your thoughts on astronomy?</li>');
    response.write('</html>');
    response.write('</body>');
    response.end();
  } else {
    response.statusCode = 404;
    response.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
