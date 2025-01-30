![FrostBites Logo](./client/public/frostbites.svg)

---

### Project Overview

FrostBites is a full-stack web application developed as part of my project at SENA
Institution. Designed with both user convenience and functionality in mind, the
application showcases a practical implementation of modern web development principles.
This project really helped me sharpen my skills in building applications that are secure,
user friendly, and built to last.

---

### Features

#### User Authentication

- [x] **Login and Registration**: Users can register and log in using their email and password.
- [x] **Session Expiry**: Sessions are automatically expired after one hour for security.
- [ ] **Persistent Login**: Maintain user sessions until explicit logout.
- [x] **Email Confirmation for Registration**: Users will verify their registration via email.
- [x] **Password Validation**: Enforce strong passwords with specific criteria.
- [x] **Forgot Password**: Enable users to reset their password through email confirmation.

#### Shopping (Catalog, Cart, and Purchases)

- [x] **Product Catalog**: A static display of available ice cream products
- [ ] **Create Product Catalog**: Enable users to customize ice cream with bases, flavors, and toppings.
- [x] **Shopping Cart**: Add or remove ice cream items from the cart.
- [ ] **Purchase Process**: Complete transactions smoothly.
- [ ] **Order Confirmation**: Show confirmation after a successful purchase.

#### User Profile

- [x] **User Profile Section**: View and update profile information such as username and email
- [x] **Profile Data Validation**: Validate updated profile data to ensure accuracy and uniqueness.
- [ ] **Profile preferences**: Allow users to customize their preferences such as dark mode and language.

#### Admin Panel

- [x] **Admin Authentication**: Restrict access to admin-only features
- [x] **Product Management**: Add, update, or delete items in the product catalog.
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
- [ ] **Content Loader**: Display a placeholder while content loads.

---

### Technologies

#### Front-End:

- **React.js**: A modern JavaScript library.
- **Dependencies**:
   - **FontAwesome**: A library of customizable icons.
   - **Axios**: For handling HTTP requests.
   - **Chart.js**: For creating interactive charts.
   - **Formik**: For handling forms in React.
   - **Leaflet**: A library for Interactive maps.
   - **React Router Dom**: For navigation and routing.
   - **Loader-Spinner**: For displaying loading animations.
   - **Remove-Scroll**: For removing scroll in popups.
   - **Toastify**: For displaying elegant notifications.
   - **Yup**: Object schema validation.
   - **Zustand**: State management for React.

#### Back-End:

- **Node.js + Express.js**: For better server-side development.
- **PostgreSQL**: A robust relational database.
- **Dependencies**:
   - **Bcrypt**: For secure password hashing.
   - **Cors**: To handle cross-origin requests.
   - **Dotenv**: For managing environment variables.
   - **JWT Authentication**: For secure user authentication.
   - **Pg**: For PostgreSQL integration.
   - **Motion**: For animations in react.
   - **Nodemailer**: For sending emails.
   - **Stripe**: For handling payments and subscriptions.

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
# Client .env
BASE_URL=your_base_url

# Server .env
PORT=your_server_port
JWT_SECRET=your_jwt_secret_key

BASE_URL=your_base_url
DATABASE_URL=your_database_url

ADMIN_EMAIL=your_admin_email
ADMIN_ROLE=your_admin_role
USER_ROLE=your_user_role

APP_EMAIL=email_for_nodemailer
PASSWORD_APP_EMAIL=your_email_password

STRIPE_SECRET_KEY=your_secret_key
```

4. Install dependencies for both the client and server:

```bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

5. Initialize database:

```bash
# Navigate to the file directory
cd server/db

# Run the script to create tables
psql -U your_username -d your_database_name -f init.sql
```

6. Run the development environment:

```bash
# For the client, start it using:
cd client && npm run dev

# For the server, start it using:
cd ../server && npm run dev
```
