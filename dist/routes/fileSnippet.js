"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fileSnippet_1 = require("../controllers/fileSnippet");
const router = express_1.Router();
router.post("/fileSnippet", fileSnippet_1.makeFileSnippet);
exports.default = router;
