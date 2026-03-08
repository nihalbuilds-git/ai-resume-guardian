/**
 * PDF Export button — generates and downloads a pixel-perfect PDF.
 * Uses @react-pdf/renderer's pdf() function for client-side generation.
 */
import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { ResumePDFDocument } from "./templates/PDFDocument";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  data: ResumeData;
}

export function PDFExportButton({ data }: Props) {
  const [generating, setGenerating] = useState(false);

  const handleExport = async () => {
    setGenerating(true);
    try {
      const blob = await pdf(<ResumePDFDocument data={data} />).toBlob();
      const filename = data.personal_info.fullName
        ? `${data.personal_info.fullName.replace(/\s+/g, "_")}_Resume.pdf`
        : "Resume.pdf";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("PDF downloaded!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <Button size="sm" variant="outline" onClick={handleExport} disabled={generating}>
      {generating ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Download className="mr-1 h-3.5 w-3.5" />}
      {generating ? "Generating..." : "PDF"}
    </Button>
  );
}
