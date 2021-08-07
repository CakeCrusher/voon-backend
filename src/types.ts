export type FileSnippetOut = {
  githubURL: string;
  fps: number;
  height: number;
  width: number;
  frameData: FrameDataOut[];
};

export type FrameDataOut = {
  frame: number;
  fileInFrames: DataInFrameOut[];
};

export type DataInFrameOut = {
  fileURL: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type makeFileSnippetIn = {
  url: string;
  fps: number;
};

export type MakeVoonIn = {
  videoId: string;
  githubURL: string;
  fps: number;
  dimensions: Shape;
  payload: FrameData[];
};
type Shape = {
  x: number;
  y: number;
};

type FrameData = {
  frame: number;
  data: DataInFrame[];
};

type DataInFrame = {
  file_name: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GetLiveCommentIn = {
  videoId: string;
};

export type LiveComment = {
  comment: string;
  user: string;
  time: number;
  replies: Reply[];
};
type Reply = {
  comment: string;
  user: string;
};
