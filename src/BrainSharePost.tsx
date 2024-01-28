import * as React from "react";
import { UniqueVerifiableCredential } from "@veramo/core";
import { MarkDown } from "@veramo-community/agent-explorer-plugin";
import { Tag, Typography, theme } from "antd";
import { systemTitles } from "./api";
import { BrainShareDiagram } from "./BrainShareDiagram.js";
import { ReactFlowTest } from "./ReactFlowTest.js";

export const BrainSharePost: React.FC<{credential: UniqueVerifiableCredential, context?: any}> = ({ credential, context }) => {
  const { token } = theme.useToken()
  const { title, post, canvas } = credential.verifiableCredential.credentialSubject
  
  if (canvas) {
    console.log("yes canvas. show react flow test.")
    // return (<ReactFlowTest />)
    return <BrainShareDiagram credential={credential}/>
  }

  return <div style={{marginTop: token.margin}}>
    {context?.hideTitle !== true && title && !systemTitles.includes(title) && !context?.textRange && <h2>{title}</h2>}
    {context?.hideTitle !== true && title && !systemTitles.includes(title) && context?.textRange && <Typography.Text type='secondary'>{title}</Typography.Text>}
    {context?.hideTitle !== true && title && systemTitles.includes(title) && <Tag>{title}</Tag>}
    <MarkDown content={post} credential={credential} context={context} />
    </div>
}
