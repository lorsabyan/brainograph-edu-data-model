export interface Organization {
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
  targetAudience?: string[];
  curriculum?: string;
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
  { id: 'org_vaf', name: '«Վիզուալ Հայաստան» հիմնադրամ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ayb', name: '«Այբ» կրթական հիմնադրամ', defaultTemplateId: 'tpl_subject' },
  { id: 'org_ysu', name: 'Երևանի Պետական Համալսարան (ԵՊՀ)', defaultTemplateId: 'tpl_university' },
  { id: 'org_undp', name: 'ՄԱԿ-ի զարգացման ծրագիր (UNDP)', defaultTemplateId: 'tpl_course' },
  { id: 'org_cba', name: 'ՀՀ Կենտրոնական Բանկ', defaultTemplateId: 'tpl_course' },
  { id: 'org_museum', name: 'Հայաստանի Պատմության Թանգարան', defaultTemplateId: 'tpl_museum' },
  { id: 'org_polytech', name: 'ՀԱՊՀ (Պոլիտեխնիկ)', defaultTemplateId: 'tpl_university' },
  { id: 'org_ind', name: 'Անկախ Փորձագետներ (Անհատներ)', defaultTemplateId: 'tpl_course' }
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
];

export const nodeTypes: NodeType[] = [
  ...initialTemplates.flatMap(t => t.nodeTypes)
];

const subjects = [
  "Հայոց պատմություն", "Համաշխարհային պատմություն", "Աշխարհագրություն", 
  "Հայ գրականություն", "Իմ հայրենիքը", "Իմ հայրենիքը և աշխարհը", "Արվեստ", 
  "Ես և շրջակա աշխարհը", "Ռազմարվեստի պատմություն", "Երաժշտություն", 
  "Նախագծային աշխատանք", "Սիմֆոնիկ ԴասA", "Իմ Աշխարհացույցը", "Կլիմայական արկղիկ"
];

const colors = [
  '#f59e0b', '#d97706', '#10b981', '#8b5cf6', '#3b82f6', '#0ea5e9', '#ec4899',
  '#14b8a6', '#f43f5e', '#a855f7', '#64748b', '#06b6d4', '#eab308', '#22c55e'
];

export const initialPrograms: Program[] = [
  ...subjects.map((subj, index) => {
    const isSupplementary = subj === 'Նախագծային աշխատանք' || subj === 'Սիմֆոնիկ ԴասA' || subj === 'Կլիմայական արկղիկ' || subj === 'Իմ Աշխարհացույցը';
    return {
      id: `prog_${index}`,
      title: subj,
      description: 'Աշխարհացույց նախագծի շրջանակներում ստեղծված ուսումնական նյութեր',
      organizationId: 'org_vaf',
      templateId: subj === 'Նախագծային աշխատանք' || subj === 'Սիմֆոնիկ ԴասA' || subj === 'Կլիմայական արկղիկ' ? 'tpl_freeform' : 'tpl_subject',
      color: colors[index],
      targetAudience: isSupplementary ? ['դպրոցական հավելյալ'] : ['դպրոցական'],
      curriculum: 'Աշխարհացույց'
    };
  }),
  {
    id: 'prog_ayb_1',
    title: 'Մաթեմատիկա',
    description: 'Այբ կրթական հիմնադրամի մաթեմատիկայի ծրագիր',
    organizationId: 'org_ayb',
    templateId: 'tpl_subject',
    color: '#f97316',
    targetAudience: ['դպրոցական', 'դպրոցական հավելյալ'],
    curriculum: 'Արարատյան բակալավրիատ'
  },
  {
    id: 'prog_ayb_2',
    title: 'Ֆիզիկա',
    description: 'Այբ կրթական հիմնադրամի ֆիզիկայի ծրագիր',
    organizationId: 'org_ayb',
    templateId: 'tpl_subject',
    color: '#ef4444',
    targetAudience: ['դպրոցական', 'դպրոցական հավելյալ'],
    curriculum: 'Արարատյան բակալավրիատ'
  },
  {
    id: 'prog_ysu_1',
    title: 'Տեղեկատվական Տեխնոլոգիաներ',
    description: 'Բակալավրի կրթական ծրագիր',
    organizationId: 'org_ysu',
    templateId: 'tpl_university',
    color: '#0284c7',
    targetAudience: ['բուհական']
  },
  {
    id: 'prog_ysu_2',
    title: 'Մաթեմատիկա և Մեխանիկա',
    description: 'Բակալավրի կրթական ծրագիր',
    organizationId: 'org_ysu',
    templateId: 'tpl_university',
    color: '#4338ca',
    targetAudience: ['բուհական']
  },
  {
    id: 'prog_undp_1',
    title: 'Կայուն զարգացման նպատակներ (SDG)',
    description: 'Համայնքային զարգացման ծրագիր',
    organizationId: 'org_undp',
    templateId: 'tpl_course',
    color: '#059669',
    targetAudience: ['մասնագիտական']
  },
  {
    id: 'prog_cba_1',
    title: 'Ֆինանսական գրագիտություն',
    description: 'Անձնական ֆինանսների կառավարում և խնայողություններ դպրոցականների համար',
    organizationId: 'org_cba',
    templateId: 'tpl_course',
    color: '#16a34a',
    targetAudience: ['դպրոցական', 'մասնագիտական']
  },
  {
    id: 'prog_museum_1',
    title: 'Վիրտուալ Ցուցադրություններ',
    description: 'Հայաստանի պատմության և մշակույթի վիրտուալ ցուցասրահներ',
    organizationId: 'org_museum',
    templateId: 'tpl_museum',
    color: '#9ca3af',
    targetAudience: ['դպրոցական հավելյալ', 'մասնագիտական']
  },
  {
    id: 'prog_polytech_1',
    title: 'Արհեստական Բանականություն',
    description: 'Մեքենայական ուսուցման հիմունքներ և կիրառություններ',
    organizationId: 'org_polytech',
    templateId: 'tpl_university',
    color: '#dc2626',
    targetAudience: ['բուհական']
  },
  {
    id: 'prog_ind_1',
    title: 'Լուսանկարչության Արվեստ',
    description: 'Պրակտիկ դասընթաց',
    organizationId: 'org_ind',
    templateId: 'tpl_course',
    color: '#db2777',
    targetAudience: ['մասնագիտական']
  }
];

export const initialNodes: ContentNode[] = [];


