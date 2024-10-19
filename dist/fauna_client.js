"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.q = exports.faunaClient = void 0;
const faunadb_1 = __importDefault(require("faunadb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const q = faunadb_1.default.query;
exports.q = q;
const faunaClient = new faunadb_1.default.Client({
    secret: process.env.FAUNA_SECRET || 'YOUR_FAUNA_SECRET'
});
exports.faunaClient = faunaClient;
//# sourceMappingURL=fauna_client.js.map