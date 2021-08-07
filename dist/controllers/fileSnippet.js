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
exports.makeFileSnippet = void 0;
const helperFunctions_1 = require("../helperFunctions");
const schemas_1 = require("../schemas");
const makeFileSnippet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const inp: makeFileSnippetIn = req.body.input
    // print the current time in a clean format
    const timeNow = () => new Date().toISOString().split("T")[1];
    console.log("Started at: ", timeNow());
    // console.log('Started processing at: ', timeNow());
    // // const resu = await processVideoForFileSnippet(inp.url, inp.fps)
    // console.log("RESU1: ", resu);
    // if (!resu.videoId) {
    //   return res.status(500).send({error: 'Error processing video'})
    // }
    // console.log('Finished processing at: ', timeNow());
    // const inp: MakeVoonIn = req.body.input.arg1
    const result = req.body.input;
    console.log("result", result);
    // make video
    // const videoId = inp.url.includes('v=') ? inp.url.split('v=')[1].split('&')[0] : inp.url.split('/')[3].split('?')[0]
    let videoId;
    const getVideo = yield helperFunctions_1.fetchGraphQL(schemas_1.GET_VIDEO, {
        videoId: result.videoId,
    });
    if (getVideo.data.video_by_pk) {
        videoId = getVideo.data.video_by_pk.videoId;
    }
    else {
        const madeVideo = yield helperFunctions_1.fetchGraphQL(schemas_1.NEW_VIDEO, {
            videoId: result.videoId,
        });
        videoId = madeVideo.data.insert_video.returning[0].videoId;
    }
    console.log(`Made VIDEO: ${videoId}`);
    const madeFileSnippet = yield helperFunctions_1.fetchGraphQL(schemas_1.NEW_FILESNIPPET, {
        fps: result.fps,
        height: result.dimensions.y,
        videoId: videoId,
        width: result.dimensions.x,
        githubURL: result.githubURL,
    });
    const fileSnippetId = madeFileSnippet.data.insert_fileSnippet.returning[0].id;
    console.log(`Made FILE SNIPPET: ${fileSnippetId}`);
    // make frames
    for (const frame of result.payload) {
        const madeFrame = yield helperFunctions_1.fetchGraphQL(schemas_1.NEW_FRAMEDATA, {
            frame: frame.frame,
            fileSnippetId: fileSnippetId,
        });
        const frameId = madeFrame.data.insert_frameData.returning[0].id;
        console.log(`Made FRAME: ${frameId}`);
        // make frame data
        for (const di of frame.data) {
            const madeFileInFrame = yield helperFunctions_1.fetchGraphQL(schemas_1.NEW_FILEINFRAME, {
                fileURL: di.file_name,
                frameId,
                x: di.x,
                y: di.y,
                height: di.height,
                width: di.width,
            });
            const fileInFrameId = madeFileInFrame.data.insert_fileInFrame.returning[0].id;
            console.log(`Made FILEINFRAME: ${fileInFrameId}`);
        }
    }
    console.log(`Finished FILESNIPPET: ${fileSnippetId}`);
    console.log("Finished at: ", timeNow());
    return res.json({
        videoId,
    });
});
exports.makeFileSnippet = makeFileSnippet;
