import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";

import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      args.fileId,
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    //const resultOne = await (await vectorStore.similaritySearch(args.query, 1)).filter(q=>q.metadata==args.fileId);
    const resultOne1 = await await vectorStore.similaritySearch(args.query, 1);

    let found = false;
    resultOne1.forEach((doc) => {
      const metadataString = Object.values(doc.metadata).join("");
      if (metadataString === args.fileId) {
        doc.metadata = { fileId: metadataString };
        found = true;
      } else {
        console.log("No match.");
        found = false;
      }
    });

    if (found) return JSON.stringify(resultOne1);
    // const resultOne = await resultOne1.filter(q=>q.metadata==args.fileId);
    //console.log(resultOne);

    return null;
  },
});
