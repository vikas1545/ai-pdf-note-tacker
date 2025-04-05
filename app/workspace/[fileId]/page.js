"use client";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PdfViewer from "../_components/PdfViewer";
import TextEditor from "../_components/TextEditor";

function page() {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });


  return (
    <div>
      <WorkspaceHeader fileName={fileInfo?.fileName}/>
      <div className="grid grid-cols-2 gap-5">
        <div>
          <TextEditor/>
        </div>
        <div>
          <PdfViewer fileUrl={fileInfo?.fileUrl}/>
        </div>
      </div>
    </div>
  );
}

export default page;
