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
exports.fetchYTComments = exports.processVideoForFileSnippet = exports.fetchGraphQL = void 0;
const fetch = require("node-fetch");
const fetchGraphQL = (schema, variables = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const graphql = JSON.stringify({
        query: schema,
        variables,
    });
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret": "secret",
        },
        body: graphql,
    };
    const database_url = "https://voon-demo.herokuapp.com/v1/graphql";
    const res = yield fetch(database_url, requestOptions).then((res) => res.json());
    return res;
});
exports.fetchGraphQL = fetchGraphQL;
const processVideoForFileSnippet = (url, fps) => __awaiter(void 0, void 0, void 0, function* () {
    const variables = JSON.stringify({
        url,
        per_frame: fps,
    });
    const requestOptions = {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: variables,
    };
    const database_url = "http://localhost:5000/text-data";
    const res = yield fetch(database_url, requestOptions).then((res) => res.json());
    return res;
});
exports.processVideoForFileSnippet = processVideoForFileSnippet;
const fetchYTComments = (videoId) => __awaiter(void 0, void 0, void 0, function* () {
    const requestOptions = {
        method: "GET",
        headers: {
            "content-type": "application/json",
        },
    };
    const requestURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=html&part=snippet,replies&videoId=${videoId}&maxResults=50`;
    const res = yield fetch(requestURL, requestOptions).then((res) => res.json());
    return res.items;
});
exports.fetchYTComments = fetchYTComments;
