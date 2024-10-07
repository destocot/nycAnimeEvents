"use client";

import { PrinterIcon } from "lucide-react";
import { Button } from "./ui/button";

export const PrintButton = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <Button onClick={handlePrint} className="print:hidden">
      <PrinterIcon className="mr-2 h-4 w-4" /> Print
    </Button>
  );
};
