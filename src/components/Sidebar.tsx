"use client";

import { Bookmark, Home, Trash2, Building2, Plus, ChevronsUpDown, Check, GraduationCap, ShieldAlert, Edit3 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Organization } from "@/lib/data";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  onGoHome: () => void;
  currentNodeId: string | null;
  activeProgramId: string | null;
  onSelectProgram: (id: string | null) => void;
  userRole: "learner" | "instructor";
  onRoleChange: (role: "learner" | "instructor") => void;
  isEditMode: boolean;
  onEditModeChange: (edit: boolean) => void;
}

export default function Sidebar({ 
  onGoHome, 
  currentNodeId,
  activeProgramId,
  onSelectProgram,
  userRole,
  onRoleChange,
  isEditMode,
  onEditModeChange
}: SidebarProps) {
  return (
    <div className="w-64 bg-accent/20 border-r flex flex-col z-10 shrink-0">
      <div className="p-4 px-6 border-b shrink-0 flex items-center bg-background/50 h-[60px]">
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center mr-3 shadow-sm shrink-0 cursor-pointer" onClick={() => onSelectProgram(null)}>
          <span className="text-primary-foreground font-bold text-lg">B</span>
        </div>
        <h1 className="font-bold text-lg tracking-tight cursor-pointer" onClick={() => onSelectProgram(null)}>Brainograph</h1>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">Պորտալ</h3>
            
            <Button 
              variant={activeProgramId === null ? "secondary" : "ghost"} 
              className={`w-full justify-start h-9 px-3 ${activeProgramId === null ? 'font-medium bg-secondary/80' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => onSelectProgram(null)}
            >
              <Building2 className="mr-3 h-4 w-4" />
              Բացահայտել Ծրագրեր
            </Button>
            
            <Button variant="ghost" className="w-full justify-start h-9 px-3 text-muted-foreground hover:text-foreground opacity-60">
              <Bookmark className="mr-3 h-4 w-4" />
              Իմ Ծրագրերը
            </Button>
          </div>

          {activeProgramId && (
            <div className="space-y-1">
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">Աշխատանքային գոտի</h3>
              
              <Button 
                variant={currentNodeId === null ? "secondary" : "ghost"} 
                className={`w-full justify-start h-9 px-3 ${currentNodeId === null ? 'font-medium bg-secondary/80' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={onGoHome}
              >
                <Home className="mr-3 h-4 w-4" />
                Գլխավոր Պանակ
              </Button>
            </div>
          )}
          
          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">Կառավարում</h3>
            <Button variant="ghost" className="w-full justify-start h-9 px-3 text-muted-foreground hover:text-foreground opacity-60">
              <Trash2 className="mr-3 h-4 w-4" />
              Աղբարկղ
            </Button>
            <Button variant="ghost" className="w-full justify-start h-9 px-3 text-muted-foreground hover:text-foreground opacity-60">
              <Building2 className="mr-3 h-4 w-4" />
              Կարգավորումներ
            </Button>
          </div>
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-border/50 bg-background/30 space-y-4 shrink-0">
        {/* Role Selector */}
        <div className="space-y-1.5">
          <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">Օգտատիրոջ Դերը</Label>
          <div className="grid grid-cols-2 gap-1 bg-muted p-0.5 rounded-lg border border-border/40">
            <button
              onClick={() => onRoleChange("learner")}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                userRole === "learner"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              Սովորող
            </button>
            <button
              onClick={() => onRoleChange("instructor")}
              className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                userRole === "instructor"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Ուսուցանող
            </button>
          </div>
        </div>

        {/* Edit Mode Toggle */}
        {userRole === "instructor" ? (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-accent/40 border border-border/50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="space-y-0.5">
              <Label htmlFor="edit-mode-switch" className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                <Edit3 className="h-3.5 w-3.5 text-primary" />
                Խմբագրել
              </Label>
              <span className="text-[10px] text-muted-foreground block">Միացնել փոփոխությունները</span>
            </div>
            <Switch
              id="edit-mode-switch"
              checked={isEditMode}
              onCheckedChange={onEditModeChange}
            />
          </div>
        ) : (
          <div className="p-2.5 rounded-lg bg-muted/40 border border-dashed border-border/40 text-center">
            <span className="text-[10px] text-muted-foreground">Դիտման ռեժիմ (Սովորող)</span>
          </div>
        )}
      </div>
    </div>
  );
}
