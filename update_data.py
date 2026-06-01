import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

# 1. Add Program interface
program_interface = """export interface Program {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  templateId: string;
  color?: string;
  imageUrl?: string;
}

export interface ContentNode {"""

content = content.replace("export interface ContentNode {", program_interface)

# 2. Add programId to ContentNode
content = content.replace("export interface ContentNode {\n  id: string;\n  organizationId: string;\n  templateId: string;", "export interface ContentNode {\n  id: string;\n  programId: string;\n  organizationId: string;\n  templateId: string;")

# 3. Add initialPrograms after initialOrganizations
initial_programs = """export const initialPrograms: Program[] = [
  { id: 'prog_1', title: 'Մաթեմատիկայի ամբողջական դասընթաց (5-10 դասարաններ)', description: 'Հանրահաշիվ և Երկրաչափություն', organizationId: 'org_1', templateId: 'tpl_k12', color: '#3b82f6' },
  { id: 'prog_2', title: 'Ֆիզիկայի դասընթաց', description: 'Կինեմատիկայից մինչև էլեկտրադինամիկա', organizationId: 'org_1', templateId: 'tpl_k12', color: '#8b5cf6' },
  { id: 'prog_3', title: 'Հայոց Պատմություն', description: 'Հնագույն ժամանակներից մինչև միջնադար', organizationId: 'org_1', templateId: 'tpl_k12', color: '#f59e0b' },
  { id: 'prog_4', title: 'Ինֆորմատիկա և Կիրառական Մաթեմատիկա', description: 'Բակալավրիատի ծրագիր', organizationId: 'org_2', templateId: 'tpl_uni', color: '#2563eb' },
  { id: 'prog_5', title: 'Արհեստական Բանականություն', description: 'Արագացված ինտենսիվ կուրս', organizationId: 'org_3', templateId: 'tpl_freeform', color: '#ea580c' }
];

export const initialTemplates"""

content = content.replace("export const initialTemplates", initial_programs)

# 4. Modify mock data to include programId
# org_1 tpl_k12
content = content.replace("organizationId: 'org_1', templateId: 'tpl_k12'", "programId: 'prog_1', organizationId: 'org_1', templateId: 'tpl_k12'")
# Wait, prog_1 is math, prog_2 is physics, prog_3 is history... 
# Actually, let's just assign all org_1 tpl_k12 to prog_1 for simplicity right now.
# org_1 tpl_freeform -> let's make a new program for it or just assign to prog_5 (wait, prog_5 is org_3)
content = content.replace("organizationId: 'org_1', templateId: 'tpl_freeform'", "programId: 'prog_6', organizationId: 'org_1', templateId: 'tpl_freeform'")

# org_2 tpl_uni -> prog_4
content = content.replace("organizationId: 'org_2', templateId: 'tpl_uni'", "programId: 'prog_4', organizationId: 'org_2', templateId: 'tpl_uni'")

# org_3 tpl_freeform -> prog_5
content = content.replace("organizationId: 'org_3', templateId: 'tpl_freeform'", "programId: 'prog_5', organizationId: 'org_3', templateId: 'tpl_freeform'")

with open('src/lib/data.ts', 'w') as f:
    f.write(content)

