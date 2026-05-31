"use client";

import { ContentNode, nodeTypes, initialTemplates } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder as FolderIcon, FileText, Play, Edit, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FolderViewProps {
  nodes: ContentNode[];
  onNodeClick: (id: string) => void;
  onPlayClick: (id: string) => void;
  onEditClick: (id: string) => void;
  viewMode: "grid" | "list";
}

export default function FolderView({
  nodes,
  onNodeClick,
  onPlayClick,
  onEditClick,
  viewMode,
}: FolderViewProps) {
  
  if (nodes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-accent/20 animate-in fade-in duration-500">
        <FolderIcon className="h-16 w-16 mb-4 opacity-20" />
        <p className="text-lg">Այս գրացուցակում նյութեր չկան</p>
      </div>
    );
  }

  const isGrid = viewMode === "grid";
  const containerClass = isGrid 
    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" 
    : "flex flex-col gap-3";

  return (
    <ScrollArea className="flex-1 bg-accent/10">
      <div className="p-6">
        <div className={containerClass}>
          
          {nodes.map(node => {
            const nt = nodeTypes.find(t => t.id === node.nodeTypeId);
            // Check if this node is at the lowest/leaf level of its template
            const isLesson = (() => {
              if (!nt) return false;
              const template = initialTemplates.find(t => t.id === node.templateId);
              if (!template) return false;
              const maxLevel = Math.max(...template.nodeTypes.map(t => t.level));
              return nt.level === maxLevel;
            })();
            const Icon = FolderIcon;
            
            return (
              <Card 
                key={node.id}
                className={`group cursor-pointer hover:shadow-md transition-all hover:border-primary/50 bg-background overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex ${isGrid ? 'flex-col' : 'flex-row items-center'}`}
                onDoubleClick={() => {
                  if (node.metadata?.url) {
                    window.open(node.metadata.url, '_blank');
                  } else {
                    onNodeClick(node.id);
                  }
                }}
              >
                <CardContent className={`p-4 flex-1 flex ${isGrid ? 'flex-col items-center justify-center text-center gap-2' : 'flex-row items-center gap-4'} relative`}>
                  <div 
                    className={`relative rounded-xl group-hover:scale-110 transition-transform ${isGrid ? 'w-16 h-16' : 'w-12 h-12 shrink-0'} flex items-center justify-center overflow-hidden`}
                    style={{
                      backgroundColor: node.metadata?.imageUrl ? 'transparent' : (node.metadata?.color ? `${node.metadata.color}1a` : 'rgba(59, 130, 246, 0.1)'),
                      color: node.metadata?.color || '#3b82f6',
                    }}
                  >
                    {node.metadata?.imageUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={node.metadata.imageUrl} alt={node.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <Icon className={`${isGrid ? 'h-10 w-10' : 'h-6 w-6'} fill-current opacity-80`} />
                    )}
                    {node.type === 'shortcut' && (
                      <div className="absolute bottom-0 left-0 bg-background/80 backdrop-blur-sm rounded-tr-lg p-0.5 shadow-sm border-t border-r border-border">
                        <Bookmark className="h-3 w-3 text-blue-500 fill-current" />
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex flex-col ${isGrid ? 'items-center' : 'items-start flex-1'}`}>
                    <h3 className={`font-medium line-clamp-2 ${isGrid ? 'text-sm mb-1' : 'text-base'}`}>{node.title}</h3>
                    {nt && (
                      <span className="text-[10px] bg-accent text-muted-foreground px-1.5 py-0.5 rounded-full border mt-1">
                        {nt.name}
                      </span>
                    )}
                  </div>

                  <div className={isGrid ? "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center bg-background/80 backdrop-blur-sm rounded-full shadow-sm p-0.5" : "opacity-0 group-hover:opacity-100 transition-opacity ml-auto flex items-center shrink-0"}>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(node.id);
                      }}
                      title="Խմբագրել"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {node.metadata?.isPlayable && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayClick(node.id);
                        }}
                        title="Խաղարկել սահիկաշարը (Play)"
                      >
                        <Play className="h-4 w-4 fill-current" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}
