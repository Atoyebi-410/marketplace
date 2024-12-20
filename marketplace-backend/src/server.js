import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import sequelize from "./config/database.js";
import dotenv from  "dotenv";

dotenv.config()

const app = express()
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoute)


app.get("/", (req, res) => {
    res.send("API is running...");
});

app.use((err, req, res, next) => {
    console.error("Error handler caught:", err.stack || err.message || err);
    if (!res.headersSent) {
        res.status(err.status || 500).json({
            error: err.message || "Internal Server Error",
        });
    }
});

(async () => {
    try {
      await sequelize.authenticate();
      console.log("Database connected successfully!");
      await sequelize.sync({ force: false }); // Sync models
    } catch (error) {
      console.error("Database connection error:", error);
    }
})();





const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))