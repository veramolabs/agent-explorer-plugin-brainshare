import { VerifiableCredentialComponent } from "@veramo-community/agent-explorer-plugin";
import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { CredentialLoader } from "./CredentialLoader.js";

const BrainShareDiagramNode = ({
  data,
  isConnectable,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom
}: NodeProps) => {
  return (
    <>
      <CredentialLoader />
    </>
  );
};

BrainShareDiagramNode.displayName = "CustomNode";

export default memo(BrainShareDiagramNode);