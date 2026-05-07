"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, Link, X, Loader2, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  uploadImageFileAction,
  uploadImageUrlAction,
} from "@/resources/events/actions/upload-image-action";
import type { UploadedImage } from "@/resources/events/actions/upload-image-action";

type Props = {
  value: UploadedImage | null;
  onChange: (image: UploadedImage | null) => void;
};

type Tab = "file" | "url";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

export const ImageUploader = ({ value, onChange }: Props) => {
  const [tab, setTab] = useState<Tab>("file");
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        toast.error("Only JPG, PNG, WebP, and GIF images are accepted.");
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error("Image must be under 8MB.");
        return;
      }

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const result = await uploadImageFileAction(formData);
        if ("error" in result) {
          toast.error(result.error);
        } else {
          onChange(result.data);
          toast.success("Image uploaded.");
        }
      } catch (err) {
        console.error("[ImageUploader] file upload failed:", err);
        toast.error("Upload failed. Check your connection and try again.");
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleUrlSubmit = async () => {
    if (!urlInput.trim()) return;
    setUploading(true);
    try {
      const result = await uploadImageUrlAction(urlInput.trim());
      if ("error" in result) {
        toast.error(result.error);
      } else {
        onChange(result.data);
        setUrlInput("");
        toast.success("Image uploaded.");
      }
    } catch (err) {
      console.error("[ImageUploader] URL upload failed:", err);
      toast.error("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  if (value) {
    return (
      <div className="relative rounded-xl overflow-hidden bg-muted" style={{ maxHeight: "200px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value.url}
          alt="Event image preview"
          className="w-full h-full object-cover"
          style={{ maxHeight: "200px" }}
        />
        <button
          type="button"
          onClick={() => onChange(null)}
          className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 transition-colors"
          aria-label="Remove image"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
        <button
          type="button"
          onClick={() => setTab("file")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            tab === "file"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Upload className="size-3.5" />
          Upload file
        </button>
        <button
          type="button"
          onClick={() => setTab("url")}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            tab === "url"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Link className="size-3.5" />
          Paste URL
        </button>
      </div>

      {tab === "file" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 transition-colors",
            uploading ? "cursor-default" : "cursor-pointer",
            dragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-muted/50"
          )}
        >
          {uploading ? (
            <>
              <Loader2 className="size-8 text-muted-foreground animate-spin" />
              <p className="text-sm text-muted-foreground">Uploading…</p>
            </>
          ) : (
            <>
              <ImageIcon className="size-8 text-muted-foreground" />
              <div className="text-center">
                <p className="text-sm font-medium">Drop an image here or click to browse</p>
                <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, WebP, GIF — max 8MB</p>
              </div>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
              e.target.value = "";
            }}
          />
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="https://example.com/image.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleUrlSubmit();
              }
            }}
            disabled={uploading}
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            disabled={uploading || !urlInput.trim()}
            variant="secondary"
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : "Upload"}
          </Button>
        </div>
      )}
    </div>
  );
};
