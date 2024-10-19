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
        res.send("Hii");
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
router.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fauna_client_1.faunaClient.query(fauna_client_1.q.Map(fauna_client_1.q.Paginate(fauna_client_1.q.Documents(fauna_client_1.q.Collection('posts'))), fauna_client_1.q.Lambda('X', fauna_client_1.q.Get(fauna_client_1.q.Var('X')))));
        res.json(result);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
const createCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fauna_client_1.faunaClient.query(fauna_client_1.q.CreateCollection({ name: 'posts' }));
        console.log('Collection created:', result);
    }
    catch (error) {
        console.log('Error creating collection:', error);
    }
});
exports.default = router;
//# sourceMappingURL=routes.js.map