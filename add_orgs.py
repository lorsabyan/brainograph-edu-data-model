import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

orgs_replacement = """export const initialOrganizations: Organization[] = [
  { id: 'org_vaf', name: 'Աշխարհացույց / Վիզուալ Հայաստան', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ayb', name: 'Այբ Հիմնադրամ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ysu', name: 'Երևանի Պետական Համալսարան (ԵՊՀ)', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_undp', name: 'ՄԱԿ-ի զարգացման ծրագիր (UNDP)', defaultTemplateId: 'tpl_freeform' }
];"""

content = re.sub(
    r"export const initialOrganizations: Organization\[\] = \[.*?\];", 
    orgs_replacement, 
    content, 
    flags=re.DOTALL
)

programs_replacement = """export const initialPrograms: Program[] = [
  ...subjects.map((subj, index) => ({
    id: `prog_${index}`,
    title: subj,
    description: 'Աշխարհացույց նախագծի շրջանակներում ստեղծված ուսումնական նյութեր',
    organizationId: 'org_vaf',
    templateId: subj === 'Նախագծային աշխատանք' || subj === 'Սիմֆոնիկ ԴասA' || subj === 'Կլիմայական արկղիկ' ? 'tpl_freeform' : 'tpl_subject',
    color: colors[index]
  })),
  {
    id: 'prog_ayb_1',
    title: 'Արարատյան Բակալավրիատ. Մաթեմատիկա',
    description: 'Այբ կրթական հիմնադրամի մաթեմատիկայի ծրագիր',
    organizationId: 'org_ayb',
    templateId: 'tpl_subject',
    color: '#f97316'
  },
  {
    id: 'prog_ayb_2',
    title: 'Արարատյան Բակալավրիատ. Ֆիզիկա',
    description: 'Այբ կրթական հիմնադրամի ֆիզիկայի ծրագիր',
    organizationId: 'org_ayb',
    templateId: 'tpl_subject',
    color: '#ef4444'
  },
  {
    id: 'prog_ysu_1',
    title: 'Տեղեկատվական Տեխնոլոգիաներ',
    description: 'Բակալավրի կրթական ծրագիր',
    organizationId: 'org_ysu',
    templateId: 'tpl_freeform',
    color: '#0284c7'
  },
  {
    id: 'prog_ysu_2',
    title: 'Մաթեմատիկա և Մեխանիկա',
    description: 'Բակալավրի կրթական ծրագիր',
    organizationId: 'org_ysu',
    templateId: 'tpl_freeform',
    color: '#4338ca'
  },
  {
    id: 'prog_undp_1',
    title: 'Կայուն զարգացման նպատակներ (SDG)',
    description: 'Համայնքային զարգացման ծրագիր',
    organizationId: 'org_undp',
    templateId: 'tpl_freeform',
    color: '#059669'
  }
];"""

content = re.sub(
    r"export const initialPrograms: Program\[\] = subjects\.map.*?\)\);", 
    programs_replacement, 
    content, 
    flags=re.DOTALL
)

nodes_additions = """
// Ayb Math grades
initialNodes.push(
  { id: 'n_ayb_m_10', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '10-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_m_11', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '11-րդ դասարան', sortOrder: 2, type: 'node' },
  { id: 'n_ayb_m_10_t1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_ayb_m_10', title: 'Եռանկյունաչափություն', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_m_10_t1_l1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_ayb_m_10_t1', title: 'Սինուս և Կոսինուս', sortOrder: 1, type: 'node' }
);

// YSU Freeform folders
initialNodes.push(
  { id: 'n_ysu_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: null, title: 'I Կուրս', sortOrder: 1, type: 'node' },
  { id: 'n_ysu_f2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: null, title: 'II Կուրս', sortOrder: 2, type: 'node' },
  { id: 'n_ysu_f1_t1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: 'n_ysu_f1', title: 'Ալգորիթմների հիմունքներ', sortOrder: 1, type: 'node' },
  { id: 'n_ysu_f1_t1_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_file', parentId: 'n_ysu_f1_t1', title: 'Դասախոսություն 1. Ներածություն', sortOrder: 1, type: 'node' }
);
"""

content = content + nodes_additions

with open('src/lib/data.ts', 'w') as f:
    f.write(content)

