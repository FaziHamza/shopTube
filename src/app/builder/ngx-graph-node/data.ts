import { Edge, Node, ClusterNode } from '@swimlane/ngx-graph';

export const nodesList: CustomNode[] = [
    {
        id: 'first',
        label: 'A',
        isExpand: false
    }, {
        id: 'second',
        label: 'B',
        isExpand: false
    }, {
        id: 'c1',
        label: 'C1',
        isExpand: false
    }, {
        id: 'c2',
        label: 'C2',
        isExpand: false
    }
];
export interface CustomNode extends Node {
    isExpand?: boolean; // Add isExpand property
    children?: CustomNode[];
}
export const clusters: ClusterNode[] = [
    {
        id: 'third',
        label: 'C',
        childNodeIds: ['c1', 'c2']
    }
]

export const linksList: Edge[] = [
    {
        id: 'a',
        source: 'first',
        target: 'second',
        label: 'is parent of'
    },
    {
        id: 'b',
        source: 'first',
        target: 'c1',
        label: 'custom label'
    },
    {
        id: 'c',
        source: 'first',
        target: 'c1',
        label: 'custom label'
    },
    {
        id: 'd',
        source: 'first',
        target: 'c2',
        label: 'custom label'
    }
];