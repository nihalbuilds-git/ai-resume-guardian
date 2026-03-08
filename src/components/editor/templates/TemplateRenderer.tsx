/**
 * Routes to the correct preview template component based on template id.
 * Uses React.lazy for code-splitting — each template loads on demand.
 */
import { ResumeData } from "@/types/resume";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ModernPreview = lazy(() => import("./ModernPreview").then(m => ({ default: m.ModernPreview })));
const ClassicPreview = lazy(() => import("./ClassicPreview").then(m => ({ default: m.ClassicPreview })));
const MinimalPreview = lazy(() => import("./MinimalPreview").then(m => ({ default: m.MinimalPreview })));
const ATSPreview = lazy(() => import("./ATSPreview").then(m => ({ default: m.ATSPreview })));

interface Props {
  data: ResumeData;
}

function TemplateFallback() {
  return <Skeleton className="w-full h-[800px] rounded-lg" />;
}

export function TemplateRenderer({ data }: Props) {
  const Template = (() => {
    switch (data.template) {
      case "classic": return ClassicPreview;
      case "minimal": return MinimalPreview;
      case "ats": return ATSPreview;
      case "modern":
      default: return ModernPreview;
    }
  })();

  return (
    <Suspense fallback={<TemplateFallback />}>
      <Template data={data} />
    </Suspense>
  );
}
