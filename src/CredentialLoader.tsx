import { VerifiableCredentialComponent } from "@veramo-community/agent-explorer-plugin"
import { useVeramo } from "@veramo-community/veramo-react"
import { UniqueVerifiableCredential, IDataStore, IDataStoreORM, IDIDManager, IResolver } from "@veramo/core-types"
import { Spin, Typography } from "antd"
import React, { useState, useEffect } from "react"
import { getPost, getPostByTitle } from "./didcommUtils"
import { IDIDComm } from "@veramo/did-comm"

export const CredentialLoader = ({ hash, title, did, context } : { hash?: string, title?: string, did?: string, context?: any }) => {
  
  const [credential, setCredential] = useState<UniqueVerifiableCredential>()
  const { agents, agent } = useVeramo<IDataStore & IDataStoreORM & IDIDComm & IDIDManager & IResolver>()
  const [error, setError] = useState<string | undefined>(undefined)
  
  const localAgent = React.useMemo(() => {
    return agents.find((agent) => agent.context.id === 'web3Agent')
  }, [agents])

  if (!agent) return null
  if (!localAgent) return null

  useEffect(() => {
    const load = async () => {
      try {
        let postCredential
        if (!did) {
          throw new Error("no DID found on post")
        }
        if (hash) {
          postCredential = await getPost(agent, localAgent, hash, did)
        } else if (title) {
          postCredential = await getPostByTitle(agent, localAgent, did, title)
        } else {
          throw new Error('Cannot load post without either hash or title')
        }
        if (postCredential.verifiableCredential) {
          setCredential(postCredential)
        } else {
          throw new Error('Credential not found')
        }
      }catch(e: any) {
        setError(e.message)
      }
    }

    load()
  }, [agent, hash, title])
  
  if (error) {
    return <Typography.Text type='danger'>{error}</Typography.Text>
  }

  return credential ? <VerifiableCredentialComponent credential={credential} context={context} /> : <Spin />
}

