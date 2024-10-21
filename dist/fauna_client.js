"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faunaClient = exports.q = void 0;
const faunadb_1 = __importDefault(require("faunadb"));
exports.q = faunadb_1.default.query;
exports.faunaClient = new faunadb_1.default.Client({
    secret: process.env.FAUNA_SERVER_KEY || "",
    endpoint: "https://db.fauna.com",
});
//# sourceMappingURL=fauna_client.js.map