// Real Scraped K-12 Content Nodes from brainograph.com
const scrapedNodes: ContentNode[] = [
  {
    "id": "n_vaf_prog_0_g_4",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "6-րդ դասարան",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_20",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հայաստանը հնագույն շրջանում",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_20_l_52",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_20",
    "title": "Հայկական լեռնաշխարհը՝ հայերի հայրենիք",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_20_l_53",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_20",
    "title": "Հայկական լեռնաշխարհի դիրքը, սահմանները, գետերը, լճերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_20_l_76",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_20",
    "title": "Հայաստանի պատմավարչական բաժանումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_20_l_116",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_20",
    "title": "Մեծ Հայքի նահանգները և գավառները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_27",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հայկական լեռնաշխարհը՝ որպես մարդկության հնագույն բնօրրան",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_27_l_80",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_27",
    "title": "Հայկական լեռնաշխարհը՝ որպես մարդկության հնագույն բնօրրան",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_28",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Վաղ պետական կազմավորումները Հայաստանի տարածքում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_28_l_83",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_28",
    "title": "Վաղ պետական կազմավորումները Հայաստանի տարածքում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_30",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Վանի համահայկական թագավորությունը",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_30_l_88",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_30",
    "title": "Վանի թագավորության հիմնադրումը Ք․ա․ IX դարերում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_30_l_89",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_30",
    "title": "Վանի թագավորության հզորացումը (Մենուա, Արգիշտի I, Սարդուրի II)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_30_l_90",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_30",
    "title": "Թագավորության պայքարն արտաքին ուժերի դեմ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_30_l_91",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_30",
    "title": "Թագավորության անկումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_5",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հայկազուն-Երվանդականների թագավորությունը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_5_l_10",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_5",
    "title": "Երվանդականների թագավորության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_5_l_11",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_5",
    "title": "Երվանդականների թագավորությունը Ք․ա․ IV-III դարերում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_33",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Մեծ Հայքի Արտաշեսյան թագավորությունը",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_33_l_96",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_33",
    "title": "Հայկական թագավորությունների անկախացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_33_l_97",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_33",
    "title": "Արտաշես I-ի բարենորոգումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հայաստանը՝ աշխարհակալ տերություն",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37_l_100",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_37",
    "title": "Տիգրան II Մեծը և հայկական տերության ստեղծումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37_l_101",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_37",
    "title": "Տերության տարածքը և բնակչությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37_l_102",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_37",
    "title": "Հայ-հռոմեական պատերազմը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37_l_103",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_37",
    "title": "Մեծ Հայքի թագավորությունն Արտավազդ II-ի օրոք",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_37_l_104",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_37",
    "title": "Մեծ Հայքի թագավորությունը վերջին Արտաշեսյանների օրոք",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_40",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Մեծ Հայքի Արշակունյաց թագավորությունը (I-III դարեր)",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_40_l_110",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_40",
    "title": "Արշակունյաց արքայատոհմի հաստատումը Հայաստանում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_40_l_111",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_40",
    "title": "Հայաստանը II-III դարերում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_42",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հին Հայաստանի պետական կարգը, տնտեսությունը և հասարակական կառուցվածքը",
    "sortOrder": 9,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_42_l_113",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_42",
    "title": "Պետական կարգը և տնտեսությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_43",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Հին Հայաստանի մշակույթը",
    "sortOrder": 10,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_43_l_114",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_43",
    "title": "Վաղ և հին շրջանի մշակույթը (հոգևոր և նյութական)",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_103",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_4",
    "title": "Վանի թագավորություն (Ուրարտու) (մշակված է Սփյուռքի դպրոցների համար)",
    "sortOrder": 11,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_4_t_103_l_313",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_103",
    "title": "Վանի թագավորության ձևավորման պատմաաշխարհագրական միջավայրը. թագավորության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_103_l_314",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_103",
    "title": "Վանի թագավորության հզորացումն ու վերելքը (թագավորների բարեփոխումները. շինարարական գործունեությունը, բանակը, դիցարանը և պետական կառուցվածքը)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_103_l_315",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_103",
    "title": "Վանի թագավորության թուլացումն ու անկումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_4_t_103_l_316",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_4_t_103",
    "title": "Վանի թագավորության քաղաքակրթական ժառանգությունը (հոգևոր և նյութական մշակույթը)",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "7-րդ դասարան",
    "sortOrder": 40,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Հայոց քաղաքակրթության ձևավորման պատմաաշխարհագրական միջավայրը և Հայկական լեռնաշխարհի վաղ պետականությունները Ք.ա. III-I հազարամյակներում",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63_l_139",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_63",
    "title": "Հայկական քաղաքակրթության ձևավորման և զարգացման պատմաաշխարհագրական միջավայրը։ Հայոց հայրենիքը:",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63_l_140",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_63",
    "title": "Հայաստանի պատմավարչական հիմնական բաժանումները հնագույն շրջանից մինչև այսօր",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63_l_141",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_63",
    "title": "Հայկական լեռնաշխարհը որպես մարդկության զարգացման օրրան և հայոց քաղաքակրթության բնօրրան",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63_l_142",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_63",
    "title": "Հայերի ծագումնաբանությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_63_l_143",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_63",
    "title": "Հայկական լեռնաշխարհի վաղ պետականությունները Ք.ա. III-II հազարամյակներում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_233",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Վանի թագավորություն",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_233_l_144",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_233",
    "title": "Վանի թագավորության ձևավորման պատմաաշխարհագրական միջավայրը. թագավորության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_233_l_145",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_233",
    "title": "Վանի թագավորության հզորացումն ու վերելքը (թագավորների բարեփոխումները. շինարարական գործունեությունը, բանակը, դիցարանը և պետական կառուցվածքը)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_233_l_146",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_233",
    "title": "Վանի թագավորության թուլացումն ու անկումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_233_l_147",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_233",
    "title": "Վանի թագավորության քաղաքակրթական ժառանգությունը (հոգևոր և նյութական մշակույթը)",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Հայկազունի Երվանդյանների թագավորությունը: Հայաստանը Ք.ա. VII-III դդ.",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_150",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "Հայկազունի Երվանդյանների թագավորության ձևավորման պատմաաշխարհագրական միջավայրը. թագավորության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_151",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "Հայաստանի և Աքեմենյան Պարսկաստանի հարաբերությունները։ Հայաստանը Աքեմենյան տերության կազմում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_152",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "Ալեքսանդր Մակեդոնացու արշավանքները և Հայաստանը: Հայկազունի Երվանդյանների միասնական թագավորության վերականգնումը:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_153",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "Հայկական թագավորությունները Ք.ա. III դարում։ Ներքին և արտաքին մարտահրավերները:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_154",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "Հայկազունի Երվանդյանների թագավորության պետական կառավարման համակարգը, բանակը, տնտեսությունը, հասարակական կյանքը, առօրյա կյանքն ու կենցաղը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_67_l_155",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_67",
    "title": "  Քաղաքակրթական փոխազդեցությունները: Երվանդյան Հայաստանի մշակութային  ժառանգությունը:",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Հայկական թագավորությունները Ք.ա. II-I դդ.",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_156",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Մեծ Հայքի Արտաշեսյան թագավորության ձևավորման պատմաաշխարհագրական միջավայրը, հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_157",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Արտաշես I-ի պետականակերտ և միավորիչ գործունեությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_158",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Տիգրան II Մեծը և Հայկական աշխարհակալ տերության ստեղծումը․ տերության սահմանները, տարածքը, կառավարման համակարգը, բանակը, բնակչությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_159",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Հայոց պետությանը սպառնացող մարտահրավերները․ Արտաշատի պայմանագիրը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_160",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Արտաշեսյան Հայաստանի դիվանագիտական ձեռքբերումները: Արտավազդ II",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_161",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Հայկական թագավորությունները (Փոքր Հայք, Ծոփք, Կոմմագենե)",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_162",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Արտաշեսյան թագավորության պետական կառավարման համակարգը, բանակը, տնտեսությունը, հասարակական կյանքը, առօրյա կյանքն ու կենցաղը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_163",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Արտաշեսյան թագավորության թուլացումն ու անկումը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_68_l_164",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_68",
    "title": "Հելլենիստական դարաշրջանը Հայաստանում։ Հայկական մշակույթի զարգացման առանձնահատկություններն ու ձեռքբերումները Արտաշեսյանների օրոք",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Մեծ Հայքի Արշակունիների թագավորությունը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_231",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Աշխարհաքաղաքական իրադրությունը Մերձավոր Արևելքում: Հայկական պետությունը դրածո արքաների օրոք",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_232",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Պարթևա-հռոմեական հակամարտությունը և Հայաստանը։ Արշակունիների արքայատոհմի գահակալումը Հայաստանում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_233",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Արշակունիների ժառանգական իշխանության հաստատումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_234",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Հայաստանը և հարևան երկրները III դարում: Հայոց թագավորության վերականգնումը ու հզորացումը, Տրդատ III Մեծ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_235",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Քրիստոնեության առաջացումը և տարածումը: Քրիստոնեությունը հայոց քաղաքակրթության հիմնասյուն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_236",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Քրիստոնեական վարդապետությունը։ Աստվածաշունչ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_237",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Քրիստոնեության տարածումը Հայաստանում և հայաբնակ շրջաններում I-III դարերում։ Աբգար թագավոր, ս. Թադեոս և ս. Բարդուղիմեոս առաքյալներ։ Հայ Առաքելական Եկեղեցու հիմնադրումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_238",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Հայաստանը՝ առաջին քրիստոնյա պետություն. ս. Տրդատ Մեծ և ս. Գրիգոր Լուսավորիչ",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_239",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Հայոց եկեղեցական կառույցի ձևավորումն ու ամրապնդումը։ Հայոց եկեղեցու դերի ու ազդեցության ընդլայնումը տարածաշրջանում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_240",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Հայոց եկեղեցու նվիրապետությունը, եկեղեցիների կառուցվածքը և խորհուրդները",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_241",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Ավատատիրական հարաբերությունների ձևավորումն ու առանձնահատկությունները",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_243",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Կենտրոնական իշխանության զորեղացման փորձերը (Արշակ II, Պապ)",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_244",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Արշակունյաց թագավորության թուլացումն ու անկումը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_245",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Աշխարհիկ և հոգևոր իշխանությունների փոխհարաբերությունները IV-V դարերում։ Ազգային-եկեղեցական ժողովներ",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_246",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Արշակունյաց թագավորության պետական կառավարման համակարգը, բանակը, առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները",
    "sortOrder": 15,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_76_l_242",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_76",
    "title": "Հայկական հելլենիզմի մայրամուտը: Մշակութային ժառանգությունը",
    "sortOrder": 16,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Հայկական պետականության նախարարական շրջանը",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_193",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Տարածաշրջանի քաղաքական դրությունը V-VI դդ.:  Մարզպանական Հայաստանը և Պարսկաստանը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_194",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Վարդանանց պատերազմը։ Ավարայրի ճակատամարտը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_195",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Վահանանց պատերազմը։ Նվարսակի պայմանագիրը։ Ինքնիշխանության վերականգնումը Արևելյան Հայաստանում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_196",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": " Տիեզերական ժողովները և Հայոց եկեղեցին։ Քաղկեդոնի ժողովը և Ընդհանրական եկեղեցու պառակտումը։ Դվինի եկեղեցական ժողովները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_197",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Դրությունը Արևմտյան Հայաստանում VI դ․։ Պարսկա-բյուզանդական պատերազմը և Հայաստանը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_198",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Արաբական նվաճումները և Հայաստանը։ Հայաստանը Արաբական խալիֆայության կազմում: Հակաարաբական ապստամբությունները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_199",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Հայոց եկեղեցին VII - VIII դդ.",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_200",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Հայոց եկեղեցին և աղանդավորական շարժումները (մծղնեականներ, բորբորիտներ, պավլիկյաններ)",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_77_l_201",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_77",
    "title": "Տնտեսությունը, առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները Հայաստանում V-IX դարերում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_78",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Ազգային-քրիստոնեական մշակույթի ձևավորումն ու զարգացումը",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_78_l_204",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_78",
    "title": "Մշակութային իրավիճակը Հայաստանում V դարում: Հայոց գրերի, հայալեզու դպրության ստեղծման անհրաժեշտությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_78_l_205",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_78",
    "title": "Ս. Մեսրոպ Մաշտոցը և Հայոց այբուբենի ստեղծումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_78_l_206",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_78",
    "title": "Հայ մշակույթի ոսկեդարը և ազգային-քրիստոնեական մշակույթի զարգացումը V-IX դդ. (թարգմանական գրականությունը, հայ ինքնուրույն գրականության սկզբնավորումը, դպրոցը, պատմագրությունը, փիլիսոփայությունը, բնական գիտությունները, իրավագիտությունը, կերպարվեստը, ճարտարապետությունը, երաժշտությունը և կիրառական արվեստը)",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_78_l_207",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_78",
    "title": "Հայկական մշակույթի կարևոր ձեռքբերումները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_12",
    "title": "Բագրատունյաց թագավորությունը",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_222",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Պատմաաշխարհագրական միջավայրը: Քաղաքական դրությունը տարածաշրջանում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_223",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Հայոց պետության վերականգնումը: Բագրատունիների արքայատոհմի հաստատումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_224",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Պետական անկախության ամրապնդումը: Ներքին և արտաքին մարտահրավերները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_225",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Ենթակա թագավորությունները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_226",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Անիի թագավորության թուլացումն ու անկումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_227",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Հայոց եկեղեցին Բագրատունյաց ժամանակաշրջանում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_228",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Թոնդրակյան շարժումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_229",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Բագրատունյաց թագավորության պետական կառավարման համակարգը, բանակը տնտեսությունը: Առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_12_t_85_l_230",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_12_t_85",
    "title": "Բագրատունյաց թագավորության մշակութային ժառանգությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_13",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "13-րդ դասարան",
    "sortOrder": 111,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "10-րդ դասարան",
    "sortOrder": 112,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Հայկական լեռնաշխարհի վաղ պետական կազմավորումները Ք.ա. III-II հազարամյակներում",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75_l_190",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_75",
    "title": "Հայկական լեռնաշխարհը որպես հայոց քաղաքակրթության բնօրրան: Պետություն հասկացությունը և դրա ձևավորման, զարգացման և կայացման ուղիները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75_l_191",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_75",
    "title": "Հայկական լեռնաշխարհի վաղ պետականությունները Ք.ա. III հազարամյակում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75_l_192",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_75",
    "title": "Հայկական լեռնաշխարհի վաղ պետականությունները Ք.ա. II հազարամյակում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75_l_537",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_75",
    "title": "Վաղ պետական կազմավորումների հիմնադիր ցեղերի տեղաբնիկ ծագումնաբանությունը: Ընկերային-տնտեսական կյանքը:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_75_l_538",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_75",
    "title": "Քաղաքակրթական ձեռքբերումները և մշակութային կյանքը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Հայկական լեռնաշխարհի պետությունները Ք.ա. IX-III դարերում",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_202",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Վանի թագավորության հիմնադրման նախադրյալները և պետության կայացման ընթացքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_203",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Միասնական կենտրոնացված պետության ստեղծումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_539",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Թագավորությունից աշխարհակալություն: Վանի թագավորությունը տարածաշրջանային հզորագույն տերություն:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_540",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Վանի թագավորության թուլացումը և անկումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_541",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Վանի թագավորության պետական կարգը, բանակը, հասարակականտնտեսական և մշակութային կյանքը:",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_542",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Հայկազուն Երվանդյանների թագավորության հիմնադրումը: Հայաստանը և Աքեմենյան Իրանը Ք.ա. VI-IV դդ.:",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_543",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Հայոց պետությունները Ք.ա. IV-III դարում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_79_l_544",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_79",
    "title": "Հայկազուն Երվանդյանների թագավորության պետական կարգը, բանակը,հասարակական-տնտեսական և մշակութային կյանքը:",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Միասնական հայկական պետությունից մինչև աշխարհակալ տերություն",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_208",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Նոր աշխարհակարգի ձևավորումը Մերձավոր Արևելքում. Արտաշեսյանների թագավորության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_209",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Կենտրոնացված պետության ձևավորումը. Արտաշես I-ի բարեփոխումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_210",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Տիգրան II Մեծ: Միասնական հայկական պետությունից աշխարհակալ տերություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_211",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Տիգրան II Մեծի տերության ձևավորման աշխարհաքաղաքական միջավայրը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_545",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Հայաստանը ինքնուրույն դերակատար աշխարհաքաղաքական իրողություններում։ Արտավազդ II",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_546",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Արտաշեսյանների թագավորության անկումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_547",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Արտաշեսյանների թագավորության պետական կարգը, բանակը, հասարակական-տնտեսական կյանքը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_80_l_548",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_80",
    "title": "Արտաշեսյանների թագավորության պետական կարգը, բանակը, հասարակական-տնտեսական կյանքը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Մեծ Հայքի Արշակունյաց թագավորությունը",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_212",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Արշակունյաց թագավորության ձևավորման նախադրյալները. Հայաստանը երկու գերտերությունների միջև",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_213",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Հայաստանում քրիստոնեության ընդունումը որպես պետական կրոն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_560",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Եկեղեցի-պետություն փոխհարաբերությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_561",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Ավատատիրական հարաբերությունների ձևավորումը. օրինաչափություններ և առանձնահատկություններ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_562",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Թագավորական իշխանության ամրապնդման համար պայքարը (Արշակ II, Պապ)",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_563",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Թագավորության թուլացումը և անկումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_564",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Արշակունյաց Հայաստանի պետական կառավարման համակարգը, բանակը տնտեսությունը, ընկերային առօրեական կյանքը:",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_81_l_565",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_81",
    "title": "Արշակունյաց Հայաստանի մշակութային և քաղաքակրթական ձեռքբերումները",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Միասնական պետության բացակայությունից դեպի վերականգնում. պետականության դրսևորումները Հայաստանում V - XIX դդ.",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_261",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Նախարարական համակարգը V–VII դդ.: Մարզպանական Հայաստանի ևԱրևմտյան Հայաստանի վարչաքաղաքական և տնտեսական դրությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_262",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Նախարարական համակարգը VIII–IX դդ.",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_263",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Բագրատունյաց թագավորության հիմնադրումը. արտաքին ու ներքին նախադրյալները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_832",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Պայքար երկրի անկախության ամրապնդման համար",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_833",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Բագրատունյաց թագավորության հզորացումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_834",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Անի թագավորության և ենթակա թագավորությունների փոխհարաբերությունները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_835",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Անիի Բագրատունյաց թագավորության թուլացումն ու անկումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_836",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Բագրատունյաց Հայաստանի պետական կառավարման համակարգը, բանակը, տնտեսությունը, ընկերային առօրեական կյանքը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_837",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Բագրատունյաց Հայաստանի մշակութային և քաղաքակրթական ձեռքբերումները",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_88_l_838",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_88",
    "title": "Պետականության դրսևորումները Հայաստանում (XI դարի երկրորդ կես – XIX դար)",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Հայկական պետությունը Կիլիկիայում",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_839",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Հայկական միջավայրի ձևավորման նախադրյալները Կիլիկիայում և շրջակա տարածքներում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_840",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Պետական կառավարման համակարգում հայկական և տեղական ավանդույթների միաձուլումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_841",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Բազմամշակութային միջավայրը Կիլիկիայում. հայկական քաղաքակրթությունը Կիլիկիայում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_842",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Կիլիկյան թագավորությունը և Հայոց կաթողիկոսության համահայկականության հայեցակարգային գաղափարը. եկեղեցի-պետություն համագործակցությունը:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_843",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Թագավորության արտաքին քաղաքական ուղղությունները և դիվանագիտությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_844",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Թագավորության անկումը. հայկական պետականության դրսևորումները Կիլիկիայում միասնական պետության անկումից հետո",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_845",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Կիլիկյան Հայաստանի պետական կառավարման համակարգը, բանակը, տնտեսությունը, ընկերային առօրեական կյանքը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_190_l_846",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_190",
    "title": "Կիլիկյան Հայաստանի մշակութային և քաղաքակրթական ձեռքբերումները",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Հայոց պետականության նորագույն շրջանը",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_996",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի Առաջին Հանրապետության հռչակումը: Պետականաշինության գործընթացը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_997",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հանրապետությանը սպառնացող մարտահրավերները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_998",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի Առաջին Հանրապետության տարածքային հիմնախնդիրները 1918-1920 թթ.։ Միջազգային դրությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_999",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Առաջին հանրապետության մշակութային կյանքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1000",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի Առաջին Հանրապետության անկումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1001",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Խորհրդային վարչակարգի հաստատումը Հայաստանում: Իշխանության մարմինների ձևավորումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1002",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Խորհրդային Հայաստանի տարածքային հիմնախնդիրները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1003",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "ԽՍՀՄ կազմավորումը։ Խորհրդային Հայաստանը ԽՍՀՄ կազմում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1004",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հասարակական-քաղաքական, տնտեսական կյանքը Խորհրդային Հայաստանում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1005",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Մշակութային կյանքը Խորհրդային Հայաստանում",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1006",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի անկախության հռչակագիրը: Անկախության հանրաքվեի իրավական նշանակությունը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1007",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի Երրորդ Հանրապետության կայացման գործընթացը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1008",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Հայաստանի Երրորդ Հանրապետությունը և արդի աշխարհաքաղաքական գործընթացները",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_220_l_1009",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_220",
    "title": "Արցախի Հանրապետությունը",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_16_t_138",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_16",
    "title": "Պատմության ժամանակացույց",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_16_t_138_l_453",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_16_t_138",
    "title": "Պետություններ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 183,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Հայաստանը XI-XIV դդ.",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_462",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Իրադրությունը տարածաշրջանում և Հայաստանում Անիի թագավորության անկումից հետո։ Հայկական թագավորությունները և իշխանությունները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_463",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Թյուրք-սելջուկները և Հայաստանը: Զանգվածային արտագաղթը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_464",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Հայաստանը Զաքարյանների օրոք",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_465",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Մոնղոլական արշավանքները. Հայաստանի քաղաքական իրավիճակը XIII դարի կեսերին և XIV դարում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_466",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Տնտեսությունը, առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները Հայաստանում XI-XIV դարերում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_106_l_467",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_106",
    "title": "Հայոց եկեղեցին զարգացած միջնադարում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Կիլիկյան Հայաստանը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_329",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Պատմաաշխարհագրական տարածքը: Աշխարհաքաղաքական իրավիճակը: Ռուբինյան իշխանության հիմնադրումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_330",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Ռուբինյան իշխանության ամրապնդումն ու հզորացումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_331",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Թագավորության հռչակումը: Լևոն Մեծագործի ներքին և արտաքին քաղաքականությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_332",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Հայրապետական աթոռի հաստատումը Կիլիկյան Հայաստանում։ Եկեղեցի-պետություն հարաբերությունները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_333",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Հեթումյան արքայատոհմի հաստատումը: Հայ-մոնղոլական հարաբերությունները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_334",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Ներքաղաքական ճգնաժամի խորացումը. հոգևոր ինքնուրույնությանն ու ազգային ինքնությանը սպառնացող մարտահրավերները: Պետության թուլացումն ու անկումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_335",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Կիլիկիայի հայկական պետության պետական կառավարման համակարգը, բանակը, տնտեսությունը, առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_107_l_336",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_107",
    "title": "Կիլիկիայի հայկական թագավորության քաղաքակրթական ժառանգությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_134",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Ազգային-քրիստոնեական մշակույթը X-XIV դդ.",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_134_l_441",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_134",
    "title": "Հայկական մշակույթի վերելքի նախադրյալները X-XIV դդ.",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_134_l_442",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_134",
    "title": "Հայկական մշակույթի զարգացումը X-XV դարերում։ Հայոց մշակույթի Արծաթե դարը։ Գրականություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_134_l_443",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_134",
    "title": "Նշանավոր ուսումնագիտական կենտրոնները։ Գիտություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_134_l_444",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_134",
    "title": "Հայկական մշակույթի կարևոր ձեռքբերումները, տեղն ու դերը համաշխարհային մշակույթի գանձարանում: Արվեստ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Հայաստանը XV-XVII դդ.",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136_l_447",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_136",
    "title": "Իրադրությունը Հայաստանում XV դարում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136_l_448",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_136",
    "title": "Կաթողիկոսական աթոռի վերահաստատումը Սբ. Էջմիածնում։ Հայոց եկեղեցու նվիրապետական աթոռները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136_l_449",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_136",
    "title": "Թուրք-պարսկական պատերազմները XVI-XVII դդ. և Հայաստանը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136_l_450",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_136",
    "title": "Հայ ազատագրական շարժման նախադրյալներն ու առանձնահատկությունները: Միասնական պետության վերականգնմանն ուղղված առաջին ձեռնարկումները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_136_l_451",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_136",
    "title": "Հայ ազատագրական շարժման նոր փուլը․ գաղտնի խորհրդաժողովները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Պետական անկախության վերականգնման համար պայքարը XVIII դարում",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_494",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Հայաստանի ներքին և արտաքին դրությունը XVIII դարում: Ազատագրական պայքարի աշխուժացումը և Հայոց եկեղեցին",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_495",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Խնդրագրերից անցում ծրագրերի: Իսրայել Օրու գործունեությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_496",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Անդրկովկասը Պարսկաստանի, Օսմանյան Թուրքիայի և Ռուսաստանի շահերի բախման կիզակետում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_497",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Ազատագրական պատերազմն Արցախում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_498",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Ազատագրական պատերազմը Սյունիքում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_499",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Հայկական ինքնավարությունն Արցախում և Սյունիքում։ Խամսայի մելիքությունները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_500",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Հովսեփ Էմինը և հայ ազատագրական շարժումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_501",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Մադրասի խմբակի քաղաքական հրապարակախոսությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_502",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Հայաստանի ազատագրության ծրագրերը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_143_l_503",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_143",
    "title": "Հայ վաճառականությունը և հայ առևտրական կապիտալի դերը միջազգային շուկայում",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Հայաստանը և հայ ժողովուրդը XIX դարում",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_504",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Տարածաշրջանի և Հայաստանի ներքաղաքական ու արտաքին քաղաքական իրավիճակը XIX դարի սկզբին։ Պարսկաստանի, Օսմանյան Թուրքիայի և Ռուսաստանի շահերի բախումն Անդրկովկասում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_505",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Հայաստանը XIX դարի սկզբին: Ռուս-պարսկական պատերազմները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_506",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Հայաստանը XIX դարի սկզբին: Ռուս-օսմանյան պատերազմները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_507",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Հայաստանի սոցիալ-տնտեսական և իրավաքաղաքական դրությունը Ռուսական ու Օսմանյան կայսրությունների կազմում XIX դ.",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_508",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Արևելահայերի և արևմտահայերի առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները XIX դարում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_509",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Զեյթունի ինքնավարությունը: 1862 թ. Զեյթունի հերոսամարտը։ Արևմտահայերի ազգային սահմանադրությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_510",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Ռուսաստանի և Oսմանան Թուրքիայի ռազմաքաղաքական ծրագրերը և Հայաստանը։ 1877-1878 թթ. ռուս-օսմանյան պատերազմը: Հայկական հարցի միջազգայնացումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_511",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Հայ հասարակական-քաղաքական հոսանքների, ազատագրական խմբակների ու կազմակերպությունների ձևավորումը, գործունեությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_512",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Հայ ազգային կուսակցությունների ձևավորումը, ծրագրերը, գործունեությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_513",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Ազատագրական պայքարի վերելքը: Ֆիդայական շարժումը։ Առաջացման նախադրյալները, շարժման ծավալումը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_144_l_514",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_144",
    "title": "Արևմտահայերի կոտորածները և ինքնապաշտպանական մարտերը 1890-ական թթ․",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_20",
    "title": "Հայկական գաղթավայրերը: Ազգային մշակույթը Մայր հայրենիքում և գաղթօջախներում (XV-XX դարի սկիզբ)",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_714",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Հայկական գաղթօջախները (առաջացման պատճառները, աշխարհագրությունը, ազգային-համայնական կյանքի կազմակերպման սկզբունքները, ձևերը):",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_715",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Հայկական մշակույթի զարգացումը Մայր հայրենիքում և գաղթավայրերում (կենտրոնները, մշակույթի զարգացման նախադրյալները, պայմանները, օրինաչափությունները, ընդհանրությունները, առանձնահատկությունները)։",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_716",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Դպրոցները և կրթական գործը:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_717",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Գրատպությունը: Հայ պարբերական մամուլի սկզբնավորումը և զարգացումը:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_718",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Գիտության զարգացումը (բնական և հասարակական գիտություններ):",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_719",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Գրականությունը: Ճարտարապետությունը: Արվեստը:",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_720",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Հայոց եկեղեցու դերը հայապահպանության և ազգային մշակույթի զարգացման ու պահպանման գործում:",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_721",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Մխիթարյան միաբանության ներդրումը հայ մշակույթում:",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_20_t_173_l_722",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_20_t_173",
    "title": "Մշակույթի հիմնական ձեռքբերումերը և նշանավոր մշակութային գործիչները: Հայոց մշակույթի ներդրումը համաշխարհային մշակույթի համատեքստում:",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "9-րդ դասարան",
    "sortOrder": 244,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_24",
    "title": "Հայ ժողովրդի պատմությունը XX դարի սկզբին",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_691",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Ցարիզմի ազգային-գաղութային քաղաքականության նոր դրսևորումը: Հայ ժողովրդի պայքարը ցարական ինքնակալության դեմ: Հայ-թաթարական բախումները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_692",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Ազգային շարժումների ծավալումը Արևմտյան Հայաստանում XX դ. սկզբին",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_693",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Երիտթուրքերը համիդյան ծրագրի շարունակողներ: Հայկական հարցը 1912-1914 թթ․",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_694",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Հայերի մասնակցությունն Առաջին աշխարհամարտին: Կամավորական շարժումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_695",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Հայոց ցեղասպանությունը և հայերի հայրենազրկումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_696",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "1915 թ. ինքնապաշտպանական մարտերը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_697",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Մեծ տերությունների, առաջադեմ գործիչների և կազմակերպությունների արձագանքը, Հայոց ցեղասպանության պատասխանատուների դատավարությունը: Նեմեսիս գործողություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_169_l_698",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_169",
    "title": "Հայոց ցեղասպանության միջազգային ճանաչման գործընթացը: Պահանջատիրություն:",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_24",
    "title": "Հայաստանը անկախության վերականգնման ճանապարհին: Հայաստանի առաջին Հանրապետությունը ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_820",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Ռուսական հեղափոխություններն ու Հայաստանը։ Ազգային-քաղաքական կյանքի վերելքը։",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_821",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Խորհրդային Ռուսաստանը և Հայկական հարցը։ Բրեստ-Լիտովսկի հաշտությունը։ Ազգային զինուժի ստեղծումը։",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_822",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Անկախության վերականգնման գործընթացը։ Թուրքական զորքերի ներխուժումն Այսրկովկաս և Հայաստան։ Տրապիզոնի բանակցությունները:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_823",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Մայիսյան հերոսամարտերը: Հայաստանի Հանրապետության հռչակումը։ Բաթումի պայմանագիրը: Բաքվի գոյամարտը:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_824",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Հայաստանի Հանրապետության կայացումը։ Արամ Մանուկյան։ Ներքին դրությունը։ Պետական մարմինների ձևավորումը։ Բանակի ստեղծումը։",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_825",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Հասարակական-քաղաքական կյանքը, սոցիալ-տնտեսական վիճակը, հասարակական հարաբերությունները առօրյա կյանքն ու կենցաղը Հայաստանի Հանրապետությունում։",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_826",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Հայոց եկեղեցու գործունեությունը 1918-1920 թթ․։ Եկեղեցի-պետություն դաշնագիրը:",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_827",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "ՀՀ տարածքային հիմնախնդիրները 1918-1920 թթ․։ Հայ-վրացական պատերազմը։",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_828",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Պայքար մուսաֆաթական Ադրբեջանի նկրտումների դեմ։ Հայերի էթնիկ զտումների և ցեղասպանական քաղաքականությունը Ադրբեջանում 1918-1920 թթ.։",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_829",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Միջազգային հարաբերությունները և ՀՀ արտաքին քաղաքականությունը 1918-1920 թթ․։ Փարիզի խորհրդաժողովը և Հայկական հարցը։ Սևրի պայմանագիրը։",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_830",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Թուրք-հայկական պատերազմը։ Հայաստանի Հանրապետության անկումը:",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_181_l_831",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_181",
    "title": "Հայաստանի Առաջին Հանրապետության կրթամշակութային ձեռքբերումները։",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_24",
    "title": "Խորհրդային Հայաստանը 1920-1991 թթ.",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_759",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Խորհրդային վարչակարգի հաստատումը Հայաստանում, իշխանության մարմինների ստեղծումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_760",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Խորհրդային Հայաստանի տարածքային հիմնախնդիրները 1920-1923 թթ.",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_761",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Մոսկվայի և Կարսի պայմանագրերը։ Հայկական հարցը Լոնդոնի, Լոզանի խորհրդաժողովներում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_762",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Սոցիալ-տնտեսական և հասարակական-քաղաքական կյանքը Խորհրդային Հայաստանում։",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_763",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Անհատի պաշտամունքի ձևավորումը ԽՍՀՄ-ում: Քաղաքական հալածանքներն ու զանգվածային բռնությունները:",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_764",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Խորհրդային իշխանության քաղաքականությունը եկեղեցու նկատմամբ: Բռնություններ և հալածանքներ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_765",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Հայ ժողովրդի մասնակցությունը Երկրորդ աշխարհամարտին",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_766",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Խորհրդահայ հասարակության առօրյա կյանքն ու կենցաղը։ Խորհրդային Հայաստանի մշակույթը 1920-1991 թթ․",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_767",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Լեռնային Ղարաբաղը Ադրբեջանի կազմում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_768",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Ազգային զարթոնքը։ Արցախյան հիմնախնդիրը և շարժման սկիզբը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_769",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Համազգային շարժման ծավալումը: 1988 թ. երկրաշարժը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_770",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Բաքվի կոտորածները: Հայերի բռնագաղթը: Խորհրդային բանակի և Ադրբեջանի գործողությունները ԼՂԻՄ-ում",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_771",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "ՀՀ և ԼՂՀ անկախացման գործընթացը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_182_l_772",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_182",
    "title": "Հայոց Եկեղեցին նորանկախ պետության ստեղծման տարիներին",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_24",
    "title": "Հայաստանի Հանրապետությունը և Արցախի Հանրապետությունը արդի փուլում",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_883",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Ազատագրական պայքարի զինված փուլը (1990-1994 թթ.): Ապրիլյան քառօրյա պատերազմը։ Արցախյան հիմնախնդրի միջազգայնացումը:",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_884",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Հայաստանի Հանրապետության կայացման գործընթացը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_885",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Հայաստանի Հանրապետության տնտեսական, հասարակական-քաղաքական կյանքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_886",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Հայաստանի Հանրապետության արտաքին քաղաքականությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_887",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Արցախի Հանրապետության կայացման գործընթացը: Արցախի Հանրապետության արտաքին քաղաքականությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_888",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Եկեղեցի-պետություն փոխհարաբերություններն արդի փուլում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_197_l_889",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_197",
    "title": "Հայկական մշակույթն արդի շրջանում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_24",
    "title": "Հայկական սփյուռքը ձևավորումից մինչև մեր օրերը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222_l_1014",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_222",
    "title": "Հայկական սփյուռքի ձևավորումը, պայմանները, մարտահրավերները, խոշոր կենտրոնները: «Ազգային օջախի» և հայ գաղթականության խնդիրը Ազգերի լիգայում:",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222_l_1015",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_222",
    "title": "Սփյուռքի և Խորհրդային Հայաստանի հարաբերությունները: Սփյուռքահայերի հայրենադարձությունը, փուլերը, արդյունքները:",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222_l_1016",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_222",
    "title": "1990-ական թթ. զանգվածային արտագաղթը և Սփյուռքի ստվարացումը: Սփյուռքի հիմնական կենտրոնները և նոր համայնքներն այսօր:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222_l_1017",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_222",
    "title": "Սփյուռքահայերի պայքարը Հայկական հարցի լուծման և Հայոց ցեղասպանության միջազգային ճանաչման և հայապահպանության համար:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_24_t_222_l_1018",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_24_t_222",
    "title": "Սփյուռքահայ մշակույթը, համաշխարհային ձեռքբերումներ: Սփյուռքահայ նշանավոր գործիչներ:",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "11-րդ դասարան",
    "sortOrder": 296,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Պայքար պետականության և ինքնիշխանության վերականգման համար V-VII դդ.",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1174",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Ինքնության կայացման փուլերն ու մարտահրավերները վաղ միջնադարում հայ իրականության մեջ: Նախարարական համակարգը՝ ինքնության պահպանման գրավական",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1175",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Մշակութային ինքնության ձևավորումը. Մաշտոցյան գրերի գյուտը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1176",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Հայ մշակույթի Ոսկեդարը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1177",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Վարդանանց պատերազմ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1178",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Վահանանց պատերազմը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1179",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Համահայկական միասնական պետության վերականգնման համար պայքարը VI-VII դդ․ (Արևմտյան Հայաստան)",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_248_l_1180",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_248",
    "title": "Համահայկական միասնական պետության վերականգնման համար պայքարը VI-VII դդ․ (Արևելյան Հայաստան)",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Ինքնությանը սպառնացող մարտահրավերները VII-IX դդ.",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253_l_1212",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_253",
    "title": "Արաբական արշավանքները և Հայաստանը VII դարի երկրորդ կեսին: Ինքնավար Հայաստան",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253_l_1213",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_253",
    "title": "Հայոց նախարարական համակարգը Արաբական տիրապետության շրջանում: Հակաարաբական պայքարը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253_l_1214",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_253",
    "title": "Օտարացեղ բնակչության աստիճանական ներթափանցումը Հայաստան. հայերի արտագաղթի սկզբնավորումը: Խալիֆայության դեմ պայքարը 852-855 թթ․",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253_l_1215",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_253",
    "title": "Աղանդավորական շարժումները հայ իրականության մեջ VII-IX դդ.",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_253_l_1216",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_253",
    "title": "Մշակութային ինքնության վերելքը  VII-IX դդ.: Հայոց էպոսը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Ազատագրական պայքարը  XI–XVI դարերում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1206",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Աշխարհաքաղաքական նոր իրավիճակը աշխարհում և տարածաշրջանում XI-XVI դարերում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1207",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Սելջուկ-թյուրքերի արշավանքը և Հայաստանը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1208",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Պայքար սելջուկ-թյուրքերի դեմ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1209",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Մոնղոլական արշավանքները և հայ ժողովրդի պայքարը մոնղոլների դեմ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1210",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Հայաստանին սպառնացող մարտահրավերները XIV-XVI դդ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_252_l_1211",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_252",
    "title": "Մշակույթը որպես ինքնության պահպանման գրավական XI-XVI դդ․",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Ազատագրական պայքարի գաղափարական և զինված փուլերը (XVI–XIX դարի կես)",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1217",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Աշխարհաքաղաքական նոր իրավիճակը աշխարհում և տարածաշրջանում XVI-XVII դարերում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1218",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Ինքնիշխանության համար պայքարի աշխուժացումը: Գաղտնի խորհրդաժողովները: Իսրայել Օրի",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1219",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Ազատագրական պայքարը Սյունիքում և Արցախում XVIII դ.: Խամսային մելիքությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1220",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Պետականության և ինքնիշխանության համար պայքարը XVIII դ. երկրորդ կեսին: Հովսեփ Էմին",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1221",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Հայկական լուսավորականություն: Մադրասի խմբակը. հանրապետության գաղափարը: Հայաստանի ազատագրության ծրագրերը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1222",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Արևելյան Հայաստանը և Արևմտյան Հայաստանը XIX դ․ սկզբներին",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1223",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Հայաստանը XIX դ․ 30-40 ական թթ․",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_254_l_1224",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_254",
    "title": "Ազգային մշակույթը Մայր հայրենիքում և գաղթօջախներում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Ազատագրական շարժման վերելքը XIX դ․ երկրորդ կեսին XX դ․ սկզբին",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1225",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Հայաստանի սոցիալ-տնտեսական դրությունը։ Հայկական հարցի միջազգայնացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1226",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Հասարակական-քաղաքական հոսանքները։ Ազգային-հասարակական շարժումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1227",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Ազատագրական կազմակերպությունները։ Հայ ազգային կուսակցությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1228",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Ազատագրական պայքարի վերելքը։ Հայդուկային շարժումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1229",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Արևմտահայերի ցեղասպանությյունը։ Ազատագրական պայքարը 1894-1896 թթ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1230",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Հայ ժողովրդի ինքնության պայքարը Ռուսական կայսրության շրջանում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1231",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Ազատագրական պայքարն Արևմտյան Հայաստանում XX դ․ սկզբին",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_255_l_1232",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_255",
    "title": "Երիտթուրքերի հեղաշրջումը և Արևմտյան Հայաստանը։ Հայկական հարցը 1912-1914 թթ․",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_25",
    "title": "Պետության առջև ծառացած հիմնախնդիրները նորագույն շրջանում",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1254",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայ կամավորական շարժումը Առաջին աշխարհամարտի տարիներին: Ջոկատների կազմավորումը, մասնակցությունը մարտական գործողություններին",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1255",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայոց ցեղասպանությունը։ Ինքնապաշտպանական մարտերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1256",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Մեծ տերությունների, առաջադեմ գործիչների և կազմակերպությունների արձագանքը, Հայոց ցեղասպանության պատասխանատուների դատավարությունը: Նեմեսիս գործողություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1257",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Սփյուռքի կազմավորումը. ինքնության պահպանման խնդիրները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1258",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայոց ցեղասպանության միջազգային ճանաչման գործընթացը: Պահանջատիրություն:",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1259",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայոց միասնական ոգու հաղթանակը: Մայիսյան հերոսամարտերը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1260",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայաստանի Առաջին Հանրապետութան տարածքային հիմնախնդիրները: Սևրի պայմանագիրը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1261",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Գարեգին Նժդեհ: Զանգեզուրի հերոսամարտը: Խորհրդային Հայաստանը և Հայկական հարցը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1262",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայ ժողովուրդը Երկրորդ աշխարհամարտի տարիներին",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1263",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Վերակառուցումից դեպի անկախություն",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1264",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Լեռնային Ղարաբաղի հիմնախնդիրը: Արցախյան պատերազմը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_25_t_258_l_1265",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_25_t_258",
    "title": "Հայաստանի Երրորդ Հանրապետության մարտահրավերները",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "12-րդ դասարան",
    "sortOrder": 349,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_31",
    "title": "Խորհրդային Հայաստանը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_937",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": "Նոր տնտեսական քաղաքականությունը։ Արդյունաբերացումը և կոլեկտիվացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_938",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": "Հասարակական-քաղաքական կյանքը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_939",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": "Հայ ժողովուրդը Երկրորդ աշխարհամարտի տարիներին",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_940",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": " Խորհրդային Հայաստանը հետպատերազմյան տարիներին",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_942",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": "Խորհրդային Հայաստանը վերակառուցման տարիներին։ Արցախյան շարժումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_207_l_944",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_207",
    "title": "Հայաստանի անկախացման գործընթացը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_213",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_31",
    "title": "Հայկական պետականությունը արդի փուլում",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_31_t_213_l_962",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_213",
    "title": "Անկախ պետականության կայացման գործընթացը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_213_l_963",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_213",
    "title": "Սոցիալ-տնտեսական դրությունը։ Հասարակական-քաղաքական կյանքը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_213_l_964",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_213",
    "title": "Հայաստանի Հանրապետության միջազգային դրությունը և արտաքին քաղաքականությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_213_l_965",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_213",
    "title": "Արցախի Հանրապետությունը։ Արցախյան պատերազմը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_212",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_31",
    "title": "Հայկական սփյուռքը 1920 թվականից մինչև մեր օրեր",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_31_t_212_l_959",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_212",
    "title": "Հայկական սփյուռքը 1920-1939 թթ․",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_212_l_960",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_212",
    "title": "Հայկական սփյուռքը 1945-1991 թթ․",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_212_l_961",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_212",
    "title": "Հայկական սփյուռքը արդի փուլում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_211",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_0_g_31",
    "title": "Հայկական մշակույթը 1920 թվականից մինչև մեր օրեր",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_0_g_31_t_211_l_955",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_211",
    "title": "Հայկական մշակույթը (կրթություն, գիտություն) 1920-1941 թթ․",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_211_l_956",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_211",
    "title": "Հայկական մշակույթը (գրականություն, արվեստ) 1920-1941 թթ․",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_0_g_31_t_211_l_957",
    "programId": "prog_0",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_0_g_31_t_211",
    "title": "Մշակույթի վերելքը 1945-1991 թթ․",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "6-րդ դասարան",
    "sortOrder": 370,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_70",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_4",
    "title": "Նախնադար",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_70_l_167",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_70",
    "title": "Հին քարի դար (Պալեոլիթ)",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_70_l_168",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_70",
    "title": "Միջին և նոր քարի դարեր․ անցում նստակեցության Ք.ա. 12-10 հազ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_70_l_169",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_70",
    "title": "Նախնադարյան հասարակության անկումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_4",
    "title": "Հին Արևելք",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_171",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Եգիպտոս",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_172",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Միջագետքի առաջին պետությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_173",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Միջագետքի տերությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_174",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Հին Փոքր Ասիան և Արևելյան միջերկրականի երկրները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_175",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Հնդկաստան և Չինաստան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_176",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Աքեմենյան Իրանը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_177",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Հին Արևելքի կրոնները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_178",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Գիր և արվեստ",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_72_l_179",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_72",
    "title": "Գիտություն",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_4",
    "title": "Հին Հունաստան",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83_l_215",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_83",
    "title": "Պատմության արշալույսը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83_l_216",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_83",
    "title": "Արխաիկ դարաշրջանի Հունաստանը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83_l_217",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_83",
    "title": "Հին Սպարտան և Աթենքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83_l_218",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_83",
    "title": "Հունաստանը Ք․ա․ V դարում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_83_l_219",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_83",
    "title": "Դասական դարաշրջանի հունական մշակույթը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_84",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_4",
    "title": "Հելլենականություն",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_84_l_220",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_84",
    "title": "Ալեքսանդր Մակեդոնացի",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_84_l_221",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_84",
    "title": "Հելլենիստական աշխարհը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_4",
    "title": "Հին Հռոմ",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_248",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Պատմության արշալույսը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_249",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Հռոմեական քաղաք-պետությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_250",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Հռոմեական տերության կազմավորումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_251",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Հանրապետական կարգի ճգնաժամը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_252",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Անցում Պրինցիպատին",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_253",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Հռոմեական կայսրության ծաղկումն ու անկումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_254",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Կրոնը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_4_t_86_l_255",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_4_t_86",
    "title": "Հռոմեական մշակույթը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "7-րդ դասարան",
    "sortOrder": 403,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_73",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_12",
    "title": "Նախնադար",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_73_l_180",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_73",
    "title": "Հին քարի դար (Պալեոլիթ)",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_73_l_181",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_73",
    "title": "Միջին և նոր քարի դարեր․ անցում նստակեցության",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_73_l_182",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_73",
    "title": "Նախնադարյան հասարակության անկումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_12",
    "title": "Քաղաքակրթությունների առաջացումը Հին Արևելքում",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_183",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Հին եգիպտական քաղաքակրթությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_184",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Միջագետքյան քաղաքակրթությունը (Շումեր, Աքքադ, Բաբելոնի թագավորություն)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_185",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Ասորեստան",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_186",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Խեթական թագավորություն: Միտաննի։ Փյունիկիա",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_187",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Աքեմենյան Իրան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_188",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Չինաստան",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_74_l_189",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_74",
    "title": "Հնդկաստան",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_12",
    "title": "Անտիկ քաղաքակրթություններ. Հին Հունաստան, Հռոմ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87_l_256",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_87",
    "title": "Հունական քաղաքակրթության սկիզբը, զարգացումը, անկումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87_l_257",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_87",
    "title": "Հունական քաղաքակրթության քաղաքական, տնտեսական, հասարակական և մշակութային կյանքը, ձեռքբերումներն ու ազդեցությունը ժամանակակից աշխարհի վրա",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87_l_258",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_87",
    "title": "Հռոմեական քաղաքակրթության սկիզբը, զարգացումը, անկումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87_l_259",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_87",
    "title": "Հռոմեական պետության քաղաքական, տնտեսական, հասարակական և մշակութային կյանքը, ձեռքբերումներն ու ազդեցությունը ժամանակակից աշխարհի վրա",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_87_l_260",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_87",
    "title": "Հելլենիստական աշխարհ. մշակութային ժառանգություն, համաշխարհայնացման առաջին փորձերը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_12",
    "title": "Միջնադարյան քաղաքակրթությունների զարգացման ուղին Արևմուտքում և Ամերիկայում",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_305",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "«Ժողովուրդների մեծ գաղթը» և Արևմտահռոմեական կայսրության անկումը. նոր պետությունների առաջացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_306",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Արևելահռոմեական կայսրությունը (Բյուզանդիա)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_307",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Ռուսական պետություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_308",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Խաչակրաց արշավանքները և դրանց հետևանքները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_309",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Անգլիան միջնադարում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_310",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Ֆրանսիան միջնադարում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_311",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "Գերմանիան միջնադարում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_102_l_312",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_102",
    "title": "«Ամերիկյան մինչկոլումբոսյան» քաղաքակրթությունները",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_12",
    "title": "Միջնադարյան քաղաքակրթությունների զարգացման ուղին Արևելքում",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_322",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Արաբական խալիֆայություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_323",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Մոնղոլական արշավանքները և «եվրասիական» տերության ստեղծումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_324",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Չինական քաղաքակրթությունը միջնադարում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_325",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Հնդկաստանը միջնադարում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_326",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Ճապոնիան միջնադարում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_327",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Թուրքական պետությունը միջնադարում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_12_t_105_l_328",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_12_t_105",
    "title": "Պարսկական պետությունը միջնադարում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "10-րդ դասարան",
    "sortOrder": 439,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_94",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Ներածություն",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_94_l_287",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_94",
    "title": "Պատմության պարբերացումը և փուլաբաժանումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Հին Արևելքի քաղաքակրթությունները",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_281",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Հին Եգիպտական հասարակությունը: Քաղաքակրթական ձեռքբերումները և արդի հիմնախնդիրները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_282",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Հին Միջագետքի հասարակությունը, քաղաքակրթական ձեռքբերումները, և արդի հիմնախնդիրները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_283",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Իրանական բարձրավանդակի պետությունները: Աքեմենյան աշխարհակալ տերությունը:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_284",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Փոքր Ասիայի, Արևելամիջերկրածովյան երկրների և Հայկական լեռնաշխարհի հնագույն քաղաքակրթությունները, քաղաքակրթական ձեռքբերումները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_285",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Հին Չինաստանի քաղաքակրթությունը, քաղաքակրթական ձեռքբերումները և արդի հիմնախնդիրները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_95_l_286",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_95",
    "title": "Հին Հնդկաստանի քաղաքակրթությունը, քաղաքակրթական ձեռքբերումները և արդի հիմնախնդիրները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Անտիկ քաղաքակրթությունները",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_271",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Քաղաք-պետությունները և ժողովրդավարության դրսևորումները Հին Հունաստանում:",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_272",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Հույն փիլիսոփաների գաղափարները՝ հասարակության զարգացման միջոց",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_273",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Պելոպոնեսյան պատերազմները. քաղաքակրթական ճգնաժամը Հին Հունաստանում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_274",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Հելլենիստական մշակույթի ազդեցությունը արևելյան հասարակությունների վրա",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_275",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Հռոմեական հասարակության զարգացման փուլերը: «Հռոմեական աշխարհ»-ի գաղափարը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_276",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Քրիստոնեության տարածումը Հռոմում. հասարակության կերպափոխումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_92_l_584",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_92",
    "title": "Հունահռոմեական քաղաքակրթության ազդեցությունը. միջնադարից մինչև մեր օրեր",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Հին աշխարհի մայրամուտը և նորի սկզբնավորումը",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_277",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Նոր պետությունների առաջացումն Արևմտահռոմեական կայսրության տարածքում: Հասարակության վերափոխումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_278",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Կաթոլիկ եկեղեցին և քրիստոնեական հասարակության ձևավորումը Արևմտյան Եվրոպայում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_279",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Բյուզանդական «ուղղափառ» հասարակության ձևավորումը: Հոգևոր-մշակութային կապի խզումը Բյուզանդիայի և կաթոլիկ Եվրոպայի միջև",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_280",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Սասանյան Իրանը արևելք-արևմուտք հակադրության մեջ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_858",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Իսլամի ծագումը: Արաբա-մուսուլմանական աշխարհի ձևավորումը, մուսուլմանական  Իսպանիա",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_859",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Չինական հասարակության արժեհամակարգի ձևավորումը միջնադարում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_93_l_860",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_93",
    "title": "Հնդկաստանի հասարակությունը միջնադարում. կրոնադավանաբանական ազդեցությունները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Զարգացած և ուշ միջնադար",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_338",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Մոնղոլ-թաթարական արշավանքները. քոչվորական հասարակությունից անցում դեպի «Եվրասիական տերության»",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_339",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Հարյուրամյա պատերազմը և դրա ազդեցությունը արևմտաեվրոպական հասարակությունների և պետությունների վրա",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_340",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Ռուսական պետության և հասարակության կայացումը XIV-XVI դարերում։ Մոսկովյան Ռուսիա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_861",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Թյուրք-մուսուլմանական զավթողական քաղաքականությունը և արևելաքրիստոնեական հասարակությունների ճգնաժամը։ Օսմանյան տերություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_862",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "«Մինչկոլումբոսյան ամերիկյան» հասարակությունների զարգացման առանձնահատկությունները: Աշխարհագրական մեծ հայտնագործությունները և դրանց սոցիալ-տնտեսական հետևանքները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_863",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Չինական և ճապոնական քաղաքակրթությունը Զարգացած և Ուշ միջնադարում: Նոր հասարակությունների և պետությունների ձևավորումը:",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_864",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Հնդկաստանի հասարակության համակեցութային կերպափոխումները Մեծ մողոլների օրոք",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_865",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Վերածնունդը՝ հասարակության փոփոխման խթան",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_108_l_866",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_108",
    "title": "Ռեֆորմացիայի ազդեցությունը եվրոպական հասարակության վրա",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_109",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_16",
    "title": "Նոր աշխարհի հասարակական և մշակութային նկարագիրը",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_16_t_109_l_341",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_109",
    "title": "Արդյունաբերական քաղաքակրթության առաջացումը. արդյունաբերական հեղաշրջումը, հետևանքները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_109_l_342",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_109",
    "title": "Հասարակական փոփոխությունները, առօրյա կյանքն ու կենցաղավարությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_16_t_109_l_343",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_16_t_109",
    "title": "Գիտական նորարարությունները որպես հասարակության զարգացման շարժիչ ուժ: Գիտություն և կրթություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 479,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_20",
    "title": "Քաղաքակրթությունների մուտքը նոր ժամանակներ. գաղափարները փոխում են աշխարհը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_454",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Տնտեսական համակարգերի փոփոխություններ: Աշխարհագրական մեծ հայտնագործություններ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_455",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Մշակութային փոփոխություններ: Վերածնունդ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_456",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Քաղաքական փոփոխություններ: Ռեֆորմացիա: Նիդերլանդական հեղափոխություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_457",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Նոր գաղափարները փոխում են աշխարհը, գիտական հեղափոխություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_458",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Լուսավորության դարաշրջանը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_459",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Անգլիական հեղափոխություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_460",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "ԱՄՆ պետության առաջացումը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_139_l_461",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_139",
    "title": "Ֆրանսիական հեղափոխությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_20",
    "title": "Արդյունաբերական հասարակությունն առաջ է անցնում քաղաքակրթական մրցավազքում",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_676",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արմատական տեղաշարժեր տնտեսության մեջ, արդյունաբերական հասարակությունների զարգացումը, հասարակական կերպափոխումները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_677",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արդյունաբերական հասարակությունների զարգացման արևմտյան ուղին. Մեծ Բրիտանիա, Գերմանիա",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_678",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արդյունաբերական հասարակությունների զարգացման ասիական ուղին. Ճապոնիա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_679",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արդյունաբերական հասարակությունները ձևափոխում են աշխարհը. ավանդական հասարակությունների ճգնաժամը։ Թուրքիա։ Իրան",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_680",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արդյունաբերական հասարակությունները ձևափոխում են աշխարհը. ավանդական հասարակությունների ճգնաժամը։ Չինաստան։ Հնդկաստան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_681",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Գիտության ու տեխնիկայի նվաճումները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_150_l_682",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_150",
    "title": "Արդյունաբերական հասարակության դրսևորումները մշակութային և առօրյա կյանքում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_20",
    "title": "Վերափոխումները հասարակությունների զարգացման միջոց XIX դ.",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_574",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Նապոլեոնյան դարաշրջանը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_575",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Վիեննայի վեհաժողովը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_576",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Հեղափոխությունները Եվրոպայում 1830-1840-ական թթ․",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_577",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Եվրոպան 1820-1870-ական թթ․ (Վիեննայի ժողովից մինչև ազգային պետությունների ստեղծում (Գերմանիա, Իտալիա)",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_578",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Ռուսաստան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_579",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Արևելքի ավանդական հասարակություններն ու արդիականացման փորձերը XIX դ. (Օսմանյան Թուրքիա, Իրան)",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_580",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Արևելքի ավանդական հասարակություններն ու արդիականացման փորձերը XIX դ. (Հնդկաստան, Չինաստան, Ճապոնիա)",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_581",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": " Փոփոխություններ տնտեսության մեջ և սոցիալական կյանքում: Արդյունաբերական հասարակության երկրորդ շրջափուլը:",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_151_l_582",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_151",
    "title": "Քաղաքական ու սոցիալական կյանքի զարգացումը Եվրոպայում և ԱՄՆ-ում XIX դ.",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_20",
    "title": "Հասարակությունների զարգացման տեսլականը. համաշխարհային կրոններ և գաղափարախոսություններ",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_585",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Բուդդայականություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_586",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Քրիստոնեություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_587",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Իսլամ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_588",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Լիբերալիզմ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_589",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Սոցիալիզմ: Մարքսիզմ: Կոմունիզմ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_590",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Ազգայնականություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_591",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Պահպանողականություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_592",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Անարխիզմ",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_593",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Սոցիալ-դարվինիզմ",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_594",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Շովինիզմ և ազգայնամոլություն",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_20_t_155_l_595",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_20_t_155",
    "title": "Ֆաշիզմ։ Նացիզմ",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "9-րդ դասարան",
    "sortOrder": 519,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_24",
    "title": "Նորարարությունը հանգեցրեց աշխարհի անհամաչափ զարգացմանը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_923",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "Արդյունաբերական հասարակության երկրորդ շրջափուլը. փոփոխություններ տնտեսության մեջ և սոցիալական կյանքում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_924",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "Միջազգային հարաբերությունները (XIX դ․ վերջ - XX դ․ սկիզբ)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_925",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "Ազգային պետությունների առաջացումը Բալկանյան թերակղզում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_926",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "Ազգային հիմնախնդիրը բազմազգ տերություններում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_927",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "Առաջին աշխարհամարտը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_204_l_928",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_204",
    "title": "1917 թ. ռուսական հեղափոխությունները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_24",
    "title": "Նոր աշխարհաքաղաքական կարգի հաստատումը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1019",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Նոր աշխարհակարգի ձևավորումը․ Վերսալ-վաշինգտոնյան համակարգը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1020",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Ազգերի լիգան",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1021",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Ժողովրդավարական հասարակություններն ու տնտեսական մեծ ճգնաժամը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1022",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Ամբողջատիրական վարչակարգերը Եվրոպայում․Ֆաշիզմ, նացիզմ, բոլշևիզմ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1023",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "ԽՍՀՄ-ը 1922-1939թթ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1024",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Արևելքի ավանդական հասարակությունները (Թուրքիա, Իրան)1920-1930-ական թթ․",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1025",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Արևելքի ավանդական հասարակությունները (Ճապոնիա, Չինաստան, Հնդկաստան)1920-1930-ական թթ․",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1026",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Միջազգային հարաբերությունները 1920-1930-ական թթ․",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_223_l_1027",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_223",
    "title": "Մշակույթը 1918-1940 թթ․",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_24",
    "title": "Աշխարհը Երկրորդ աշխարհամարտի և Սառը պատերազմի ժամանակաշրջանում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1296",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Երկրորդ աշխարհամարտը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1297",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Սառը պատերազմը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1298",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Երկբևեռ աշխարհ. ԱՄՆ և ԽՍՀՄ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1299",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Սառը պատերազմի «տաք դրսևորումները»",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1300",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Արևմուտքի երկրները սառըպատերազմյան տարիներին",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1301",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Արևելքի երկրները սառըպատերազմյան տարիներին (Արաբական երկրներ, Թուրքիա, Իրան)",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1302",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": "Արևելքի երկրները սառըպատերազմյան տարիներին (Հնդկաստան, Չինաստան, Ճապոնիա)",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_266_l_1303",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_266",
    "title": " «Երրորդ աշխարհի» երկրները",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_24",
    "title": "Աշխարհը XX դ. վերջին և XXI դ. սկզբին",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267_l_1304",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_267",
    "title": "Արևմուտքի երկրները հետսառըպատերազմյան ժամանակաշրջանում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267_l_1305",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_267",
    "title": "ԽՍՀՄ փլուզումը: Հետխորհրդային երկրները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267_l_1306",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_267",
    "title": "Արևելքի երկրները հետսառըպատերազմյան տարիներին",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267_l_1307",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_267",
    "title": "Փոփոխություններ միջազգային հարաբերություններում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_267_l_1308",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_267",
    "title": "Արդի աշխարհի հիմնախնդիրները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_299",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_24",
    "title": "Գիտատեխնիկական հեղափոխությունը և աշխարհը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_24_t_299_l_1462",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_299",
    "title": "Նորագույն շրջանի քաղաքակրթական և մշակութային ձեռքբերումները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_24_t_299_l_1463",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_24_t_299",
    "title": "Նորագույն շրջանի մշակութային ձեռքբերումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "11-րդ դասարան",
    "sortOrder": 555,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Աշխարհակալություններ (կայսրություններ)",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1052",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Աքեմենյան տերություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1053",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Ալեքսանդր Մակեդոնացու տերությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1054",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Արաբական խալիֆայություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1055",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Կարոլինգյան կայսրություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1056",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Սրբազան Հռոմեական կայսրություն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1057",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Սելջուկյան սուլթանություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1058",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Մոնղոլական կայսրություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1059",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Սեֆյան Իրան",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1060",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Ցին կայսրություն",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1061",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Ռուսական կայսրություն",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1062",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Բրիտանական կայսրություն",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_227_l_1063",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_227",
    "title": "Օսմանյան կայսրություն",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_268",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Ազգային պետություններ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_268_l_1309",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_268",
    "title": "Ազգային պետությունների ձևավորման ներքին և արտաքին նախադրյալները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_268_l_1310",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_268",
    "title": "Ազգային պետությունների առանձնահատկությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_268_l_1311",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_268",
    "title": "Քաղաքակրթական ժառանգությունը: Ազգային պետությունները և արդիականությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_269",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Ամբողջատիրական պետություններ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_269_l_1312",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_269",
    "title": "Ամբողջատիրական և միակուսակցական պետությունների ձևավորման նախադրյալները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_269_l_1313",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_269",
    "title": "Սոցիալ-տնտեսական և քաղաքական միջավայրը։ Ամբողջատիրական պետությունները և արդիականությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_270",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Ժողովրդավարկան պետություն",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_270_l_1314",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_270",
    "title": "Ժողովրդավարական պետությունների ձևավորման նախադրյալները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_270_l_1315",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_270",
    "title": "Առանձնահատկությունները և սոցիալ-տնտեսական, քաղաքական միջավայրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_270_l_1316",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_270",
    "title": "Քաղաքակրթական ժառանգությունը։ Ժողովրդավարկան պետությունները և արդիականությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_271",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Հեղափոխություն",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_271_l_1317",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_271",
    "title": "Քաղաքական հեղափոխություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_271_l_1319",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_271",
    "title": "Ոչ բռնի հեղափոխություններ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_271_l_1318",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_271",
    "title": "Արդյունաբերական (սոցիալ-տնտեսական) հեղափոխություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_271_l_1320",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_271",
    "title": "Գիտատեխնիկական հեղափոխություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_25",
    "title": "Գաղափարախոսություն",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1321",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Կրոնական գաղափարախոսություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1322",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Հասարակական-քաղաքական գաղափարախոսություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1323",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Ազգային և ազգայնամոլական գաղափարախոսություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1324",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Դասակարգային գաղափարախոսություններ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1325",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Տնտեսական գաղափարախոսություններ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_25_t_272_l_1326",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_25_t_272",
    "title": "Մշակութային ուղղություններ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "12-րդ դասարան",
    "sortOrder": 592,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_31",
    "title": "Արդյունաբերական հասարակության ճգնաժամը․ Երկրորդ համաշխարհային պատերազմը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1233",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Նոր աշխարհակարգի ձևավորումը․ Վերսալ-վաշինգտոնյան համակարգը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1234",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Ազգերի լիգան։ Մանդատային համակարգը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1235",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Եվրոպակենտրոն աշխարհ։ Արևմտյան ժողովրդավարության երկրները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1236",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Ամբողջատիրական վարչակարգերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1237",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Ամբողջատիրական վարչակարգը ԽՍՀՄ-ում։ Սոցիալիզմի խորհրդային տնտեսական մոդելը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1238",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Համաշխարհային տնտեսական մեծ ճգնաժամը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1239",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Արևելքի ավանդական հասարակությունները (Թուրքիա, Իրան)1920-1930-ական թթ․",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1240",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Արևելքի ավանդական հասարակությունները (Ճապոնիա, Չինաստան, Հնդկաստան)1920-1930-ական թթ․",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1241",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Միջազգային հարաբերությունները Երկրորդ աշխարհամարտի նախօրեին",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1242",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Երկրորդ համաշխարհային պատերազմը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_256_l_1243",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_256",
    "title": "Մշակույթը 1918-1940 թթ․",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_1_g_31",
    "title": "Աշխարհը սառը պատերազմի ժամանակաշրջանում",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1244",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Սառը պատերազմը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1245",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Սառը պատերազմի «տաք» դրսևորումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1246",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "ԱՄՆ-ն սառը պատերազմի ժամանակաշրջանում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1247",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Արևմուտքի երկրները սառըպատերազմյան տարիներին",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1248",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Խորհրդային վերակառուցումն ու սոցիալիստական համակարգի փլուզման գործնթացը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1249",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "«Երրորդ աշխարհի» երկրները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1250",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Միավորված ազգերի կազմակերպությունը։ Տնտեսական զարգացման ուղիները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1251",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Արևելքի երկրները սառըպատերազմյան տարիներին (Արաբական երկրներ, Թուրքիա, Իրան)",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1252",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Արևելքի երկրները սառըպատերազմյան տարիներին (Հնդկաստան, Չինաստան, Ճապոնիա)",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_1_g_31_t_257_l_1253",
    "programId": "prog_1",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_1_g_31_t_257",
    "title": "Հետարդյունաբերական հասարակության ձևավորումը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "6-րդ դասարան",
    "sortOrder": 616,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_97",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Աֆրիկա մայրցամաք",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_97_l_290",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_97",
    "title": "Աֆրիկայի աշխարհագրական դիրքը, ափագիծը, ռելիեֆը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_97_l_291",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_97",
    "title": "Աֆրիկայի կլիման և ներքին ջրերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_97_l_292",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_97",
    "title": "Աֆրիկայի բնական զոնաները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_98",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Հարավային Ամերիկա մայրցամաք",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_98_l_293",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_98",
    "title": "Հարավային Ամերիկայի աշխարհագրական դիրքը, ափագիծը, մակերևույթը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_98_l_294",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_98",
    "title": "Հարավային Ամերիկայի կլիման, ներքին ջրերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_98_l_295",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_98",
    "title": "Հարավային Ամերիկայի բնական զոնաները, վերընթաց գոտիականությունն Անդերում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_100",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Հյուսիսային Ամերիկա մայրցամաք",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_100_l_298",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_100",
    "title": "Հյուսիսային Ամերիկայի աշխարհագրական դիրքը, ափագիծը, մակերևույթը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_100_l_299",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_100",
    "title": "Հյուսիսային Ամերիկայի կլիման, ներքին ջրերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_100_l_300",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_100",
    "title": "Հյուսիսային Ամերիկայի բնական զոնաները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Եվրասիա մայրցամաք",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_356",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի աշխարհագրական դիրքը, ափերը ողողող ծովերը, ափագիծը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_357",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի երկրաբանական կառուցվածքը: Երկրաշարժերի և հրաբուխների տարածման շրջանները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_358",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի մակերևույթը, խոշոր հարթավայրերը և լեռները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_359",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի կլիման",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_360",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Կլիմայական գոտիները և մարզերը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_361",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի ներքին ջրերը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_112_l_362",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_112",
    "title": "Եվրասիայի բնական զոնաները: Բարեխառն գոտու անտառներ և տափաստաններ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_135",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Ավստրալիա մայրցամաք",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_135_l_445",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_135",
    "title": "Ավստրալիա. Ընդհանուր բնութագիրը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_135_l_446",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_135",
    "title": "Բուսական և կենդանական աշխարհի յուրահատկությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_4_t_137",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_4",
    "title": "Անտարկտիդա մայրցամաք",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_4_t_137_l_452",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_4_t_137",
    "title": "Անտարկտիդա. Ընդհանուր բնութագիրը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "7-րդ դասարան",
    "sortOrder": 642,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Աշխարհագրական քարտեզ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1093",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Աշխարհագրության ուսումնասիրության օբյեկտը և առարկան",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1094",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Տեղանքի հատակագիծ: Մասշտաբ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1095",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Կողմնորոշում հատակագծով: Ազիմուտ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1096",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Աշխարհագրական քարտեզներ: Քարտեզների դասակարգումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1097",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Աստիճանացանց: Աշխարհագրական կոորդինատներ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1098",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Քարտեզագրական պրոյեկցիաներ: Պայմանական նշաններ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_235_l_1099",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_235",
    "title": "Քարտեզագրական պատկերման եղանակներ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Աշխարհագրական թաղանթ։ Երկրի մակերևույթի ձևավորում։ Համաշխարհային օվկիանոսի աշխարհագրական առանձնահատկությունները",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1100",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Աշխարհագրական թաղանթ. կառուցվածքը, հատկանիշները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1101",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Երկրակեղևի կառուցվածքը, զարգացումը, սալերն ու դրանց շարժումը: Երկրաբանական դարաշրջաններ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1102",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Մայրցամաքներ: Երկրագնդի խոշոր պլատֆորմներն ու գեոսինկլինալային շրջանները: Լեռնագոյացում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1103",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Երկրի մակերևույթի վրա մարդածին ազդեցությամբ առաջացած փոփոխությունները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1104",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Համաշխարհային օվկիանոսի հատակի ռելիեֆը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1105",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Համաշխարհային օվկիանոսի ջրի ջերմությունն ու աղիությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_236_l_1106",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_236",
    "title": "Ջրի շարժումը Համաշխարհային օվկիանոսում: Մակընթացություն և տեղատվություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Եղանակ և կլիմա։ Աշխարհագրական գոտիականություն և զոնայականություն",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1107",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Եղանակ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1108",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Մթնոլորտային ճնշում: Քամի: Քամիների վարդ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1109",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Մթնոլորտի խոնավությունը: Տեղումներ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1110",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Կլիմա: Կլիմայի տիպերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1111",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Երկրի տարեկան պտույտը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1112",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Մթնոլորտի ընդհանուր շրջանառությունը: Օդային զանգվածներ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_237_l_1113",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_237",
    "title": "Հորիզոնական զոնայականություն և վերընթաց գոտիականություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_238",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Աշխարհի քաղաքական բաժանումը",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_238_l_1114",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_238",
    "title": "Աշխարհի քաղաքական բաժանումը: Պետական տարածք և պետական սահման",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_238_l_1115",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_238",
    "title": "Պետությունների խմբավորումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Աշխարհի բնակչության աշխարհագրություն",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1138",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Աշխարհի բնակչության թիվը և շարժը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1139",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Բնակչության վերարտադրությունը: Ժողովրդագրական քաղաքականություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1140",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Բնակչության տեղաբաշխումը: Միգրացիաներ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1141",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Բնակչության կազմը: Սեռատարիքային կառուցվածքը: Աշխատանքային ռեսուրսներ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1142",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Բնակչության ռասայական, էթնիկական և կրոնական կազմը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_239_l_1143",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_239",
    "title": "Տարաբնակեցում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_240",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Բնական պայմաններ և ռեսուրսներ",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_240_l_1122",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_240",
    "title": "Բնական պայմաններ և ռեսուրսներ: Բնական ռեսուրսների խմբավորումը: Ռեսուրսապահովվածություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_240_l_1123",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_240",
    "title": "Աշխարհի բնական ռեսուրսների հիմնական խմբերը, դրանց տեղաբաշխումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_12",
    "title": "Համաշխարհային տնտեսություն",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1124",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Ազգային տնտեսություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1125",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Աշխատանքի միջազգային աշխարհագրական բաժանում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1126",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Համաշխարհային տնտեսություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1127",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Արդյունաբերության ընդհանուր բնութագիրը և տեղաբաշխումը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1128",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Վառելիքաէներգետիկա",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1129",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Մետաղաձուլություն և մեքենաշինություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1130",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Քիմիական, թեթև և սննդի արդյունաբերություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1131",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Գյուղատնտեսության ընդհանուր բնութագիրը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1132",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Բուսաբուծություն",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1133",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Անասնապահություն",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1134",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Ձկնորսություն, ձկնաբուծություն, անտառային տնտեսություն, որսորդություն",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1135",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Տրանսպորտ և կապ: Միջազգային գլխավոր ուղիները",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1136",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Ոչ արտադրական ոլորտը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_12_t_241_l_1137",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_12_t_241",
    "title": "Միջազգային տնտեսական հարաբերություններ",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "10-րդ դասարան",
    "sortOrder": 695,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Աշխարհագրության ներածություն և մեթոդներ․ քարտեզագրություն",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1266",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Աշխարհագրություն ուսումնասիրության առարկան, նպատակը և խնդիրները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1267",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Աշխարհագրության ճյուղային կառուցվածքը: Աշխարհագրական մշակույթ և մտածողություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1268",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Աշխարհագրական հետազոտության հիմնական մեթոդները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1269",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Քարտեզագրական, դաշտային արշավախմբային մեթոդներ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1270",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "ԱՏՀ (GIS), մաթեմատիկական և օդատիեզերական մեթոդներ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1271",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Քարտեզագրական ընդհանրացում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_259_l_1272",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_259",
    "title": "Տեղագրական քարտեզներ: Ազիմուտներ և ուղղության անկյուններ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Երկրագունդ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1273",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Արեգակնային համակարգի և Երկիր մոլորակի առաջացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1274",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Երկրի ձևն ու չափերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1275",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Երկրի ներքին կառուցվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1276",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Քարոլորտի սալեր: Երկրի մակերևույթը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1277",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Բնական աղետների առաջացումը, դասակարգումը, տեսակները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1278",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Երկրի օրական և տարեկան պտույտները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_260_l_1279",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_260",
    "title": "Ժամային գոտիներ: Արեգակի բարձրության փոփոխությունները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_261",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Եղանակային և կլիմայական պայմաններ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_261_l_1280",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_261",
    "title": "Արեգակնային ճառագայթում և տեղական ջերմային հաշվեկշիռ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_261_l_1281",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_261",
    "title": "Եղանակային պայմաններ և երևույթներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_261_l_1282",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_261",
    "title": "Ջերմոցային էֆեկտի էությունը: Քաղաքային միկրոկլիմա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_262",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Գետային ջրաբանություն",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_262_l_1283",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_262",
    "title": "Ջրհավաք ավազան: Գետի բնութագրիչները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_262_l_1284",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_262",
    "title": "Գետի բնութագրիչները: Գետաունային գործընթացներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_262_l_1285",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_262",
    "title": "Գետերի նշանակությունը: Մարդու ազդեցությունը ջրաբանական գործընթացների վրա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_263",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Աշխարհի քաղաքական բաժանումը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_263_l_1286",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_263",
    "title": "Աշխարհի քաղաքական բաժանումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_263_l_1287",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_263",
    "title": "Աշխարհի երկրների դասակարգումն ու տիպաբանությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_263_l_1288",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_263",
    "title": "Քաղաքական աշխարհագրություն և աշխարհաքաղաքականություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_263_l_1289",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_263",
    "title": "Հայաստանի Հանրապետությունը ժամանակակից աշխարհաքաղաքական գործընթացներում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_264",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Աշխարհի բնակչությունը",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_264_l_1291",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_264",
    "title": "Աշխարհի բնակչության թիվը, շարժը և վերարտադրությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_264_l_1292",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_264",
    "title": "Բնակչության տեղաբաշխման գործոնները: Արդի միգրացիայի գործընթացները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_264_l_1293",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_264",
    "title": "Բնակչության սեռատարիքային կազմը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_264_l_1294",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_264",
    "title": "Տարաբնակեցում: Ուրբանացում: Քաղաքների տիպերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_16_t_265",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_16",
    "title": "Աշխարհի բնական պայմաններն ու ռեսուրսները",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_16_t_265_l_1295",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_16_t_265",
    "title": "Աշխարհի բնական պայմանների և ռեսուրսների բազմազանությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 732,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Եվրոպա",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_468",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Եվրոպա, ընդհանուր աշխարհագրական ակնարկ: Եվրոպական Միություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_469",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Արևելյան Եվրոպա: Բնական պայմանները և ռեսուրսները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_470",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Արևելյան Եվրոպա. Բնակչությունը, տնտեսությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_471",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ռուսաստանի Դաշնություն. Բնական պայմանները և ռեսուրսները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_472",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ռուսաստան. Բնակչությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_473",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ռուսաստան. Տնտեսությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_474",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ռուսաստան. Տնտեսությունը (շարունակություն)",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_475",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Հարավային Եվրոպա: Բնական պայմանները և ռեսուրսները, բնակչությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_476",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Հարավային Եվրոպա. Տնտեսությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_477",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Արևմտյան Եվրոպա: Բնական պայմանները և ռեսուրսները, բնակչությունը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_478",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Արևմտյան Եվրոպա. Տնտեսությունը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_479",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Գերմանիայի Դաշնություն: Բնական պայմանները և ռեսուրսները, բնակչությունը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_480",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Գերմանիայի տնտեսությունը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_481",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ֆրանսիա: Բնական պայմանները և ռեսուրսները, բնակչությունը",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_482",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Ֆրանսիայի տնտեսությունը",
    "sortOrder": 15,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_483",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Հյուսիսային Եվրոպա: Բնական պայմանները և ռեսուրսները, բնակչությունը",
    "sortOrder": 16,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_140_l_484",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_140",
    "title": "Հյուսիսային Եվրոպայի տնտեսությունը",
    "sortOrder": 17,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Ասիա",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_515",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Ասիա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_516",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավարևմտյան Ասիա: Բնական պայմանները և ռեսուրսները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_517",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավարևմտյան Ասիա: Բնակչությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_518",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավարևմտյան Ասիա: Տնտեսությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_519",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Վրաստան: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_520",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Վրաստան: Բնակչությունը, տնտեսությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_521",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Ադրբեջան: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_522",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Ադրբեջան: Բնակչությունը, տնտեսությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_523",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Թուրքիա: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_524",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Թուրքիա: Բնակչությունը, տնտեսությունը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_525",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Իրան: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_526",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Իրան: Բնակչությունը, տնտեսությունը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_527",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Կենտրոնական Ասիա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_528",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավային Ասիա: Բնական պայմանները և ռեսուրսները",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_529",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավային Ասիա: Բնակչությունը, տնտեսությունը",
    "sortOrder": 15,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_530",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավարևելյան Ասիա: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 16,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_531",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Հարավարևելյան Ասիա: Բնակչությունը, տնտեսությունը",
    "sortOrder": 17,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_532",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Արևելյան Ասիա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 18,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_533",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Չինաստան: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 19,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_534",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Չինաստան: Բնակչությունը, տնտեսությունը",
    "sortOrder": 20,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_535",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Ճապոնիա: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 21,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_145_l_536",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_145",
    "title": "Ճապոնիա: Բնակչությունը, տնտեսությունը",
    "sortOrder": 22,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Ամերիկա",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_683",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "Հյուսիսային Ամերիկա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_684",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "Ամերիկայի Միացյալ Նահանգներ: Աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_685",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "ԱՄՆ: Բնակչությունը, տնտեսությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_686",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "ԱՄՆ տնտեսությունը (շարունակություն)",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_687",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "Լատինական Ամերիկա: Բնական պայմանները և ռեսուրսները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_166_l_688",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_166",
    "title": "Լատինական Ամերիկա: Բնակչությունը, տնտեսությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_172",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Աֆրիկա",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_172_l_710",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_172",
    "title": "Աֆրիկա: Քաղաքական քարտեզը, աշխարհագրական դիրքը, բնական պայմանները և ռեսուրսները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_172_l_711",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_172",
    "title": "Աֆրիկայի կլիման և բնական զոնաները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_172_l_712",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_172",
    "title": "Աֆրիկա. բնակչությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_172_l_713",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_172",
    "title": "Աֆրիկա. տնտեսությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_174",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Ավստրալիա և Օվկիանիա",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_174_l_723",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_174",
    "title": "Ավստրալիա և Օվկիանիա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_174_l_724",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_174",
    "title": "Ավստրալական Միություն (Ավստրալիա): Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_20_t_186",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_20",
    "title": "Անտարկտիկա",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_20_t_186_l_798",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_20_t_186",
    "title": "Անտարկտիկա: Ընդհանուր աշխարհագրական ակնարկ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "9-րդ դասարան",
    "sortOrder": 791,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_24",
    "title": "Հայկական լեռնաշխարհ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_596",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայաստանն աշխարհի քարտեզում, սահմանները, աշխարհագրական դիրքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_597",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայկական լեռնաշխարհի երկրաբանական կառուցվածքը: Օգտակար հանածոները, սեյսմիկությունը և հրաբխականությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_598",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայկական լեռնաշխարհի ռելիեֆը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_599",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայկական լեռնաշխարհի կլիման",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_600",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայկական լեռնաշխարհի ներքին ջրերը, խոշոր գետերը, լճերը, ստորերկրյա ջրերը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_156_l_601",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_156",
    "title": "Հայկական լեռնաշխարհի հողերը, բուսականությունը, կենդանական աշխարհը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_24",
    "title": "Հայաստանի Հանրապետություն",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_791",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ ընդհանուր բնութագիրը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_810",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ մակերևույթը, դրա ձևավորումը, ռելիեֆի հիմնական ձևերը։ Օգտակար հանածոները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_811",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": " ՀՀ կլիմայի ընդհանուր բնութագիրը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_812",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "Տարվա կլիմայական եղանակները ՀՀ-ում և կլիմայի վերընթաց գոտիականությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_813",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ ջրագրությունը։ Գետեր",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_814",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ ջրագրությունը։ Լճեր, Սևանա լիճ: Ստորգետնյա ջրեր։ Ջրային ռեսուրսների պահպանությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_815",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ հողային ծածկույթը: Բուսականությունը։ Կենդանական աշխարհը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_816",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ լանդշաֆտները։ Վերընթաց գոտիականություն",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_817",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "Ռացիոնալ և կայուն բնօգտագործման ու բնապահպանության հիմնախնդիրները ՀՀ-ում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_818",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ հատուկ պահպանվող տարածքները։ ՀՀ «Կարմիր գիրքը»",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_819",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "Բնական աղետների տեսակները, տարածվածությունը ՀՀ-ում, պաշտպանությունը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_792",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ մարզերը, խոշոր քաղաքները և մայրաքաղաք Երևանը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_793",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ բնակչությունը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_794",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ տնտեսության ընդհանուր բնութագիրը",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_795",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ արդյունաբերությունը",
    "sortOrder": 15,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_796",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ գյուղատնտեսությունը",
    "sortOrder": 16,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_185_l_797",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_185",
    "title": "ՀՀ ծառայությունների ոլորտը",
    "sortOrder": 17,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_24_t_187",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_24",
    "title": "Արցախի Հանրապետություն",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_24_t_187_l_799",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_24_t_187",
    "title": "Արցախի Հանրապետության ընդհանուր բնութագիրը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "11-րդ դասարան",
    "sortOrder": 819,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_25",
    "title": "Համաշխարհային տնտեսություն",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1487",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Տնտեսության կառուցվածք և տեղաբաշխում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1488",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Արդյունաբերություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1489",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Էներգետիկա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1490",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Կանաչ և այլընտրանքային էներգիա",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1491",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Տեխնոլոգիաներ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1492",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Գյուղատնտեսություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1493",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Ծառայություններ (սերվիս)",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1494",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Տրանսպորտ և կապ",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_304_l_1495",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_304",
    "title": "Միջազգային տնտեսական հարաբերություններ",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_25",
    "title": "Շրջակա միջավայր",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1496",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Բնական պայմաններ և ռեսուրսներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1497",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Բնօգտագործում և բնապահպանություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1498",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Կայուն զարգացում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1499",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Էկոլոգիական հավասարակշռություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1500",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Բնական ռեսուրսների շահագործում և պահպանություն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1501",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Կենսաբազմազանության և լանդշաֆտների պահպանություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_305_l_1502",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_305",
    "title": "Շրջանաձև տնտեսություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_306",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_2_g_25",
    "title": "Բնական միջավայրի կայուն կառավարում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_2_g_25_t_306_l_1503",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_306",
    "title": "Բնապահպանական և բնօգտագործման կառավարում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_306_l_1504",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_306",
    "title": "Միջազգային համաձայնագրեր և կոնվենցիաներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_2_g_25_t_306_l_1505",
    "programId": "prog_2",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_2_g_25_t_306",
    "title": "Կայուն գյուղատնտեսության կառավարում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "7-րդ դասարան",
    "sortOrder": 842,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Դերենիկ Դեմիրճյան",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183_l_773",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_183",
    "title": "Դերենիկ Դեմիրճյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183_l_774",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_183",
    "title": "Դերենիկ Դեմիրճյանի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183_l_775",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_183",
    "title": "Դերենիկ Դեմիրճյանի «Ավելորդը» պատմվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183_l_776",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_183",
    "title": "Դերենիկ Դեմիրճյանի «Ավելորդը» պատմվածքի կերպարները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_183_l_777",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_183",
    "title": "Դերենիկ Դեմիրճյանի «Քաջ Նազարը» կատակերգությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Ակսել Բակունց",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214_l_966",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_214",
    "title": "Ակսել Բակունցի կյանքը և հանրային գործունեությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214_l_967",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_214",
    "title": "Ակսել Բակունցի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214_l_968",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_214",
    "title": "Ակսել Բակունցի «Սպիտակ ձին» պատմվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214_l_969",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_214",
    "title": "Ակսել  Բակունցի «Մթնաձոր» ժողովածուն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_214_l_970",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_214",
    "title": "Ակսել Բակունցի «Սև ցելերի սերմնացանը» ժողովածուն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Եղիշե Չարենց",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1028",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1029",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցի ստեղծագործական առաջին քայլերը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1030",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցի «Ես իմ անուշ Հայաստանի...» բանաստեղծությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1031",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցի և հայ գրական-մշակութային գործիչների հարաբերությունները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1032",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցի «Տաղ անձնական» բանաստեղծությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_224_l_1033",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_224",
    "title": "Եղիշե Չարենցը և արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Գուրգեն Մահարի",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1065",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարու կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1066",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարու ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1067",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարու «Մանկություն» վիպակը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1068",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարու «Պատանեկություն» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1069",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարու հուշագրությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_229_l_1070",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_229",
    "title": "Գուրգեն Մահարին և արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Ստեփան Զորյան",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1078",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1079",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1080",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանի  «Մի կյանքի պատմություն» ինքնակենսագրական վեպը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1081",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանի «Խնձորի այգին» պատմվածքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1082",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանի հուշագրությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_231_l_1083",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_231",
    "title": "Ստեփան Զորյանը և արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_12",
    "title": "Հրանտ Մաթևոսյան",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246_l_1162",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_246",
    "title": "Հրանտ Մաթևոսյանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246_l_1163",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_246",
    "title": "Հրանտ Մաթևոսյանի «Մեր վազքը» պատմվածքների ժողովածուն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246_l_1164",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_246",
    "title": "Հրանտ Մաթևոսյանի «Կանաչ դաշտը» պատմվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246_l_1165",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_246",
    "title": "Հրանտ Մաթևոսյանը և գրական մեծերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_12_t_246_l_1166",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_12_t_246",
    "title": "Հրանտ Մաթևոսյանը և արվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "10-րդ դասարան",
    "sortOrder": 882,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_208",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Հայ գրերի գյուտ. Մեսրոպ Մաշտոց",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_208_l_941",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_208",
    "title": "Հայ գրերի գյուտ. Մեսրոպ Մաշտոց.",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_208_l_943",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_208",
    "title": "Հայկական կրթության կազմակերպումը գրերի գյուտին հաջորդող տարիներին",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_209",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Ոսկեդարի մատենագիտությունը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_209_l_945",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_209",
    "title": "Հայ պատմագրություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_209_l_946",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_209",
    "title": "Մովսես Խորենացի",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_209_l_947",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_209",
    "title": "Հայ հին բանահյուսություն. վիպերգեր",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Հովհաննես Թումանյան",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_486",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_487",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի հանրային գործունեությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_490",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի քնարերգությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_491",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի քառյակները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_607",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի պոեմները. ընդհանուր ակնարկ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_608",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի «Թմկաբերդի առումը» պոեմը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_609",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի «Անուշ» պոեմը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_610",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի բալլադները. ընդհանուր ակնարկ",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_611",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանի արձակը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_612",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանը և իր ժամանակակիցները",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_613",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանը և իր ընտանիքը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_142_l_614",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_142",
    "title": "Հովհաննես Թումանյանը և արվեստը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Գրիգոր Զոհրապ",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1404",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1405",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1406",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի նորավեպերի ընդհանուր բնութագիրը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1407",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի «Այրին»  նորավեպը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1408",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի «Ճիտին պարտքը»  նորավեպը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1409",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի «Երջանիկ մահը»  նորավեպը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1410",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի հանրային գործունեությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1411",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապը ժամանակակիցների հուշերում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_290_l_1412",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_290",
    "title": "Գրիգոր Զոհրապի նամակագրությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Ստեփան Զորյան",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291_l_1413",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_291",
    "title": "Ստեփան Զորյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291_l_1414",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_291",
    "title": "Ստեփան Զորյանի ստեղծագործությունները. ընդհանուր ակնարկ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291_l_1415",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_291",
    "title": "Ստեփան Զորյանի «Խնձորի այգին» պատմվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291_l_1416",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_291",
    "title": "Ստեփան Զորյանի նամակագրությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_291_l_1417",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_291",
    "title": "Ստեփան Զորյանը և արվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Նար-Դոս",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1451",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1452",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1453",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի վեպերն ու վիպակները. ընդհանուր բնութագիր",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1454",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի «Սպանված աղավնին» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1455",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի «Աննա Սարոյան» վիպակը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1456",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսի ընտանիքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1457",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսը ժամանակակիցների հուշերում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_297_l_1458",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_297",
    "title": "Նար-Դոսը արվեստում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Րաֆֆի",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1479",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու կյանքը և գրական-հանրային գործունեությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1480",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1481",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու «Սամվել» վեպը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1482",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու «Կայծեր» վեպը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1483",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու ճամփորդությունները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1484",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու ընտանիքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1485",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆին ժամանակակիցների հուշերում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_303_l_1486",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_303",
    "title": "Րաֆֆու նամակագրությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_16",
    "title": "Մուրացան",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1515",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1516",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1517",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի պատմավեպերը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1518",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի «Գևորգ Մարզպետունի» պատմավեպը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1519",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանը և ռոմանտիզմը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1520",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի ընտանիքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1521",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանը ժամանակակիցների հուշերում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_16_t_310_l_1522",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_16_t_310",
    "title": "Մուրացանի նամակագրությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 946,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Հովհաննես Թումանյան",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_485",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_488",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանի ստեղծագործական ժառանգությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_489",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանը և Հայոց ցեղասպանությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_492",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանի պոեմները. ընդհանուր ակնարկ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_604",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանի «Թմկաբերդի առումը» պոեմը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_605",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանի բալլադները. ընդհանուր ակնարկ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_141_l_606",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_141",
    "title": "Հովհաննես Թումանյանը և արվեստը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Ավետիք Իսահակյան",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159_l_620",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_159",
    "title": "Ավետիք Իսահակյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159_l_621",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_159",
    "title": "Ավետիք Իսահակյանի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159_l_622",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_159",
    "title": "«Մի մրահոն աղջիկ տեսա»  բանաստեղծությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159_l_623",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_159",
    "title": "«Ռավեննայում»  բանաստեղծությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_159_l_624",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_159",
    "title": "Ավետիք Իսահակյանը և արվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Վահան Տերյան",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242_l_1144",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_242",
    "title": "Վահան Տերյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242_l_1145",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_242",
    "title": "Վահան Տերյանի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242_l_1146",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_242",
    "title": "Վահան Տերյանի «Տխրություն» բանաստեղծությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242_l_1147",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_242",
    "title": "Վահան Տերյանի «Երկիր Նաիրի»  բանաստեղծական շարքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_242_l_1148",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_242",
    "title": "Վահան Տերյանը և արվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Միսաք Մեծարենց",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1327",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1328",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1329",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցի «Վայրկյան» բանաստեղծությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1330",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցի «Աքասիաներու շուքին տակ» բանաստեղծությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1331",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցը ժամանակակիցների հուշերում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_273_l_1332",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_273",
    "title": "Միսաք Մեծարենցի նամակագրությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Գրիգոր Զոհրապ",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1398",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1399",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1400",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապի «Լուռ ցավեր» նորավեպերի ժողովածուն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1401",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապի «Զաբուղոն» նորավեպը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1402",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապը ժամանակակիցների հուշերում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_289_l_1403",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_289",
    "title": "Գրիգոր Զոհրապի ընտանիքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Դանիել Վարուժան",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1426",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1427",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1428",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի «Ցեղին սիրտը» բանաստեղծական ժողովածուն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1429",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի «Ձոն» բանաստեղծությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1430",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի «Հացին երգը» բանաստեղծական ժողովածուն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1431",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի «Ցորյանի ծովեր» բանաստեղծությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1432",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի ժամանակակիցների հուշերում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_294_l_1433",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_294",
    "title": "Դանիել Վարուժանի ընտանիքը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Նար-Դոս",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1444",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1445",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1446",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսի «Մեր թաղը» պատմվածաշարը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1447",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսի «Ես և նա» պատմվածքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1448",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսի նամակագրությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1449",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսը ժամանակակիցների հուշերում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_296_l_1450",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_296",
    "title": "Նար-Դոսը արվեստում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Րաֆֆի",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302_l_1474",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_302",
    "title": "Րաֆֆու կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302_l_1475",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_302",
    "title": "Րաֆֆու ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302_l_1476",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_302",
    "title": "Րաֆֆու «Խենթը» վեպը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302_l_1477",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_302",
    "title": "Րաֆֆին ժամանակակիցների հուշերում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_302_l_1478",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_302",
    "title": "Րաֆֆին արվեստում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Մուրացան",
    "sortOrder": 9,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309_l_1510",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_309",
    "title": "Մուրացանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309_l_1511",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_309",
    "title": "Մուրացանի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309_l_1512",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_309",
    "title": "Մուրացանի «Ռուզան» պատմական դրաման",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309_l_1513",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_309",
    "title": "Մուրացանի «Առաքյալը» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_309_l_1514",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_309",
    "title": "Մուրացանը ժամանակակիցների հուշերում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_20",
    "title": "Պետրոս Դուրյան",
    "sortOrder": 10,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1523",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1524",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1525",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանի «Լճակ» բանաստեղծությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1526",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանի սիրային քնարերգությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1527",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանը և թատրոնը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1528",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանը ժամանակակիցների հուշերում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_20_t_311_l_1529",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_20_t_311",
    "title": "Պետրոս Դուրյանի նամակագրությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "9-րդ դասարան",
    "sortOrder": 1018,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_24_t_205",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_24",
    "title": "Հայ գրերի գյուտ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_24_t_205_l_929",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_205",
    "title": "Նախամաշտոցյան գիր",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_205_l_930",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_205",
    "title": "Հայ գրերի գյուտ. Մեսրոպ Մաշտոց",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_205_l_931",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_205",
    "title": "Գրերի գյուտին հաջորդող գրական-մշակութային գործունեությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_24",
    "title": "Հայ գրականության Ոսկեդարը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206_l_932",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_206",
    "title": "Եղիշե",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206_l_933",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_206",
    "title": "Ղազար Փարպեցի",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206_l_934",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_206",
    "title": "Փավստոս Բուզանդ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206_l_935",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_206",
    "title": "Մովսես Խորենացի",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_206_l_936",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_206",
    "title": "Հայ վիպերգերը Մ. Խորենացու «Հայոց պատմությունում»",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_226",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_24",
    "title": "Հայ միջնադարյան քնարերգություն",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_24_t_226_l_1049",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_226",
    "title": "Հայ միջնադարյան տաղերգություն. ընդհանուր ակնարկ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_226_l_1050",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_226",
    "title": "Գրիգոր Նարեկացի",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_226_l_1051",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_226",
    "title": "Ներսես Շնորհալի",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_292",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_24",
    "title": "Դերենիկ Դեմիրճյան",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_24_t_292_l_1418",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_292",
    "title": "Դերենիկ Դեմիրճյանի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_292_l_1419",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_292",
    "title": "Դերենիկ Դեմիրճյանի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_24_t_292_l_1420",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_24_t_292",
    "title": "Դերենիկ Դեմիրճյանի «Քաջ Նազարը» կատակերգությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "11-րդ դասարան",
    "sortOrder": 1037,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Ավետիք Իսահակյան",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_615",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի կյանքը (1875-1910)",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_616",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի կյանքը (1911-1936)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_617",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի կյանքը (1937-1957)",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_618",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի հանրային գործունեությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_619",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի ստեղծագործական ժառանգությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_625",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի քնարերգությունը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_626",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի սիրերգությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_627",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի կարոտի և պանդխտության երգերը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_628",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի «Աբու-Լալա Մահարի» պոեմը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_629",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի արձակը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_630",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանի «Լիլիթ» ստեղծագործությունը",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_158_l_631",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_158",
    "title": "Ավետիք Իսահակյանը և արվեստը",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Դերենիկ Դեմիրճյան",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_782",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի կյանքը և հանրային գործունեությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_783",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_784",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դեմիրճյանը՝ մանկագիր և բանաստեղծ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_785",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանը՝ դրամատուրգ.«Երկիր հայրենի» դրաման",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_786",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Երգիծանքը «Քաջ Նազար» կատակերգության մեջ. Նազարի կերպարը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_787",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի պատմվածքները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_788",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի «Գիրք ծաղկանց» պատմվածքը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_789",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի «Վարդանանք» պատմավեպը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_184_l_790",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_184",
    "title": "Դերենիկ Դեմիրճյանի «Վարդանանք» պատմավեպի կերպարները",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Լևոն Շանթ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198_l_891",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_198",
    "title": "Լևոն Շանթի կյանքը և հանրային գործունեությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198_l_892",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_198",
    "title": "Լևոն Շանթի ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198_l_893",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_198",
    "title": "Լևոն Շանթի թատերգությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198_l_894",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_198",
    "title": "Լևոն Շանթի «Հին աստվածներ» դրաման",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_198_l_895",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_198",
    "title": "Լևոն Շանթի «Հին աստվածներ» դրամայի կերպարները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Ակսել Բակունց",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_971",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "Ակսել Բակունցի կյանքը և հանրային գործունեությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_972",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "Ակսել Բակունցի ստեղծագործության ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_973",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "Բակունցի մթնաձորյան աշխարհը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_974",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "«Ալպիական մանուշակ» պատմվածքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_975",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "«Ծիրանի փողը» պատմվածքը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_976",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "«Միրհավ» պատմվածքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_215_l_977",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_215",
    "title": "Բակունցի վեպերն ու վիպակները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Եղիշե Չարենց",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1034",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի կյանքը (1897-1918)",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1035",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի կյանքը (1919-1925)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1036",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի կյանքը (1926-1937)",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1037",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի հանրային գործունեությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1038",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի ստեղծագործական ժառանգությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1039",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Հայրենիքի թեման Եղիշե Չարենցի ստեղծագործություններում",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1040",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Դանթեական առասպել» պոեմը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1041",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Ծիածան» ժողովածուն",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1042",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Ամբոխները խելագարված» պոեմը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1043",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Երկիր Նաիրի» վեպը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1044",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Գիրք ճանապարհի» ժողովածուն",
    "sortOrder": 11,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1045",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Էպիքական լուսաբաց» ժողովածուն",
    "sortOrder": 12,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1046",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցի «Նավզիկե» պոեմը",
    "sortOrder": 13,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1047",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցը և արվեստը",
    "sortOrder": 14,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_225_l_1048",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_225",
    "title": "Եղիշե Չարենցը և իր ժամանակակիցները",
    "sortOrder": 15,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Վահան Տերյան",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1149",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1150",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1151",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի «Մթնշաղի անուրջներ» բանաստեղծական շարքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1152",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի  «Գիշեր և հուշեր» բանաստեղծական շարքը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1153",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի «Ոսկի հեքիաթ» բանաստեղծական շարքը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1154",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի «Կատվի դրախտ» բանաստեղծական շարքը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1155",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի «Երկիր Նաիրի» բանաստեղծական շարքը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1156",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի հանրային գործունեությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1157",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանի նամակագրությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_243_l_1158",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_243",
    "title": "Վահան Տերյանը և արվեստը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Միսաք Մեծարենց",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1333",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1334",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1335",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Անհատի դրաման Մ. Մեծարենցի ստեղծագործություններում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1336",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի բնության երգերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1337",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի սիրերգությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1338",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի պոեզիայի արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1339",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցը քննադատ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1340",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցը ժամանակակիցների հուշերում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_274_l_1341",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_274",
    "title": "Միսաք Մեծարենցի նամակագրությունը (1901-1907)",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Գուրգեն Մահարի",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293_l_1421",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_293",
    "title": "Գուրգեն Մահարու կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293_l_1422",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_293",
    "title": "Գուրգեն Մահարու ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293_l_1423",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_293",
    "title": "Գուրգեն Մահարու արձակ ստեղծագործությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293_l_1424",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_293",
    "title": "Գուրգեն Մահարու «Ծաղկած փշալարեր» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_293_l_1425",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_293",
    "title": "Գուրգեն Մահարին և արվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Դանիել Վարուժան",
    "sortOrder": 9,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1434",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1435",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1436",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի բանաստեղծական ժողովածուները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1437",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի «Հեթանոս երգեր» բանաստեղծական ժողովածուն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1438",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի «Հարճը»  պոեմը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1439",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի «Հացին երգը» բանաստեղծական ժողովածուն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1440",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանը և Մխիթարյան միաբանությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1441",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանը ժամանակակիցների հուշերում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1442",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանի նամակագրությունը",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_295_l_1443",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_295",
    "title": "Դանիել Վարուժանը և Հայոց ցեղասպանությունը",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_25",
    "title": "Սիամանթո",
    "sortOrder": 10,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1464",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի կյանքը և ուսումնառությունը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1465",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիմանթոյի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1466",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի բանաստեղծական ժողովածուները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1467",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի «Սուրբ Մեսրոպ» պոեմը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1468",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի «Պարը» քերթվածը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1469",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի ճամփորդությունները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1470",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոյի ընտանիքը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1471",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոն և Հայոց ցեղասպանությունը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_25_t_300_l_1472",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_25_t_300",
    "title": "Սիամանթոն ժամանակակիցների հուշերում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "12-րդ դասարան",
    "sortOrder": 1139,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_31",
    "title": "Գուրգեն Մահարի",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1071",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարու կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1072",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարու չափածո ստեղծագործությունները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1074",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարու արձակ ստեղծագործությունները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1073",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարու «Ծաղկած փշալարեր» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1075",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարու «Այրվող այգեստաններ» վեպը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1076",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարին և արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_230_l_1077",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_230",
    "title": "Գուրգեն Մահարին և իր ժամանակակիցները",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_31",
    "title": "Հրանտ Մաթևոսյան",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1167",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1168",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1169",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանի «Օգոստոս» ժողովածուն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1170",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանի «Աշնան արև» վիպակը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1171",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանի հանրային գործունեությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_247_l_1172",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_247",
    "title": "Հրանտ Մաթևոսյանը և արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_3_g_31",
    "title": "Ստեփան Զորյան",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1084",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի կյանքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1085",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի ստեղծագործությունների ընդհանուր բնութագիրը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1086",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի «Ցանկապատ» պատմվածքը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1087",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի  «Պապ թագավոր» պատմավեպը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1088",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի «Պապ թագավոր» պատմավեպի կերպարները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1089",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի «Պատերազմ» և «Զաքարի հարսը» պատմվածքները",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1090",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանի նամակագրությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_3_g_31_t_232_l_1091",
    "programId": "prog_3",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_3_g_31_t_232",
    "title": "Ստեփան Զորյանը և արվեստը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "5-րդ դասարան",
    "sortOrder": 1164,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_146",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_4_g_28",
    "title": "Ես ապրում եմ լեռնային երկրում։ Քարտեզն իմ գործիքն է՝ ժամանակի և տարածության մեջ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_146_l_549",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_146",
    "title": "Ես իմ փոքր հայրենիքում․ իմ համայնքը, մարզը և երկիրը: Մեր հարևանները:",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_146_l_550",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_146",
    "title": "Քարտեզների տեսակները և տարբերությունը: Արդյոք կարևոր են քարտեզները պատմության մեջ:",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_146_l_551",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_146",
    "title": "Ես ճանապարհորդում եմ Հայկական լեռնաշխարհի տարածքով՝ նահանգներ, մայրաքաղաքներ, ամրոցներ, եկեղեցիներ, լեռներ, լճեր:",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_146_l_552",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_146",
    "title": "Զինանշաններ և դրոշներ՝ ժամանակակից և պատմական:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_188",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_4_g_28",
    "title": "Հայերի (իմ) ծագումնաբանությունը. Հայկական լեռնաշխարհի բնակիչների կյանքը, կենցաղն ու ավանդապատումները",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_188_l_800",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_188",
    "title": "Մշակույթ և կենցաղ․ ազգային տարազ, խոհանոց, կիրառական արվեստ։",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_188_l_801",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_188",
    "title": "Ավանդապատումներ. հայ ժողովրդի ծագում, տեղանք՝ աշխարհագրական և պատմական վայրեր:",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_188_l_802",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_188",
    "title": "Ավանդույթներ, ծեսեր, պետական և եկեղեցական տոներ։",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_188_l_803",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_188",
    "title": "Հաստանի ազգային փոքրամասնությունների ավանդական մշակույթն ու կենցաղը, ավանդույթներն ու տոները:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_4_g_28",
    "title": "Հայոց քրիստոնեական արժեհամակարգը",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_804",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Քրիստոնեական արժեհամակարգ. աստվածաշնչյան առակներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_805",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Նորկտակարանային պատմություններ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_806",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Քրիստոնեական եկեղեցու խորհուրդները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_807",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Քրիստոնեության ընդունումը. առաքյալները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_808",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Հայոց եկեղեցու սրբերը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_809",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Սբ. Գրիգոր Լուսավորիչ, Սբ. Մեսրոպ Մաշտոց",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_189_l_1013",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_189",
    "title": "Հայաստանում բնակվող ազգային փոքրամասնությունների կրոնա-մշակութային համակարգերը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_221",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_4_g_28",
    "title": "Իմ հայրենիքի էպոսը՝ «Սասնա ծռեր» և այլ ժողովուրդների էպիկական պատումները",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_221_l_1010",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_221",
    "title": "«Սասնա ծռեր» էպոսը։ Կերպարներն էպոսում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_221_l_1011",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_221",
    "title": "Հասարակությունը «Սասնա ծռեր» էպոսում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_221_l_1012",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_221",
    "title": "Այլ ժողովուրդների էպոսները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_216",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_4_g_28",
    "title": "Անհատն ու հասարակությունը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_4_g_28_t_216_l_978",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_216",
    "title": "Ո՞վ է անհատը․ քաղաքական, ռազմական, տնտեսական, մշակութային գործիչ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_4_g_28_t_216_l_979",
    "programId": "prog_4",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_4_g_28_t_216",
    "title": "Անհատի դերը հասարակության կայացման գործում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "6-րդ դասարան",
    "sortOrder": 1190,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_152",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_5_g_4",
    "title": "Անցյալի ուսումնասիրման անհրաժեշտությունը և միջոցները",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_152_l_566",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_152",
    "title": "Պատմության ուսումնասիրման առարկան, մեթոդները, աղբյուրները, պարբերացումը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_152_l_567",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_152",
    "title": "Քաղաքակրթությունների ձևավորումը, պետությունների առաջացումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_152_l_568",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_152",
    "title": "Արդյո՞ք բոլոր պետություններն ու հասարակությունները միանման են զարգանում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_152_l_569",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_152",
    "title": "Ինչպե՞ս ենք ուսումնասիրում պատմությունը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_153",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_5_g_4",
    "title": "Նախապատմությունից մինչև պատմություն",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_153_l_570",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_153",
    "title": "Մարդու ծագումը. հմուտ մարդ, ուղիղ քայլող մարդ, բանական մարդ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_153_l_571",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_153",
    "title": "Մարդը քարե դարում, նեոլիթյան հեղափոխությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_153_l_572",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_153",
    "title": "Հասարակության անհամաչափ զարգացման օրինաչափությունները: Պղնձի դար: Բրոնզի դար",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_153_l_573",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_153",
    "title": "Հայկական լեռնաշխարհի հնագույն բնակատեղիները: Հասարակական հարաբերություններ, տնտեսություն, մշակույթ, կրոն:",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_5_g_4",
    "title": "Ի՞նչ ենք սովորում հնագույն քաղաքակրթություններից և ինչո՞ւ։",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163_l_654",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_163",
    "title": "Հնագույն քաղաքակրթությունները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163_l_655",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_163",
    "title": "Լեզվաընտանիքներ, ժողովուրդներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163_l_656",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_163",
    "title": "Գրային համակարգի զարգացումն ու առաջին դպրոցների առաջացումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163_l_657",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_163",
    "title": "Հնագույն քաղաքակրթությունների հասարակական կյանքը, մարդկանց զբաղմունքն ու կենցաղը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_163_l_658",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_163",
    "title": "Հայկական լեռնաշխարհի հնագույն հասարակությունների պատմա-մշակութային միջավայրը, բնակատեղիները, առևտուրը, հասարակական կյանքը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_5_g_4",
    "title": "Հավատալիքներից մինչև աշխարհի կրոնական ու գիտական ընկալում",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203_l_918",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_203",
    "title": "Հավատալիքները նախնադարում. մարդու և բնության սերտ կապը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203_l_919",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_203",
    "title": "Հին աշխարհի հավատալիքներ (հինարևելյան դիցարան)",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203_l_920",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_203",
    "title": "Հին աշխարհի հավատալիքներ (հայկական դիցարան)",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203_l_921",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_203",
    "title": "Հին աշխարհի հավատալիքներ (անտիկ դիցարան)",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_203_l_922",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_203",
    "title": "Համաշխարհային կրոնները և հավատալիքները",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_217",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_5_g_4",
    "title": "Նորարարություններն ու գաղափարները փոխում են աշխարհը",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_5_g_4_t_217_l_981",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_217",
    "title": "Նորն ու նորարաությունը Հին աշխարհում: Անտիկ աշխարհ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_217_l_982",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_217",
    "title": "Պոլիսի և քաղաքացու գաղափարը, օրենքներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_217_l_983",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_217",
    "title": "Ալեքսանդր Մակեդոնացու արշավանքները՝ մշակութային նորարարության հիմք. հելլենիզմի առաջացումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_5_g_4_t_217_l_984",
    "programId": "prog_5",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_5_g_4_t_217",
    "title": "Աշխարհի հրաշալիքները՝ նորարարություններ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "7-րդ դասարան",
    "sortOrder": 1218,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_12",
    "title": "Արվեստի դերը և նշանակությունը։ Ճանապարհորդություն աշխարհի շուրջ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_659",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Նախաարվեստ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_660",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Այցելություն Հին Եգիպտոս",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_661",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Այցելություն հայոց Ոսկեդար",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_662",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Այցելություն հայկական միջնադար",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_663",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Այցելություն Վերածննդի դարաշրջան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_664",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Այցելություն Ճապոնիա",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_665",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Ինչպես է ստեղծվում երաժշտությունը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_164_l_1342",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_164",
    "title": "Թատրոնի, կինոյի ծնունդը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_12",
    "title": "Հին աշխարհի արվեստ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_666",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Նախնադարյան արվեստի զարգացման շրջափուլերը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_667",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Ուրարտու կամ Արարատյան թագավորության արվեստը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_668",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հայոց հեթանոս աստվածները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_669",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Եգիպտական արվեստ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_670",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հին հունական արվեստ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_671",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հռոմեական արվեստ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_672",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հելլենիզմի շրջանի արվեստը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_673",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հելլենիստական Հայաստանի արվեստը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_674",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Թատրոնը Հին Հայաստանում",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_165_l_675",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_165",
    "title": "Հին աշխարհի յոթ հրաշալիքները",
    "sortOrder": 10,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_283",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_12",
    "title": "Միջնադարյան արվեստ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_12_t_283_l_1377",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_283",
    "title": "Բյուզանդական արվեստ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_283_l_1378",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_283",
    "title": "Գոթական տաճար",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_283_l_1379",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_283",
    "title": "Խճանկարչություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_284",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_12",
    "title": "Ժողովրդական և դասական ստեղծագործություններ",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_12_t_284_l_1380",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_284",
    "title": "Հայ աշուղական արվեստ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_284_l_1381",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_284",
    "title": "Հայ ազգային երգեր և պարեր։ Ժողովրդական և դասական ստեղծագործությունների մշակումները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_284_l_1382",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_284",
    "title": "Ժամանակակից հայ կոմպոզիտորների երգարվեստը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_12_t_284_l_1383",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_12_t_284",
    "title": "Հայ կինոյի ծնունդը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "10-րդ դասարան",
    "sortOrder": 1248,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_16",
    "title": "Արվեստի ծագումը։ Հին աշխարհի արվեստը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_632",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Կերպարվեստ։ Քանդակագործություն։ Դեկորատիվ–կիրառական արվեստ։ Ճարտարապետություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_633",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Լուսանկարչություն։ Երաժշտություն։ Գրականություն։ Թատրոն։ Կինոարվեստ։ Պար",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_634",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Ինչ է արվեստը պատմում անցյալի և ապագայի մասին",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_635",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Արվեստի ծագումը։ Նախնադարյան արվեստ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_636",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Ինչպե՞ս և ինչո՞ւ առաջացավ երաժշտությունը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_637",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Հին Եգիպտոսի արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_638",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Միջագետքի արվեստը",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_160_l_639",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_160",
    "title": "Վանի թագավորության արվեստը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_16",
    "title": "Հին Հունաստանի և Հռոմի արվեստը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_640",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Էգեյան արվեստը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_641",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Արվեստը Հին Հունաստանում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_642",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Թատրոնի ծագումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_643",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Հելլենիզմ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_644",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Հելլենիզմը Հայաստանում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_645",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Հին Հռոմի արվեստը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_161_l_646",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_161",
    "title": "Երաժշտությունը հին և անտիկ աշխարհում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_16",
    "title": "Միջնադարյան արվեստ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_647",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Բյուզանդական արվեստ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_648",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Եվրոպական միջնադարյան երաժշտություն, թատրոն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_649",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Հայկական միջնադարյան երաժշտություն, թատրոն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_650",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Հայկական միջնադարյան մանրանկարչություն, քանդակագործություն",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_651",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Ռոմանական արվեստ։ Գոթական արվեստ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_652",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Արվեստը ծագող արևի երկրում։ Ճապոնական թատրոն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_16_t_162_l_653",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_16_t_162",
    "title": "Վերածննդի արվեստ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 1274,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_20",
    "title": "Միջնադարյան հայ արվեստ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_847",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Ճարտարապետություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_848",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Ձեռագիր մատյաններ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_849",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Հայկական ձեռագիր մատյանների հավաքածուները։ Մատենադարան",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_850",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Հայկական խաչքար",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_851",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Զարդարվեստ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_192_l_852",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_192",
    "title": "Հայ գուսանա-աշուղական արվեստ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_20",
    "title": "Միջնադարյան եվրոպական արվեստ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193_l_853",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_193",
    "title": "Վերածննդի իտալական արվեստ։ Արվեստի տեխնոլոգիաներ և գյուտեր",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193_l_854",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_193",
    "title": "Թատրոնը Վերածննդի շրջանում։ Վերածննդի անգլիական թատրոն։ Շեքսպիր",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193_l_855",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_193",
    "title": "Տիրամոր կերպարն արվեստում։ Տիրամոր կերպարը Վարդգես Սուրենյանցի արվեստում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193_l_856",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_193",
    "title": "Նորարարություն և երևակայություն։ Վերսալի պալատը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_193_l_857",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_193",
    "title": "Օպերային ներկայացումներ։ Բալետ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_20",
    "title": "Արվեստի միջոցով իրականության ընկալում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285_l_1372",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_285",
    "title": "Արվեստի ստեղծագործությունների կրկնօրինակներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285_l_1373",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_285",
    "title": "Բնության պատկերումն արվեստում։ Բնանկար",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285_l_1374",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_285",
    "title": "Իմպրեսիոնիզմ։ Էքսպրեսիոնիզմ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285_l_1375",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_285",
    "title": "Արվեստը որպես ներշնչանքի աղբյուր։ Սերգեյ Փարաջանով",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_20_t_285_l_1376",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_20_t_285",
    "title": "Ժամանակակից հայ կոմպոզիտորների երգարվեստը։ Պարարվեստը մեր մշակույթում",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "11-րդ դասարան",
    "sortOrder": 1294,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_25_t_286",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_25",
    "title": "Վերածնունդ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_25_t_286_l_1384",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_286",
    "title": "Նախավերածնունդ և վաղ վերածնունդ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_286_l_1385",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_286",
    "title": " Բարձր Վերածնունդ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_286_l_1386",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_286",
    "title": "Վերածննդի շրջանի թատրոնը և երաժշտությունը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_25",
    "title": "Արվեստը XVII-XVIII դդ․",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1387",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "XVII դարի եվրոպական կերպարվեստը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1388",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "Օպերան և բարոկկո շրջանի երաժշտությունը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1389",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "Կլասիցիզմի շրջանի ֆրանսիական թատրոնը, XVII դար",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1390",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "XVIII դարի եվրոպական կերպարվեստը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1391",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "Լուսավորության դարաշրջան",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_287_l_1392",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_287",
    "title": "Կլասիցիզմը երաժշտության մեջ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_6_g_25",
    "title": "Արվեստը XIX դարում",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288_l_1393",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_288",
    "title": "XIX դարը կինոյում։ XIX դարի եվրոպական թատերարվեստը։ Ռոմանտիզմ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288_l_1394",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_288",
    "title": "XIX դարի թատրոնի ընդհանուր բնութագիրը։ Նատուրալիզմ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288_l_1395",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_288",
    "title": "XIX դարի եվրոպական կերպարվեստը։ Իմպրեսիոնիզմ։ Պոստիմպրեսիոնիզմ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288_l_1396",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_288",
    "title": "Երաժշտությունը XIX դարում։ Հայ դասական երաժշտոթյունը XIX դարում",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_6_g_25_t_288_l_1397",
    "programId": "prog_6",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_6_g_25_t_288",
    "title": "XIX դարի հայկական կերպարվեստը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "4-րդ դասարան",
    "sortOrder": 1312,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_7_g_30",
    "title": "Մեր հայրենիքը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_867",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Հայաստանի Հանրապետություն։ ՀՀ մարզերը, քաղաքները",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_868",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Մեր պետականության խորհրդանիշները",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_869",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Մեր ազգային պետական տոները",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_870",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Մեր հայրենիքի անցյալն ու ներկան",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_871",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Նշանավոր գործիչներ և իրադարձություններ",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_872",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": " Մշակութային արժեքներ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_873",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Մարզական նվաճումներ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_195_l_874",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_195",
    "title": "Առասպելների երկիր",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_7_g_30",
    "title": "Ճանապարհորդություններ և աշխարհագրական հայտնագործություններ",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_875",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ճանապարհորդությունները վաղ անցյալում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_876",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ճանապարհորդությունները դեպի Հնդկաստան, Չինաստան",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_877",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ամերիկայի հայտնագործումը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_878",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ճանապարհորդություններ Աֆրիկայով",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_879",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ավստրալիայի հայտնագործումը",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_880",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Անտարկտիդայի հայտնագործումն ու հետազոտումը",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_881",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Շուրջերկրյա ճանապարհորդություններ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_7_g_30_t_196_l_882",
    "programId": "prog_7",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_7_g_30_t_196",
    "title": "Ժամանակակից ճանապարհորդություններն օվկիանոսում և տիեզերքում",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "8-րդ դասարան",
    "sortOrder": 1331,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_20_t_199",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_8_g_20",
    "title": "Հայ ռազմարվեստի պատմությունը մինչև I դ․",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_20_t_199_l_896",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_199",
    "title": "Հայկական լեռնաշխարհի ցեղերի ռազմարվեստը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_199_l_897",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_199",
    "title": "Վանի թագավորության ռազմարվեստը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_199_l_898",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_199",
    "title": "Երվանդունյաց Հայաստանի ռազմարվեստը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_199_l_899",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_199",
    "title": "Ռազմարվեստը Արտաշեսյանների օրոք",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_8_g_20",
    "title": "Հայ ռազմարվեստի պատմությունը I-XIX դ․",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_900",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Ռազմարվեստը Արշակունիների օրոք",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_901",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Հայ ռազմարվեստը նախարարական շրջանում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_902",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Ռազմարվեստը Բագրատունիների օրոք",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_903",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Կիլիկյան Հայաստանի ռազմարվեստը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_904",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Հայ ռազմարվեստը XI-XVII դդ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_905",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Հայ ռազմարվեստը XVII-XIX դդ․",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_20_t_200_l_906",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_20_t_200",
    "title": "Հայ զինուժը օտարերկրյա բանակներում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "9-րդ դասարան",
    "sortOrder": 1345,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_24_t_201",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_8_g_24",
    "title": "Հայ ռազմարվեստի պատմությունը մինչև I դ․",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_24_t_201_l_907",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_201",
    "title": "Հայկական լեռնաշխարհի ցեղերի ռազմարվեստը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_201_l_908",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_201",
    "title": "Վանի թագավորության ռազմարվեստը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_201_l_909",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_201",
    "title": "Երվանդունյաց Հայաստանի ռազմարվեստը",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_201_l_910",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_201",
    "title": "Ռազմարվեստը Արտաշեսյանների օրոք",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_8_g_24",
    "title": "Հայ ռազմարվեստի պատմությունը I-XIX դ․",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_911",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Ռազմարվեստը Արշակունիների օրոք",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_912",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Հայ ռազմարվեստը նախարարական շրջանում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_913",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Ռազմարվեստը Բագրատունիների օրոք",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_914",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Կիլիկյան Հայաստանի ռազմարվեստը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_915",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Հայ ռազմարվեստը XI-XVII դդ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_916",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Հայ ռազմարվեստը XVII-XIX դդ․",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_202_l_917",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_202",
    "title": "Հայ զինուժը օտարերկրյա բանակներում",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_8_g_24",
    "title": "Հայ ռազմարվեստի պատմությունը XIX-XXI դդ․",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_948",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Հայդուկային պայքարի մարտավարությունն ու ռազմարվեստը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_949",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Առաջին աշխարհամարտի Կովկասյան ճակատը և հայ կամավորական շարժումը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_950",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Ինքնապաշտպանական մարտերը 1915-1921 թթ․",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_951",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Մայիսյան հերոսամարտերը",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_952",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Հայկական բանակի կազմավորումն ու ռազմարվեստը 1918-1921 թթ․",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_953",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Հայերը Երկրորդ աշխարհամարտի տարիներին",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_8_g_24_t_210_l_954",
    "programId": "prog_8",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_8_g_24_t_210",
    "title": "Արցախյան պատերազմ",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "5-րդ դասարան",
    "sortOrder": 1367,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_9_g_28_t_298",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_9_g_28",
    "title": "Երաժշտության և արվեստի մյուս տեսակների փոխառնչությունները, գեղարվեստական կերպար",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_9_g_28_t_298_l_1459",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_298",
    "title": "Երաժշտությունը և գրականությունը։ /երաժշտական ժանրեր՝ խմբերգ, ռոմանս, կանտատ և այլն, երաժշտական և գրական կերպարներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28_t_298_l_1460",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_298",
    "title": "Երաժշտությունը և պարարվեստը. ժողովրդական, դասական, ժամանակակից պարեր, երաժշտական և պարային կերպարներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28_t_298_l_1461",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_298",
    "title": "Երաժշտությունը և կերպարվեստը, երաժշտական և կերպարվեստի կերպարներ",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28_t_312",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_9_g_28",
    "title": "Կինոյի և թատրոնի երաժշտություն, երաժշտությունը լրատվամիջոցներում, երաժշտությունը և համակարգիչը",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_9_g_28_t_312_l_1530",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_312",
    "title": "Երաժշտությունը թատրոնում",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28_t_312_l_1531",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_312",
    "title": "Երաժշտությունը կինոյում",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_9_g_28_t_312_l_1532",
    "programId": "prog_9",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_9_g_28_t_312",
    "title": "Երաժշտությունը լրատվամիջոցներում և համացանցում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_10_g_34",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "2025",
    "sortOrder": 1376,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_10_g_34_t_244",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_10_g_34",
    "title": "ՍԷԱԴ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_10_g_34_t_244_l_1159",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_10_g_34_t_244",
    "title": "Քարտեզագրելով ազգային կամ համաշխարհային ժառանգություն ստեղծած անհատի ուղին",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_10_g_40",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "2026",
    "sortOrder": 1379,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_10_g_40_t_313",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_10_g_40",
    "title": "ՍԷԱԴ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_10_g_40_t_313_l_1533",
    "programId": "prog_10",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_10_g_40_t_313",
    "title": "Քարտեզագրելով Հայաստանի բնության ապագան․ գլոբալ խնդիրներ, տեղային լուծում ներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_11_g_35",
    "programId": "prog_11",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "Ավագ դպրոց",
    "sortOrder": 1382,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_11_g_35_t_245",
    "programId": "prog_11",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_11_g_35",
    "title": "Ուղևորություն դեպի դասական երաժշտության աշխարհ",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_11_g_35_t_245_l_1160",
    "programId": "prog_11",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_11_g_35_t_245",
    "title": "Նվագախմբի գաղտնիքները. ծանոթություն սիմֆոնիկ աշխարհի հետ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_11_g_35_t_245_l_1161",
    "programId": "prog_11",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_11_g_35_t_245",
    "title": "Հարմոնիայի լեզուն. զգացմունքներ, ռիթմ ու կոմպոզիտորներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "1-12",
    "sortOrder": 1386,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_275",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Հայոց լեզու և գրականություն",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_275_l_1343",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_275",
    "title": "Մայրենի",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_275_l_1344",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_275",
    "title": "Հայոց լեզու",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_275_l_1345",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_275",
    "title": "Գրականություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_276",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Հայրենագիտություն",
    "sortOrder": 2,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_276_l_1346",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_276",
    "title": "Իմ հայրենիքը",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_276_l_1347",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_276",
    "title": "Իմ հայրենիքը և աշխարհը",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_276_l_1348",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_276",
    "title": "Հայոց պատմություն",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_277",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Օտար լեզուներ",
    "sortOrder": 3,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_277_l_1349",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_277",
    "title": "Օտար լեզուներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "ԲՏՃՄ",
    "sortOrder": 4,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1350",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Մաթեմատիկա",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1351",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Բնություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1352",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Ֆիզիկա",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1353",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Քիմիա",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1354",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Կենսաբանություն",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1355",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Բնագիտություն",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1356",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Աշխարհագրություն",
    "sortOrder": 7,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1357",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "Ես և շրջակա աշխարհը",
    "sortOrder": 8,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_278_l_1358",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_278",
    "title": "ԹԳՀԳ",
    "sortOrder": 9,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Արվեստ և արհեստ",
    "sortOrder": 5,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1359",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Երաժշտություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1360",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Կերպարվեստ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1361",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Ազգային երգ և պար",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1362",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Արվեստ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1363",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Տեխնոլոգիա",
    "sortOrder": 5,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_279_l_1364",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_279",
    "title": "Շախմատ",
    "sortOrder": 6,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_280",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Հասարակություն, հասարակական գիտություններ",
    "sortOrder": 6,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_280_l_1365",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_280",
    "title": "Հասարակագիտություն",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_280_l_1366",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_280",
    "title": "Համաշխարհային պատմություն",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_281",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Ֆիզիկական կրթություն և անվտանգ կենսագործունեություն",
    "sortOrder": 7,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_281_l_1367",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_281",
    "title": "Ֆիզկուլտուրա",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_281_l_1368",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_281",
    "title": "Առողջ ապրելակերպ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_281_l_1369",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_281",
    "title": "Մասնագիտական կողմնորոշում",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_281_l_1370",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_281",
    "title": "ՆԶՊ",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_12_g_36_t_282",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_12_g_36",
    "title": "Կրթական գործընթացի այլ մասնակիցներ",
    "sortOrder": 8,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_12_g_36_t_282_l_1371",
    "programId": "prog_12",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_12_g_36_t_282",
    "title": "Կրթական գործընթացի այլ մասնակիցներ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_13_g_39",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_grade",
    "parentId": null,
    "title": "2-12",
    "sortOrder": 1424,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_13_g_39_t_308",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_topic",
    "parentId": "n_vaf_prog_13_g_39",
    "title": "Կլիմայի փոփոխության հիմնախնդիրը",
    "sortOrder": 1,
    "type": "node"
  },
  {
    "id": "n_vaf_prog_13_g_39_t_308_l_1506",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_13_g_39_t_308",
    "title": "Կլիմա և եղանակ",
    "sortOrder": 1,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_13_g_39_t_308_l_1507",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_13_g_39_t_308",
    "title": "Կլիմայի տեսակներ և կլիմայական գոտիներ",
    "sortOrder": 2,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_13_g_39_t_308_l_1508",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_13_g_39_t_308",
    "title": "Ինչու և ինչպես է կլիման փոխվել անցյալում (միլիոնավոր տարիներ, հազարամյակներ, դարեր)",
    "sortOrder": 3,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  },
  {
    "id": "n_vaf_prog_13_g_39_t_308_l_1509",
    "programId": "prog_13",
    "organizationId": "org_vaf",
    "templateId": "tpl_subject",
    "nodeTypeId": "type_lesson",
    "parentId": "n_vaf_prog_13_g_39_t_308",
    "title": "Կլիմայի ներկա փոփոխությունները",
    "sortOrder": 4,
    "type": "node",
    "metadata": {
      "isPlayable": true
    }
  }
];

