require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");
const { body, query, param, validationResult } = require("express-validator");
const mysql = require("mysql2/promise");

// ------------------ ENV & APP ------------------
const app = express();
const PORT = process.env.PORT || 5000;

// Security + parsing
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Rate limiters
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
const generalLimiter = rateLimit({ windowMs: 60 * 1000, max: 300 });

app.use("/api/login", authLimiter);
app.use("/api/forgot-password", authLimiter);
app.use("/api/reset-password", authLimiter);
app.use("/api", generalLimiter);
function randomReading(deviceId) {
    return {
        device_id: deviceId,
        power_watts: Math.floor(Math.random() * 2000),
        recorded_at: new Date()
    };
}

// GET all devices and latest readings
app.get('/api/devices', async (req, res) => {
    try {
        const [devices] = await pool.query('SELECT * FROM devices');
        const [readings] = await pool.query('SELECT * FROM device_readings WHERE id IN (SELECT MAX(id) FROM device_readings GROUP BY device_id)');
        
        const devicesData = devices.map(d => {
            const r = readings.find(rd => rd.device_id === d.id) || {};
            return {
                id: d.id,
                name: d.name,
                status: d.status,
                efficiency: d.efficiency || '-',
                power: r.power_watts || 0,
                last_recorded: r.recorded_at || null
            };
        });

        res.json({
            stats: {
                activeDevices: devices.length,
                uptime: '99.5%',
                alerts: Math.floor(Math.random() * 10),
                avgResponse: Math.floor(Math.random() * 50) + 'ms'
            },
            devices: devicesData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// POST: update random reading for a device
app.post('/api/devices/update', async (req, res) => {
    try {
        const [devices] = await pool.query('SELECT id FROM devices');
        for (let d of devices) {
            const reading = randomReading(d.id);
            await pool.query('INSERT INTO device_readings (device_id, power_watts, recorded_at) VALUES (?, ?, ?)',
                [reading.device_id, reading.power_watts, reading.recorded_at]);
        }
        res.json({ message: 'Device readings updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update readings' });
    }
});

// Automated update every 15 min
setInterval(async () => {
    try {
        const [devices] = await pool.query('SELECT id FROM devices');
        for (let d of devices) {
            const reading = randomReading(d.id);
            await pool.query('INSERT INTO device_readings (device_id, power_watts, recorded_at) VALUES (?, ?, ?)',
                [reading.device_id, reading.power_watts, reading.recorded_at]);
        }
        console.log('Automated readings updated at', new Date());
    } catch (err) {
        console.error('Error in automated update', err);
    }
}, 15 * 60 * 1000); // 15 minutes
// ------------------ DATABASE (POOL) ------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "wattson_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true
});

// Traditional MySQL connection for backwards compatibility
const mysql_traditional = require("mysql2");
const db = mysql_traditional.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "wattson_db"
});

// Health check
(async () => {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();
    console.log("✅ Connected to MySQL database (pool)");
    
    // Test traditional connection too
    db.connect((err) => {
      if (err) {
        console.error("❌ Traditional DB connection failed:", err.message);
      } else {
        console.log("✅ Traditional MySQL connection established");
      }
    });
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
})();

// ------------------ NODEMAILER ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// ------------------ HELPERS ------------------
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

const sendValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map(e => ({ field: e.param, msg: e.msg }))
    });
  }
};

