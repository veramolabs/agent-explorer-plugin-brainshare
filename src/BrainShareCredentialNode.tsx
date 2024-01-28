import { VerifiableCredentialComponent } from "@veramo-community/agent-explorer-plugin";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { CredentialLoader } from "./CredentialLoader.js";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
    const did = data.file.split('/')[0]
    const title = data.file.split('/')[1]
  return (
    <div style={{maxWidth: '400px'}}>
        <Handle
            type="target"
            position={targetPosition}
            isConnectable={isConnectable}
        />
            <CredentialLoader title={title} did={did}  />
        <Handle
            type="source"
            position={sourcePosition}
            isConnectable={isConnectable}
        />
    </div>
  );
};

CustomNode.displayName = "CustomNode";

export default memo(CustomNode);