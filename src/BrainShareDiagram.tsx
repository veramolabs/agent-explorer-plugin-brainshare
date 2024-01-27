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
import BrainShareCredentialNode from "./BrainShareCredentialNode.js";

const nodeTypes = {
  Credential: BrainShareCredentialNode
};
export const BrainShareDiagram: React.FC<{credential: UniqueVerifiableCredential, context?: any}> = ({ credential, context }) => {
  const { token } = theme.useToken()
  const { canvas } = credential.verifiableCredential.credentialSubject
  console.log("nodes: ", canvas.nodes)
  console.log("edges: ", canvas.edges)

  const initialNodes = canvas.nodes.map((node: any) => {
    // console.log("node: ", node)
    if (node.type === 'text') {
      return {
        id: node.id,
        type: 'input',
        position: { x: node.x, y: node.y },
        data: { label: node.text }
      }

    } else {
      console.log("credential node: ", node)
      return {
        id: node.id,
        type: node.type,
        position: { x: node.x / 100, y: node.y / 100 },
        data: { file: node.file }
      }

    }
  })



  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(canvas.edges));
  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
  //   [setEdges]
  // );
  return <div style={{marginTop: token.margin, height: '3000px'}}>
    <ReactFlow
      nodes={nodes}
      // edges={edges}
      onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      nodeTypes={nodeTypes}
      // fitView={true}
      // defaultViewport={{ x: 0, y: 0, zoom: 1}}
    >
      <Background />
    </ReactFlow>
    </div>
}
