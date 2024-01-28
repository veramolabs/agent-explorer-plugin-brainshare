import { VerifiableCredentialComponent } from "@veramo-community/agent-explorer-plugin";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { CredentialLoader } from "./CredentialLoader.js";
import Markdown from "react-markdown";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <div style={{backgroundColor: 'dimgrey', maxWidth: '400px'}}>
      <Handle
        type="target"
        position={targetPosition}
        isConnectable={isConnectable}
      />
        <Markdown>{data.label}</Markdown>
      <Handle
        type="source"
        position={sourcePosition}
        isConnectable={isConnectable}
      />
    </div>
  );
};

CustomNode.displayName = "TextNode";

export default memo(CustomNode);