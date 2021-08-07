"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const liveComment_1 = require("../controllers/liveComment");
const router = express_1.Router();
router.get("/liveComments", liveComment_1.getLiveComments);
exports.default = router;
