"use client";

import React, { useState, useEffect } from "react";
import { ContentNode, HierarchyTemplate } from "@/lib/data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  GraduationCap, 
  Layers, 
  FileText, 
  ChevronDown, 
  Folder as FolderIcon, 
  Check, 
  Play,
  Link as LinkIcon,
  Building,
  Briefcase,
  Users,
  Target,
  FileVideo,
  File
} from "lucide-react";

const COLORS = [
  { name: 'Կապույտ', value: '#3b82f6' },
  { name: 'Կանաչ', value: '#22c55e' },
  { name: 'Նարնջագույն', value: '#f97316' },
  { name: 'Դեղին', value: '#eab308' },
  { name: 'Կարմիր', value: '#ef4444' },
  { name: 'Մանուշակագույն', value: '#8b5cf6' },
  { name: 'Վարդագույն', value: '#ec4899' },
  { name: 'Մոխրագույն', value: '#64748b' },
];

const getIcon = (iconName?: string) => {
  switch (iconName) {
    case 'BookOpen': return <BookOpen className="h-4 w-4" />;
    case 'GraduationCap': return <GraduationCap className="h-4 w-4" />;
    case 'Layers': return <Layers className="h-4 w-4" />;
    case 'FileText': return <FileText className="h-4 w-4" />;
    case 'Building': return <Building className="h-4 w-4" />;
    case 'Briefcase': return <Briefcase className="h-4 w-4" />;
    case 'Users': return <Users className="h-4 w-4" />;
    case 'Target': return <Target className="h-4 w-4" />;
    case 'FileVideo': return <FileVideo className="h-4 w-4" />;
    case 'File': return <File className="h-4 w-4" />;
    case 'Folder':
    default: return <FolderIcon className="h-4 w-4" />;
  }
};

interface FolderModalProps {
  open: boolean;
  onClose: () => void;
  node: ContentNode | null;
  parentNode: ContentNode | null;
  onSave: (
    id: string | null,
    parentId: string | null,
    title: string, 
    nodeTypeId: string,
    color: string | undefined, 
    imageUrl: string | undefined, 
    isPlayable: boolean,
    url: string | undefined,
    type: 'node' | 'shortcut',
    targetNodeId?: string | null
  ) => void;
  allNodes: ContentNode[];
  isShortcutMode?: boolean;
  currentActiveNodeId?: string | null;
  activeTemplate: HierarchyTemplate;
}

