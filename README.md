# Random Activities API

The Random Activities API is a RESTful web service that provides a collection of random activities for users. It allows users to fetch random activities, filter saved activities by type and participants, and save activities for later reference.

## Features

- Fetch random activities
- Filter saved activities by type and participants
- Save activities for later reference

## Technologies Used

- Node.js
- Express.js
- SQLite
- Knex.js
- Jest (for testing)
- Swagger (for API documentation)

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- SQLite (version X.X.X)

### Installation

1. Clone the repository: git clone [repository-url](git@github.com:calvarezberrios/random-activities-server.git)

2. Install dependencies:

   ```
       cd random-activities-api
       npm install
   ```

3. Set up the database:
   ```
       npm run migrate
   ```
4. Start the server:
   ```
       npm start
   ```
5. The API server should now be running at `http://localhost:3000`. You can access the API endpoints using a tool like Postman or cURL.

## API Documentation

The API is documented using Swagger. To access the API documentation, open your browser and navigate to `http://localhost:3000/docs`.

## Testing

To run the tests, use the following command: `npm test`

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

The Random Activities API is open source and licensed under the [MIT License](https://opensource.org/licenses/MIT).
