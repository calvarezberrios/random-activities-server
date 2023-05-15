// Starting point of the server
const server = require("./api/server");
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
