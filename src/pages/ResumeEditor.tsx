import { useParams, useNavigate } from "react-router-dom";
import { useResume, useUpdateResume } from "@/hooks/use-resumes";
import { useState, useEffect, useCallback, useRef } from "react";
import { ResumeData, PersonalInfo, ExperienceItem, EducationItem, ProjectItem, DEFAULT_PERSONAL_INFO } from "@/types/resume";
import { PersonalInfoForm } from "@/components/editor/PersonalInfoForm";
import { SummaryForm } from "@/components/editor/SummaryForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { ProjectsForm } from "@/components/editor/ProjectsForm";
import { DesignControls } from "@/components/editor/DesignControls";
import { PDFExportButton } from "@/components/editor/PDFExportButton";
import { ResumePreview } from "@/components/editor/ResumePreview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, ZoomIn, ZoomOut, Loader2, Undo2, Redo2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const MAX_HISTORY = 50;

export default function ResumeEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: resume, isLoading } = useResume(id);
  const updateResume = useUpdateResume();

  // Local editable state
  const [localData, setLocalData] = useState<ResumeData | null>(null);
  const [zoom, setZoom] = useState(0.55);
  const [saving, setSaving] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  // Undo/Redo
  const [history, setHistory] = useState<ResumeData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const skipHistoryRef = useRef(false);

  // Initialize local data from server
  useEffect(() => {
    if (resume && !localData) {
      setLocalData(resume);
      setHistory([resume]);
      setHistoryIndex(0);
    }
  }, [resume]);

  // Push to history on data change
  const pushHistory = useCallback((data: ResumeData) => {
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      return;
    }
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      const next = [...sliced, data].slice(-MAX_HISTORY);
      setHistoryIndex(next.length - 1);
      return next;
    });
  }, [historyIndex]);

  const updateField = useCallback(<K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setLocalData((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [field]: value };
      pushHistory(updated);
      return updated;
    });
  }, [pushHistory]);

  const undo = () => {
    if (historyIndex > 0) {
      skipHistoryRef.current = true;
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setLocalData(history[newIdx]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      skipHistoryRef.current = true;
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setLocalData(history[newIdx]);
    }
  };

  // Auto-save every 30 seconds
  const lastSavedRef = useRef<string>("");
  useEffect(() => {
    if (!localData || !id) return;
    const interval = setInterval(() => {
      const serialized = JSON.stringify(localData);
      if (serialized !== lastSavedRef.current) {
        setSaving(true);
        updateResume.mutateAsync({
          id,
          title: localData.title,
          summary: localData.summary,
          personal_info: localData.personal_info as any,
          experience: localData.experience as any,
          education: localData.education as any,
          skills: localData.skills as any,
          projects: localData.projects as any,
          certifications: localData.certifications as any,
          section_order: localData.section_order,
        }).then(() => {
          lastSavedRef.current = serialized;
          setSaving(false);
        }).catch(() => setSaving(false));
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [localData, id]);

  // Manual save
  const handleSave = async () => {
    if (!localData || !id) return;
    setSaving(true);
    await updateResume.mutateAsync({
      id,
      title: localData.title,
      summary: localData.summary,
      personal_info: localData.personal_info as any,
      experience: localData.experience as any,
      education: localData.education as any,
      skills: localData.skills as any,
      projects: localData.projects as any,
      certifications: localData.certifications as any,
      section_order: localData.section_order,
    });
    lastSavedRef.current = JSON.stringify(localData);
    setSaving(false);
  };

  if (isLoading || !localData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Top Bar */}
      <header className="flex items-center justify-between h-12 px-4 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <Button size="icon" variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          {editingTitle ? (
            <Input
              className="h-8 w-60 text-sm font-medium"
              value={localData.title}
              onChange={(e) => updateField("title", e.target.value)}
              onBlur={() => setEditingTitle(false)}
              onKeyDown={(e) => e.key === "Enter" && setEditingTitle(false)}
              autoFocus
            />
          ) : (
            <button onClick={() => setEditingTitle(true)} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              {localData.title}
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" onClick={undo} disabled={historyIndex <= 0} title="Undo">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={redo} disabled={historyIndex >= history.length - 1} title="Redo">
            <Redo2 className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 border border-border rounded-md">
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setZoom((z) => Math.max(0.3, z - 0.1))}>
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground w-10 text-center">{Math.round(zoom * 100)}%</span>
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setZoom((z) => Math.min(1, z + 0.1))}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>
          </div>
          <PDFExportButton data={localData} />
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1 h-3.5 w-3.5" />}
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Split Editor */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Form Tabs */}
        <div className="w-[480px] shrink-0 border-r border-border">
          <ScrollArea className="h-full">
            <div className="p-4">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="w-full grid grid-cols-6 mb-4">
                  <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
                  <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
                  <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
                  <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
                  <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
                  <TabsTrigger value="design" className="text-xs">Design</TabsTrigger>
                </TabsList>
                <TabsContent value="personal" className="space-y-6">
                  <PersonalInfoForm
                    data={localData.personal_info}
                    onChange={(v) => updateField("personal_info", v)}
                  />
                  <SummaryForm
                    value={localData.summary}
                    onChange={(v) => updateField("summary", v)}
                  />
                </TabsContent>
                <TabsContent value="experience">
                  <ExperienceForm
                    items={localData.experience}
                    onChange={(v) => updateField("experience", v)}
                  />
                </TabsContent>
                <TabsContent value="education">
                  <EducationForm
                    items={localData.education}
                    onChange={(v) => updateField("education", v)}
                  />
                </TabsContent>
                <TabsContent value="skills">
                  <SkillsForm
                    items={localData.skills}
                    onChange={(v) => updateField("skills", v)}
                  />
                </TabsContent>
                <TabsContent value="projects">
                  <ProjectsForm
                    items={localData.projects}
                    onChange={(v) => updateField("projects", v)}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>

        {/* Right: Live Preview */}
        <div className="flex-1 overflow-auto">
          <ResumePreview data={localData} zoom={zoom} />
        </div>
      </div>
    </div>
  );
}
