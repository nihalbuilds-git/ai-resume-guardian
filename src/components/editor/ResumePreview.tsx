/**
 * ResumePreview — wraps the template renderer in an A4-sized, zoomable container.
 */
import { ResumeData } from "@/types/resume";
import { TemplateRenderer } from "./templates/TemplateRenderer";

interface Props {
  data: ResumeData;
  zoom: number;
}

export function ResumePreview({ data, zoom }: Props) {
  return (
    <div className="flex items-start justify-center p-4 bg-muted/50 min-h-full overflow-auto">
      <div
        className="bg-white shadow-lg origin-top"
        style={{
          width: "210mm",
          minHeight: "297mm",
          transform: `scale(${zoom})`,
        }}
      >
        <TemplateRenderer data={data} />
      </div>
    </div>
  );
}
