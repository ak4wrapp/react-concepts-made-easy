// Render the sample tree data in a nested tree view component using React.

import { useState } from "react";
import "./styles.css";

const sampleData = [
  {
    id: 1,
    name: "Group 1",
    children: [
      { id: 2, name: "User 1" },
      { id: 3, name: "User 2" },
    ],
  },
  {
    id: 4,
    name: "Group 2",
    children: [
      { id: 5, name: "User 3" },
      { id: 6, name: "User 4" },
    ],
  },
  { id: 7, name: "Group 3" }, // Group without children
  {
    id: 8,
    name: "Group 4",
    children: [
      { id: 9, name: "User 5" },
      { id: 10, name: "User 6" },
    ],
  },
];

interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

const TreeView = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>(
    {}
  );

  const toggleNode = (nodeId: number) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const renderTree = (nodes: TreeNode[]) => (
    <ul className="tree-view-list">
      {nodes.map((node) => {
        const isExpanded = expandedNodes[node.id] ?? false;
        const hasChildren = (node.children?.length ?? 0) > 0;

        return (
          <li key={node.id} className="tree-view-item">
            <button
              type="button"
              onClick={() => toggleNode(node.id)}
              className="tree-view-button"
              style={{ fontWeight: hasChildren ? "bold" : "normal" }}
            >
              {hasChildren ? (isExpanded ? "▾" : "▸") : ""} {node.name}
            </button>
            {hasChildren && isExpanded && renderTree(node.children ?? [])}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="tree-view-container">
      <h2>Sample Tree View</h2>
      {renderTree(sampleData)}
    </div>
  );
};

export default TreeView;