// Regex patterns
const NAME_REGEX = /^[A-Za-z\s'.-]{2,100}$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,20}$/;
const COMPANY_REGEX = /^[\w\s&().,'/-]{2,120}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// ------------------ ROUTES ------------------
app.get("/api/devices", asyncHandler(async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [devices] = await conn.execute(
      `SELECT d.id, d.name, d.status, d.efficiency,
              dr.power_watts AS power,
              dr.recorded_at AS last_recorded
       FROM devices d
       LEFT JOIN device_readings dr
         ON dr.id = (SELECT id FROM device_readings 
                     WHERE device_id = d.id 
                     ORDER BY recorded_at DESC LIMIT 1)
       ORDER BY d.name ASC`
    );

    res.json({
      devices: devices.map(d => ({
        id: d.id,
        name: d.name,
        status: d.status,
        efficiency: d.efficiency != null ? `${Number(d.efficiency).toFixed(2)}%` : "-",
        power: d.power ?? 0,
        last_recorded: d.last_recorded
      })),
      stats: {
        activeDevices: devices.filter(d => d.status !== "offline").length,
        uptime: "99.8%",
        alerts: 0,
        avgResponse: "45ms"
      }
    });
  } finally {
    conn.release();
  }
}));
app.post("/api/devices", asyncHandler(async (req, res) => {
  const { name, status, efficiency } = req.body;
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.execute(
      "INSERT INTO devices (name, status, efficiency) VALUES (?, ?, ?)",
      [name, status, efficiency || null]
    );
    res.json({ success: true, id: result.insertId });
  } finally {
    conn.release();
  }
}));
app.put("/api/devices/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, status, efficiency } = req.body;
  const conn = await pool.getConnection();
  try {
    await conn.execute(
      "UPDATE devices SET name = ?, status = ?, efficiency = ? WHERE id = ?",
      [name, status, efficiency || null, id]
    );
    res.json({ success: true });
  } finally {
    conn.release();
  }
}));
app.delete("/api/devices/:id", asyncHandler(async (req, res) => {
  const { id } = req.params;
  const conn = await pool.getConnection();
  try {
    await conn.execute("DELETE FROM devices WHERE id = ?", [id]);
    res.json({ success: true });
  } finally {
    conn.release();
  }
}));
function randomReading(deviceId) {
    return {
        device_id: deviceId,
        power_watts: Math.floor(Math.random() * 2000),
        recorded_at: new Date()
    };
}

app.post("/api/devices/update-readings", asyncHandler(async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [devices] = await conn.execute("SELECT id FROM devices");
    for (let d of devices) {
      const r = randomReading(d.id);
      await conn.execute(
        "INSERT INTO device_readings (device_id, power_watts, recorded_at) VALUES (?, ?, ?)",
        [r.device_id, r.power_watts, r.recorded_at]
      );
    }
    res.json({ success: true, message: "Readings updated" });
  } finally {
    conn.release();
  }
}));

