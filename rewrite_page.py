import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# Imports
content = content.replace(
    'import OrganizationBuilderModal from "@/components/OrganizationBuilderModal";',
    'import OrganizationBuilderModal from "@/components/OrganizationBuilderModal";\nimport PortalView from "@/components/PortalView";'
)
content = content.replace(
    'import { initialNodes, ContentNode, initialTemplates, HierarchyTemplate, initialOrganizations, Organization } from "@/lib/data";',
    'import { initialNodes, ContentNode, initialTemplates, HierarchyTemplate, initialOrganizations, Organization, initialPrograms, Program } from "@/lib/data";'
)

# States
states_old = """  const [allNodes, setAllNodes] = useState<ContentNode[]>(initialNodes);
  const [templates, setTemplates] = useState<HierarchyTemplate[]>(initialTemplates);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  
  const [activeTemplateId, setActiveTemplateId] = useState<string>(initialTemplates[0].id);
  const [activeOrgId, setActiveOrgId] = useState<string>(initialOrganizations[0].id);"""

states_new = """  const [allNodes, setAllNodes] = useState<ContentNode[]>(initialNodes);
  const [templates, setTemplates] = useState<HierarchyTemplate[]>(initialTemplates);
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  
  const [activeProgramId, setActiveProgramId] = useState<string | null>(null);
  
  const activeProgram = programs.find(p => p.id === activeProgramId) || null;
  const [activeTemplateId, setActiveTemplateId] = useState<string>(initialTemplates[0].id);"""

content = content.replace(states_old, states_new)

# handleGoHome - reset template
content = content.replace("""  const handleGoHome = () => {
    setCurrentNodeId(null);
    setSelectedFilters({});
    setSearchQuery("");
  };""", """  const handleGoHome = () => {
    setCurrentNodeId(null);
    setSelectedFilters({});
    setSearchQuery("");
  };

  const handleSelectProgram = (programId: string | null) => {
    setActiveProgramId(programId);
    handleGoHome();
    if (programId) {
      const p = programs.find(x => x.id === programId);
      if (p) setActiveTemplateId(p.templateId);
    }
  };""")

# Delete handleSelectOrg
content = re.sub(r"  const handleSelectOrg = \(orgId: string\) => \{.*?\n  \};\n", "", content, flags=re.DOTALL)

# currentTemplateNodes
content = content.replace(
    """  const currentTemplateNodes = useMemo(() => {
    return allNodes.filter(n => n.templateId === activeTemplateId && n.organizationId === activeOrgId);
  }, [allNodes, activeTemplateId, activeOrgId]);""",
    """  const currentTemplateNodes = useMemo(() => {
    return allNodes.filter(n => n.programId === activeProgramId);
  }, [allNodes, activeProgramId]);"""
)

# handleSaveNode
handle_save_old = """      const newItem: ContentNode = {
        id: (type === 'shortcut' ? 'shortcut_' : 'new_node_') + Date.now(),
        organizationId: activeOrgId,
        templateId: activeTemplateId,"""
handle_save_new = """      const newItem: ContentNode = {
        id: (type === 'shortcut' ? 'shortcut_' : 'new_node_') + Date.now(),
        programId: activeProgramId || '',
        organizationId: activeProgram?.organizationId || '',
        templateId: activeTemplateId,"""
content = content.replace(handle_save_old, handle_save_new)

# Sidebar props
sidebar_old = """      <Sidebar 
        onGoHome={handleGoHome}
        currentNodeId={currentNodeId}
        organizations={organizations}
        activeOrgId={activeOrgId}
        onSelectOrg={handleSelectOrg}
        onAddOrg={() => setIsBuildingOrg(true)}
      />"""
sidebar_new = """      <Sidebar 
        onGoHome={handleGoHome}
        currentNodeId={currentNodeId}
        activeProgramId={activeProgramId}
        onSelectProgram={handleSelectProgram}
      />"""
content = content.replace(sidebar_old, sidebar_new)

# Main content area
main_old = """      <div className="flex-1 flex flex-col min-w-0">
        <Topbar"""
main_new = """      <div className="flex-1 flex flex-col min-w-0">
        {activeProgramId === null ? (
          <PortalView 
            programs={programs} 
            organizations={organizations} 
            onSelectProgram={handleSelectProgram} 
          />
        ) : (
          <>
            <Topbar"""
content = content.replace(main_old, main_new)

# End of main content area
main_end_old = """            viewMode={viewMode === "column" ? "grid" : viewMode}
          />
        )}
      </div>"""
main_end_new = """            viewMode={viewMode === "column" ? "grid" : viewMode}
          />
        )}
          </>
        )}
      </div>"""
content = content.replace(main_end_old, main_end_new)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