export default function FolderModal({ 
  open, 
  onClose, 
  node, 
  parentNode, 
  onSave,
  allNodes,
  isShortcutMode = false,
  currentActiveNodeId = null,
  activeTemplate
}: FolderModalProps) {
  const [title, setTitle] = useState("");
  const [nodeTypeId, setNodeTypeId] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isPlayable, setIsPlayable] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);

  const [parentPopoverOpen, setParentPopoverOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (node) {
        setTitle(node.title);
        setNodeTypeId(node.nodeTypeId);
        setColor(node.metadata?.color || "");
        setImageUrl(node.metadata?.imageUrl || "");
        setUrl(node.metadata?.url || "");
        setIsPlayable(node.metadata?.isPlayable || false);
        setParentId(node.parentId);
      } else {
        setTitle("");
        setColor("");
        setImageUrl("");
        setUrl("");
        setIsPlayable(false);
        setParentId(parentNode ? parentNode.id : null);
        
        if (parentNode) {
          if (activeTemplate.isFreeform) {
             setNodeTypeId(activeTemplate.nodeTypes[0].id); // default to Folder
          } else {
            const parentType = activeTemplate.nodeTypes.find(t => t.id === parentNode.nodeTypeId);
            if (parentType) {
              const nextType = activeTemplate.nodeTypes.find(t => t.level === parentType.level + 1);
              if (nextType) {
                setNodeTypeId(nextType.id);
              }
            }
          }
        } else {
          setNodeTypeId(activeTemplate.nodeTypes[0].id);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, node, parentNode, isShortcutMode, activeTemplate]);

  const selectedNodeType = activeTemplate.nodeTypes.find(t => t.id === nodeTypeId);
  
  // A heuristic to show URL field if it's the leaf node (highest level) or if freeform file
  const isLeafLevel = selectedNodeType && !activeTemplate.isFreeform && selectedNodeType.level === Math.max(...activeTemplate.nodeTypes.map(t => t.level));
  const isFreeformFile = activeTemplate.isFreeform && selectedNodeType && !selectedNodeType.isNestable;
  const isLesson = isLeafLevel || isFreeformFile;

  let parentOptions: ContentNode[] = [];
  let showRootOption = false;

  if (activeTemplate.isFreeform) {
    showRootOption = true;
    // In freeform, folders can go anywhere. Get all nestable nodes as options.
    const nestableTypes = activeTemplate.nodeTypes.filter(t => t.isNestable).map(t => t.id);
    parentOptions = allNodes.filter(n => n.id !== node?.id && n.type !== 'shortcut' && nestableTypes.includes(n.nodeTypeId));
  } else if (selectedNodeType) {
    if (selectedNodeType.level === 1) {
      showRootOption = true;
    } else {
      const parentLevel = selectedNodeType.level - 1;
      const validParentType = activeTemplate.nodeTypes.find(t => t.level === parentLevel);
      if (validParentType) {
        parentOptions = allNodes.filter(
          f => f.id !== node?.id && f.type !== 'shortcut' && f.nodeTypeId === validParentType.id
        );
      }
    }
  }

  const handleTypeSelect = (ntId: string) => {
    setNodeTypeId(ntId);
    if (activeTemplate.isFreeform) {
       // Freeform logic: changing type doesn't invalidate parent since everything can be in any nestable parent.
       return;
    }
    const newSelectedNodeType = activeTemplate.nodeTypes.find(t => t.id === ntId);
    if (newSelectedNodeType) {
      if (newSelectedNodeType.level === 1 && parentId !== null) {
        setParentId(null);
      } else if (newSelectedNodeType.level > 1 && parentId !== null) {
        const currentParentNode = allNodes.find(n => n.id === parentId);
        if (currentParentNode) {
          const pType = activeTemplate.nodeTypes.find(t => t.id === currentParentNode.nodeTypeId);
          if (!pType || pType.level !== newSelectedNodeType.level - 1) {
            setParentId(null);
          }
        } else {
          setParentId(null);
        }
      }
    }
  };

  const handleSave = () => {
    onSave(
      node ? node.id : null,
      parentId,
      title,
      nodeTypeId,
      color || undefined,
      imageUrl || undefined,
      isPlayable,
      url || undefined,
      isShortcutMode ? 'shortcut' : 'node',
      isShortcutMode ? (node?.targetNodeId ?? currentActiveNodeId) : undefined
    );
    onClose();
  };

  const currentParentNode = parentId ? allNodes.find(n => n.id === parentId) : null;
  const currentParentTitle = currentParentNode ? currentParentNode.title : (showRootOption ? "(Գլխավոր)" : "Ընտրեք Վայրը");

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[540px] max-h-[90dvh] flex flex-col p-0 gap-0 overflow-hidden rounded-2xl bg-background border-border shadow-xl">
        <DialogHeader className="px-6 py-4 border-b border-border/40 shrink-0">
          <DialogTitle className="text-xl font-semibold">
            {node 
              ? (isShortcutMode ? "Խմբագրել Դյուրանցումը" : "Խմբագրել") 
              : (isShortcutMode ? "Նոր Դյուրանցում" : "Ստեղծել Նոր Նյութ")}
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* TYPE TOGGLE */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Տիպը</Label>
            <div className="flex bg-muted/50 p-1 rounded-xl overflow-x-auto no-scrollbar">
              {activeTemplate.nodeTypes.map(nt => (
                <button
                  key={nt.id}
                  type="button"
                  disabled={isShortcutMode}
                  onClick={() => handleTypeSelect(nt.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-medium transition-all rounded-lg whitespace-nowrap min-w-max ${
                    nodeTypeId === nt.id 
                      ? 'bg-background text-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  } ${isShortcutMode ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {getIcon(nt.icon)}
                  <span>{nt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* PARENT SELECTOR */}
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Գտնվելու Վայրը</Label>
            <Popover open={parentPopoverOpen} onOpenChange={setParentPopoverOpen}>
              <PopoverTrigger 
                aria-expanded={parentPopoverOpen}
                disabled={showRootOption && parentOptions.length === 0}
                className="flex items-center w-full justify-between h-10 rounded-md px-3 bg-transparent border border-input font-normal hover:bg-muted/50 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FolderIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className={`truncate text-sm ${!currentParentNode && !showRootOption ? 'text-muted-foreground' : ''}`}>
                    {currentParentTitle}
                  </span>
                </div>
                {!showRootOption && <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />}
              </PopoverTrigger>
              {(showRootOption || parentOptions.length > 0) && (
                <PopoverContent className="w-[calc(100vw-3rem)] sm:w-[490px] p-1 rounded-xl shadow-lg border-border" align="start">
                  <ScrollArea className="h-48">
                    {showRootOption && (
                      <div 
                        onClick={() => {
                          setParentId(null);
                          setParentPopoverOpen(false);
                        }}
                        className={`flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                          parentId === null ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'
                        }`}
                      >
                        <FolderIcon className={`h-4 w-4 mr-2 shrink-0 ${parentId === null ? 'opacity-90' : 'opacity-50 text-muted-foreground'}`} />
                        <span className="truncate">(Գլխավոր)</span>
                        {parentId === null && <Check className="h-4 w-4 ml-auto" />}
                      </div>
                    )}
                    {parentOptions.map(f => (
                      <div 
                        key={f.id}
                        onClick={() => {
                          setParentId(f.id);
                          setParentPopoverOpen(false);
                        }}
                        className={`flex items-center px-2 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                          parentId === f.id ? 'bg-primary text-primary-foreground font-medium' : 'hover:bg-muted'
                        }`}
                      >
                        <FolderIcon className={`h-4 w-4 mr-2 shrink-0 ${parentId === f.id ? 'opacity-90' : 'opacity-50 text-muted-foreground'}`} />
                        <span className="truncate">{f.title}</span>
                        {parentId === f.id && <Check className="h-4 w-4 ml-auto" />}
                      </div>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              )}
            </Popover>
          </div>

          {/* TITLE */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Անվանում</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Մուտքագրեք անվանումը..." 
              autoFocus
              className="text-base h-10 rounded-md transition-all border-input focus-visible:ring-1 bg-transparent"
            />
          </div>

          {!isLesson && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Գույն</Label>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={() => setColor("")}
                    className={`h-7 w-7 rounded-full border flex items-center justify-center transition-all ${
                      color === "" ? 'border-primary ring-1 ring-primary ring-offset-1 ring-offset-background' : 'border-border hover:bg-muted'
                    }`}
                    title="Լռելյայն"
                  >
                    {color === "" && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                  {COLORS.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`w-7 h-7 rounded-full transition-all border border-black/10 dark:border-white/10 ${
                        color === c.value 
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' 
                          : 'hover:scale-105 shadow-sm'
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="imageUrl" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Շապիկի Նկար (Image URL)</Label>
                <Input 
                  id="imageUrl" 
                  value={imageUrl} 
                  onChange={(e) => setImageUrl(e.target.value)} 
                  placeholder="https://..." 
                  className="h-10 text-sm rounded-md border-input bg-transparent"
                />
              </div>
            </div>
          )}

          {isLesson && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="url" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Արտաքին Հղում (URL)</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="url" 
                  value={url} 
                  onChange={(e) => setUrl(e.target.value)} 
                  placeholder="https://..." 
                  className="pl-9 h-10 rounded-md border-input bg-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-muted/20">
            <div className="space-y-0.5">
              <Label htmlFor="isPlayable" className="text-sm font-medium cursor-pointer">
                Սահիկաշարային Դիտում
              </Label>
              <p className="text-xs text-muted-foreground">Միացրեք, եթե առկա է ներկայացում։</p>
            </div>
            <Switch 
              id="isPlayable" 
              checked={isPlayable} 
              onCheckedChange={setIsPlayable} 
            />
          </div>

        </div>

        <DialogFooter className="m-0 px-6 py-4 border-t border-border/40 bg-muted/10 shrink-0">
          <Button variant="ghost" onClick={onClose} className="rounded-md h-9 px-4 text-sm">Չեղարկել</Button>
          <Button onClick={handleSave} disabled={!title.trim() || (!showRootOption && !parentId)} className="rounded-md h-9 px-8 font-medium text-sm">
            Պահպանել
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
