"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use('/', routes_1.default);
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
exports.default = app;
//# sourceMappingURL=app.js.map