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
  useEdgesState,
  useViewport
} from "reactflow";
import { Tag, Typography, theme } from "antd";
import { systemTitles } from "./api";

import "./styles.css";
import "reactflow/dist/style.css";
import BrainShareCredentialNode from "./BrainShareCredentialNode.js";
import { DebugFlow } from "./DebugFlow.js";
import BrainShareTextNode from "./BrainShareTextNode.js";

const nodeTypes = {
  Credential: BrainShareCredentialNode,
  text: BrainShareTextNode
};
export const BrainShareDiagram: React.FC<{credential: UniqueVerifiableCredential, context?: any}> = ({ credential, context }) => {
  const { token } = theme.useToken()
  const { canvas } = credential.verifiableCredential.credentialSubject
  // console.log("nodes: ", canvas.nodes)
  // console.log("edges: ", canvas.edges)

  let minX = 100000
  let minY = 100000
  canvas.nodes.forEach((node: any) => {
    if (node.x < minX) {
      minX = node.x
    }
    if (node.y < minY) {
      minY = node.y
    }
  })
  console.log("minX: ", minX)
  console.log("minY: ", minY)

  const initialNodes = canvas.nodes.map((node: any) => {
    // console.log("node: ", node)
    if (node.type === 'text') {
      return {
        id: node.id,
        type: 'text',
        position: { x: node.x - minX, y: node.y - minY },
        data: { label: node.text },
        height: 100
      }

    } else {
      // console.log("credential node: ", node)
      return {
        id: node.id,
        type: node.type,
        // type: 'input',
        position: { x: node.x - minX, y: node.y - minY },
        data: { file: node.file },
        height: 100
      }

    }
  })

  const initialEdges = canvas.edges.map((edge: any) => {
    return {
      id: edge.id,
      source: edge.fromNode,
      target: edge.toNode,
      label: edge.label
    }
  })



  // const [nodes, , onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState(JSON.parse(canvas.edges));
  // const onConnect = useCallback(
  //   (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
  //   [setEdges]
  // );

  console.log("nodes: ", initialNodes)
  console.log("edges: ", initialEdges)


  return <div style={{width: '100vw', height: '100vh', backgroundColor: 'gray'}} onClick={() => console.log("clicked.")}>
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      // onConnect={onConnect}
      nodeTypes={nodeTypes}
      // fitView
      minZoom={.1}
      // onLoad={onLoad}
      defaultViewport={{ x: -522, y: -225, zoom: .15}}
    >
      <DebugFlow />
    </ReactFlow>
    </div>
}
