import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

orgs_replacement = """export const initialOrganizations: Organization[] = [
  { id: 'org_vaf', name: 'Աշխարհացույց / Վիզուալ Հայաստան', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ayb', name: 'Այբ Հիմնադրամ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ysu', name: 'Երևանի Պետական Համալսարան (ԵՊՀ)', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_undp', name: 'ՄԱԿ-ի զարգացման ծրագիր (UNDP)', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_cba', name: 'ՀՀ Կենտրոնական Բանկ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_museum', name: 'Հայաստանի Պատմության Թանգարան', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_polytech', name: 'ՀԱՊՀ (Պոլիտեխնիկ)', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_ind', name: 'Անկախ Փորձագետներ (Անհատներ)', defaultTemplateId: 'tpl_freeform' }
];"""

content = re.sub(
    r"export const initialOrganizations: Organization\[\] = \[.*?\];", 
    orgs_replacement, 
    content, 
    flags=re.DOTALL
)

programs_additions = """  {
    id: 'prog_cba_1',
    title: 'Ֆինանսական գրագիտություն',
    description: 'Անձնական ֆինանսների կառավարում և խնայողություններ դպրոցականների համար',
    organizationId: 'org_cba',
    templateId: 'tpl_subject',
    color: '#16a34a'
  },
  {
    id: 'prog_museum_1',
    title: 'Վիրտուալ Ցուցադրություններ',
    description: 'Հայաստանի պատմության և մշակույթի վիրտուալ ցուցասրահներ',
    organizationId: 'org_museum',
    templateId: 'tpl_freeform',
    color: '#9ca3af'
  },
  {
    id: 'prog_polytech_1',
    title: 'Արհեստական Բանականություն',
    description: 'Մեքենայական ուսուցման հիմունքներ և կիրառություններ',
    organizationId: 'org_polytech',
    templateId: 'tpl_freeform',
    color: '#dc2626'
  },
  {
    id: 'prog_ind_1',
    title: 'Լուսանկարչության Արվեստ',
    description: 'Հեղինակային դասընթաց սկսնակ լուսանկարիչների համար',
    organizationId: 'org_ind',
    templateId: 'tpl_freeform',
    color: '#db2777'
  }
];"""

content = re.sub(
    r"  \{\n    id: 'prog_undp_1'.*?\}\n\];", 
    "  {\n    id: 'prog_undp_1',\n    title: 'Կայուն զարգացման նպատակներ (SDG)',\n    description: 'Համայնքային զարգացման ծրագիր',\n    organizationId: 'org_undp',\n    templateId: 'tpl_freeform',\n    color: '#059669'\n  },\n" + programs_additions, 
    content, 
    flags=re.DOTALL
)

nodes_additions = """
// Central Bank
initialNodes.push(
  { id: 'n_cba_g8', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '8-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_cba_g8_t1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_cba_g8', title: 'Խնայողություններ և Բյուջե', sortOrder: 1, type: 'node' },
  { id: 'n_cba_g8_t1_l1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_cba_g8_t1', title: 'Ինչպես ճիշտ տնօրինել գրպանի գումարը', sortOrder: 1, type: 'node' }
);

// Museum
initialNodes.push(
  { id: 'n_mus_f1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: null, title: 'Բրոնզե Դար', sortOrder: 1, type: 'node' },
  { id: 'n_mus_f1_l1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_freeform', nodeTypeId: 'type_file', parentId: 'n_mus_f1', title: 'Լճաշենի պեղումները (3D ցուցադրություն)', sortOrder: 1, type: 'node' }
);

// Independent
initialNodes.push(
  { id: 'n_ind_f1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: null, title: 'Մոդուլ 1. Լույս և Ստվեր', sortOrder: 1, type: 'node' },
  { id: 'n_ind_f1_l1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_freeform', nodeTypeId: 'type_file', parentId: 'n_ind_f1', title: 'Տեսադաս 1. Բնական լույսի կիրառումը', sortOrder: 1, type: 'node' }
);
"""

content = content + nodes_additions

with open('src/lib/data.ts', 'w') as f:
    f.write(content)

