import React from 'react'
import { normalizeCredential } from 'did-jwt-vc';
import { computeEntryHash } from '@veramo/utils';
import { VerifiableCredentialComponent, CredentialLoader } from '@veramo-community/agent-explorer-plugin'
import { Components } from 'react-markdown'

export const getMarkdownComponents = () : Partial<Components>  => {

  return {
    p(props) {
      console.log(props)
      return (<p>{JSON.stringify(props.node?.position)} {props.children}</p>)
    },
    pre(props) {
      return (<>{props.children}</>)
    },
    code(props) {
      const {children, className, node, ...rest} = props
      switch (className?.toLowerCase()) {
        case 'language-vc+jwt':
          const verifiableCredential = normalizeCredential(String(children).replace(/\s/g, ''))
          const hash = computeEntryHash(verifiableCredential)
          return <VerifiableCredentialComponent credential={{hash, verifiableCredential}} />
        case 'language-vc+json':
          const verifiableCredential2 = JSON.parse(String(children))
          const hash2 = computeEntryHash(verifiableCredential2)
          return <VerifiableCredentialComponent credential={{hash: hash2, verifiableCredential: verifiableCredential2}} />
        case 'language-vc+multihash':
          const items = String(children).replace(/\s/g, '').split('/');
          let hash3 = '';
          let did = '';
          if (items.length === 2) {
            did = items[0];
            hash3 = items[1];
          } else {
            hash3 = items[0];
          }
          return <CredentialLoader hash={hash3} did={did} />
        default:
          return (
            <code {...rest} className={className}>
              {children}
            </code>
          )
      }
    }
  }
}