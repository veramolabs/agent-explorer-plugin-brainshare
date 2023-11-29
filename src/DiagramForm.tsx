import { Input, Checkbox, Space, Tabs, theme, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import { useVeramo } from '@veramo-community/veramo-react'
import { ICredentialIssuer, IDIDManager, IDataStore, IDataStoreORM, ProofFormat, TAgent } from '@veramo/core'
import { MarkDown, ActionButton } from '@veramo-community/agent-explorer-plugin'
import Editor from '@monaco-editor/react';
import { systemTitles } from './api'
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "reactflow";

interface DiagramFormProps {
  onOk: (did:string, hash: string) => void
  initialIssuer?: string
  initialTitle?: string
  initialNodes?: string
  initialEdges?: string
  initialIsPublic?: boolean
}

export const DiagramForm: React.FC<DiagramFormProps> = ({ onOk, initialIssuer, initialTitle, initialNodes, initialEdges, initialIsPublic }) => {
  const token = theme.useToken()

  const [title, setTitle] = useState<string>(initialTitle || '')
  const [isPublic, setIsPublic] = useState<boolean>(initialIsPublic || false)
  const [nodes, setNodes] = useState<string>(initialNodes || window.localStorage.getItem('bs-nodes') || '[]')
  const [edges, setEdges] = useState<string>(initialEdges || window.localStorage.getItem('bs-edges') || '[]')
  const { agent } = useVeramo<ICredentialIssuer & IDataStore & IDataStoreORM & IDIDManager>()
  const [isSaving, setIsSaving] = useState<boolean>(false)


  useEffect(() => {
    window.localStorage.setItem('bs-nodes', nodes)
  }, [nodes])
  useEffect(() => {
    window.localStorage.setItem('bs-edges', edges)
  }, [edges])


  const handleCreatePost = async (did: string, issuerAgent: TAgent<ICredentialIssuer>) => {
    setIsSaving(true)
    try {

      const identifier = await issuerAgent?.didManagerGet({ did })
      const usableProofs = await issuerAgent.listUsableProofFormats(identifier)
      const proofFormat = usableProofs.includes('jwt') ? 'jwt' : usableProofs[0]

      const credential = await issuerAgent.createVerifiableCredential({
        save: true,
        proofFormat: (proofFormat as ProofFormat),
        credential: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiableCredential', 'BrainShareDiagram'],
          issuer: { id: did },
          issuanceDate: new Date().toISOString(),
          credentialSubject: {
            title,
            isPublic,
            diagram: {
              nodes,
              edges
            }
          },
        },
      })
      
      if (credential) {
        const hash = await agent?.dataStoreSaveVerifiableCredential({verifiableCredential: credential})
        
        // also send to appropriate DID via DIDComm if desired, but always store locally as well

        if (hash) {
          window.localStorage.removeItem('bs-nodes')
          window.localStorage.removeItem('bs-edges')
          onOk(did, hash)
        }

      }
    } catch (e) {
      console.error(e)
    }
    setIsSaving(false)
  }

  let jsonNodes = []
  try {
    jsonNodes = JSON.parse(nodes)
  } catch (ex) {
    console.log("nodes fail: ", ex)
    console.log("nodes: ", nodes)
  }

  let jsonEdges = []
  try {
    jsonEdges = JSON.parse(edges)
  } catch (ex) {
    console.log("edges fail: ", ex)
    console.log("edges: ", edges)
  }

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
    <Tabs
      items={[
        {
          key: '1',
          label: 'Write',
          children: (
            <Space direction='vertical' style={{width: '100%'}}>
              {systemTitles.includes(title) && <div><Input value={title} type='hidden'/><Tag>{title === 'bs-sidebar' && 'Sidebar'}{title === 'bs-home' && 'Home'}</Tag></div>}
              {!systemTitles.includes(title) && <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title (optional)'/>}
              <Editor
                theme={token.theme.id === 4 ? 'vs-dark' : 'light'}
                height="50vh"
                options={{
                  lineNumbers: 'off',
                  wordWrap: 'on',
                  fontSize: 14,
                  minimap: { enabled: false },
                }}
                defaultLanguage="markdown"
                defaultValue={nodes}
                value={nodes}
                onChange={(e) => {
                  setNodes(e || '')
                }}
              />
              <Editor
                theme={token.theme.id === 4 ? 'vs-dark' : 'light'}
                height="50vh"
                options={{
                  lineNumbers: 'off',
                  wordWrap: 'on',
                  fontSize: 14,
                  minimap: { enabled: false },
                }}
                defaultLanguage="markdown"
                defaultValue={edges}
                value={edges}
                onChange={(e) => {
                  setEdges(e || '')
                }}
              />
            </Space>
          )
        },
        {
          key: '2',
          label: 'Preview',
          children: (
          <div style={{ height: '300px'}}>
            <h2>{title}</h2>
            <ReactFlow
              nodes={jsonNodes}
              edges={jsonEdges}
              // onNodesChange={onNodesChange}
              // onEdgesChange={onEdgesChange}
              // onConnect={onConnect}
              // nodeTypes={nodeTypes}
              fitView
            >
              <Background />
            </ReactFlow>
          </div>)
        },
        ]}
    />
      <Space direction='horizontal'>

        <ActionButton 
          title='Save to:' 
          disabled={nodes==='' || isSaving} 
          onAction={handleCreatePost}
          />

        {!systemTitles.includes(title) && <Checkbox defaultChecked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>Public</Checkbox>}

      </Space>
    </Space>
  )
}
