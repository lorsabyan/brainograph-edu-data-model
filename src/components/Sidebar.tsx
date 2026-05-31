"use client";

import { Bookmark, Home, Trash2, Building2, Plus, ChevronsUpDown, Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Organization } from "@/lib/data";
import { useState } from "react";

interface SidebarProps {
  onGoHome: () => void;
  currentNodeId: string | null;
  activeProgramId: string | null;
  onSelectProgram: (id: string | null) => void;
}

export default function Sidebar({ 
  onGoHome, 
  currentNodeId,
  activeProgramId,
  onSelectProgram
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
      
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center px-2 py-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-muted border border-border/50 flex items-center justify-center mr-3 shrink-0 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aghasi" alt="User" className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 overflow-hidden">
            <h2 className="text-sm font-medium truncate leading-tight">Օգտատեր</h2>
            <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">user@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
