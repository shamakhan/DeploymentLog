"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    env: process.env.NODE_ENV || "production",
    url: process.env.APP_URL + ":" + process.env.PORT,
    port: process.env.PORT,
    database: process.env.DATABASE_URL || "mongodb://localhost:27017/ejam"
};
