import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

new_templates = """export const initialTemplates: HierarchyTemplate[] = [
  {
    id: 'tpl_subject',
    name: 'Առարկայական Ծրագիր',
    description: 'Դասարան -> Թեմա -> Նյութ',
    isFreeform: false,
    nodeTypes: [
      { id: 'type_grade', name: 'Դասարան', level: 1, icon: 'GraduationCap' },
      { id: 'type_topic', name: 'Թեմա', level: 2, icon: 'Layers' },
      { id: 'type_lesson', name: 'Նյութ/Դաս', level: 3, icon: 'FileText' }
    ]
  },
  {
    id: 'tpl_university',
    name: 'Բուհական Ծրագիր',
    description: 'Կուրս -> Առարկա -> Դասախոսություն',
    isFreeform: false,
    nodeTypes: [
      { id: 'type_course_year', name: 'Կուրս', level: 1, icon: 'Users' },
      { id: 'type_uni_subject', name: 'Առարկա', level: 2, icon: 'BookOpen' },
      { id: 'type_lecture', name: 'Դասախոսություն', level: 3, icon: 'Monitor' }
    ]
  },
  {
    id: 'tpl_museum',
    name: 'Թանգարանային / Վիրտուալ Ցուցադրություն',
    description: 'Ցուցասրահ -> Նմուշ',
    isFreeform: false,
    nodeTypes: [
      { id: 'type_hall', name: 'Ցուցասրահ', level: 1, icon: 'Map' },
      { id: 'type_exhibit', name: 'Նմուշ/Էքսպոնատ', level: 2, icon: 'Image' }
    ]
  },
  {
    id: 'tpl_course',
    name: 'Մասնագիտական Դասընթաց',
    description: 'Մոդուլ -> Նյութ',
    isFreeform: false,
    nodeTypes: [
      { id: 'type_module', name: 'Մոդուլ', level: 1, icon: 'Layout' },
      { id: 'type_material', name: 'Նյութ', level: 2, icon: 'FileText' }
    ]
  },
  {
    id: 'tpl_freeform',
    name: 'Ազատ Պանակներ (Freeform)',
    description: 'Անսահման ներդրված պանակներ',
    isFreeform: true,
    nodeTypes: [
      { id: 'type_folder', name: 'Պանակ', level: 1, icon: 'Folder', isNestable: true },
      { id: 'type_file', name: 'Ֆայլ', level: 2, icon: 'File' }
    ]
  }
];"""

content = re.sub(r'export const initialTemplates: HierarchyTemplate\[\] = \[.*?\];', new_templates, content, flags=re.DOTALL)

# Default templates in orgs
content = content.replace("defaultTemplateId: 'tpl_freeform'", "defaultTemplateId: 'tpl_course'")
content = content.replace("name: 'Երևանի Պետական Համալսարան (ԵՊՀ)', defaultTemplateId: 'tpl_course'", "name: 'Երևանի Պետական Համալսարան (ԵՊՀ)', defaultTemplateId: 'tpl_university'")
content = content.replace("name: 'ՀԱՊՀ (Պոլիտեխնիկ)', defaultTemplateId: 'tpl_course'", "name: 'ՀԱՊՀ (Պոլիտեխնիկ)', defaultTemplateId: 'tpl_university'")
content = content.replace("name: 'Հայաստանի Պատմության Թանգարան', defaultTemplateId: 'tpl_course'", "name: 'Հայաստանի Պատմության Թանգարան', defaultTemplateId: 'tpl_museum'")
content = content.replace("name: 'ՀՀ Կենտրոնական Բանկ', defaultTemplateId: 'tpl_subject'", "name: 'ՀՀ Կենտրոնական Բանկ', defaultTemplateId: 'tpl_course'")

