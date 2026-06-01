import re

with open('src/lib/data.ts', 'r') as f:
    content = f.read()

nodes_additions = """
// 6th Grade Topics and Lessons
(function() {
  const hpId = 'prog_0';
  const g6Id = 'n_hp_g0'; // The ID used for 6-րդ դասարան in our previous script
  
  const topics = [
    'Հայաստանը հնագույն շրջանում',
    'Հայկական լեռնաշխարհը՝ որպես մարդկության հնագույն բնօրրան',
    'Վաղ պետական կազմավորումները Հայաստանի տարածքում',
    'Վանի համահայկական թագավորությունը',
    'Հայկազուն-Երվանդականների թագավորությունը',
    'Մեծ Հայքի Արտաշեսյան թագավորությունը',
    'Հայաստանը՝ աշխարհակալ տերություն',
    'Մեծ Հայքի Արշակունյաց թագավորությունը (I-III դարեր)',
    'Հին Հայաստանի պետական կարգը, տնտեսությունը և հասարակական կառուցվածքը',
    'Հին Հայաստանի մշակույթը',
    'Վանի թագավորություն (Ուրարտու)'
  ];

  topics.forEach((topic, tIdx) => {
    const tId = `n_hp_g0_t${tIdx}`;
    initialNodes.push({
      id: tId, programId: hpId, organizationId: 'org_vaf', templateId: 'tpl_subject',
      nodeTypeId: 'type_topic', parentId: g6Id, title: topic, sortOrder: tIdx + 1, type: 'node'
    });
    
    if (topic === 'Հայաստանը հնագույն շրջանում') {
      const lessons = [
        'Հայկական լեռնաշխարհը՝ հայերի հայրենիք',
        'Հայկական լեռնաշխարհի դիրքը, սահմանները, գետերը, լճերը',
        'Հայաստանի պատմավարչական բաժանումը',
        'Մեծ Հայքի նահանգները և գավառները'
      ];
      lessons.forEach((lesson, lIdx) => {
        initialNodes.push({
          id: `n_hp_g0_t${tIdx}_l${lIdx}`, programId: hpId, organizationId: 'org_vaf', templateId: 'tpl_subject',
          nodeTypeId: 'type_lesson', parentId: tId, title: lesson, sortOrder: lIdx + 1, type: 'node'
        });
      });
    }
  });
})();
"""

content = content + nodes_additions

with open('src/lib/data.ts', 'w') as f:
    f.write(content)

