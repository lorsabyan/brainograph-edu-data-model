import json

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
  { id: 'org_vaf', name: 'Աշխարհացույց / Վիզուալ Հայաստան', defaultTemplateId: 'tpl_subject' }
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

export const initialPrograms: Program[] = subjects.map((subj, index) => ({
  id: `prog_${index}`,
  title: subj,
  description: 'Աշխարհացույց նախագծի շրջանակներում ստեղծված ուսումնական նյութեր',
  organizationId: 'org_vaf',
  templateId: subj === 'Նախագծային աշխատանք' || subj === 'Սիմֆոնիկ ԴասA' || subj === 'Կլիմայական արկղիկ' ? 'tpl_freeform' : 'tpl_subject',
  color: colors[index]
}));

export const initialNodes: ContentNode[] = [];
"""

# Let's dynamically add the detailed nodes to the python script
content_nodes_code = """
// Create Grades for Հայոց պատմություն (prog_0)
const prog_hp_id = 'prog_0';
const grades = ['6-րդ դասարան', '7-րդ դասարան', '8-րդ դասարան', '9-րդ դասարան', '10-րդ դասարան', '11-րդ դասարան', '12-րդ դասարան'];

grades.forEach((grade, gIdx) => {
  const gId = `n_hp_g${gIdx}`;
  initialNodes.push({
    id: gId, programId: prog_hp_id, organizationId: 'org_vaf', templateId: 'tpl_subject',
    nodeTypeId: 'type_grade', parentId: null, title: grade, sortOrder: gIdx + 1, type: 'node'
  });
  
  // Specific Topics for 8th Grade
  if (grade === '8-րդ դասարան') {
    const topics = [
      'Հայաստանը XI-XIV դդ.',
      'Կիլիկյան Հայաստանը',
      'Ազգային-քրիստոնեական մշակույթը X-XIV դդ.',
      'Հայաստանը XV-XVII դդ.',
      'Պետական անկախության վերականգնման համար պայքարը XVIII դարում',
      'Հայաստանը և հայ ժողովուրդը XIX դարում',
      'Հայկական գաղթավայրերը: Ազգային մշակույթը Մայր հայրենիքում և գաղթօջախներում (XV-XX դարի սկիզբ)'
    ];
    
    topics.forEach((topic, tIdx) => {
      const tId = `n_hp_g${gIdx}_t${tIdx}`;
      initialNodes.push({
        id: tId, programId: prog_hp_id, organizationId: 'org_vaf', templateId: 'tpl_subject',
        nodeTypeId: 'type_topic', parentId: gId, title: topic, sortOrder: tIdx + 1, type: 'node'
      });
      
      // Specific Lessons for 'Կիլիկյան Հայաստանը'
      if (topic === 'Կիլիկյան Հայաստանը') {
        const lessons = [
          'Պատմաաշխարհագրական տարածքը: Աշխարհաքաղաքական իրավիճակը: Ռուբինյան իշխանության հիմնադրումը',
          'Ռուբինյան իշխանության ամրապնդումն ու հզորացումը',
          'Թագավորության հռչակումը: Լևոն Մեծագործի ներքին և արտաքին քաղաքականությունը',
          'Հայրապետական աթոռի հաստատումը Կիլիկյան Հայաստանում։ Եկեղեցի-պետություն հարաբերությունները',
          'Հեթումյան արքայատոհմի հաստատումը: Հայ-մոնղոլական հարաբերությունները',
          'Ներքաղաքական ճգնաժամի խորացումը. հոգևոր ինքնուրույնությանն ու ազգային ինքնությանը սպառնացող մարտահրավերները: Պետության թուլացումն ու անկումը',
          'Կիլիկիայի հայկական պետության պետական կառավարման համակարգը, բանակը, տնտեսությունը, առօրյա կյանքն ու կենցաղը, հասարակական հարաբերությունները',
          'Կիլիկիայի հայկական թագավորության քաղաքակրթական ժառանգությունը'
        ];
        
        lessons.forEach((lesson, lIdx) => {
          initialNodes.push({
            id: `n_hp_g${gIdx}_t${tIdx}_l${lIdx}`, programId: prog_hp_id, organizationId: 'org_vaf', templateId: 'tpl_subject',
            nodeTypeId: 'type_lesson', parentId: tId, title: lesson, sortOrder: lIdx + 1, type: 'node',
            metadata: { isPlayable: true, imageUrl: 'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=500&q=80' }
          });
        });
      }
    });
  }
});
"""

with open('src/lib/data.ts', 'w') as f:
    f.write(content + content_nodes_code)

