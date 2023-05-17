const server = require("./api/server");
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
