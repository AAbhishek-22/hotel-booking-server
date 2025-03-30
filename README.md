# Hotel Booking App Server

Welcome to the **Hotel Booking App Server**! This project serves as the backend for a hotel booking application, providing APIs and services to manage bookings, users, and hotel data.

## Features

- User authentication and authorization
- Hotel listing and search functionality
- Booking management system
- Secure API endpoints
- Scalable and modular architecture

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Environment Management**: dotenv
- **Other Tools**: Mongoose, bcrypt, etc.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/hotel-booking-app-server.git
    cd hotel-booking-app-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and configure the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user

### Hotels
- `GET /api/hotels` - Get a list of hotels
- `GET /api/hotels/:id` - Get details of a specific hotel
- `POST /api/hotels` - Add a new hotel (Admin only)
- `PUT /api/hotels/:id` - Update hotel details (Admin only)
- `DELETE /api/hotels/:id` - Delete a hotel (Admin only)

### Bookings
- `GET /api/bookings` - Get all bookings for a user
- `POST /api/bookings` - Create a new booking
- `DELETE /api/bookings/:id` - Cancel a booking

## Folder Structure

```
hotel-booking-app-server/
├── controllers/    # API logic
├── models/         # Mongoose schemas
├── routes/         # API routes
├── middlewares/    # Middleware functions
├── config/         # Configuration files
├── utils/          # Utility functions
├── .env            # Environment variables
├── server.js       # Entry point
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)

Happy coding!