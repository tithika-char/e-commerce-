E-Commerce App is a full-stack web application built with React and Node.js. It allows users to register, log in, add products, view a list of products, update products, and search for products. The backend uses Express.js and MongoDB, while the frontend is built with React.js.

## Features

- User registration and authentication with JWT
- Add new products
- View all products
- Update product details
- Delete products
- Search for products

## Technologies Used

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **APIs:** RESTful APIs
- **Other:** CORS, Mongoose

## API Endpoints

### User Authentication

- `POST /register`
  - Registers a new user
  - **Request body:** `{ name, email, password }`
  - **Response:** `{ user, auth: token }`

- `POST /login`
  - Logs in a user
  - **Request body:** `{ email, password }`
  - **Response:** `{ user, auth: token }`

### Product Management

- `POST /add-product`
  - Adds a new product
  - **Request body:** `{ name, price, category, company }`
  - **Response:** `{ product }`

- `GET /products`
  - Retrieves all products
  - **Response:** `[ { product1 }, { product2 }, ... ]`

- `DELETE /product/:id`
  - Deletes a product by ID
  - **Response:** `{ result }`

- `GET /product/:id`
  - Retrieves a product by ID
  - **Response:** `{ product }`

- `PUT /product/:id`
  - Updates a product by ID
  - **Request body:** `{ name, price, category, company }`
  - **Response:** `{ result }`

- `GET /search/:key`
  - Searches for products by key
  - **Response:** `[ { product1 }, { product2 }, ... ]`

## Frontend Components

### Components

- `Nav`: Navigation bar component
- `Footer`: Footer component
- `SignUp`: Component for user registration
- `Login`: Component for user login
- `PrivateComponent`: Wrapper component for protected routes
- `AddProduct`: Component for adding new products
- `ProductList`: Component for displaying the list of products
- `UpdateProduct`: Component for updating product details

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs or features.

## License

This project is licensed under the MIT License.

## Contact

For any queries or contributions, please contact tithikachar14@gmail.com.
