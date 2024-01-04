# Node.js MongoDB REST API Project

This is a Node.js project with Express for building RESTful APIs and MongoDB as the database. The project includes endpoints for energy usage and user analytics.

## Prerequisites

- Node.js installed
- MongoDB installed or MongoDB Atlas account
- Internet connection to access MongoDB Atlas if using a cloud database

## Getting Started

1. Clone the repository:

```
   git clone https://github.com/your-username/your-repository.git
```

2. Install dependencies:

```
cd your-repository
npm install
```

3. Set up your MongoDB connection:

Create a .env file in the root directory.

Add your MongoDB connection string:
```
URL=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/your-database-name
```

4. Run the application:
```
npm start
```

The server will start at http://localhost:3000.

API Endpoints
Energy Usage
```
GET /api/v1/energyusage/totalEnergyByStationId
```

Get total energy grouped by stationId.
```
GET /api/v1/energyusage/totalMinutesByDate
```

Get total hours transformed into minutes grouped by date.
```
GET /api/v1/energyusage/mostBusyHour
```

Get the most busy hour from hourly_port.
```
GET /api/v1/energyusage/sumHourlyPortByHour
```

Map the hourly_port of each portNumber across all the records and sum them (by hour).
User Analytics
```
GET /api/v1/useranalytics/sumLoginActionByUserId
```

Group userId by action and return the sum of “LOGIN” action in descending order.
```
GET /api/v1/useranalytics/mostActiveUserByDate
```

Get the most active user (includes all action types) grouped by createdAt date.
Error Handling

The API handles common HTTP status codes:
```
404 Not Found: When the requested resource is not found.
409 Conflict: When there is a conflict with the current state of the server.
400 Bad Request: When the request cannot be fulfilled due to bad syntax.
500 Internal Server Error: When an unexpected error occurs.
```

License
This project is licensed under the MIT License - see the LICENSE.md file for details.