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
exports.getLiveComments = void 0;
const helperFunctions_1 = require("../helperFunctions");
const getLiveComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { videoId } = req.query;
    const getAllComments = yield helperFunctions_1.fetchYTComments(videoId);
    // const getAllComments: any = ytCommentData.items
    console.log("Parsing all comments");
    const parsedComments = getAllComments.map((fullComment) => {
        const commentDisplay = fullComment.snippet.topLevelComment.snippet.textDisplay;
        const comment = fullComment.snippet.topLevelComment.snippet.textOriginal;
        const user = fullComment.snippet.topLevelComment.snippet.authorDisplayName;
        const replies = [];
        const hasReplies = fullComment.snippet.totalReplyCount > 0;
        if (hasReplies) {
            const allReplies = fullComment.replies.comments;
            for (const reply of allReplies) {
                const replyCommentDisplay = reply.snippet.textDisplay;
                const replyComment = reply.snippet.textOriginal;
                const replyUser = reply.snippet.authorDisplayName;
                const newReply = {
                    commentDisplay: replyCommentDisplay,
                    comment: replyComment,
                    user: replyUser,
                };
                replies.push(newReply);
            }
        }
        return {
            commentDisplay,
            comment,
            user,
            replies,
        };
    });
    const timestampMarker = 'href="https://www.youtube.com/watch?v=hQzlNlHcN0A&amp;t=';
    console.log("Filtering only timestamped comments");
    const timestampedComments = parsedComments.filter((comment) => {
        if (comment.commentDisplay.includes(timestampMarker)) {
            return true;
        }
        else if (comment.replies.find((r) => r.commentDisplay.includes(timestampMarker))) {
            return true;
        }
        else {
            return false;
        }
    });
    console.log("Parsing to liveComments");
    const liveComments = timestampedComments.map((comment) => {
        const firstTimestampedComment = comment.commentDisplay.includes(timestampMarker)
            ? comment
            : comment.replies.find((r) => r.commentDisplay.includes(timestampMarker));
        // console.log('firstTimestampedComment', firstTimestampedComment);
        const splitByTimestamps = firstTimestampedComment.commentDisplay.split(timestampMarker);
        // console.log('splitByTimestamps', splitByTimestamps);
        let timeString = splitByTimestamps[1].split('">')[0];
        // console.log('timeString', timeString);
        const hours = timeString.split("h")[0]
            ? parseInt(timeString.split("h")[0])
            : 0;
        timeString =
            timeString.split("h") > 1 ? timeString.split("h")[1] : timeString;
        const minutes = timeString.split("m")[0]
            ? parseInt(timeString.split("h")[0])
            : 0;
        timeString = timeString.split("m")[1];
        const seconds = timeString.split("s")[0]
            ? parseInt(timeString.split("h")[0])
            : 0;
        const time = hours * 3600 + minutes * 60 + seconds;
        const modifiedReplies = [];
        for (const reply of comment.replies) {
            const modifiedReply = {
                comment: reply.comment,
                user: reply.user,
            };
            modifiedReplies.push(modifiedReply);
        }
        const modifiedComment = {
            comment: comment.comment,
            user: comment.user,
            time,
            replies: modifiedReplies,
        };
        return modifiedComment;
    });
    return res.json({
        liveComments,
    });
});
exports.getLiveComments = getLiveComments;
