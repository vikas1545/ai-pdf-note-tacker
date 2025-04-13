import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";

import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
import { apiKeyData } from "@/token.js";
//const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const apiKey = apiKeyData;
export const ingest = action({
  args: {
    splitText: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
      args.splitText,
      // args.fileId, this store fileId as string
      { fileId: args.fileId },
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
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
        apiKey: apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    const resultOne = await (
      await vectorStore.similaritySearch(args.query, 1)
    ).filter((q) => q.metadata.fileId == args.fileId);
    return JSON.stringify(resultOne);

    //const resultOne1 =  await vectorStore.similaritySearch(args.query, 1);
    // console.log("resultOne1 ================= :", resultOne1);
    // let found = false;
    // resultOne1.forEach((doc) => {
    //   const metadataString = Object.values(doc.metadata).join("");
    //   if (metadataString === args.fileId) {
    //     doc.metadata = { fileId: metadataString };
    //     found = true;
    //   } else {
    //     console.log("No match.");
    //     found = false;
    //   }
    // });

    // if (found) return JSON.stringify(resultOne1);
    // // const resultOne = await resultOne1.filter(q=>q.metadata==args.fileId);
    // //console.log(resultOne);

    // return null;
  },
});
