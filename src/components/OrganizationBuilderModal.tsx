import React, { useState } from "react";
import { Organization } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OrganizationBuilderModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (org: Organization) => void;
}

export default function OrganizationBuilderModal({ open, onClose, onSave }: OrganizationBuilderModalProps) {
  const [name, setName] = useState("");

  const handleSave = () => {
    const newOrg: Organization = {
      id: `org_${Date.now()}`,
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
          <DialogTitle className="text-xl font-semibold">Ստեղծել Հաստատություն</DialogTitle>
          <DialogDescription>
            Ավելացրեք նոր կազմակերպություն, համալսարան կամ ծրագիր։
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
            Ստեղծել
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
