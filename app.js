process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT ERROR:", err);
});

import express from "express";

import dotenv from "dotenv";
dotenv.config();


const app = express();
const {json} = express;
app.use(express.json());

import crudRoutes from "./routes/crudRoutes.js";

app.use("/api", crudRoutes);
app.use((req, res) => {
    res.status(404).json({"Error": "NOT FOUND"});
});
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({"Error": "INTERNAL SERVER ERROR"});
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 