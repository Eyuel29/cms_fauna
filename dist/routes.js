"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fauna_client_1 = require("./fauna_client");
const router = (0, express_1.Router)();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({
            success: true,
            message: "HI :)"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}));
router.get('/blog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fauna_client_1.faunaClient.query(fauna_client_1.q.Collection("blog"));
        res.send(result);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
        console.log(error);
    }
}));
router.post('/blog', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(401).json({
                success: false,
                message: "Please provide the required title and content!"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Blog post created successfully",
            data: { title, content }
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error
        });
    }
}));
exports.default = router;
//# sourceMappingURL=routes.js.map