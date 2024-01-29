import { VerifiableCredentialComponent } from "@veramo-community/agent-explorer-plugin";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { CredentialLoader } from "./CredentialLoader.js";
import Markdown from "react-markdown";
import { theme } from "antd";

const CustomNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {

  const { token } = theme.useToken()
  return (
    <div style={{ backgroundColor: token.colorBgElevated, maxWidth: '400px', padding: token.paddingXS, borderRadius: token.borderRadius }}>
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
