/**
 * Routes to the correct preview template component based on template id.
 */
import { ResumeData } from "@/types/resume";
import { ModernPreview } from "./ModernPreview";
import { ClassicPreview } from "./ClassicPreview";
import { MinimalPreview } from "./MinimalPreview";
import { ATSPreview } from "./ATSPreview";

interface Props {
  data: ResumeData;
}

export function TemplateRenderer({ data }: Props) {
  switch (data.template) {
    case "classic":
      return <ClassicPreview data={data} />;
    case "minimal":
      return <MinimalPreview data={data} />;
    case "ats":
      return <ATSPreview data={data} />;
    case "modern":
    default:
      return <ModernPreview data={data} />;
  }
}
