const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS
const authRouter = require("./routes/auth.js");

const PORT = process.env.PORT || 3001;
const app = express();

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST'], // Allowed methods
};

// Apply CORS middleware with the defined options
app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());

// Use auth routes
app.use(authRouter);

const DB ="mongodb+srv://sharan27505:Sharan2704@cgpa-login-auth-credent.jifzh.mongodb.net/?retryWrites=true&w=majority&appName=cgpa-login-auth-credentials";

mongoose
  .connect(DB)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