// CONTACT FORM
app.post(
  "/api/contact",
  [
    body("fullName").trim().matches(NAME_REGEX).withMessage("Invalid full name"),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("company").optional({ nullable: true }).trim().matches(COMPANY_REGEX).withMessage("Invalid company"),
    body("phoneNumber").optional({ nullable: true }).trim().matches(PHONE_REGEX).withMessage("Invalid phone"),
    body("message").trim().isLength({ min: 5 }).withMessage("Message must be at least 5 characters")
  ],
  asyncHandler(async (req, res) => {
    const err = sendValidationErrors(req, res);
    if (err) return;

    const { fullName, email, company, phoneNumber, message } = req.body;

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [userRows] = await conn.execute(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      const userId = userRows.length ? userRows[0].id : null;

      await conn.execute(
        `INSERT INTO contact_messages (user_id, full_name, email, company, phone_number, message)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, fullName, email, company || null, phoneNumber || null, message]
      );

      await conn.commit();
      res.status(200).json({ success: true, message: "Message saved successfully!" });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  })
);

// DEVICES API
app.get("/api/devices", asyncHandler(async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const [devices] = await conn.execute(
      `SELECT d.id, d.name, d.status, d.efficiency,
              (SELECT power_watts FROM device_readings dr
               WHERE dr.device_id = d.id
               ORDER BY recorded_at DESC LIMIT 1) AS power
       FROM devices d
       ORDER BY d.name ASC`
    );

    if (!devices.length) {
      return res.json({
        devices: [
          { name: "HVAC System 001", status: "online", power: 1247, efficiency: "94.2%" },
          { name: "LED Array 012", status: "online", power: 453, efficiency: "98.7%" },
          { name: "Server Rack A", status: "auto", power: 2156, efficiency: "91.3%" },
          { name: "Backup Generator", status: "offline", power: 0, efficiency: "-" }
        ],
        stats: { activeDevices: 3, uptime: "99.8%", alerts: 0, avgResponse: "45ms" }
      });
    }

    const activeDevices = devices.filter(d => d.status !== "offline").length;
    res.json({
      devices: devices.map(d => ({
        name: d.name,
        status: d.status,
        power: d.power ?? 0,
        efficiency: d.efficiency != null ? `${Number(d.efficiency).toFixed(1)}%` : "-"
      })),
      stats: { activeDevices, uptime: "99.8%", alerts: 0, avgResponse: "45ms" }
    });
  } finally {
    conn.release();
  }
}));

// ANALYTICS API
app.get("/api/analytics", asyncHandler(async (req, res) => {
  res.json({
    reports: 1834,
    forecastAccuracy: "98.3%",
    costSaved: "₹2.4M",
    dataPoints: "50.2B",
    chart: [45.2, 42.8, 48.1, 44.3, 39.7, 41.2, 38.9]
  });
}));

// SIGNUP
app.post("/api/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }

  // Password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-z\d@$!%*?&#.]{8,}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long with uppercase, lowercase, number, and special character"
    });
  }

  // Check if email already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password and insert new user
    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ success: false, message: "Database error" });
        res.json({ success: true, message: "User registered successfully" });
      }
    );
  });
});

// LOGIN
app.post(
  "/api/login",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").isString().isLength({ min: 1 }).withMessage("Password is required")
  ],
  asyncHandler(async (req, res) => {
    const err = sendValidationErrors(req, res);
    if (err) return;

    const { email, password } = req.body;

    const conn = await pool.getConnection();
    try {
      const [rows] = await conn.execute(
        "SELECT id, full_name, email, password FROM users WHERE email = ? LIMIT 1",
        [email]
      );
      if (!rows.length) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
      }
      res.json({
        success: true,
        message: "Login successful",
        user: { id: user.id, fullName: user.full_name, email: user.email }
      });
    } finally {
      conn.release();
    }
  })
);

// FORGOT PASSWORD
app.post(
  "/api/forgot-password",
  [body("email").isEmail().withMessage("Invalid email").normalizeEmail()],
  asyncHandler(async (req, res) => {
    const err = sendValidationErrors(req, res);
    if (err) return;

    const { email } = req.body;

    const conn = await pool.getConnection();
    try {
      const [users] = await conn.execute(
        "SELECT id FROM users WHERE email = ? LIMIT 1",
        [email]
      );

      const genericResponse = { success: true, message: "If the email exists, a reset link has been sent." };

      if (!users.length) {
        return res.json(genericResponse);
      }

      const userId = users[0].id;
      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await conn.execute(
        "UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0",
        [userId]
      );

      await conn.execute(
        `INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)`,
        [userId, token, expiresAt]
      );

      const baseUrl = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
      const resetLink = `${baseUrl}/reset-password.html?token=${token}&email=${encodeURIComponent(email)}`;

      const mailOptions = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Wattson Password Reset",
        html: `<p>You requested a password reset.</p>
               <p>Click this <a href="${resetLink}">link</a> to reset your password.</p>
               <p>This link will expire in 1 hour.</p>`
      };

      await transporter.sendMail(mailOptions);
      return res.json(genericResponse);
    } finally {
      conn.release();
    }
  })
);

// RESET PASSWORD
app.post(
  "/api/reset-password/:token",
  [
    param("token").isLength({ min: 64, max: 64 }).withMessage("Invalid token"),
    body("newPassword").matches(PASSWORD_REGEX).withMessage(
      "Password must be 8+ chars incl. upper, lower, digit, special"
    )
  ],
  asyncHandler(async (req, res) => {
    const err = sendValidationErrors(req, res);
    if (err) return;

    const { token } = req.params;
    const { newPassword } = req.body;

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [rows] = await conn.execute(
        `SELECT pr.id, pr.user_id
           FROM password_resets pr
          WHERE pr.token = ?
            AND pr.expires_at > NOW()
            AND pr.used = 0
          LIMIT 1`,
        [token]
      );

      if (!rows.length) {
        await conn.rollback();
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
      }

      const { id: resetId, user_id: userId } = rows[0];
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await conn.execute(
        `UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?`,
        [hashedPassword, userId]
      );

      await conn.execute(
        `UPDATE password_resets SET used = 1 WHERE id = ?`,
        [resetId]
      );

      await conn.commit();
      res.json({ success: true, message: "Password updated successfully! You can now log in." });
    } catch (e) {
      await conn.rollback();
      throw e;
    } finally {
      conn.release();
    }
  })
);


// ------------------ ERROR HANDLER ------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message, err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ------------------ START SERVER ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});