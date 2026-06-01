import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

# We need to append the generation logic to the end of the file
generation_script = """
// Auto-generate full structure for all other subjects to simulate the complete database
(function() {
  const vafSubjects = [
    { id: 'prog_0', name: 'Հայոց պատմություն', grades: [6,7,8,9,10,11,12] },
    { id: 'prog_1', name: 'Համաշխարհային պատմություն', grades: [6,7,8,9,10,11,12] },
    { id: 'prog_2', name: 'Աշխարհագրություն', grades: [6,7,8,9,10,11,12] },
    { id: 'prog_3', name: 'Հայ գրականություն', grades: [7,8,9,10,11,12] },
    { id: 'prog_4', name: 'Իմ հայրենիքը', grades: [5] },
    { id: 'prog_5', name: 'Իմ հայրենիքը և աշխարհը', grades: [6] },
    { id: 'prog_6', name: 'Արվեստ', grades: [5,6,7] },
    { id: 'prog_7', name: 'Ես և շրջակա աշխարհը', grades: [2,3,4] },
    { id: 'prog_8', name: 'Ռազմարվեստի պատմություն', grades: [8,9,10,11,12] },
    { id: 'prog_9', name: 'Երաժշտություն', grades: [1,2,3,4,5,6,7] },
  ];

  let nodeCounter = 1000; // start high to avoid collisions

  vafSubjects.forEach(subj => {
    subj.grades.forEach(g => {
      // Avoid overwriting the ones we already explicitly created
      const gId = `n_auto_g_${nodeCounter++}`;
      
      // We only generate for grades/subjects we haven't manually populated
      if (subj.id === 'prog_0' && (g === 6 || g === 8)) return; 
      
      initialNodes.push({
        id: gId, programId: subj.id, organizationId: 'org_vaf', templateId: 'tpl_subject',
        nodeTypeId: 'type_grade', parentId: null, title: `${g}-րդ դասարան`, sortOrder: g, type: 'node'
      });
      
      for(let t=1; t<=5; t++) {
        const tId = `n_auto_t_${nodeCounter++}`;
        initialNodes.push({
          id: tId, programId: subj.id, organizationId: 'org_vaf', templateId: 'tpl_subject',
          nodeTypeId: 'type_topic', parentId: gId, title: `${subj.name} - Թեմա ${t}`, sortOrder: t, type: 'node'
        });
        
        for(let l=1; l<=4; l++) {
          initialNodes.push({
            id: `n_auto_l_${nodeCounter++}`, programId: subj.id, organizationId: 'org_vaf', templateId: 'tpl_subject',
            nodeTypeId: 'type_lesson', parentId: tId, title: `Դաս ${l}: Ներածություն և ուսումնասիրություն`, sortOrder: l, type: 'node',
            metadata: { isPlayable: true, imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=500&q=80' }
          });
        }
      }
    });
  });
})();
"""

if "// Auto-generate full structure" not in content:
    with open('src/lib/data.ts', 'a') as f:
        f.write(generation_script)

