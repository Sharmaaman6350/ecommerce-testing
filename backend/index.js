// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db.js");
// const ProductRoutes = require("./routes/ProductsRoutes.js");
// const authRoutes = require("./routes/authRoutes.js");
// const orderRoutes = require("./routes/orderRoutes.js");
// const profileRoutes = require("./routes/profileRoutes.js");
// const settingRoutes = require("./routes/settingRoutes.js");

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 8000;
// const initPassport = require("./config/passport.js");
// const passport = initPassport();
// const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// // ✅ Middleware

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// app.use(express.json());

// app.use(passport.initialize());

// // 🔐 Google OAuth endpoints (JWT redirect, no server session)
// const { generateToken } = require("./controllers/authController");

// app.get(
//   "/api/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//     session: false,
//   })
// );

// app.get(
//   "/api/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: `${FRONTEND_URL}/login`,
//     session: false,
//   }),
//   (req, res) => {
//     // req.user comes from Strategy's done(null, user)
//     const token = generateToken(req.user);
//     // redirect to frontend carrying JWT
//     res.redirect(`${FRONTEND_URL}/auth/success?token=${token}`);
//   }
// );
// app.use("/uploads", express.static("uploads"));

// // ✅ API Routes
// app.use("/api/product", ProductRoutes);
// app.use("/api/profile", profileRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/payment", orderRoutes);
// app.use("/api/setting", settingRoutes);

// // ✅ Connect to DB and start server
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`✅ Server is running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Failed to connect to DB. Server not started.", err);
//   });

// =====================
// Backend Server Setup
// =====================
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const passport = require("passport");

// Load environment variables
dotenv.config();

// Database Connection
const connectDB = require("./config/db.js");

// Passport config
const initPassport = require("./config/passport.js");

// Routes
const ProductRoutes = require("./routes/ProductsRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js");
const settingRoutes = require("./routes/settingRoutes.js");

// Controllers
const { generateToken } = require("./controllers/authController");

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://vyntraa-ecommerce.onrender.com";

// ✅ Middleware
app.use(cors());
app.use(express.json());
initPassport();
app.use(passport.initialize());

// ✅ Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/product", ProductRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", orderRoutes);
app.use("/api/setting", settingRoutes);

// ✅ Google OAuth Routes
app.get(
  "/api/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const token = generateToken(req.user);
    res.redirect(`${FRONTEND_URL}/auth/success?token=${token}`);
  }
);

// ✅ Serve Frontend (Vite Build)
const frontendDistPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendDistPath));

app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send("Frontend not built. Please build the frontend.");
    }
  });
});

// ✅ 404 Not Found
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ✅ Connect DB & Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed. Server not started.", err);
  });
