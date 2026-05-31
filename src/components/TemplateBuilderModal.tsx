import React, { useState, useEffect } from "react";
import { HierarchyTemplate } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, LayoutGrid } from "lucide-react";

interface TemplateBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (template: HierarchyTemplate) => void;
  templates: HierarchyTemplate[];
}

export default function TemplateBuilderModal({ open, onClose, onSave, templates }: TemplateBuilderModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFreeform, setIsFreeform] = useState(false);
  const [levels, setLevels] = useState<{ id: string; name: string }[]>([
    { id: "t_1", name: "" },
    { id: "t_2", name: "" },
  ]);

  const handleSelectTemplate = (tpl: HierarchyTemplate | null) => {
    if (tpl) {
      setSelectedTemplateId(tpl.id);
      setName(tpl.name);
      setDescription(tpl.description);
      setIsFreeform(tpl.isFreeform);
      setLevels(
        tpl.nodeTypes.map((nt) => ({
          id: nt.id,
          name: nt.name,
        }))
      );
    } else {
      setSelectedTemplateId(null);
      setName("");
      setDescription("");
      setIsFreeform(false);
      setLevels([
        { id: "t_1", name: "" },
        { id: "t_2", name: "" },
      ]);
    }
  };

  useEffect(() => {
    if (open) {
      handleSelectTemplate(null);
    }
  }, [open]);

  const handleAddLevel = () => {
    if (selectedTemplateId) return; // Prevent modifications
    setLevels([...levels, { id: `t_${Date.now()}`, name: "" }]);
  };

  const handleRemoveLevel = (index: number) => {
    if (selectedTemplateId) return; // Prevent modifications
    setLevels(levels.filter((_, i) => i !== index));
  };

  const handleLevelNameChange = (index: number, val: string) => {
    if (selectedTemplateId) return; // Prevent modifications
    const newLevels = [...levels];
    newLevels[index].name = val;
    setLevels(newLevels);
  };

  const handleSave = () => {
    const isNew = selectedTemplateId === null;
    const newTemplate: HierarchyTemplate = {
      id: isNew ? `tpl_${Date.now()}` : selectedTemplateId!,
      name,
      description,
      isFreeform,
      nodeTypes: isFreeform
        ? [
            { id: "type_folder", name: "Պանակ", level: 1, icon: "Folder", isNestable: true },
            { id: "type_file", name: "Ֆայլ", level: 2, icon: "File" },
          ]
        : levels.map((lvl, idx) => ({
            id: isNew ? `type_${lvl.id}` : lvl.id,
            name: lvl.name,
            level: idx + 1,
            icon: idx === levels.length - 1 ? "FileText" : "Folder",
          })),
    };
    onSave(newTemplate);
    onClose();
  };

  const isFormValid = name.trim() !== "" && (isFreeform || levels.every((l) => l.name.trim() !== ""));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[800px] p-0 gap-0 overflow-hidden rounded-2xl bg-background border-border shadow-xl">
        <div className="flex h-[70vh] min-h-[480px]">
          {/* Left Panel: Structures List */}
          <div className="w-64 border-r border-border/40 bg-muted/15 flex flex-col shrink-0 overflow-hidden">
            <div className="p-4 border-b border-border/40 shrink-0">
              <h3 className="font-semibold text-xs text-muted-foreground/80 uppercase tracking-wider mb-3">Կառուցվածքներ</h3>
              <Button
                variant={selectedTemplateId === null ? "default" : "outline"}
                onClick={() => handleSelectTemplate(null)}
                className="w-full justify-start h-9 rounded-xl gap-2 text-xs font-semibold"
              >
                <Plus className="h-3.5 w-3.5" />
                Ստեղծել Նորը
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    selectedTemplateId === tpl.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-foreground hover:bg-accent/40"
                  }`}
                >
                  <div className="font-bold truncate flex items-center gap-1.5">
                    <LayoutGrid className="h-3.5 w-3.5 opacity-70 shrink-0" />
                    <span className="truncate">{tpl.name}</span>
                  </div>
                  <div
                    className={`text-[10px] mt-0.5 truncate ${
                      selectedTemplateId === tpl.id ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {tpl.isFreeform ? "Ազատ կառուցվածք" : `${tpl.nodeTypes.length} Մակարդակ`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Editor Form */}
          <div className="flex-1 flex flex-col overflow-hidden bg-background">
            <DialogHeader className="px-6 py-4 border-b border-border/40 shrink-0 text-left">
              <DialogTitle className="text-xl font-semibold">
                {selectedTemplateId ? "Խմբագրել Կառուցվածքը" : "Ստեղծել Նոր Կառուցվածք"}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplateId
                  ? "Փոփոխեք կառուցվածքի անվանումն ու նկարագրությունը (հիերարխիայի մակարդակներն արգելափակված են)։"
                  : "Նախագծեք ձեր կազմակերպության տվյալների հիերարխիան։"}
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 space-y-5 overflow-y-auto flex-1 text-left">
              <div className="space-y-2">
                <Label>Կառուցվածքի Անվանում</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Օր.՝ Մասնաճյուղեր..."
                  className="h-10"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label>Նկարագրություն</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Կարճ նկարագրություն"
                  className="h-10"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium cursor-pointer">Ազատ Պանակներ (Freeform)</Label>
                  <p className="text-xs text-muted-foreground">Անջատել կոշտ հիերարխիան: Թույլատրել պանակներ պանակների մեջ:</p>
                </div>
                <Switch
                  checked={isFreeform}
                  onCheckedChange={setIsFreeform}
                  disabled={selectedTemplateId !== null}
                />
              </div>

              {!isFreeform && (
                <div className="space-y-4 pt-2 border-t border-border/40">
                  <div className="flex justify-between items-center">
                    <Label className="text-sm font-semibold">Մակարդակներ (Հիերարխիա)</Label>
                    {selectedTemplateId && (
                      <span className="text-[10px] text-amber-600 bg-amber-50 dark:bg-amber-950/20 dark:text-amber-400 font-medium px-2 py-0.5 rounded border border-amber-200/50">
                        Մակարդակներն արգելափակված են
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2.5">
                    {levels.map((lvl, idx) => (
                      <div key={lvl.id} className="flex items-center gap-2">
                        <div className="flex-none w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                          {idx + 1}
                        </div>
                        <Input
                          value={lvl.name}
                          onChange={(e) => handleLevelNameChange(idx, e.target.value)}
                          placeholder={`Մակարդակ ${idx + 1} անվանում (օր.՝ Դասարան)`}
                          className="h-10 flex-1"
                          disabled={selectedTemplateId !== null}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveLevel(idx)}
                          disabled={selectedTemplateId !== null || levels.length <= 1}
                          className="h-10 w-10 shrink-0"
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  {!selectedTemplateId && (
                    <Button variant="outline" size="sm" onClick={handleAddLevel} className="w-full h-9 border-dashed mt-2">
                      <Plus className="h-3.5 w-3.5 mr-1.5" /> Ավելացնել Մակարդակ
                    </Button>
                  )}
                </div>
              )}
            </div>

            <DialogFooter className="m-0 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
              <Button variant="ghost" onClick={onClose} className="h-9 px-4 text-sm">
                Չեղարկել
              </Button>
              <Button onClick={handleSave} disabled={!isFormValid} className="h-9 px-8 font-medium text-sm">
                {selectedTemplateId ? "Պահպանել" : "Ստեղծել"}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