# Program template IDs
content = content.replace("{ id: 'prog_ysu_1',", "{ id: 'prog_ysu_1',") # marker
content = re.sub(r"id: 'prog_ysu_1',.*?templateId: 'tpl_freeform'", "id: 'prog_ysu_1',\n    title: 'Տեղեկատվական Տեխնոլոգիաներ',\n    description: 'Բակալավրի կրթական ծրագիր',\n    organizationId: 'org_ysu',\n    templateId: 'tpl_university'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_ysu_2',.*?templateId: 'tpl_freeform'", "id: 'prog_ysu_2',\n    title: 'Մաթեմատիկա և Մեխանիկա',\n    description: 'Բակալավրի կրթական ծրագիր',\n    organizationId: 'org_ysu',\n    templateId: 'tpl_university'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_undp_1',.*?templateId: 'tpl_freeform'", "id: 'prog_undp_1',\n    title: 'Կայուն զարգացման նպատակներ (SDG)',\n    description: 'Համայնքային զարգացման ծրագիր',\n    organizationId: 'org_undp',\n    templateId: 'tpl_course'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_cba_1',.*?templateId: 'tpl_subject'", "id: 'prog_cba_1',\n    title: 'Ֆինանսական գրագիտություն',\n    description: 'Անձնական ֆինանսների կառավարում և խնայողություններ դպրոցականների համար',\n    organizationId: 'org_cba',\n    templateId: 'tpl_course'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_museum_1',.*?templateId: 'tpl_freeform'", "id: 'prog_museum_1',\n    title: 'Վիրտուալ Ցուցադրություններ',\n    description: 'Հայաստանի պատմության և մշակույթի վիրտուալ ցուցասրահներ',\n    organizationId: 'org_museum',\n    templateId: 'tpl_museum'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_polytech_1',.*?templateId: 'tpl_freeform'", "id: 'prog_polytech_1',\n    title: 'Արհեստական Բանականություն',\n    description: 'Մեքենայական ուսուցման հիմունքներ և կիրառություններ',\n    organizationId: 'org_polytech',\n    templateId: 'tpl_university'", content, flags=re.DOTALL)
content = re.sub(r"id: 'prog_ind_1',.*?templateId: 'tpl_freeform'", "id: 'prog_ind_1',\n    title: 'Լուսանկարչության Արվեստ',\n    description: 'Պրակտիկ դասընթաց',\n    organizationId: 'org_ind',\n    templateId: 'tpl_course'", content, flags=re.DOTALL)

# Fix nodes
# YSU nodes -> templateId: 'tpl_university', nodeTypeIds: type_course_year, type_uni_subject, type_lecture
content = content.replace("id: 'n_ysu_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder'", "id: 'n_ysu_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year'")
content = content.replace("id: 'n_ysu_f2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder'", "id: 'n_ysu_f2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year'")
content = content.replace("id: 'n_ysu_f1_t1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_folder'", "id: 'n_ysu_f1_t1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject'")
content = content.replace("id: 'n_ysu_f1_t1_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_freeform', nodeTypeId: 'type_file'", "id: 'n_ysu_f1_t1_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture'")

# CBA nodes -> tpl_course, type_module, type_material
content = content.replace("id: 'n_cba_g8', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_grade'", "id: 'n_cba_g8', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_module'")
content = content.replace("id: 'n_cba_g8_t1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_topic'", "id: 'n_cba_g8_t1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_material'")
content = content.replace("id: 'n_cba_g8_t1_l1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_subject', nodeTypeId: 'type_lesson'", "id: 'n_cba_g8_t1_l1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_material'")

# Museum nodes -> tpl_museum, type_hall, type_exhibit
content = content.replace("id: 'n_mus_f1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_freeform', nodeTypeId: 'type_folder'", "id: 'n_mus_f1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_hall'")
content = content.replace("id: 'n_mus_f1_l1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_freeform', nodeTypeId: 'type_file'", "id: 'n_mus_f1_l1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_exhibit'")

# IND nodes -> tpl_course, type_module, type_material
content = content.replace("id: 'n_ind_f1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_freeform', nodeTypeId: 'type_folder'", "id: 'n_ind_f1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_module'")
content = content.replace("id: 'n_ind_f1_l1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_freeform', nodeTypeId: 'type_file'", "id: 'n_ind_f1_l1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_material'")

with open('src/lib/data.ts', 'w') as f:
    f.write(content)

