"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cleanupCloudinaryAction } from "@/resources/events/actions/cleanup-cloudinary-action";

export const CloudinaryCleanupButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCleanup = async () => {
    setLoading(true);
    const result = await cleanupCloudinaryAction();
    setLoading(false);

    if ("error" in result) {
      toast.error(result.error);
    } else if (result.data.deleted === 0) {
      toast.success("No orphaned images found.");
    } else {
      toast.success(`Deleted ${result.data.deleted} orphaned image${result.data.deleted === 1 ? "" : "s"} from Cloudinary.`);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCleanup}
      disabled={loading}
      className="gap-1.5 text-muted-foreground"
    >
      {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Trash2 className="size-3.5" />}
      Clean up Cloudinary
    </Button>
  );
};
