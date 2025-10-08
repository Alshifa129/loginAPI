require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/userRoutes");
const cors = require("cors");    

const connectDB = require("./config/db"); // Import DB connection

const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to DB and start server
connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
});
