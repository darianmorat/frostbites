![FrostBites Logo](./frostbites.svg)

### Project Overview

FrostBites is a comprehensive full-stack web application developed as part of my project 
at SENA. Designed with both user convenience and functionality in mind, the application 
showcases a practical implementation of modern web development principles. This project 
really helped me sharpen my skills in building applications that are secure, 
user-friendly, and built to last.

---

### Features
#### User Authentication
- [x] **Login and Registration**: Users can register and log in using their email and password.
- [x] **Session Expiry**: Sessions are automatically expired after one hour for security.
- [ ] **Persistent Login**: Maintain user sessions until explicit logout.
- [ ] **Email Confirmation for Registration**: Users will verify their registration via email.
- [ ] **Password Validation**: Enforce strong passwords with specific criteria.
- [ ] **Forgot Password**: Enable users to reset their password through email confirmation.

#### Shopping (Catalog, Cart, and Purchases)
- [x] **Product Catalog**: A static display of available ice cream products
- [ ] **Make Product Catalog**: Allow users to customize their ice cream by choosing from a variety of bases, flavors, and toppings.
- [ ] **Shopping Cart**: Add or remove ice cream items from the cart.
- [ ] **Purchase Process**: Complete transactions smoothly.
- [ ] **Order Confirmation**: Show confirmation after a successful purchase.

#### User Profile
- [ ] **User Profile Section**: View and update profile information such as username and email
- [ ] **Profile Data Validation**: Validate updated profile data to ensure accuracy and uniqueness.
- [ ] **Profile preferences**: Allow users to customize their preferences such as dark mode and  language.

#### Admin Panel
- [x] **Admin Authentication**: Restrict access to admin-only features
- [ ] **Product Management**: Add, update, or delete items in the product catalog.
- [ ] **Site Statistics**: Track website activity like views and purchases
- [ ] **Order Management**: Manage purchase orders, including marking them as shipped.

#### Other Features
- [x] **Interactive Site Map**: Add an interactive mini-map such as GoogleMaps.
- [ ] **Responsive Design**: Ensure the site is fully responsive and mobile-friendly.
- [x] **Security**: Implement secure authentication (e.g., bcrypt for password hashing).
- [x] **Error Handling**: Handle common errors and display user-friendly messages.
- [ ] **Performance Optimization**: Improve loading times for better performance.

#### UI/UX Features
- [ ] **Dark Mode**: Allow users to switch to a dark theme.
- [ ] **Language Toggle**: Provide a Spanish language option.
- [ ] **Gallery Section**: Users can submit ice cream photos for admin approval.

---

### Technologies
#### Front-End:
- **React.js**: Modern JavaScript library.
- **Dependencies**:
  - **React Router Dom**: Navigation and routing.
  - **Axios**: For handling HTTP requests.
  - **Boxicons**: Icons package.
  - **Leaflet**: Interactive maps.
  - **Loader-Spinner**: For displaying loading animations.
  - **Toastify**: For displaying elegant notifications.

#### Back-End:
- **Node.js + Express.js**: Better server-side development.
- **PostgreSQL**: Robust relational database.
- **Dependencies**:
  - **Bcrypt**: For secure password hashing.
  - **Cors**: To handle cross-origin requests.
  - **Dotenv**: Environment variable management.
  - **JWT Authentication**: For secure user authentication.
  - **Pg**: PostgreSQL integration.

#### Tools:
- Git & GitHub: Version control and collaboration
- Postman: API tesing and debuggind

---

### Installation

To run the project locally, follow these steps:

#### Prerequisites

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)
- [npm](https://www.npmjs.com/)

#### Step-by-Step Installation

1. Clone the repository:

```bash
git clone https://github.com/darianmorat/frostbites.git
```

2. Navigate to the project directory:
```bash
cd frostbites
```

3. Set up environment variables:
```bash
PORT=your_server_port
JWT_SECRET=your_jwt_secret

DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_HOST=your_database_host
DB_PORT=your_database_port

ADMIN_EMAIL=your_admin_email
ADMIN_ROLE=your_admin_role
USER_ROLE=your_user_role
```

4. Install dependencies for both the client and server:
```bash
# Navigate to the client folder and install dependencies
cd client
npm install

# Navigate to the server folder and install dependencies
cd ../server
npm install
```

5. initialize database with fake data:
```bash
# Missing steps
```

6. Run the development environment:
```bash
# For the client, start it using:
cd client
npm run dev

# For the server, start it using:
cd ../server
npm run dev
```
