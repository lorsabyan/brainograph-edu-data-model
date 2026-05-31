import React, { useState } from "react";
import { HierarchyTemplate, NodeType } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2 } from "lucide-react";

interface TemplateBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (template: HierarchyTemplate) => void;
}

export default function TemplateBuilderModal({ open, onClose, onSave }: TemplateBuilderModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isFreeform, setIsFreeform] = useState(false);
  const [levels, setLevels] = useState<{ id: string, name: string }[]>([
    { id: 't_1', name: '' },
    { id: 't_2', name: '' },
  ]);

  const handleAddLevel = () => {
    setLevels([...levels, { id: `t_${Date.now()}`, name: '' }]);
  };

  const handleRemoveLevel = (index: number) => {
    setLevels(levels.filter((_, i) => i !== index));
  };

  const handleLevelNameChange = (index: number, val: string) => {
    const newLevels = [...levels];
    newLevels[index].name = val;
    setLevels(newLevels);
  };

  const handleSave = () => {
    const newTemplate: HierarchyTemplate = {
      id: `tpl_${Date.now()}`,
      name,
      description,
      isFreeform,
      nodeTypes: isFreeform 
        ? [
            { id: 'type_folder', name: 'Պանակ', level: 1, icon: 'Folder', isNestable: true },
            { id: 'type_file', name: 'Ֆայլ', level: 2, icon: 'File' }
          ]
        : levels.map((lvl, idx) => ({
            id: `type_${lvl.id}`,
            name: lvl.name,
            level: idx + 1,
            icon: idx === levels.length - 1 ? 'FileText' : 'Folder' // simple fallback
          }))
    };
    onSave(newTemplate);
    onClose();
  };

  const isFormValid = name.trim() !== '' && (isFreeform || levels.every(l => l.name.trim() !== ''));

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[500px] max-h-[90dvh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl bg-background border-border shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-border/40 shrink-0">
          <DialogTitle className="text-xl font-semibold">Ստեղծել Նոր Կառուցվածք</DialogTitle>
          <DialogDescription>
            Նախագծեք ձեր կազմակերպության տվյալների հիերարխիան
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label>Կառուցվածքի Անվանում</Label>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Օր.՝ Մասնաճյուղեր..." className="h-10" />
          </div>
          
          <div className="space-y-2">
            <Label>Նկարագրություն</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Կարճ նկարագրություն" className="h-10" />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium cursor-pointer">Ազատ Պանակներ (Freeform)</Label>
              <p className="text-xs text-muted-foreground">Անջատել կոշտ հիերարխիան: Թույլատրել պանակներ պանակների մեջ:</p>
            </div>
            <Switch checked={isFreeform} onCheckedChange={setIsFreeform} />
          </div>

          {!isFreeform && (
            <div className="space-y-4 pt-2 border-t border-border/40">
              <Label className="text-sm font-semibold">Մակարդակներ (Հիերարխիա)</Label>
              {levels.map((lvl, idx) => (
                <div key={lvl.id} className="flex items-center gap-2">
                  <div className="flex-none w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    {idx + 1}
                  </div>
                  <Input 
                    value={lvl.name} 
                    onChange={e => handleLevelNameChange(idx, e.target.value)} 
                    placeholder={`Մակարդակ ${idx + 1} անվանում (օր.՝ Դասարան)`} 
                    className="h-10 flex-1"
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveLevel(idx)} disabled={levels.length <= 1}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddLevel} className="w-full h-9 border-dashed">
                <Plus className="h-4 w-4 mr-2" /> Ավելացնել Մակարդակ
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="m-0 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
          <Button variant="ghost" onClick={onClose} className="h-9 px-4 text-sm">Չեղարկել</Button>
          <Button onClick={handleSave} disabled={!isFormValid} className="h-9 px-8 font-medium text-sm">
            Ստեղծել
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
