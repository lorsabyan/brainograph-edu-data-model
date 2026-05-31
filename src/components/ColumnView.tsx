"use client";

import { ContentNode, nodeTypes, initialTemplates } from "@/lib/data";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Folder as FolderIcon, FileText, Play, ChevronRight, Edit, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef, useEffect } from "react";

interface ColumnViewProps {
  virtualTree: ContentNode[];
  currentNodeId: string | null;
  onNodeClick: (id: string) => void;
  onPlayClick: (id: string) => void;
  onEditClick: (id: string) => void;
  onAddNode?: () => void;
}

export default function ColumnView({
  virtualTree,
  currentNodeId,
  onNodeClick,
  onPlayClick,
  onEditClick,
  onAddNode
}: ColumnViewProps) {
  
  // Build the path of selected nodes from root to currentNodeId
  const getPath = () => {
    const path: string[] = [];
    let curr = currentNodeId;
    while (curr) {
      path.unshift(curr);
      const f = virtualTree.find(x => x.id === curr);
      curr = f ? f.parentId : null;
    }
    return path;
  };

  const path = getPath();
  const columnsToRender = [null, ...path];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [colWidths, setColWidths] = React.useState<Record<number, number>>({});

  useEffect(() => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      setTimeout(() => {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      }, 50);
    }
  }, [path.length]);

  const handleWidthChange = (index: number, newWidth: number) => {
    setColWidths(prev => ({ ...prev, [index]: newWidth }));
  };

  return (
    <div className="flex-1 bg-accent/10 overflow-hidden relative">
      <ScrollArea className="h-full w-full" viewportRef={scrollRef}>
        <div className="flex h-full">
          {columnsToRender.map((colParentId, index) => {
            const nodesInCol = virtualTree.filter(f => f.parentId === colParentId);
            const selectedIdInNextCol = path[index];
            const width = colWidths[index] || 256;

            if (nodesInCol.length === 0) {
              return (
                <div key={`empty-${colParentId}`} style={{ width }} className="relative border-r bg-background/50 flex flex-col items-center justify-center p-4 text-muted-foreground shrink-0 h-full group/col">
                  <FolderIcon className="h-10 w-10 mb-2 opacity-20" />
                  <span className="text-sm">Դատարկ է</span>
                  <div 
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const startX = e.pageX;
                      const startWidth = width;
                      const onMove = (me: MouseEvent) => handleWidthChange(index, Math.max(150, Math.min(600, startWidth + (me.pageX - startX))));
                      const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
                      document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
                    }}
                    className="absolute top-0 right-[-4px] w-2 h-full cursor-col-resize z-10 hover:bg-primary/40 transition-colors"
                  />
                </div>
              );
            }

            return (
              <div key={`col-${colParentId}`} style={{ width }} className="relative border-r bg-background shrink-0 flex flex-col h-full animate-in slide-in-from-left-4 duration-300 group/col">
                <ScrollArea className="flex-1 min-h-0">
                  <div className="p-2 space-y-1">
                    
                    {nodesInCol.map(node => {
                      const isSelected = node.id === selectedIdInNextCol;
                      const nt = nodeTypes.find(t => t.id === node.nodeTypeId);
                      const isLesson = (() => {
                        if (!nt) return false;
                        const template = initialTemplates.find(t => t.id === node.templateId);
                        if (!template) return false;
                        const maxLevel = Math.max(...template.nodeTypes.map(t => t.level));
                        return nt.level === maxLevel;
                      })();
                      const Icon = FolderIcon;

                      return (
                        <div 
                          key={node.id}
                          onClick={() => {
                            if (node.metadata?.url) {
                              window.open(node.metadata.url, '_blank');
                            } else {
                              onNodeClick(node.id);
                            }
                          }}
                          className={`group flex items-center p-2 rounded-md cursor-pointer transition-colors ${isSelected ? 'bg-accent/80 font-medium' : 'hover:bg-accent/50'}`}
                        >
                          <div 
                            className={`h-5 w-5 mr-2 shrink-0 flex items-center justify-center rounded-sm overflow-hidden relative ${isSelected ? '' : 'opacity-80'}`}
                            style={{
                              backgroundColor: node.metadata?.imageUrl ? 'transparent' : (node.metadata?.color ? `${node.metadata.color}1a` : 'transparent'),
                              color: node.metadata?.color || (isSelected ? 'var(--blue-500)' : 'inherit')
                            }}
                          >
                            {node.metadata?.imageUrl ? (
                              /* eslint-disable-next-line @next/next/no-img-element */
                              <img src={node.metadata.imageUrl} alt={node.title} className="w-full h-full object-cover" />
                            ) : (
                              <Icon className="h-4 w-4 fill-current text-blue-500" />
                            )}
                            {node.type === 'shortcut' && (
                              <div className="absolute bottom-0 left-0 bg-background/80 rounded-tr-sm">
                                <Bookmark className="h-2 w-2 text-blue-500 fill-current" />
                              </div>
                            )}
                          </div>
                          
                          <span className="flex-1 text-sm truncate">{node.title}</span>
                          
                          <div className={`opacity-0 group-hover:opacity-100 transition-opacity flex items-center text-muted-foreground shrink-0`}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 mr-1"
                              onClick={(e) => { e.stopPropagation(); onEditClick(node.id); }}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            {node.metadata?.isPlayable && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-6 w-6"
                                onClick={(e) => { e.stopPropagation(); onPlayClick(node.id); }}
                              >
                                <Play className="h-3 w-3 fill-current" />
                              </Button>
                            )}
                          </div>
                          {!isSelected && !isLesson && <ChevronRight className="h-4 w-4 ml-1 opacity-50 shrink-0" />}
                        </div>
                      );
                    })}

                  </div>
                </ScrollArea>
                {/* Resizer Handle */}
                <div 
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const startX = e.pageX;
                    const startWidth = width;
                    const onMove = (me: MouseEvent) => handleWidthChange(index, Math.max(150, Math.min(800, startWidth + (me.pageX - startX))));
                    const onUp = () => { document.removeEventListener("mousemove", onMove); document.removeEventListener("mouseup", onUp); };
                    document.addEventListener("mousemove", onMove); document.addEventListener("mouseup", onUp);
                  }}
                  className="absolute top-0 right-[-4px] w-2 h-full cursor-col-resize z-10 hover:bg-primary/40 transition-colors"
                />
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
