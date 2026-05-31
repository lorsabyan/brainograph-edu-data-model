"use client";

import { ChevronRight, Search, Plus, LayoutGrid, List, Columns } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ContentNode } from "@/lib/data";

interface TopbarProps {
  currentNodeId: string | null;
  setCurrentNodeId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  viewMode: "grid" | "list" | "column";
  setViewMode: (mode: "grid" | "list" | "column") => void;
  onAddNode: () => void;
  virtualTree: ContentNode[]; // Needs to accept the virtual tree to calculate breadcrumbs properly
}

export default function Topbar({
  currentNodeId,
  setCurrentNodeId,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  onAddNode,
  virtualTree
}: TopbarProps) {
  
  // Breadcrumb calculation using the virtual tree
  const breadcrumbs: { id: string | null, name: string }[] = [];
  let curr = currentNodeId;
  while (curr) {
    const node = virtualTree.find(x => x.id === curr);
    if (node) {
      breadcrumbs.unshift({ id: node.id, name: node.title });
      curr = node.parentId;
    } else {
      break;
    }
  }

  return (
    <div className="flex items-center justify-between p-4 px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 shrink-0 sticky top-0">
      <div className="flex items-center text-sm">
        <Button 
          variant="link" 
          className="p-0 h-auto text-muted-foreground hover:text-foreground font-medium"
          onClick={() => setCurrentNodeId(null)}
        >
          Գլխավոր
        </Button>
        {breadcrumbs.map((crumb, idx) => (
          <div key={crumb.id || idx} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50 shrink-0" />
            <Button 
              variant="link" 
              className={`p-0 h-auto font-medium ${idx === breadcrumbs.length - 1 ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setCurrentNodeId(crumb.id)}
            >
              <span className="truncate max-w-[120px] md:max-w-[200px]">{crumb.name}</span>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-64 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Որոնել նյութեր..." 
            className="pl-9 bg-accent/50 border-none focus-visible:ring-1 transition-all rounded-full h-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center bg-accent/50 rounded-full p-1 border border-border/50">
          <Button 
            variant={viewMode === "grid" ? "secondary" : "ghost"} 
            size="icon" 
            className={`h-7 w-7 rounded-full ${viewMode === "grid" ? 'shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setViewMode("grid")}
            title="Աղյուսակային տեսք"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "list" ? "secondary" : "ghost"} 
            size="icon" 
            className={`h-7 w-7 rounded-full ${viewMode === "list" ? 'shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setViewMode("list")}
            title="Ցանկի տեսք"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === "column" ? "secondary" : "ghost"} 
            size="icon" 
            className={`h-7 w-7 rounded-full ${viewMode === "column" ? 'shadow-sm' : 'text-muted-foreground'}`}
            onClick={() => setViewMode("column")}
            title="Սյունակային տեսք"
          >
            <Columns className="h-4 w-4" />
          </Button>
        </div>

        <Button onClick={onAddNode} size="sm" className="rounded-full px-4 h-9 shadow-sm">
          <Plus className="h-4 w-4 mr-1.5" />
          Նոր
        </Button>
      </div>
    </div>
  );
}
