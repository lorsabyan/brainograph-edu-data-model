import json

# The script will generate the new data.ts
content = """export interface Organization {
  id: string;
  name: string;
  defaultTemplateId?: string;
  logo?: string;
}

export interface NodeType {
  id: string;
  name: string;
  level: number;
  icon?: string;
  isNestable?: boolean;
}

export interface HierarchyTemplate {
  id: string;
  name: string;
  description: string;
  isFreeform: boolean;
  nodeTypes: NodeType[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  templateId: string;
  color?: string;
  imageUrl?: string;
}

export interface ContentNode {
  id: string;
  programId: string;
  organizationId: string;
  templateId: string;
  nodeTypeId: string;
  parentId: string | null;
  title: string;
  sortOrder: number;
  metadata?: {
    color?: string;
    imageUrl?: string;
    isPlayable?: boolean;
    url?: string;
    tags?: string[];
  };
  type?: 'node' | 'shortcut';
  targetNodeId?: string | null;
}

export const initialOrganizations: Organization[] = [
  { id: 'org_vaf', name: 'Վիզուալ Հայաստան Հիմնադրամ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ayb', name: 'Այբ Հիմնադրամ', defaultTemplateId: 'tpl_freeform' },
  { id: 'org_ysu', name: 'ԵՊՀ', defaultTemplateId: 'tpl_uni' },
  { id: 'org_undp', name: 'ՄԱԿ-ի զարգացման ծրագիր', defaultTemplateId: 'tpl_freeform' }
];

export const initialTemplates: HierarchyTemplate[] = [
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
    id: 'tpl_uni',
    name: 'Համալսարանական',
    description: 'Բարձրագույն ուսումնական հաստատություն',
    isFreeform: false,
    nodeTypes: [
      { id: 'type_faculty', name: 'Ֆակուլտետ', level: 1, icon: 'Building' },
      { id: 'type_course', name: 'Կուրս', level: 2, icon: 'GraduationCap' },
      { id: 'type_module', name: 'Մոդուլ', level: 3, icon: 'Layers' },
      { id: 'type_lecture', name: 'Դասախոսություն', level: 4, icon: 'FileText' }
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
];

export const initialPrograms: Program[] = [
  // VAF Programs
  { id: 'prog_vaf_1', title: 'Հայոց պատմություն', description: 'Աշխարհացույց նախագիծ', organizationId: 'org_vaf', templateId: 'tpl_subject', color: '#f59e0b' },
  { id: 'prog_vaf_2', title: 'Համաշխարհային պատմություն', description: 'Աշխարհացույց նախագիծ', organizationId: 'org_vaf', templateId: 'tpl_subject', color: '#d97706' },
  { id: 'prog_vaf_3', title: 'Աշխարհագրություն', description: 'Աշխարհացույց նախագիծ', organizationId: 'org_vaf', templateId: 'tpl_subject', color: '#10b981' },
  { id: 'prog_vaf_4', title: 'Հայ գրականություն', description: 'Աշխարհացույց նախագիծ', organizationId: 'org_vaf', templateId: 'tpl_subject', color: '#8b5cf6' },
  { id: 'prog_vaf_5', title: 'Սիմֆոնիկ ԴասA', description: 'Արվեստ և Երաժշտություն', organizationId: 'org_vaf', templateId: 'tpl_freeform', color: '#ec4899' },
  { id: 'prog_vaf_6', title: 'Կլիմայական արկղիկ', description: 'Բնապահպանություն', organizationId: 'org_vaf', templateId: 'tpl_freeform', color: '#06b6d4' },
  
  // Others
  { id: 'prog_ayb_1', title: 'Արհեստական Բանականություն', description: 'Ինտենսիվ կուրս ավագ դպրոցականների համար', organizationId: 'org_ayb', templateId: 'tpl_freeform', color: '#ea580c' },
  { id: 'prog_ysu_1', title: 'Ինֆորմատիկա և Կիրառական Մաթեմատիկա', description: 'Բակալավրիատի ծրագիր', organizationId: 'org_ysu', templateId: 'tpl_uni', color: '#2563eb' },
  { id: 'prog_undp_1', title: 'Կայուն Զարգացման Նպատակներ (SDG)', description: 'Իրազեկման ծրագիր', organizationId: 'org_undp', templateId: 'tpl_freeform', color: '#3b82f6' }
];

export const initialNodes: ContentNode[] = [
  // prog_vaf_1: Հայոց պատմություն
  { id: 'n_v1_g6', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '6-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_v1_g7', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '7-րդ դասարան', sortOrder: 2, type: 'node' },
  { id: 'n_v1_g8', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '8-րդ դասարան', sortOrder: 3, type: 'node' },
  
  { id: 'n_v1_g6_t1', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_v1_g6', title: 'Վանի Թագավորություն (Ուրարտու)', sortOrder: 1, type: 'node' },
  { id: 'n_v1_g6_t2', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_v1_g6', title: 'Երվանդունիներ և Արտաշեսյաններ', sortOrder: 2, type: 'node' },
  
  { id: 'n_v1_g6_t1_l1', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_v1_g6_t1', title: 'Տուշպա մայրաքաղաքի հիմնադրումը', sortOrder: 1, metadata: { isPlayable: true }, type: 'node' },
  { id: 'n_v1_g6_t2_l1', programId: 'prog_vaf_1', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_v1_g6_t2', title: 'Տիգրան Բ Մեծ', sortOrder: 1, metadata: { isPlayable: true }, type: 'node' },

  // prog_vaf_3: Աշխարհագրություն
  { id: 'n_v3_g6', programId: 'prog_vaf_3', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '6-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_v3_g7', programId: 'prog_vaf_3', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '7-րդ դասարան', sortOrder: 2, type: 'node' },
  
  { id: 'n_v3_g6_t1', programId: 'prog_vaf_3', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_v3_g6', title: 'Մայրցամաքներ և Օվկիանոսներ', sortOrder: 1, type: 'node' },
  { id: 'n_v3_g6_t1_l1', programId: 'prog_vaf_3', organizationId: 'org_vaf', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_v3_g6_t1', title: 'Աֆրիկա մայրցամաքը', sortOrder: 1, type: 'node' },
  
  // prog_vaf_5: Սիմֆոնիկ ԴասA
  { id: 'n_v5_f1', programId: 'prog_vaf_5', organizationId: 'org_vaf', templateId: 'tpl_freeform', nodeTypeId: 'type_folder', parentId: null, title: 'Ավագ Դպրոցի Նյութեր', sortOrder: 1, metadata: { color: '#ec4899' }, type: 'node' },
  { id: 'n_v5_f1_l1', programId: 'prog_vaf_5', organizationId: 'org_vaf', templateId: 'tpl_freeform', nodeTypeId: 'type_file', parentId: 'n_v5_f1', title: 'Բեթհովեն - 5-րդ Սիմֆոնիա', sortOrder: 1, metadata: { url: 'https://youtube.com' }, type: 'node' },

  // prog_ysu_1: ԵՊՀ
  { id: 'ysu_fac_1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_uni', nodeTypeId: 'type_faculty', parentId: null, title: 'Ինֆորմատիկայի և Կիրառական Մաթեմատիկայի Ֆակուլտետ', sortOrder: 1, metadata: { color: '#2563eb' }, type: 'node' },
  { id: 'ysu_c1_1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_uni', nodeTypeId: 'type_course', parentId: 'ysu_fac_1', title: 'Կուրս 1', sortOrder: 1, type: 'node' },
  { id: 'ysu_mod_1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_uni', nodeTypeId: 'type_module', parentId: 'ysu_c1_1', title: 'Ալգորիթմների Հիմունքներ', sortOrder: 1, type: 'node' },
  { id: 'ysu_lec_1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_uni', nodeTypeId: 'type_lecture', parentId: 'ysu_mod_1', title: 'Դասախոսություն 1: Ներածություն', sortOrder: 1, type: 'node' }
];

export const mockSlideshows: Record<string, { title: string, slides: { title: string, content: string }[] }> = {
  'n_v1_g6_t2_l1': {
    title: 'Տիգրան Բ Մեծ - AI Սահիկաշար',
    slides: [
      { title: 'Ներածություն', content: 'Տիգրան Մեծը Արտաշեսյան արքայատոհմի ամենահզոր արքան էր (Ք.ա. 95 - 55 թթ.):' },
      { title: 'Նվաճումներ', content: 'Նրա օրոք Հայաստանը դարձավ տարածաշրջանի ամենահզոր տերությունը՝ ձգվելով Կասպից ծովից մինչև Միջերկրական ծով։' },
      { title: 'Տիգրանակերտ', content: 'Տիգրան Մեծը կառուցեց Տիգրանակերտ մայրաքաղաքը, որը դարձավ կարևոր տնտեսական և մշակութային կենտրոն։' }
    ]
  }
};
"""

with open('src/lib/data.ts', 'w') as f:
    f.write(content)
