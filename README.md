Wattson Backend – README
Project Overview
Wattson is a prototype backend for a community-focused energy monitoring and wellbeing startup. It is designed to:
Monitor energy usage across multiple devices.
Store historical energy readings.
Manage users, authentication, and password resets.
Provide analytics and contact management.
Integrate with a frontend dashboard for visualization and reporting.
This backend is built using Node.js, Express, and MySQL, with additional libraries for security, email, and data validation.
Tech Stack
Backend Framework: Node.js + Express
Database: MySQL (with mysql2 package)
Security: Helmet, bcryptjs
Email Service: Nodemailer (Gmail)
Rate Limiting: express-rate-limit
Validation: express-validator
Logging: Morgan
Other Libraries: CORS, Crypto, Path
Features
Device Management
Add, update, delete, and retrieve devices.
Track device status, efficiency, and latest readings.
Automated generation of random readings every 15 minutes.
User Management
Signup with email validation and strong password enforcement.
Login with password hashing and authentication.
Forgot password and reset password via email link with token validation.
Analytics
Generate device usage reports and forecast data.
Summarize cost savings and other metrics.
Contact Form
Store messages from users or visitors in the database.
Associate messages with existing users if email matches.
Validate form data before saving.
Security
Input validation using regex and express-validator.
Passwords are hashed with bcrypt.
Rate limiting to prevent brute-force attacks.
HTTP headers secured with Helmet.
Environment Variables
Create a .env file in the root directory:
PORT=5000
DB_HOST=localhostDB_USER=root
DB_PASS=yourpassword
DB_NAME=wattson_db
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_email_password
PUBLIC_BASE_URL=http://localhost:5000
Database Schema (MySQL)
-- USERS TABLE
CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DEVICES TABLE
CREATE TABLE devices (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    status ENUM('online','offline','auto') DEFAULT 'offline',
    efficiency DECIMAL(5,2),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DEVICE READINGS
CREATE TABLE device_readings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    device_id INT UNSIGNED NOT NULL,
    power_watts INT NOT NULL,
    recorded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
);

-- PASSWORD RESETS
CREATE TABLE password_resets (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    token VARCHAR(64) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- CONTACT MESSAGES
CREATE TABLE contact_messages (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    company VARCHAR(120),
    phone_number VARCHAR(20),
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

Setup Instructions

Clone the repository:

git clone https://github.com/yourusername/wattson-backend.git
cd wattson-backend


Install dependencies:

npm install


Create .env file with the environment variables.

Setup MySQL database using the schema above.

Start the server:

npm start


The backend will run at: http://localhost:5000

API Endpoints (Summary)
Method	Endpoint	Description
GET	/api/devices	Fetch all devices and latest readings
POST	/api/devices	Add a new device
PUT	/api/devices/:id	Update a device
DELETE	/api/devices/:id	Delete a device
POST	/api/devices/update-readings	Generate random readings
GET	/api/analytics	Fetch analytics data
POST	/api/contact	Submit a contact form
POST	/api/signup	User registration
POST	/api/login	User login
POST	/api/forgot-password	Send password reset link
POST	/api/reset-password/:token	Reset password using token
Notes

Make sure your MySQL server is running before starting the backend.

Nodemailer requires valid Gmail credentials; consider using App Passwords for security.

The server serves static frontend files from the /public folder.
