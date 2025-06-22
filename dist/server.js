"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const db_1 = require("./db/db");
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.listen(config_1.default.port, () => {
    (0, db_1.connectDB)();
    console.log(`⚡ Server is running on port: ${config_1.default.port}.`);
});
app.get("/", (req, res) => {
    res.send({ success: true, message: "⚡ Welcome to library server.." });
});