initialNodes.push(...scrapedNodes);


// Ayb Math (tpl_subject: Grade -> Topic -> Lesson)
initialNodes.push(
  { id: 'n_ayb_m_10', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '10-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_m_11', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '11-րդ դասարան', sortOrder: 2, type: 'node' },
  { id: 'n_ayb_m_10_t1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_ayb_m_10', title: 'Եռանկյունաչափություն', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_m_10_t1_l1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_ayb_m_10_t1', title: 'Սինուս և Կոսինուս', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ayb_m_11_t1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_ayb_m_11', title: 'Անալիզի սկզբունքներ', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_m_11_t1_l1', programId: 'prog_ayb_1', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_ayb_m_11_t1', title: 'Ածանցյալ և դրա կիրառությունները', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// Ayb Physics (tpl_subject: Grade -> Topic -> Lesson)
initialNodes.push(
  { id: 'n_ayb_p_11', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '11-րդ դասարան', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_p_12', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_grade', parentId: null, title: '12-րդ դասարան', sortOrder: 2, type: 'node' },
  { id: 'n_ayb_p_11_t1', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_ayb_p_11', title: 'Կինեմատիկա', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_p_11_t1_l1', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_ayb_p_11_t1', title: 'Հավասարաչափ արագացող շարժում', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ayb_p_12_t1', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_topic', parentId: 'n_ayb_p_12', title: 'Էլեկտրամագնիսականություն', sortOrder: 1, type: 'node' },
  { id: 'n_ayb_p_12_t1_l1', programId: 'prog_ayb_2', organizationId: 'org_ayb', templateId: 'tpl_subject', nodeTypeId: 'type_lesson', parentId: 'n_ayb_p_12_t1', title: 'Էլեկտրամագնիսական ինդուկցիա', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// YSU CS (tpl_university: Course -> Subject -> Lecture)
initialNodes.push(
  { id: 'n_ysu_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'I Կուրս', sortOrder: 1, type: 'node' },
  { id: 'n_ysu_f2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'II Կուրս', sortOrder: 2, type: 'node' },
  { id: 'n_ysu_f1_t1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_ysu_f1', title: 'Ալգորիթմների հիմունքներ', sortOrder: 1, type: 'node' },
  { id: 'n_ysu_f1_t1_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu_f1_t1', title: 'Դասախոսություն 1. Ներածություն ալգորիթմներին', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ysu_f1_t1_f2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu_f1_t1', title: 'Դասախոսություն 2. Գծային և ճյուղավորված ալգորիթմներ', sortOrder: 2, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ysu_f1_t2', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_ysu_f1', title: 'Ծրագրավորման Հիմունքներ (C++)', sortOrder: 2, type: 'node' },
  { id: 'n_ysu_f1_t2_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu_f1_t2', title: 'Դասախոսություն 1. Փոփոխականներ և տիպեր', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ysu_f2_t1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_ysu_f2', title: 'Տվյալների Կառուցվածքներ', sortOrder: 1, type: 'node' },
  { id: 'n_ysu_f2_t1_f1', programId: 'prog_ysu_1', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu_f2_t1', title: 'Դասախոսություն 1. Դինամիկ զանգվածներ և ցուցակներ', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// YSU Math (tpl_university: Course -> Subject -> Lecture)
initialNodes.push(
  { id: 'n_ysu2_c1', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'I Կուրս', sortOrder: 1, type: 'node' },
  { id: 'n_ysu2_c2', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'II Կուրս', sortOrder: 2, type: 'node' },
  { id: 'n_ysu2_c1_s1', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_ysu2_c1', title: 'Մաթեմատիկական Անալիզ', sortOrder: 1, type: 'node' },
  { id: 'n_ysu2_c1_s1_l1', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu2_c1_s1', title: 'Դասախոսություն 1. Սահմաններ և բազմություններ', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ysu2_c2_s1', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_ysu2_c2', title: 'Դիֆերենցիալ Հավասարումներ', sortOrder: 1, type: 'node' },
  { id: 'n_ysu2_c2_s1_l1', programId: 'prog_ysu_2', organizationId: 'org_ysu', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_ysu2_c2_s1', title: 'Դասախոսություն 1. Առաջին կարգի հավասարումներ', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// Polytechnic AI (tpl_university: Course -> Subject -> Lecture)
initialNodes.push(
  { id: 'n_poly_c3', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'III Կուրս', sortOrder: 1, type: 'node' },
  { id: 'n_poly_c4', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_course_year', parentId: null, title: 'IV Կուրս', sortOrder: 2, type: 'node' },
  { id: 'n_poly_c3_s1', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_poly_c3', title: 'Մեքենայական Ուսուցում', sortOrder: 1, type: 'node' },
  { id: 'n_poly_c3_s1_l1', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_poly_c3_s1', title: 'Դասախոսություն 1. Գծային և լոգիստիկ ռեգրեսիա', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_poly_c4_s1', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_uni_subject', parentId: 'n_poly_c4', title: 'Խորը Ուսուցում (Deep Learning)', sortOrder: 1, type: 'node' },
  { id: 'n_poly_c4_s1_l1', programId: 'prog_polytech_1', organizationId: 'org_polytech', templateId: 'tpl_university', nodeTypeId: 'type_lecture', parentId: 'n_poly_c4_s1', title: 'Դասախոսություն 1. Բազմաշերտ պերսեպտրոններ', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// Central Bank (tpl_course: Module -> Material) - 2 Levels
initialNodes.push(
  { id: 'n_cba_m1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 1. Անձնական Ֆինանսներ և Բյուջե', sortOrder: 1, type: 'node' },
  { id: 'n_cba_m2', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 2. Խնայողություններ և Բանկեր', sortOrder: 2, type: 'node' },
  { id: 'n_cba_m1_l1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_cba_m1', title: 'Ինչպես ճիշտ տնօրինել գրպանի գումարը', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_cba_m1_l2', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_cba_m1', title: 'Ընտանեկան բյուջեի պլանավորում և վերահսկում', sortOrder: 2, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_cba_m2_l1', programId: 'prog_cba_1', organizationId: 'org_cba', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_cba_m2', title: 'Ինչու՞ խնայել. Բարդ տոկոսի ուժը', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// UNDP SDG (tpl_course: Module -> Material) - 2 Levels
initialNodes.push(
  { id: 'n_undp_m1', programId: 'prog_undp_1', organizationId: 'org_undp', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 1. Կլիմայական Գործողություն (SDG 13)', sortOrder: 1, type: 'node' },
  { id: 'n_undp_m2', programId: 'prog_undp_1', organizationId: 'org_undp', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 2. Որակյալ Կրթություն (SDG 4)', sortOrder: 2, type: 'node' },
  { id: 'n_undp_m1_l1', programId: 'prog_undp_1', organizationId: 'org_undp', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_undp_m1', title: 'Գլոբալ տաքացում և ջերմոցային էֆեկտ', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_undp_m1_l2', programId: 'prog_undp_1', organizationId: 'org_undp', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_undp_m1', title: 'Վերականգնվող էներգիայի անցում', sortOrder: 2, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_undp_m2_l1', programId: 'prog_undp_1', organizationId: 'org_undp', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_undp_m2', title: 'Հավասար կրթական հնարավորություններ բոլորի համար', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// Museum (tpl_museum: Hall -> Exhibit) - 2 Levels
initialNodes.push(
  { id: 'n_mus_h1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_hall', parentId: null, title: 'Ցուցասրահ 1. Բրոնզե և Երկաթե Դարեր', sortOrder: 1, type: 'node' },
  { id: 'n_mus_h2', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_hall', parentId: null, title: 'Ցուցասրահ 2. Ուրարտական Արվեստ', sortOrder: 2, type: 'node' },
  { id: 'n_mus_h1_e1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_exhibit', parentId: 'n_mus_h1', title: 'Լճաշենի փայտյա երկանիվ կառքը', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_mus_h1_e2', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_exhibit', parentId: 'n_mus_h1', title: 'Բրոնզաձույլ արձանիկներ և զենքեր', sortOrder: 2, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_mus_h2_e1', programId: 'prog_museum_1', organizationId: 'org_museum', templateId: 'tpl_museum', nodeTypeId: 'type_exhibit', parentId: 'n_mus_h2', title: 'Էրեբունիի որմնանկարները', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

// Independent (tpl_course: Module -> Material) - 2 Levels
initialNodes.push(
  { id: 'n_ind_m1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 1. Տեսախցիկի Կառավարում', sortOrder: 1, type: 'node' },
  { id: 'n_ind_m2', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_module', parentId: null, title: 'Մոդուլ 2. Լույս և Ստվեր', sortOrder: 2, type: 'node' },
  { id: 'n_ind_m1_l1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_ind_m1', title: 'Դիաֆրագմա, Կնճիռ (Shutter speed) և ISO', sortOrder: 1, type: 'node', metadata: { isPlayable: true } },
  { id: 'n_ind_m2_l1', programId: 'prog_ind_1', organizationId: 'org_ind', templateId: 'tpl_course', nodeTypeId: 'type_material', parentId: 'n_ind_m2', title: 'Տեսադաս. Բնական լույսի կիրառումը դիմանկարներում', sortOrder: 1, type: 'node', metadata: { isPlayable: true } }
);

export const mockSlideshows: Record<string, { title: string, slides: { title: string, content: string }[] }> = {
  "n_vaf_prog_0_g_20_t_107_l_330": {
    "title": "Ռուբինյան իշխանության ամրապնդումն ու հզորացումը",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Կիլիկիայում հայկական պետականության վերականգնումը հայ ժողովրդի պատմության ամենավառ էջերից է։"
      },
      {
        "title": "Ռուբինյաններ",
        "content": "Ռուբինյանների արքայատոհմը կարողացավ համախմբել տեղի հայությանը և ստեղծել հզոր իշխանություն։"
      },
      {
        "title": "Արդյունքը",
        "content": "Այն դարձավ անկախ թագավորության հիմքը։"
      }
    ]
  },
  "n_vaf_prog_0_g_4_t_20_l_52": {
    "title": "Հայկական լեռնաշխարհը՝ հայերի հայրենիք",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Այս դասը նվիրված է հետևյալ թեմային՝ Հայկական լեռնաշխարհը՝ հայերի հայրենիք։"
      },
      {
        "title": "Կարևոր Փաստեր",
        "content": "Հայաստանի պատմության այս ժամանակահատվածը լի է կարևոր իրադարձություններով և պատմական զարգացումներով։"
      },
      {
        "title": "Ամփոփում",
        "content": "Աղբյուրների համադրումը թույլ է տալիս ավելի լավ հասկանալ պատմական ընթացքը։"
      }
    ]
  },
  "n_vaf_prog_0_g_4_t_20_l_53": {
    "title": "Հայկական լեռնաշխարհի դիրքը, սահմանները, գետերը, լճերը",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Այս դասը նվիրված է հետևյալ թեմային՝ Հայկական լեռնաշխարհի դիրքը, սահմանները, գետերը, լճերը։"
      },
      {
        "title": "Կարևոր Փաստեր",
        "content": "Հայաստանի պատմության այս ժամանակահատվածը լի է կարևոր իրադարձություններով և պատմական զարգացումներով։"
      },
      {
        "title": "Ամփոփում",
        "content": "Աղբյուրների համադրումը թույլ է տալիս ավելի լավ հասկանալ պատմական ընթացքը։"
      }
    ]
  },
  "n_vaf_prog_0_g_4_t_20_l_76": {
    "title": "Հայաստանի պատմավարչական բաժանումը",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Այս դասը նվիրված է հետևյալ թեմային՝ Հայաստանի պատմավարչական բաժանումը։"
      },
      {
        "title": "Կարևոր Փաստեր",
        "content": "Հայաստանի պատմության այս ժամանակահատվածը լի է կարևոր իրադարձություններով և պատմական զարգացումներով։"
      },
      {
        "title": "Ամփոփում",
        "content": "Աղբյուրների համադրումը թույլ է տալիս ավելի լավ հասկանալ պատմական ընթացքը։"
      }
    ]
  },
  "n_vaf_prog_0_g_4_t_20_l_116": {
    "title": "Մեծ Հայքի նահանգները և գավառները",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Այս դասը նվիրված է հետևյալ թեմային՝ Մեծ Հայքի նահանգները և գավառները։"
      },
      {
        "title": "Կարևոր Փաստեր",
        "content": "Հայաստանի պատմության այս ժամանակահատվածը լի է կարևոր իրադարձություններով և պատմական զարգացումներով։"
      },
      {
        "title": "Ամփոփում",
        "content": "Աղբյուրների համադրումը թույլ է տալիս ավելի լավ հասկանալ պատմական ընթացքը։"
      }
    ]
  },
  "n_vaf_prog_0_g_4_t_27_l_80": {
    "title": "Հայկական լեռնաշխարհը՝ որպես մարդկության հնագույն բնօրրան",
    "slides": [
      {
        "title": "Ներածություն",
        "content": "Այս դասը նվիրված է հետևյալ թեմային՝ Հայկական լեռնաշխարհը՝ որպես մարդկության հնագույն բնօրրան։"
      },
      {
        "title": "Կարևոր Փաստեր",
        "content": "Հայաստանի պատմության այս ժամանակահատվածը լի է կարևոր իրադարձություններով և պատմական զարգացումներով։"
      },
      {
        "title": "Ամփոփում",
        "content": "Աղբյուրների համադրումը թույլ է տալիս ավելի լավ հասկանալ պատմական ընթացքը։"
      }
    ]
  }
};
