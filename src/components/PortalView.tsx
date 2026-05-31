"use client";

import { useState, useMemo } from "react";
import { Program, Organization, initialTemplates } from "@/lib/data";
import { 
  Building2, 
  ArrowRight, 
  Search, 
  X, 
  Filter, 
  GraduationCap, 
  BookOpen, 
  Map, 
  Layout, 
  FolderHeart,
  RotateCcw,
  Plus,
  Edit3
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PortalViewProps {
  programs: Program[];
  organizations: Organization[];
  onSelectProgram: (programId: string) => void;
  onAddOrg: () => void;
  onAddProgram: () => void;
  onAddTemplate: () => void;
  onEditOrg?: (id: string) => void;
  onEditProgram?: (id: string) => void;
  isEditMode: boolean;
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
  isEditMode
}: PortalViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<'org' | 'audience'>('org');

  const AUDIENCE_GROUPS = useMemo(() => [
    { id: "դպրոցական", name: "Դպրոցական", icon: GraduationCap, description: "Հանրակրթական հիմնական առարկաներ և դասարաններ" },
    { id: "դպրոցական հավելյալ", name: "Դպրոցական հավելյալ", icon: FolderHeart, description: "Արտադասարանական, նախագծային և օժանդակ նյութեր" },
    { id: "բուհական", name: "Բուհական", icon: BookOpen, description: "Բարձրագույն ուսումնական հաստատությունների ծրագրեր" },
    { id: "մասնագիտական", name: "Մասնագիտական", icon: Layout, description: "Մասնագիտական վերապատրաստումներ և հատուկ դասընթացներ" }
  ], []);

  // Template helper names and icons in Armenian
  const templateMetadata = {
    tpl_subject: { name: "Դպրոցական", icon: GraduationCap, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    tpl_university: { name: "Բուհական", icon: BookOpen, color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20" },
    tpl_museum: { name: "Թանգարանային", icon: Map, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
    tpl_course: { name: "Մասնագիտական", icon: Layout, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
    tpl_freeform: { name: "Ազատ կառուցվածք", icon: FolderHeart, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
  };

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

      // 3. Target Audience Filter
      if (selectedAudience) {
        if (!program.targetAudience || !program.targetAudience.includes(selectedAudience)) {
          return false;
        }
      }

      return true;
    });
  }, [programs, organizations, searchQuery, selectedOrgId, selectedAudience]);

  // Group filtered programs by organization
  const programsByOrg = useMemo(() => {
    return organizations
      .map(org => ({
        ...org,
        programs: filteredPrograms.filter(p => p.organizationId === org.id)
      }))
      .filter(org => org.programs.length > 0);
  }, [organizations, filteredPrograms]);

  // Group filtered programs by target audience
  const programsByAudience = useMemo(() => {
    return AUDIENCE_GROUPS.map(group => ({
      ...group,
      programs: filteredPrograms.filter(p => p.targetAudience?.includes(group.id))
    })).filter(g => g.programs.length > 0);
  }, [filteredPrograms, AUDIENCE_GROUPS]);

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
      return programsByAudience.map(aud => ({
        id: aud.id,
        title: aud.name,
        subtitle: aud.description,
        icon: aud.icon,
        programs: aud.programs
      }));
    }
  }, [groupBy, programsByOrg, programsByAudience]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedOrgId(null);
    setSelectedAudience(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-background p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <div className="border-b border-border/40 pb-6 shrink-0">
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-violet-600 dark:from-primary dark:via-blue-400 dark:to-indigo-300">
              Բացահայտեք Ուսումնական Առարկաներ
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Գտեք լավագույն կրթական նյութերը, դասընթացները և պլանները՝ ստեղծված առաջատար հաստատությունների կողմից։
            </p>
          </div>
        </div>

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
            {(searchQuery || selectedOrgId || selectedAudience) && (
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

          <div className="space-y-4 border-t border-border/40 pt-4">

            {/* Target Audience Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-2 flex items-center gap-1.5">
                <GraduationCap className="h-3 w-3" />
                Լսարան՝
              </span>
              <button
                onClick={() => setSelectedAudience(null)}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border ${
                  selectedAudience === null
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-background text-muted-foreground border-border/60 hover:border-muted-foreground/40 hover:text-foreground"
                }`}
              >
                Բոլորը
              </button>
              {AUDIENCE_GROUPS.map(aud => {
                const IconComponent = aud.icon;
                return (
                  <button
                    key={aud.id}
                    onClick={() => setSelectedAudience(aud.id)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all border flex items-center gap-1.5 ${
                      selectedAudience === aud.id
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-background text-foreground border-border/60 hover:border-muted-foreground/40"
                    }`}
                  >
                    <IconComponent className="h-3.5 w-3.5" />
                    {aud.name}
                  </button>
                );
              })}
            </div>

            {/* Organization Filter */}
            <div className="flex flex-wrap items-center gap-2">
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
                // Only show orgs that have matching programs after filtering by audience
                const hasMatchingPrograms = programs.some(
                  p => p.organizationId === org.id && 
                       (!selectedAudience || p.targetAudience?.includes(selectedAudience))
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
              {groupBy === 'org' ? 'Առարկաներն ըստ Հաստատությունների' : 'Առարկաներն ըստ Թիրախային Լսարանի'}
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
                onClick={() => setGroupBy('audience')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  groupBy === 'audience'
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ըստ Թիրախային Լսարանի
              </button>
            </div>
          </div>

          {groups.length > 0 ? (
            <div className="space-y-12">
              {groups.map(group => {
                const GroupIcon = group.icon;
                return (
                  <div key={group.id} className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                    <div className="flex items-center justify-between border-b border-border/50 pb-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {group.programs.map(program => {
                        const tMeta = templateMetadata[program.templateId as keyof typeof templateMetadata] || {
                          name: "Այլ",
                          icon: GraduationCap,
                          color: "text-muted-foreground bg-muted border-border/50"
                        };
                        const StructureIcon = tMeta.icon;

                        return (
                          <div 
                            key={program.id}
                            onClick={() => onSelectProgram(program.id)}
                            className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/50 bg-card hover:bg-accent/30 hover:border-primary/40 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md h-52 overflow-hidden"
                          >
                            <div 
                              className="absolute inset-0 opacity-5 transition-opacity group-hover:opacity-10"
                              style={{ backgroundColor: program.color || '#3b82f6' }}
                            />
                            
                            <div className="relative z-10 space-y-3">
                              <div className="flex justify-between items-center gap-2">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tMeta.color}`}>
                                  <StructureIcon className="h-3 w-3" />
                                  {tMeta.name}
                                </span>
                                <div className="flex items-center gap-1.5 min-w-0">
                                  {groupBy === 'audience' && (
                                    <span className="text-xs font-semibold text-muted-foreground truncate max-w-[120px]" title={organizations.find(o => o.id === program.organizationId)?.name}>
                                      {organizations.find(o => o.id === program.organizationId)?.name.replace(" Հիմնադրամ", "").replace(" (ԵՊՀ)", "").replace(" (UNDP)", "")}
                                    </span>
                                  )}
                                  {isEditMode && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md z-20 shrink-0"
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
      </div>
    </div>
  );
}
