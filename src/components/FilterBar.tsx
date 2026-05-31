"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, Bookmark, BookmarkPlus, ArrowDownUp, Settings2, Plus } from "lucide-react";
import { ContentNode, HierarchyTemplate } from "@/lib/data";
import { HierarchyView } from "@/hooks/useVirtualTree";

interface FilterBarProps {
  selectedFilters: Record<string, string[]>;
  setSelectedFilters: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  shortcuts: ContentNode[];
  onAddShortcut: () => void;
  onSelectShortcut: (s: ContentNode) => void;
  hierarchyView: HierarchyView;
  setHierarchyView: (v: HierarchyView) => void;
  
  templates: HierarchyTemplate[];
  activeTemplateId: string;
  setActiveTemplateId: (id: string) => void;
  onManageTemplates: () => void;
  allNodes: ContentNode[];
  isEditMode: boolean;
}

export default function FilterBar({
  selectedFilters,
  setSelectedFilters,
  shortcuts,
  onAddShortcut,
  onSelectShortcut,
  hierarchyView,
  setHierarchyView,
  templates,
  activeTemplateId,
  setActiveTemplateId,
  onManageTemplates,
  allNodes,
  isEditMode
}: FilterBarProps) {
  
  const clearFilters = () => {
    setSelectedFilters({});
  };

  const hasFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];
  const filterableTypes = activeTemplate.nodeTypes.filter(t => t.level <= 2 && !activeTemplate.isFreeform);

  const getOptionsForType = (typeId: string) => {
    const nodesOfType = allNodes.filter(n => n.nodeTypeId === typeId && n.templateId === activeTemplateId);
    return Array.from(new Set(nodesOfType.map(n => n.title)));
  };

  const typeLevel1 = activeTemplate.nodeTypes.find(t => t.level === 1);
  const typeLevel2 = activeTemplate.nodeTypes.find(t => t.level === 2);
  const canPivot = !activeTemplate.isFreeform && typeLevel1 && typeLevel2;

  return (
    <div className="flex items-center gap-3 p-3 px-6 bg-background border-b z-10 shrink-0 shadow-sm flex-wrap">
      

      {!activeTemplate.isFreeform && (
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2">
          <Filter className="h-4 w-4" />
          <span>Ֆիլտրեր:</span>
        </div>
      )}

      {filterableTypes.map(nodeType => {
        const options = getOptionsForType(nodeType.id);
        const selected = selectedFilters[nodeType.id] || [];
        
        return (
          <Popover key={nodeType.id}>
            <PopoverTrigger className={buttonVariants({ variant: selected.length > 0 ? "default" : "outline", size: "sm", className: "h-8 border-dashed" })}>
              {nodeType.name}
              {selected.length > 0 && (
                <span className="ml-2 rounded-sm bg-primary-foreground/20 px-1 text-xs">{selected.length}</span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" align="start">
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Ընտրեք {nodeType.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {options.length === 0 ? (
                    <div className="col-span-2 text-xs text-muted-foreground py-2">Այս մակարդակում դեռ նյութեր չկան</div>
                  ) : options.map(opt => (
                    <div key={opt} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`f-${nodeType.id}-${opt}`} 
                        checked={selected.includes(opt)}
                        onCheckedChange={(checked) => {
                          setSelectedFilters(prev => {
                            const current = prev[nodeType.id] || [];
                            const next = checked ? [...current, opt] : current.filter(x => x !== opt);
                            return { ...prev, [nodeType.id]: next };
                          });
                        }}
                      />
                      <label htmlFor={`f-${nodeType.id}-${opt}`} className="text-sm cursor-pointer truncate" title={opt}>{opt}</label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        );
      })}

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4 mr-1" /> Մաքրել
        </Button>
      )}

      <div className="ml-auto flex items-center gap-2">
        {canPivot && typeLevel1 && typeLevel2 && (
          <div className="flex items-center gap-2 mr-2">
            <span className="text-xs text-muted-foreground font-semibold flex items-center gap-1">
              <ArrowDownUp className="h-3.5 w-3.5 text-muted-foreground/80" />
              Խմբավորել՝
            </span>
            <div className="flex bg-muted p-0.5 rounded-lg border border-border/50 shadow-inner">
              <Button 
                variant={hierarchyView === 'default' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={`h-7 text-xs px-3 rounded-md transition-all ${hierarchyView === 'default' ? 'shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setHierarchyView('default')}
                title={`Ցուցադրել ըստ հիերարխիայի. ${typeLevel1.name} → ${typeLevel2.name}`}
              >
                {typeLevel1.name} → {typeLevel2.name}
              </Button>
              <Button 
                variant={hierarchyView === 'inverted' ? 'secondary' : 'ghost'} 
                size="sm" 
                className={`h-7 text-xs px-3 rounded-md transition-all ${hierarchyView === 'inverted' ? 'shadow-sm font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setHierarchyView('inverted')}
                title={`Փոխել խմբավորումը. ${typeLevel2.name} → ${typeLevel1.name}`}
              >
                {typeLevel2.name} → {typeLevel1.name}
              </Button>
            </div>
          </div>
        )}

        <Popover>
          <PopoverTrigger className={buttonVariants({ variant: "outline", size: "sm", className: "h-8" })}>
            <Bookmark className="h-4 w-4 mr-2 text-blue-500" />
            Իմ Դյուրանցումները
            {shortcuts.length > 0 && (
              <span className="ml-2 rounded-sm bg-muted px-1 text-xs">{shortcuts.length}</span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-72 p-2" align="end">
            <h4 className="font-medium text-sm mb-2 px-2">Պահպանված Դյուրանցումներ</h4>
            {shortcuts.length === 0 ? (
              <div className="px-2 py-4 text-xs text-muted-foreground text-center bg-accent/30 rounded-md border border-dashed">
                Դեռ չկան պահպանված դյուրանցումներ
              </div>
            ) : (
              <div className="space-y-1">
                {shortcuts.map(shortcut => (
                  <div key={shortcut.id} className="group flex items-center">
                    <Button 
                      variant="ghost" 
                      className="flex-1 justify-start font-normal truncate h-8 px-2"
                      onClick={() => onSelectShortcut(shortcut)}
                      title={shortcut.title}
                    >
                      <Bookmark className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
                      <span className="truncate">{shortcut.title}</span>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </PopoverContent>
        </Popover>

        {isEditMode && (
          <Button variant="secondary" size="sm" className="h-8" onClick={onAddShortcut}>
            <BookmarkPlus className="h-4 w-4 mr-2" />
            Ստեղծել
          </Button>
        )}
      </div>

    </div>
  );
}
