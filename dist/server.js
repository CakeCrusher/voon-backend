"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const test_1 = __importDefault(require("./routes/test"));
const fileSnippet_1 = __importDefault(require("./routes/fileSnippet"));
const liveComment_1 = __importDefault(require("./routes/liveComment"));
const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(test_1.default);
app.use(fileSnippet_1.default);
app.use(liveComment_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
