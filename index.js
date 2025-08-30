const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve frontend files

// ------------------ DATABASE ------------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sharon@123",
  database: "wattson_db"
});

db.connect(err => {
  if (err) console.error("❌ Database connection failed:", err);
  else console.log("✅ Connected to MySQL database");
});



// ------------------ NODEMAILER ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharonsusanthomas07@gmail.com", // your Gmail
    pass: "myqo xylo ulne ucgf"            // Gmail App Password
  }
});

// ===================== CONTACT FORM =====================
app.post("/api/contact", (req, res) => {
  const { fullName, email, company, phoneNumber, message } = req.body;
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: "Full name, email, and message are required" });
  }

  const sql = "INSERT INTO contact_messages (fullName, email, company, phoneNumber, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [fullName, email, company, phoneNumber, message], (err) => {
    if (err) return res.status(500).json({ error: "Failed to save message" });
    res.status(200).json({ message: "Message saved successfully!" });
  });
});

// ===================== DEVICES API =====================
app.get("/api/devices", (req, res) => {
  res.json({
    devices: [
      { name: "HVAC System 001", status: "online", power: 1247, efficiency: "94.2%" },
      { name: "LED Array 012", status: "online", power: 453, efficiency: "98.7%" },
      { name: "Server Rack A", status: "auto", power: 2156, efficiency: "91.3%" },
      { name: "Backup Generator", status: "offline", power: 0, efficiency: "-" }
    ],
    stats: { activeDevices: 1247, uptime: "99.8%", alerts: 23, avgResponse: "45ms" }
  });
});

// ===================== ANALYTICS API =====================
app.get("/api/analytics", (req, res) => {
  res.json({
    reports: 1834,
    forecastAccuracy: "98.3%",
    costSaved: "₹2.4M",
    dataPoints: "50.2B",
    chart: [45.2, 42.8, 48.1, 44.3, 39.7, 41.2, 38.9]
  });
});

// ===================== SIGNUP =====================
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
    [fullName, email, hashedPassword],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ message: "Email already exists" });
        return res.status(500).json({ message: "Database error", error: err });
      }
      res.json({ success: true, message: "User registered successfully" });
    }
  );
});

// ===================== LOGIN =====================
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, fullName: user.full_name, email: user.email }
    });
  });
});

// ===================== FORGOT PASSWORD =====================
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Email not found" });

    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    db.query(
      "UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?",
      [token, expires, email],
      err => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });

        const resetLink = `http://localhost:5000/reset-password.html?token=${token}&email=${email}`;
        const mailOptions = {
          from: "sharonsusanthomas07@gmail.com",
          to: email,
          subject: "Wattson Password Reset",
          html: `<p>You requested a password reset.</p>
                 <p>Click this <a href="${resetLink}">link</a> to reset your password.</p>
                 <p>This link will expire in 1 hour.</p>`
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) return res.status(500).json({ success: false, message: "Failed to send email" });
          res.json({ success: true, message: "Reset email sent successfully!" });
        });
      }
    );
  });
});

// ===================== RESET PASSWORD =====================
app.post("/api/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) return res.status(400).json({ success: false, message: "Password is required" });

  const sql = "SELECT * FROM users WHERE reset_token = ? AND reset_expires > NOW()";
  db.query(sql, [token], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.length === 0) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    const user = results[0];
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query(
      "UPDATE users SET password = ?, reset_token = NULL, reset_expires = NULL WHERE id = ?",
      [hashedPassword, user.id],
      err => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, message: "Password updated successfully! You can now log in." });
      }
    );
  });
});

// ===================== START SERVER =====================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
