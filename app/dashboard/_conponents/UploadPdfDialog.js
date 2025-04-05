"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";

function UploadPdfDialog({ children }) {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const { user } = useUser();
  const embedDocument = useAction(api.myAction.ingest);
  const onFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const onUpload = async () => {
    setLoading(true);
    try {
      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": file?.type },
        body: file,
      });

      const { storageId } = await result.json();
      const fileId = uuid4();
      const fileUrl = await getFileUrl({ storageId: storageId });
      const resp = await addFileEntry({
        fileId: fileId,
        storageId: storageId,
        fileUrl: fileUrl,
        fileName: fileName ?? "Untitled File",
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });

      const apiResp = await axios.get("/api/pdf-loader?pdfUrl=" + fileUrl);

      await embedDocument({
        splitText: apiResp.data.result,
        fileId: fileId,
      });
      setOpen(false);
    } catch (error) {
      console.log("error :", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full">
          + Upload PDF File
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload PDF File</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex flex-col gap-2 mt-2 items-start">
                <h2>Select a file to Upload</h2>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onFileSelect(e)}
                />
              </div>

              <div className="flex flex-col gap-2 mt-2 items-start">
                <label>File Name *</label>
                <Input
                  placeholder="File Name"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogClose>

          <Button type="button" onClick={onUpload} disabled={loading}>
            {loading ? <Loader2 className=" animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UploadPdfDialog;
