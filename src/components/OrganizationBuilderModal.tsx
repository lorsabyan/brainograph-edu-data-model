import React, { useState, useEffect } from "react";
import { Organization } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrganizationBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (org: Organization) => void;
  editingOrg?: Organization | null;
}

export default function OrganizationBuilderModal({ open, onClose, onSave, editingOrg }: OrganizationBuilderModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editingOrg) {
      setName(editingOrg.name);
    } else {
      setName("");
    }
  }, [editingOrg, open]);

  const handleSave = () => {
    const newOrg: Organization = {
      id: editingOrg ? editingOrg.id : `org_${Date.now()}`,
      name
    };
    onSave(newOrg);
    onClose();
    setName("");
  };

  const isFormValid = name.trim() !== '';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[400px] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl bg-background border-border shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-border/40 shrink-0">
          <DialogTitle className="text-xl font-semibold">
            {editingOrg ? "Խմբագրել Հաստատությունը" : "Ստեղծել Հաստատություն"}
          </DialogTitle>
          <DialogDescription>
            {editingOrg ? "Փոփոխեք հաստատության անվանումը։" : "Ավելացրեք նոր կազմակերպություն, համալսարան կամ առարկա։"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="p-6 space-y-4 flex-1">
          <div className="space-y-2">
            <Label>Անվանում</Label>
            <Input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Օր.՝ Այբ Հիմնադրամ..." 
              className="h-10" 
              autoFocus
            />
          </div>
        </div>

        <DialogFooter className="m-0 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
          <Button variant="ghost" onClick={onClose} className="h-9 px-4 text-sm">Չեղարկել</Button>
          <Button onClick={handleSave} disabled={!isFormValid} className="h-9 px-8 font-medium text-sm">
            {editingOrg ? "Պահպանել" : "Ստեղծել"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
