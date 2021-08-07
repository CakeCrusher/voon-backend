"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEW_FILEINFRAME = exports.NEW_FRAMEDATA = exports.NEW_FILESNIPPET = exports.NEW_VIDEO = exports.GET_VIDEO = exports.NEW_TEST = void 0;
exports.NEW_TEST = `
mutation MyMutation($words: String!) {
  insert_test(objects: {words: $words}) {
    returning {
      id
    }
  }
}
`;
exports.GET_VIDEO = `
query MyQuery($videoId: String!) {
  video_by_pk(videoId: $videoId) {
    videoId
  }
}
`;
exports.NEW_VIDEO = `
mutation MyMutation($videoId: String!) {
  insert_video(objects: {videoId: $videoId}) {
    returning {
      videoId
    }
  }
}
`;
exports.NEW_FILESNIPPET = `
mutation MyMutation($fps: Int!, $height: Int!, $videoId: String!, $width: Int!, $githubURL: String!) {
  insert_fileSnippet(objects: {fps: $fps, height: $height, videoId: $videoId, width: $width, githubURL: $githubURL}) {
    returning {
      id
    }
  }
}
`;
exports.NEW_FRAMEDATA = `
mutation MyMutation($frame: Int!, $fileSnippetId: uuid!) {
  insert_frameData(objects: {frame: $frame, fileSnippetId: $fileSnippetId}) {
    returning {
      id
    }
  }
}
`;
exports.NEW_FILEINFRAME = `
mutation MyMutation($fileURL: String!, $frameId: uuid!, $x: Int!, $y: Int!, $height: Int!, $width: Int!) {
  insert_fileInFrame(objects: {fileURL: $fileURL, frameId: $frameId, x: $x, y: $y, height: $height, width: $width}) {
    returning {
      id
    }
  }
}
`;
