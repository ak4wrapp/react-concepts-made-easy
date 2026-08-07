// tree-traversal.js

// This file contains javascript functions for traversing a tree data structure in JavaScript in both recursive and iterative ways.
// The tree is represented as a nested object where each node has a value and an array of children nodes.

// Recursive way
function dfsRecursive(node, callback) {
  if (!node) return;
  callback(node);
  node.children.forEach((child) => dfsRecursive(child, callback));
}

function bfsRecursive(root, callback) {
  if (!root) return;

  function traverse(queue) {
    if (queue.length === 0) return;

    const node = queue.shift();
    callback(node);

    queue.push(...node.children);
    traverse(queue);
  }
  traverse([root]);
}

// Iterative way
function dfsIterative(node, callback) {
  if (!node) return;
  const stack = [node];
  while (stack.length > 0) {
    const currentNode = stack.pop();
    callback(currentNode);
    for (let i = currentNode.children.length - 1; i >= 0; i--) {
      stack.push(currentNode.children[i]);
    }
  }
}

function bfsIterative(node, callback) {
  if (!node) return;
  const queue = [node];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    callback(currentNode);
    currentNode.children.forEach((child) => queue.push(child));
  }
}

// Example usage:
const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    {
      value: 3,
      children: [
        { value: 4, children: [] },
        { value: 5, children: [] },
      ],
    },
  ],
};

console.log("DFS Recursive:");
dfsRecursive(tree, (node) => console.log(node.value));

console.log("DFS Iterative:");
dfsIterative(tree, (node) => console.log(node.value));

console.log("BFS Recursive:");
bfsRecursive(tree, (node) => console.log(node.value));

console.log("BFS Iterative:");
bfsIterative(tree, (node) => console.log(node.value));
