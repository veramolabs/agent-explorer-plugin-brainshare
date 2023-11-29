import * as React from "react";
import { UniqueVerifiableCredential } from "@veramo/core";
import { useCallback } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "reactflow";
import { Tag, Typography, theme } from "antd";
import { systemTitles } from "./api";

import "./styles.css";
import "reactflow/dist/style.css";

// const nodeTypes = {
//   custom: CustomNode
// };
export const BrainShareDiagram: React.FC<{credential: UniqueVerifiableCredential, context?: any}> = ({ credential, context }) => {
  const { token } = theme.useToken()
  const { title, diagram } = credential.verifiableCredential.credentialSubject
  console.log("nodes: ", diagram.nodes)
  console.log("edges: ", diagram.edges)
  const [nodes, , onNodesChange] = useNodesState(JSON.parse(diagram.nodes));
  const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(diagram.edges));
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  return <div style={{marginTop: token.margin, height: '300px'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={{}}
      fitView={true}
    >
      <Background />
    </ReactFlow>
    </div>
}
