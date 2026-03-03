/*process.on("exit", (code) => {
    console.log("Process exiting with code:", code);
});

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason) => {
    console.log("Unhandled Rejection:", reason);
});

process.on("SIGINT", () => {
    console.log("Received SIGINT");
});

process.on("SIGTERM", () => {
    console.log("Received SIGTERM");
});

console.log("PROJECT TEST STARTED");

setInterval(() => {
    console.log("PROJECT STILL RUNNING...");
}, 3000);*/
// the above code was from ai, am trying to find out why my server is crashing on its own.

import express from "express";

import dotenv from "dotenv";
dotenv.config();


const app = express();
const { json } = express;
app.use(express.json());

import crudRoutes from "./routes/crudRoutes.js";

app.use("/api", crudRoutes);
app.use((req, res) => {
    res.status(404).json({ "Error": "NOT FOUND" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ "Error": "INTERNAL SERVER ERROR" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 