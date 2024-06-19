import React from 'react';

const TreeNode = ({ nodeData }) => (
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <img src={nodeData.image} alt={nodeData.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
    <p>{nodeData.name}</p>
  </div>
);

export default TreeNode;
