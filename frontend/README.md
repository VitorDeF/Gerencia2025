# Stock Management Frontend

This project is a stock management application built with React. It provides functionalities for user authentication, category management, product management, and viewing product movement history.

## Features

- User login and registration
- Create and view categories
- Create and view products within categories
- View product movement history
- Automatic movement creation upon new product addition

## Project Structure

```
stock-management-frontend
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── api
│   │   └── index.js        # API interaction functions
│   ├── components
│   │   ├── Auth
│   │   │   ├── LoginForm.jsx  # User login form
│   │   │   └── RegisterForm.jsx # User registration form
│   │   ├── Categories
│   │   │   ├── CategoryList.jsx  # List of categories
│   │   │   └── CategoryForm.jsx  # Form to create/edit categories
│   │   ├── Products
│   │   │   ├── ProductList.jsx  # List of products in a category
│   │   │   └── ProductForm.jsx  # Form to create/edit products
│   │   └── Movements
│   │       └── MovementHistory.jsx # Product movement history
│   ├── pages
│   │   ├── LoginPage.jsx      # Login page
│   │   ├── RegisterPage.jsx   # Registration page
│   │   ├── CategoriesPage.jsx  # Categories management page
│   │   ├── ProductsPage.jsx    # Products management page
│   │   └── MovementsPage.jsx   # Movements history page
│   ├── App.jsx                # Main application component
│   ├── index.js               # Entry point for the React application
│   └── styles
│       └── main.css           # Main styles for the application
├── package.json               # npm configuration file
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd stock-management-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage Guidelines

- Use the login page to authenticate users.
- Navigate to the categories page to manage product categories.
- Use the products page to manage products within selected categories.
- View the movements page to see the history of product movements.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.