import { useMemo } from 'react';
import { ContentNode, HierarchyTemplate } from '@/lib/data';

export type HierarchyView = 'default' | 'inverted';

export function useVirtualTree(nodes: ContentNode[], viewMode: HierarchyView, template: HierarchyTemplate) {
  return useMemo(() => {
    if (viewMode === 'default' || template.isFreeform) {
      return nodes;
    }

    // We only support inverting if there are at least 2 levels
    const typeLevel1 = template.nodeTypes.find(t => t.level === 1);
    const typeLevel2 = template.nodeTypes.find(t => t.level === 2);

    if (!typeLevel1 || !typeLevel2) {
      return nodes;
    }

    const virtualNodes: ContentNode[] = [];
    let idCounter = 1;

    // 1. Find all physical level 2 nodes (e.g. Grades)
    const level2Nodes = nodes.filter(n => n.nodeTypeId === typeLevel2.id);
    const uniqueLevel2Titles = Array.from(new Set(level2Nodes.map(n => n.title)));

    // 2. Create virtual Root Level 2 nodes
    const virtualLevel2Nodes = uniqueLevel2Titles.map(title => {
      const vNode: ContentNode = {
        id: `v_l2_${idCounter++}`,
        organizationId: 'org_1',
        programId: nodes[0]?.programId || 'virtual',
        templateId: template.id,
        nodeTypeId: typeLevel2.id,
        parentId: null,
        title: title,
        sortOrder: 1,
        type: 'node'
      };
      virtualNodes.push(vNode);
      return vNode;
    });

    // 3. For each physical Level 2, find its parent Level 1. 
    // Create a virtual Level 1 under the corresponding virtual Level 2.
    const physicalToVirtualLevel1Map = new Map<string, string>();

    level2Nodes.forEach(physLevel2 => {
      const physLevel1 = nodes.find(n => n.id === physLevel2.parentId);
      if (!physLevel1) return;

      const vLevel2 = virtualLevel2Nodes.find(v => v.title === physLevel2.title);
      if (!vLevel2) return;

      const vLevel1: ContentNode = {
        id: `v_l1_${idCounter++}`,
        organizationId: physLevel1.organizationId,
        programId: physLevel1.programId,
        templateId: template.id,
        nodeTypeId: typeLevel1.id,
        parentId: vLevel2.id,
        title: physLevel1.title,
        sortOrder: physLevel1.sortOrder,
        metadata: { ...physLevel1.metadata },
        type: 'node'
      };
      virtualNodes.push(vLevel1);
      physicalToVirtualLevel1Map.set(physLevel2.id, vLevel1.id);
    });

    // 4. Handle all nodes that were under physical Level 2 (e.g. Level 3+)
    const otherNodes = nodes.filter(n => {
      const nt = template.nodeTypes.find(t => t.id === n.nodeTypeId);
      return nt && nt.level >= 3;
    });

    const reparentedOtherNodes = otherNodes.map(n => {
      if (n.parentId && physicalToVirtualLevel1Map.has(n.parentId)) {
        return {
          ...n,
          parentId: physicalToVirtualLevel1Map.get(n.parentId)!
        };
      }
      return { ...n };
    });

    virtualNodes.push(...reparentedOtherNodes);

    const shortcuts = nodes.filter(n => n.type === 'shortcut');
    const reparentedShortcuts = shortcuts.map(s => {
      if (s.parentId && physicalToVirtualLevel1Map.has(s.parentId)) {
        return { ...s, parentId: physicalToVirtualLevel1Map.get(s.parentId)! };
      }
      return { ...s };
    });
    
    const existingIds = new Set(virtualNodes.map(n => n.id));
    for (const s of reparentedShortcuts) {
      if (!existingIds.has(s.id)) {
        virtualNodes.push(s);
      }
    }

    return virtualNodes;
  }, [nodes, viewMode, template]);
}
