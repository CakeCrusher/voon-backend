import { fetchYTComments } from "../helperFunctions";

import { Request, Response } from "express";
import { LiveComment } from "../types";

export const getLiveComments = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { videoId }: any = req.query;

  const getAllComments = await fetchYTComments(videoId);
  // const getAllComments: any = ytCommentData.items
  console.log("Parsing all comments");
  const parsedComments = getAllComments.map((fullComment: any) => {
    const commentDisplay =
      fullComment.snippet.topLevelComment.snippet.textDisplay;
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

  const timestampMarker =
    'href="https://www.youtube.com/watch?v=hQzlNlHcN0A&amp;t=';

  console.log("Filtering only timestamped comments");
  const timestampedComments = parsedComments.filter((comment: any) => {
    if (comment.commentDisplay.includes(timestampMarker)) {
      return true;
    } else if (
      comment.replies.find((r: any) =>
        r.commentDisplay.includes(timestampMarker)
      )
    ) {
      return true;
    } else {
      return false;
    }
  });

  console.log("Parsing to liveComments");
  const liveComments: LiveComment[] = timestampedComments.map(
    (comment: any) => {
      const firstTimestampedComment = comment.commentDisplay.includes(
        timestampMarker
      )
        ? comment
        : comment.replies.find((r: any) =>
            r.commentDisplay.includes(timestampMarker)
          );
      // console.log('firstTimestampedComment', firstTimestampedComment);
      const splitByTimestamps =
        firstTimestampedComment.commentDisplay.split(timestampMarker);
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
    }
  );

  return res.json({
    liveComments,
  });
};
