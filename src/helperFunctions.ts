import { FileSnippetOut } from "./types";

const fetch = require("node-fetch");

export const fetchGraphQL = async (
  schema: string,
  variables: any = {}
): Promise<any> => {
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
  const res = await fetch(database_url, requestOptions).then((res: Response) =>
    res.json()
  );
  return res;
};

export const processVideoForFileSnippet = async (
  url: string,
  fps: number
): Promise<FileSnippetOut> => {
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
  const res = await fetch(database_url, requestOptions).then((res: Response) =>
    res.json()
  );
  return res;
};

export const fetchYTComments = async (videoId: string): Promise<any> => {
  const requestOptions = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const requestURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${process.env.YT_API_KEY}&textFormat=html&part=snippet,replies&videoId=${videoId}&maxResults=50`;
  const res = await fetch(requestURL, requestOptions).then((res: Response) =>
    res.json()
  );
  return res.items;
};
