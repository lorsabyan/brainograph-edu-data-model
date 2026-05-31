"use client";

import { useState, useMemo } from "react";
import { Program, Organization } from "@/lib/data";
import { 
  Building2, 
  ArrowRight, 
  Search, 
  X, 
  GraduationCap, 
  BookOpen, 
  Plus,
  Edit3,
  Users,
  ShieldCheck,
  Sparkles,
  RotateCcw
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PortalViewProps {
  programs: Program[];
  organizations: Organization[];
  onSelectProgram: (programId: string, nodeId?: string | null) => void;
  onAddOrg: () => void;
  onAddProgram: () => void;
  onAddTemplate: () => void;
  onEditOrg?: (id: string) => void;
  onEditProgram?: (id: string) => void;
  isEditMode: boolean;
  userRole: "learner" | "instructor";
  selectedLearnerGrade: string;
  onSelectLearnerGrade: (grade: string) => void;
  selectedInstructorGrades: string[];
  onSelectInstructorGrades: (grades: string[]) => void;
  activeTab: "discover" | "my-space";
  onChangeTab: (tab: "discover" | "my-space") => void;
  allNodes: any[]; // using any[] to avoid strict import type issues, but it maps to ContentNode[]
}

export default function PortalView({ 
  programs, 
  organizations, 
  onSelectProgram,
  onAddOrg,
  onAddProgram,
  onAddTemplate,
  onEditOrg,
  onEditProgram,
  isEditMode,
  userRole,
  selectedLearnerGrade,
  onSelectLearnerGrade,
  selectedInstructorGrades,
  onSelectInstructorGrades,
  activeTab,
  onChangeTab,
  allNodes
}: PortalViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<'org' | 'level'>('org');

  const LEVEL_GROUPS = useMemo(() => [
    { id: "school", name: "Դպրոցական", icon: GraduationCap, description: "Հանրակրթական հիմնական և օժանդակ դպրոցական առարկաներ" },
    { id: "university", name: "Բուհական", icon: BookOpen, description: "Բարձրագույն ուսումնական հաստատությունների դասընթացներ" },
    { id: "public", name: "Հանրային / Ոչ ֆորմալ", icon: Users, description: "Հանրության ինքնակրթության և ոչ ֆորմալ ուսուցման նյութեր" }
  ], []);

  const STATUS_GROUPS = useMemo(() => [
    { id: "state", name: "Պետական / Պարտադիր", icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    { id: "supplementary", name: "Հավելյալ / Օպցիոնալ", icon: Sparkles, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" }
  ], []);

  // Filter programs based on criteria
  const filteredPrograms = useMemo(() => {
    return programs.filter(program => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = program.title.toLowerCase().includes(q);
        const matchesDesc = program.description.toLowerCase().includes(q);
        const org = organizations.find(o => o.id === program.organizationId);
        const matchesOrg = org ? org.name.toLowerCase().includes(q) : false;
        
        if (!matchesTitle && !matchesDesc && !matchesOrg) {
          return false;
        }
      }

      // 2. Organization Filter
      if (selectedOrgId && program.organizationId !== selectedOrgId) {
        return false;
      }

      // 3. Educational Level Filter
      if (selectedLevel) {
        if (!program.educationLevels || !program.educationLevels.includes(selectedLevel)) {
          return false;
        }
      }

      // 4. Program Status Filter
      if (selectedStatus) {
        if (!program.programStatuses || !program.programStatuses.includes(selectedStatus)) {
          return false;
        }
      }

      return true;
    });
  }, [programs, organizations, searchQuery, selectedOrgId, selectedLevel, selectedStatus]);

  // Group filtered programs by organization
  const programsByOrg = useMemo(() => {
    return organizations
      .map(org => ({
        ...org,
        programs: filteredPrograms.filter(p => p.organizationId === org.id)
      }))
      .filter(org => org.programs.length > 0);
  }, [organizations, filteredPrograms]);

  // Group filtered programs by educational level
  const programsByLevel = useMemo(() => {
    return LEVEL_GROUPS.map(group => ({
      ...group,
      programs: filteredPrograms.filter(p => p.educationLevels?.includes(group.id))
    })).filter(g => g.programs.length > 0);
  }, [filteredPrograms, LEVEL_GROUPS]);

  // Combined grouped results based on groupBy setting
  const groups = useMemo(() => {
    if (groupBy === 'org') {
      return programsByOrg.map(org => ({
        id: org.id,
        title: org.name,
        subtitle: `Առաջարկում է ${org.programs.length} առարկա`,
        icon: Building2,
        programs: org.programs
      }));
    } else {
      return programsByLevel.map(lvl => ({
        id: lvl.id,
        title: lvl.name,
        subtitle: lvl.description,
        icon: lvl.icon,
        programs: lvl.programs
      }));
    }
  }, [groupBy, programsByOrg, programsByLevel]);

  // Tab Switcher Options dynamically ordered based on role
  const tabs = useMemo(() => {
    if (userRole === "learner") {
      return [
        { id: "discover", label: "Բացահայտել Առարկաներ" },
        { id: "my-space", label: "Իմ Տիրույթը" }
      ];
    } else {
      return [
        { id: "my-space", label: "Իմ Դասավանդման Տիրույթը" },
        { id: "discover", label: "Բացահայտել Առարկաներ" }
      ];
    }
  }, [userRole]);

  // Compute Learner Space Programs
  const mySpacePrograms = useMemo(() => {
    return programs.filter(program => {
      const isSchoolGrade = selectedLearnerGrade.includes("դասարան");
      const isUniCourse = selectedLearnerGrade.includes("Կուրս");
      
      const matchesLevel = 
        (isSchoolGrade && program.educationLevels?.includes("school")) ||
        (isUniCourse && program.educationLevels?.includes("university")) ||
        program.educationLevels?.includes("public"); // Public matches everything
      
      if (!matchesLevel) return false;
      
      // Get all root nodes for this program
      const rootNodes = allNodes.filter(n => n.programId === program.id && n.parentId === null);
      
      // Check if this program has any grade-specific root nodes
      const hasGradeNodes = rootNodes.some(n => 
        n.title.includes("դասարան") || n.title.includes("Կուրս")
      );
      
      if (hasGradeNodes) {
        // Only show if it has a root node matching the selected grade
        return rootNodes.some(n => n.title.toLowerCase().trim() === selectedLearnerGrade.toLowerCase().trim());
      }
      
      // If it has no grade-specific nodes, it's a general/public subject, show it
      return true;
    });
  }, [programs, allNodes, selectedLearnerGrade]);

  // Compute Learner Space Cards (with targetNodeId matching the selected grade)
  const learnerCards = useMemo(() => {
    return mySpacePrograms.map(program => {
      const matchNode = allNodes.find(
        n => n.programId === program.id &&
             n.parentId === null &&
             n.title.toLowerCase().trim() === selectedLearnerGrade.toLowerCase().trim()
      );
      
      return {
        program,
        title: program.title,
        gradeName: matchNode ? matchNode.title : "Հանրային",
        targetNodeId: matchNode ? matchNode.id : null,
        color: program.color || "#3b82f6"
      };
    });
  }, [mySpacePrograms, allNodes, selectedLearnerGrade]);

  // Compute Instructor Space Cards (one card per selected taught level/grade combination)
  const instructorCards = useMemo(() => {
    const cards: {
      program: Program;
      title: string;
      gradeName: string;
      targetNodeId: string | null;
      color: string;
    }[] = [];
    
    selectedInstructorGrades.forEach(grade => {
      const isSchoolGrade = grade.includes("դասարան");
      const isUniCourse = grade.includes("Կուրս");
      
      programs.forEach(program => {
        const matchesLevel = 
          (isSchoolGrade && program.educationLevels?.includes("school")) ||
          (isUniCourse && program.educationLevels?.includes("university")) ||
          program.educationLevels?.includes("public");
          
        if (!matchesLevel) return;
        
        const rootNodes = allNodes.filter(n => n.programId === program.id && n.parentId === null);
        const hasGradeNodes = rootNodes.some(n => 
          n.title.includes("դասարան") || n.title.includes("Կուրս")
        );
        
        if (hasGradeNodes) {
          const matchNode = rootNodes.find(n => n.title.toLowerCase().trim() === grade.toLowerCase().trim());
          if (matchNode) {
            cards.push({
              program,
              title: `${program.title} (${grade})`,
              gradeName: grade,
              targetNodeId: matchNode.id,
              color: program.color || "#3b82f6"
            });
          }
        } else {
          // General program: add once under a "General/Public" tag if not already added
          const alreadyAdded = cards.some(c => c.program.id === program.id);
          if (!alreadyAdded) {
            cards.push({
              program,
              title: program.title,
              gradeName: "Հանրային",
              targetNodeId: null,
              color: program.color || "#3b82f6"
            });
          }
        }
      });
    });
    
    return cards;
  }, [programs, allNodes, selectedInstructorGrades]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedOrgId(null);
    setSelectedLevel(null);
    setSelectedStatus(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <div className="border-b border-border/40 pb-6 shrink-0 flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-left">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-violet-600 dark:from-primary dark:via-blue-400 dark:to-indigo-300 animate-in fade-in duration-300">
              {activeTab === "my-space" 
                ? (userRole === "learner" ? "Իմ Տիրույթը" : "Իմ Դասավանդման Տիրույթը")
                : "Բացահայտեք Ուսումնական Առարկաներ"}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in duration-300">
              {activeTab === "my-space"
                ? (userRole === "learner" 
                   ? `«${selectedLearnerGrade}»-ի առարկաները և արագ հղումները` 
                   : "Դասավանդվող առարկաներն ու դասարանները/կուրսերը")
                : "Գտեք լավագույն կրթական նյութերը, դասընթացները և պլանները՝ ստեղծված առաջատար հաստատությունների կողմից։"}
            </p>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="flex space-x-1 p-1 bg-muted/60 dark:bg-muted/30 rounded-2xl border border-border/40 backdrop-blur-md self-start md:self-auto shrink-0 shadow-inner">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id as "discover" | "my-space")}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm border border-border/20"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "discover" ? (
          <>
            {/* Search and Filters panel */}
            <div className="p-6 rounded-3xl border border-border/50 bg-card/65 backdrop-blur-xl shadow-lg space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                
                {/* Search Input */}
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="portal-search-input"
                    name="searchQuery"
                    aria-label="Որոնել ուսումնական առարկաներ"
                    placeholder="Որոնել ըստ վերնագրի, նկարագրության կամ հաստատության..."
                    className="pl-10 pr-10 py-5 bg-background border-border/60 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all rounded-2xl h-12 text-base shadow-inner w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Reset Filters Quick Button */}
                {(searchQuery || selectedOrgId || selectedLevel || selectedStatus) && (
                  <Button
                    variant="outline"
                    onClick={handleResetFilters}
                    className="h-12 px-5 rounded-2xl border-dashed border-primary/40 hover:border-primary hover:bg-primary/5 text-primary gap-2 transition-all shrink-0"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Մաքրել
                  </Button>
                )}
              </div>

              <div className="space-y-4 border-t border-border/40 pt-4 text-left">

                {/* Educational Level Filter */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                    <GraduationCap className="h-3 w-3" />
                    Մակարդակ՝
                  </span>
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border ${
                      selectedLevel === null
                         ? "bg-primary text-primary-foreground border-primary shadow-sm"
                         : "bg-background text-muted-foreground border-border/60 hover:border-muted-foreground/40 hover:text-foreground"
                    }`}
                  >
                    Բոլորը
                  </button>
                  {LEVEL_GROUPS.map(lvl => {
                    const IconComponent = lvl.icon;
                    return (
                      <button
                        key={lvl.id}
                        onClick={() => setSelectedLevel(lvl.id)}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border flex items-center gap-1.5 ${
                          selectedLevel === lvl.id
                             ? "bg-primary text-primary-foreground border-primary shadow-sm"
                             : "bg-background text-foreground border-border/60 hover:border-muted-foreground/40"
                        }`}
                      >
                        <IconComponent className="h-3.5 w-3.5" />
                        {lvl.name}
                      </button>
                    );
                  })}
                </div>

                {/* Program Status Filter */}
                <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-border/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    Կարգավիճակ՝
                  </span>
                  <button
                    onClick={() => setSelectedStatus(null)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border ${
                      selectedStatus === null
                         ? "bg-primary text-primary-foreground border-primary shadow-sm"
                         : "bg-background text-muted-foreground border-border/60 hover:border-muted-foreground/40 hover:text-foreground"
                    }`}
                  >
                    Բոլորը
                  </button>
                  {STATUS_GROUPS.map(st => {
                    const IconComponent = st.icon;
                    return (
                      <button
                        key={st.id}
                        onClick={() => setSelectedStatus(st.id)}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border flex items-center gap-1.5 ${
                          selectedStatus === st.id
                             ? "bg-primary text-primary-foreground border-primary shadow-sm"
                             : "bg-background text-foreground border-border/60 hover:border-muted-foreground/40"
                        }`}
                      >
                        <IconComponent className="h-3.5 w-3.5" />
                        {st.name}
                      </button>
                    );
                  })}
                </div>

                {/* Organization Filter */}
                <div className="flex flex-wrap items-center gap-2 pt-2.5 border-t border-border/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                    <Building2 className="h-3 w-3" />
                    Հաստատություն՝
                  </span>
                  <button
                    onClick={() => setSelectedOrgId(null)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border ${
                      selectedOrgId === null
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-muted-foreground border-border/60 hover:border-muted-foreground/40 hover:text-foreground"
                    }`}
                  >
                    Բոլորը
                  </button>
                  {organizations.map(org => {
                    const hasMatchingPrograms = programs.some(
                      p => p.organizationId === org.id && 
                           (!selectedLevel || p.educationLevels?.includes(selectedLevel)) &&
                           (!selectedStatus || p.programStatuses?.includes(selectedStatus))
                    );
                    if (!hasMatchingPrograms) return null;

                    return (
                      <button
                        key={org.id}
                        onClick={() => setSelectedOrgId(org.id)}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border ${
                          selectedOrgId === org.id
                            ? "bg-primary text-primary-foreground border-primary shadow-sm"
                            : "bg-background text-foreground border-border/60 hover:border-muted-foreground/40"
                        }`}
                      >
                        {org.name.replace(" Հիմնադրամ", "").replace(" (ԵՊՀ)", "").replace(" (UNDP)", "")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {isEditMode && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/40 justify-start">
                  <Button onClick={onAddOrg} variant="outline" className="rounded-2xl px-4 h-11 border-dashed hover:bg-accent gap-2 transition-all">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    Նոր Հաստատություն
                  </Button>
                  <Button onClick={onAddTemplate} variant="outline" className="rounded-2xl px-4 h-11 border-dashed hover:bg-accent gap-2 transition-all">
                    <Plus className="h-4 w-4 text-muted-foreground" />
                    Նոր Կառուցվածք
                  </Button>
                  <Button onClick={onAddProgram} className="rounded-2xl px-5 h-11 shadow-md gap-2 transition-all">
                    <Plus className="h-4 w-4 text-primary-foreground" />
                    Նոր Առարկա
                  </Button>
                </div>
              )}
            </div>

            {/* Dynamic Grid Results */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-4">
                <h2 className="text-xl font-bold text-foreground/80 flex items-center gap-2">
                  {groupBy === 'org' ? 'Առարկաներն ըստ Հաստատությունների' : 'Առարկաներն ըստ Կրթական Մակարդակների'}
                </h2>
                <div className="flex items-center gap-1.5 bg-muted/50 p-1 rounded-xl border border-border/40 w-fit self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setGroupBy('org')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      groupBy === 'org'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Ըստ Հաստատությունների
                  </button>
                  <button
                    onClick={() => setGroupBy('level')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      groupBy === 'level'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Ըստ Կրթական Մակարդակների
                  </button>
                </div>
              </div>

              {groups.length > 0 ? (
                <div className="space-y-12">
                  {groups.map(group => {
                    const GroupIcon = group.icon;
                    return (
                      <div key={group.id} className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                        <div className="flex items-center justify-between border-b border-border/50 pb-4 text-left">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-xl bg-accent/70 flex items-center justify-center shrink-0 border border-border/40">
                              <GroupIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold tracking-tight">{group.title}</h2>
                              <p className="text-sm text-muted-foreground">{group.subtitle}</p>
                            </div>
                          </div>
                          {isEditMode && groupBy === 'org' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent"
                              onClick={(e) => {
                                e.stopPropagation();
                                onEditOrg?.(group.id);
                              }}
                              title="Խմբագրել հաստատությունը"
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                          {group.programs.map(program => {
                            return (
                              <div 
                                key={program.id}
                                onClick={() => onSelectProgram(program.id, null)}
                                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/50 bg-card hover:bg-accent/30 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md h-52 overflow-hidden"
                              >
                                <div 
                                  className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
                                  style={{ backgroundColor: program.color || '#3b82f6' }}
                                />
                                
                                <div className="relative z-10 space-y-3">
                                  <div className="flex justify-between items-start gap-2">
                                    {/* Level Badges (Left) */}
                                    <div className="flex flex-wrap gap-1 min-w-0">
                                      {program.educationLevels && program.educationLevels.length > 0 ? (
                                        program.educationLevels.map(lvlId => {
                                          const lvlGroup = LEVEL_GROUPS.find(g => g.id === lvlId);
                                          if (!lvlGroup) return null;
                                          const LevelIcon = lvlGroup.icon;
                                          
                                          let colorClass = "text-blue-500 bg-blue-500/10 border-blue-500/20";
                                          if (lvlId === "university") {
                                            colorClass = "text-violet-500 bg-violet-500/10 border-violet-500/20";
                                          } else if (lvlId === "public") {
                                            colorClass = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
                                          }

                                          return (
                                            <span key={lvlId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${colorClass}`}>
                                              <LevelIcon className="h-2.5 w-2.5" />
                                              {lvlGroup.name.split(" / ")[0]}
                                            </span>
                                          );
                                        })
                                      ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border text-muted-foreground bg-muted border-border/50 shrink-0">
                                          Մակարդակ չկա
                                        </span>
                                      )}
                                    </div>
                                    
                                    {/* Status Badges (Right) & Edit Action */}
                                    <div className="flex items-center gap-1.5 min-w-0 flex-wrap justify-end">
                                      {program.programStatuses && program.programStatuses.map(stId => {
                                        const stGroup = STATUS_GROUPS.find(g => g.id === stId);
                                        if (!stGroup) return null;
                                        const StatusIcon = stGroup.icon;
                                        return (
                                          <span key={stId} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${stGroup.color}`} title={stGroup.name}>
                                            <StatusIcon className="h-2.5 w-2.5" />
                                            {stGroup.name.split(" / ")[0]}
                                          </span>
                                        );
                                      })}
                                      {groupBy === 'level' && (
                                        <span className="text-xs font-semibold text-muted-foreground truncate max-w-[120px] ml-1" title={organizations.find(o => o.id === program.organizationId)?.name}>
                                          {organizations.find(o => o.id === program.organizationId)?.name.replace(" Հիմնադրամ", "").replace(" (ԵՊՀ)", "").replace(" (UNDP)", "")}
                                        </span>
                                      )}
                                      {isEditMode && (
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md z-20 shrink-0 ml-1"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onEditProgram?.(program.id);
                                          }}
                                          title="Խմբագրել առարկան"
                                        >
                                          <Edit3 className="h-3.5 w-3.5" />
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-1.5">
                                    {program.curriculum && (
                                      <div className="text-[10px] font-extrabold tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                                        {program.curriculum}
                                      </div>
                                    )}
                                    <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                                      {program.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                      {program.description}
                                    </p>
                                  </div>
                                </div>

                                <div className="relative z-10 flex items-center text-xs font-semibold mt-4 text-muted-foreground group-hover:text-primary transition-all">
                                  Դիտել առարկան
                                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty State */
                <div className="flex flex-col items-center justify-center text-center p-16 rounded-3xl border border-dashed border-border bg-card/40 backdrop-blur-sm max-w-lg mx-auto space-y-6 animate-in fade-in duration-300">
                  <div className="h-16 w-16 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground">
                    <Search className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Ոչինչ չի գտնվել</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Փորձեք փոխել որոնման բառերը կամ մաքրել ֆիլտրերը՝ ավելի շատ ուսումնական առարկաներ տեսնելու համար։
                    </p>
                  </div>
                  <Button
                    onClick={handleResetFilters}
                    variant="default"
                    className="rounded-xl px-6"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Մաքրել ֆիլտրերը
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Personalized dashboard ("My Space") */
          <div className="space-y-8 animate-in fade-in duration-300 text-left">
            {userRole === "learner" ? (
              /* Learner Profile Bar */
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-xl shadow-md text-left">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Ուսումնական Մակարդակ
                  </h3>
                  <p className="text-xs text-muted-foreground">Ընտրեք Ձեր ընթացիկ դասարանը կամ կուրսը՝ անձնական ծրագիրը տեսնելու համար։</p>
                </div>
                <div className="relative shrink-0 w-full sm:w-64">
                  <select
                    value={selectedLearnerGrade}
                    onChange={(e) => onSelectLearnerGrade(e.target.value)}
                    className="w-full bg-background border border-border/60 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none cursor-pointer text-foreground"
                  >
                    <optgroup label="Դպրոցական դասարաններ">
                      {["5-րդ դասարան", "6-րդ դասարան", "7-րդ դասարան", "8-րդ դասարան", "9-րդ դասարան", "10-րդ դասարան", "11-րդ դասարան", "12-րդ դասարան"].map(g => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Բուհական կուրսեր">
                      {["I Կուրս", "II Կուրս", "III Կուրս", "IV Կուրս"].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center text-muted-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              /* Instructor Profile Bar */
              <div className="flex flex-col gap-4 p-5 rounded-2xl border border-border/50 bg-card/65 backdrop-blur-xl shadow-md text-left">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    Իմ Դասարանները / Կուրսերը
                  </h3>
                  <p className="text-xs text-muted-foreground">Նշեք այն բոլոր դասարանները կամ կուրսերը, որոնցում դասավանդում եք՝ համապատասխան դասընթացների քարտերը տեսնելու համար։</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {["5-րդ դասարան", "6-րդ դասարան", "7-րդ դասարան", "8-րդ դասարան", "9-րդ դասարան", "10-րդ դասարան", "11-րդ դասարան", "12-րդ դասարան", "I Կուրս", "II Կուրս", "III Կուրս", "IV Կուրս"].map(lvl => {
                    const isSelected = selectedInstructorGrades.includes(lvl);
                    return (
                      <button
                        key={lvl}
                        onClick={() => {
                          if (isSelected) {
                            if (selectedInstructorGrades.length > 1) {
                              onSelectInstructorGrades(selectedInstructorGrades.filter(x => x !== lvl));
                            }
                          } else {
                            onSelectInstructorGrades([...selectedInstructorGrades, lvl]);
                          }
                        }}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-sm scale-105"
                            : "bg-background text-muted-foreground border-border hover:border-muted-foreground/40 hover:text-foreground"
                        }`}
                      >
                        {lvl}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Personalized Cards Grid */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground/80 border-b border-border/40 pb-4 text-left">
                {userRole === "learner" ? "Իմ Ուսումնական Առարկաները" : "Իմ Դասավանդման Առարկաները"}
              </h2>

              {(userRole === "learner" ? learnerCards : instructorCards).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                  {(userRole === "learner" ? learnerCards : instructorCards).map((card, index) => {
                    return (
                      <div
                        key={`${card.program.id}_${card.gradeName}_${index}`}
                        onClick={() => onSelectProgram(card.program.id, card.targetNodeId)}
                        className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/50 bg-card hover:bg-accent/30 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md h-52 overflow-hidden"
                      >
                        <div 
                          className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
                          style={{ backgroundColor: card.color }}
                        />

                        <div className="relative z-10 space-y-3">
                          <div className="flex justify-between items-start gap-2">
                            {/* Grade/Course Badge */}
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 text-primary bg-primary/10 border-primary/20">
                              {card.gradeName}
                            </span>

                            {/* Org Short Name */}
                            <span className="text-xs font-semibold text-muted-foreground truncate max-w-[120px]">
                              {organizations.find(o => o.id === card.program.organizationId)?.name.replace(" Հիմնադրամ", "").replace(" (ԵՊՀ)", "").replace(" (UNDP)", "")}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {card.program.curriculum && (
                              <div className="text-[10px] font-extrabold tracking-wider uppercase text-primary bg-primary/10 px-2 py-0.5 rounded w-fit">
                                {card.program.curriculum}
                              </div>
                            )}
                            <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                              {card.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                              {card.targetNodeId 
                                ? `«${card.gradeName}» պանակի ուղիղ հղում` 
                                : card.program.description}
                            </p>
                          </div>
                        </div>

                        <div className="relative z-10 flex items-center text-xs font-semibold mt-4 text-muted-foreground group-hover:text-primary transition-all">
                          {userRole === "learner" ? "Սկսել սովորել" : "Դասավանդել"}
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state for personalized space */
                <div className="flex flex-col items-center justify-center text-center p-16 rounded-3xl border border-dashed border-border bg-card/40 backdrop-blur-sm max-w-lg mx-auto space-y-6">
                  <div className="h-16 w-16 rounded-full bg-accent/50 flex items-center justify-center text-muted-foreground">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Առարկաներ չեն գտնվել</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      Այս մակարդակի համար համապատասխան առարկաներ դեռ հաստատված չեն։
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
