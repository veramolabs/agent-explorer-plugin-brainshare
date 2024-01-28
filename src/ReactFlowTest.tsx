// import { Row } from 'antd';
// import { Col } from 'antd';
import React from 'react';
import ReactFlow from 'reactflow';
// import { theme } from 'antd'
 
import 'reactflow/dist/style.css';
 
// const { token } = theme.useToken()
const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 200 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export const ReactFlowTest = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        
        {/* <Row> */}
          <ReactFlow nodes={initialNodes} edges={initialEdges} />
        {/* </Row> */}
      
    </div>
  );
}