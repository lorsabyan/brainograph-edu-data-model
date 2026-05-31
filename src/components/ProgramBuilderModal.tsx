"use client";

import React, { useState } from "react";
import { Program, Organization, HierarchyTemplate } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProgramBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (program: Program) => void;
  organizations: Organization[];
  templates: HierarchyTemplate[];
  editingProgram?: Program | null;
}

const PRESET_COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#6366f1", // Indigo
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#8b5cf6", // Violet
  "#ef4444", // Red
  "#14b8a6", // Teal
];

const AUDIENCES = [
  { id: "դպրոցական", label: "Դպրոցական" },
  { id: "դպրոցական հավելյալ", label: "Դպրոցական հավելյալ" },
  { id: "բուհական", label: "Բուհական" },
  { id: "մասնագիտական", label: "Մասնագիտական" }
];

export default function ProgramBuilderModal({
  open,
  onClose,
  onSave,
  organizations,
  templates,
  editingProgram
}: ProgramBuilderModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [orgId, setOrgId] = useState("");
  const [templateId, setTemplateId] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [curriculum, setCurriculum] = useState("");

  // Sync state if editingProgram or organizations/templates change
  React.useEffect(() => {
    if (editingProgram) {
      setTitle(editingProgram.title);
      setDescription(editingProgram.description);
      setOrgId(editingProgram.organizationId);
      setTemplateId(editingProgram.templateId);
      setSelectedColor(editingProgram.color || PRESET_COLORS[0]);
      setSelectedAudiences(editingProgram.targetAudience || []);
      setCurriculum(editingProgram.curriculum || "");
    } else {
      setTitle("");
      setDescription("");
      setOrgId(organizations[0]?.id || "");
      setTemplateId(templates[0]?.id || "");
      setSelectedColor(PRESET_COLORS[0]);
      setSelectedAudiences([]);
      setCurriculum("");
    }
  }, [editingProgram, open, organizations, templates]);

  const handleSave = () => {
    const newProgram: Program = {
      id: editingProgram ? editingProgram.id : `prog_${Date.now()}`,
      organizationId: orgId,
      templateId,
      title,
      description,
      color: selectedColor,
      targetAudience: selectedAudiences,
      curriculum: curriculum.trim() || undefined
    };
    onSave(newProgram);
    onClose();
  };

  const isFormValid = title.trim() !== "" && orgId !== "" && templateId !== "";

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[450px] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl bg-background border-border shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-border/40 shrink-0">
          <DialogTitle className="text-xl font-semibold">
            {editingProgram ? "Խմբագրել Ուսումնական Առարկան" : "Ստեղծել Ուսումնական Առարկա"}
          </DialogTitle>
          <DialogDescription>
            {editingProgram ? "Փոփոխեք առարկայի տվյալները ձեր հաստատության համար։" : "Ավելացրեք նոր ուսումնական առարկա ձեր հաստատության համար։"}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          <div className="space-y-2">
            <Label>Առարկայի Անվանում</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Օր.՝ Հայոց պատմություն..."
              className="h-10"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label>Նկարագրություն</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Օր.՝ Դպրոցական դասընթացների ամբողջական առարկայացանկ..."
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Կրթական Ծրագիր / Curriculum (Օպցիոնալ)</Label>
            <Input
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              placeholder="Օր.՝ Աշխարհացույց, Արարատյան բակալավրիատ..."
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label>Հաստատություն (Organization)</Label>
            <select
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Կառուցվածք (Template)</Label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              disabled={!!editingProgram}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name} ({tpl.isFreeform ? "Ազատ" : "Հիերարխիկ"})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Թիրախային Լսարան (Target Audience)</Label>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {AUDIENCES.map((aud) => {
                const checked = selectedAudiences.includes(aud.id);
                return (
                  <label
                    key={aud.id}
                    className="flex items-center space-x-2 text-sm select-none cursor-pointer border border-border/60 hover:border-border rounded-lg p-2 transition-colors bg-card hover:bg-accent/10"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {
                        if (checked) {
                          setSelectedAudiences(selectedAudiences.filter(id => id !== aud.id));
                        } else {
                          setSelectedAudiences([...selectedAudiences, aud.id]);
                        }
                      }}
                      className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                    />
                    <span className="text-foreground/90 font-medium">{aud.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Գույն (Theme Color)</Label>
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border transition-all cursor-pointer ${
                    selectedColor === color ? "scale-110 ring-2 ring-primary border-transparent" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
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
