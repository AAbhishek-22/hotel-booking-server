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
- **Other Tools**: Mongoose, bcrypt, swagger etc.

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



4. Start the server:
   ## Prod
    ```bash
    npm run build
    npm start
    
    ```
    ## Dev
   ```
   npm run start:dev
   ```

## API Endpoints:

### API Docs can be seen on swagger documentation
- http://your-local-host/api-docs

## Project Structure:
```
hotel-booking-app-server/
├── controllers/    # API logic
├── databse/        # DB calls layer
├── helpers/        # Helper function
├── models/         # Mongoose schemas
├── respone/        # API response functions
├── interfaces/     # Define contracts
├── routes/         # API routes
├── service/        # Service layer containing logics
├── middlewares/    # Middleware functions
├── config/         # Configuration files
├── utils/          # Utility functions
├── env             # Environment variables
├── app.ts          # Entry point
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:
- **Email**: kumarabhishek13691@gmail.com
- **GitHub**: [AAbhishek-22](https://github.com/AAbhishek-22)

Happy coding!
