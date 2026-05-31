"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import FilterBar from "@/components/FilterBar";
import FolderView from "@/components/FolderView";
import ColumnView from "@/components/ColumnView";
import SlideshowModal from "@/components/SlideshowModal";
import FolderModal from "@/components/FolderModal";
import TemplateBuilderModal from "@/components/TemplateBuilderModal";
import OrganizationBuilderModal from "@/components/OrganizationBuilderModal";
import PortalView from "@/components/PortalView";
import { initialNodes, ContentNode, initialTemplates, HierarchyTemplate, initialOrganizations, Organization, initialPrograms, Program } from "@/lib/data";
import { useVirtualTree, HierarchyView } from "@/hooks/useVirtualTree";

export type ViewMode = "grid" | "list" | "column";

function WorkspacePortal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Core data states
  const [allNodes, setAllNodes] = useState<ContentNode[]>(initialNodes);
  const [templates, setTemplates] = useState<HierarchyTemplate[]>(initialTemplates);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  
  // Derived query param states
  const activeProgramId = searchParams.get("program") || null;
  const currentNodeId = searchParams.get("node") || null;
  const viewMode = (searchParams.get("view") as ViewMode) || "grid";
  const hierarchyView = (searchParams.get("hierarchy") as HierarchyView) || "default";

  // Local interactive states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [playingNodeId, setPlayingNodeId] = useState<string | null>(null);
  
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [isAddingShortcut, setIsAddingShortcut] = useState(false);
  const [isBuildingTemplate, setIsBuildingTemplate] = useState(false);
  const [isBuildingOrg, setIsBuildingOrg] = useState(false);

  const activeProgram = programs.find(p => p.id === activeProgramId) || null;
  const [activeTemplateId, setActiveTemplateId] = useState<string>(initialTemplates[0].id);
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  // Helper to update URL search parameters
  const updateQueryParams = (
    paramsToUpdate: Record<string, string | null>,
    options?: { replace?: boolean }
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const queryString = params.toString();
    const url = pathname + (queryString ? "?" + queryString : "");
    if (options?.replace) {
      router.replace(url, { scroll: false });
    } else {
      router.push(url, { scroll: false });
    }
  };

  // Sync local search query state when URL search param change (e.g. Back/Forward button)
  const urlSearch = searchParams.get("q") || "";
  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  // Debounce search query updates to URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchQuery) {
        params.set("q", searchQuery);
      } else {
        params.delete("q");
      }
      router.replace(pathname + "?" + params.toString(), { scroll: false });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, pathname, router, searchParams]);

  // Sync active template ID when active program changes
  useEffect(() => {
    if (activeProgramId) {
      const p = programs.find(x => x.id === activeProgramId);
      if (p) {
        setActiveTemplateId(p.templateId);
      }
    } else {
      setActiveTemplateId(initialTemplates[0].id);
    }
  }, [activeProgramId, programs]);

  // Pass nodes belonging to the active template AND active organization
  const currentTemplateNodes = useMemo(() => {
    return allNodes.filter(n => n.programId === activeProgramId);
  }, [allNodes, activeProgramId]);

  // Derive the tree structure based on current hierarchy view
  const virtualTree = useVirtualTree(currentTemplateNodes, hierarchyView, activeTemplate);

  const handleSelectShortcut = (s: ContentNode) => {
    if (s.targetNodeId !== undefined) {
      updateQueryParams({ node: s.targetNodeId });
    }
  };

  const handleGoHome = () => {
    updateQueryParams({
      node: null,
      q: null,
    });
    setSelectedFilters({});
    setSearchQuery("");
  };

  const handleSelectProgram = (programId: string | null) => {
    updateQueryParams({
      program: programId,
      node: null,
      q: null,
    });
    setSelectedFilters({});
    setSearchQuery("");
  };

  // Filter logic
  const filteredData = useMemo(() => {
    let nodes = virtualTree;

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      nodes = nodes.filter(n => n.title.toLowerCase().includes(q));
    }

    // Generic Filtering based on selectedFilters
    const activeFilterTypes = Object.keys(selectedFilters).filter(typeId => selectedFilters[typeId].length > 0);
    
    if (activeFilterTypes.length > 0 && !activeTemplate.isFreeform) {
      nodes = nodes.filter(node => {
        let curr: ContentNode | undefined = node;
        let matchesAll = true;

        for (const typeId of activeFilterTypes) {
          const allowedTitles = selectedFilters[typeId];
          let ancestorMatched = false;
          let checkCurr: ContentNode | undefined = curr;
          
          while (checkCurr) {
            if (checkCurr.nodeTypeId === typeId) {
              if (allowedTitles.includes(checkCurr.title)) {
                ancestorMatched = true;
              }
              break;
            }
            checkCurr = virtualTree.find(x => x.id === checkCurr?.parentId);
          }
          
          if (!ancestorMatched) {
            matchesAll = false;
            break;
          }
        }
        return matchesAll;
      });
    }

    // For FolderView, we need only current level items (unless searching)
    let currentNodes = nodes.filter(n => n.parentId === currentNodeId);

    if (searchQuery.trim()) {
      currentNodes = nodes;
    }

    return { 
      globalNodes: nodes, 
      currentNodes 
    };
  }, [virtualTree, currentNodeId, selectedFilters, searchQuery, activeTemplate.isFreeform]);

  const handleNodeClick = (id: string) => {
    const clickedNode = virtualTree.find(n => n.id === id);
    if (clickedNode && clickedNode.type === 'shortcut') {
      handleSelectShortcut(clickedNode);
    } else {
      updateQueryParams({ node: id });
    }
  };

  const handleSaveNode = (
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
  ) => {
    if (id === null) {
      // Create new node or shortcut
      const newItem: ContentNode = {
        id: (type === 'shortcut' ? 'shortcut_' : 'new_node_') + Date.now(),
        programId: activeProgramId || '',
        organizationId: activeProgram?.organizationId || '',
        templateId: activeTemplateId,
        title,
        nodeTypeId,
        parentId,
        sortOrder: 999,
        metadata: {
          color,
          imageUrl,
          isPlayable,
          url
        },
        type,
        targetNodeId
      };
      setAllNodes(prev => [...prev, newItem]);
    } else {
      // Update existing node
      setAllNodes(prev => {
        return prev.map(n => 
          n.id === id 
            ? { ...n, title, parentId, nodeTypeId, metadata: { ...n.metadata, color, imageUrl, isPlayable, url }, type, targetNodeId } 
            : n
        );
      });
    }
  };

  const editingNode = editingNodeId ? allNodes.find(n => n.id === editingNodeId) || null : null;
  const parentNodeForModal = isAddingNode || isAddingShortcut
    ? (currentNodeId ? allNodes.find(n => n.id === currentNodeId) || null : null)
    : (editingNode?.parentId ? allNodes.find(n => n.id === editingNode?.parentId) || null : null);

  const nodeModalOpen = !!editingNodeId || isAddingNode || isAddingShortcut;
  const handleCloseModal = () => {
    setEditingNodeId(null);
    setIsAddingNode(false);
    setIsAddingShortcut(false);
  };

  const handleSaveTemplate = (newTemplate: HierarchyTemplate) => {
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplateId(newTemplate.id);
    updateQueryParams({
      node: null,
      q: null,
      hierarchy: "default",
    });
    setSelectedFilters({});
  };

  const handleSaveOrg = (newOrg: Organization) => {
    setOrganizations(prev => [...prev, newOrg]);
    handleGoHome();
  };

  const shortcutsOnly = virtualTree.filter(n => n.type === 'shortcut');

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <Sidebar 
        onGoHome={handleGoHome}
        currentNodeId={currentNodeId}
        activeProgramId={activeProgramId}
        onSelectProgram={handleSelectProgram}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        {activeProgramId === null ? (
          <PortalView 
            programs={programs} 
            organizations={organizations} 
            onSelectProgram={handleSelectProgram} 
          />
        ) : (
          <>
            <Topbar 
              currentNodeId={currentNodeId}
              setCurrentNodeId={(id) => updateQueryParams({ node: id })}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              viewMode={viewMode}
              setViewMode={(mode) => updateQueryParams({ view: mode }, { replace: true })}
              onAddNode={() => setIsAddingNode(true)}
              virtualTree={virtualTree}
            />
            
            <FilterBar 
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
              shortcuts={shortcutsOnly}
              onAddShortcut={() => setIsAddingShortcut(true)}
              onSelectShortcut={handleSelectShortcut}
              hierarchyView={hierarchyView}
              setHierarchyView={(v) => {
                updateQueryParams({ hierarchy: v, node: null }, { replace: true });
              }}
              templates={templates}
              activeTemplateId={activeTemplateId}
              setActiveTemplateId={setActiveTemplateId}
              onManageTemplates={() => setIsBuildingTemplate(true)}
              allNodes={currentTemplateNodes}
            />
            
            {viewMode === "column" && !searchQuery ? (
              <ColumnView 
                virtualTree={filteredData.globalNodes}
                currentNodeId={currentNodeId}
                onNodeClick={handleNodeClick}
                onPlayClick={setPlayingNodeId}
                onEditClick={setEditingNodeId}
                onAddNode={() => setIsAddingNode(true)}
              />
            ) : (
              <FolderView 
                nodes={filteredData.currentNodes}
                onNodeClick={handleNodeClick}
                onPlayClick={setPlayingNodeId}
                onEditClick={setEditingNodeId}
                viewMode={viewMode === "column" ? "grid" : viewMode}
              />
            )}
          </>
        )}
      </div>

      <SlideshowModal 
        folderId={playingNodeId}
        onClose={() => setPlayingNodeId(null)}
      />

      <FolderModal 
        open={nodeModalOpen}
        onClose={handleCloseModal}
        node={editingNode}
        parentNode={parentNodeForModal}
        onSave={handleSaveNode}
        allNodes={currentTemplateNodes}
        isShortcutMode={isAddingShortcut || editingNode?.type === 'shortcut'}
        currentActiveNodeId={currentNodeId}
        activeTemplate={activeTemplate}
      />

      <TemplateBuilderModal 
        open={isBuildingTemplate}
        onClose={() => setIsBuildingTemplate(false)}
        onSave={handleSaveTemplate}
      />

      <OrganizationBuilderModal 
        open={isBuildingOrg}
        onClose={() => setIsBuildingOrg(false)}
        onSave={handleSaveOrg}
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground animate-pulse">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-xl">B</span>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Բեռնվում է...</span>
        </div>
      </div>
    }>
      <WorkspacePortal />
    </Suspense>
  );
}
