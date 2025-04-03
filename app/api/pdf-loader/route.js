import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


export async function GET(req) {
  const reqUrl=req.url;
  const {searchParams}=new URL(reqUrl);
  const pdfUrl=searchParams.get('pdfUrl');
  const response = await fetch(pdfUrl);
  const data = await response.blob();
  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  let pdfTextContent = "";
  docs.forEach((doc) => {
    pdfTextContent = pdfTextContent + doc.pageContent;
  });

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 0,
  });

  const texts = await textSplitter.createDocuments([pdfTextContent]);
  let splitterList = [];
  texts.forEach((doc) => {
    splitterList.push(doc.pageContent);
  });
  return NextResponse.json({ result: splitterList });
}
